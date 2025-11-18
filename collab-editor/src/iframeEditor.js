import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { Extension, } from '@tiptap/core'
import { Dropcursor } from '@tiptap/extensions'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import { TableScrollWrapper } from './extensions/TableScrollWrapper.js'
import {createToolbar, wireToolbar} from './toolbar.js'
import { Gapcursor } from '@tiptap/extensions'
import { TableHoverOverlay } from './extensions/TableHoverOverlay.js'
import { TableFormatToolbar } from './extensions/TableFormatToolbar.js'
import { CustomTableCell, CustomTableHeader } from './extensions/CustomTableCell.js'
import { columnResizing, tableEditing } from '@tiptap/pm/tables'
import BlockId from './extensions/BlockId.js'
import SlashCommand from './extensions/SlashCommand.js'
import {ResizableImage} from './extensions/ResizableImage.js'
import {CSS} from "./iframeEditorCss.js";
import {TIPTAPCSS} from "./tiptapcss";
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import * as awarenessProtocol from 'y-protocols/awareness'
import io from 'socket.io-client'
import {CustomCollabCursor} from "./extensions/CustomCollabCursor.js";

const FontStyle = TextStyle.extend({
    addAttributes() {
        return {
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize?.replace(/['"]/g, '') || null,
                renderHTML: attrs => attrs.fontSize ? { style: `font-size:${attrs.fontSize}` } : {},
            },
            fontFamily: {
                default: null,
                parseHTML: element => element.style.fontFamily?.replace(/['"]/g, '') || null,
                renderHTML: attrs => attrs.fontFamily ? { style: `font-family:${attrs.fontFamily}` } : {},
            },
        }
    },
})


const FontCommands = Extension.create({
    name: 'fontCommands',
    addCommands() {
        return {
            setFontSize:
                size => ({ chain }) => chain().setMark('textStyle', { fontSize: size }).run(),
            setFontFamily:
                fam => ({ chain }) => chain().setMark('textStyle', { fontFamily: fam }).run(),
        }
    },
})


export function createEditorIframe(doc, editorId, options = {}) {
    const {width = 900,
        tools = 'all',
        baseServerUrl = 'https://backend.timebox.ai/global-editor-api',
        mainEditorDocumentId,
    } = options

    doc.open()
    doc.write(`<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
        </head>
        <body class="doc_editor_body_main" id="main_page">
            <div id="ge_toolbar_container_at_top" class="ge_tool_bar_container_at_top ge_above_the_editor global_editor_toolbar"></div>
            <div class="ge_outer_most_container live_editing_mode">
              <div id="editor_main_container" class="doc_placeholder_container" style="width:${Number(width)}px"></div>
            </div>
        </body>
    </html>`)
    doc.close()

    const docId = mainEditorDocumentId || editorId;

    const socket = io(baseServerUrl, {
        reconnectionAttempts: 5, // Max reconnection attempts (Socket.IO auto-reconnects)
        reconnectionDelay: 5000, // Time before attempting to reconnect
        transports: ['websocket'], // Ensure WebSocket is used as transport
        path: '/global-editor-api/socket.io', // Specify the custom namespace for Socket.IO
        query: { EIO: 4 }, // Optional query parameter for engine.io version 4
    });

    const ydoc = new Y.Doc();
    const awareness = new awarenessProtocol.Awareness(ydoc);
    const userName = options?.userName || `Guest-${Date.now() % 1000000}`;
    const userColor = options?.userColor || '#' + Math.floor(Math.random() * 16777215).toString(16);


    awareness.setLocalStateField('user', {
        name: userName,
        color: userColor,
    });

    const provider = {
        awareness,
        on: () => {},
        off: () => {},
    };

    awareness.on('update', ({ added, updated, removed }, origin) => {
        const changed = added.concat(updated).concat(removed);
        if (changed.length === 0) return;

        const update = awarenessProtocol.encodeAwarenessUpdate(awareness, changed);
        socket.emit('yjs-awareness', { docId, update });
    });

    socket.on('yjs-awareness', ({ docId: remoteDocId, update }) => {
        if (remoteDocId !== docId || !update) return;

        const u = update instanceof ArrayBuffer ? new Uint8Array(update) : (update.byteLength !== undefined ? new Uint8Array(update) : update);

        try {
            awarenessProtocol.applyAwarenessUpdate(awareness, u, socket.id);
        } catch (e) {
            console.error('Error applying awareness update', e);
        }
    });

    socket.on('connect', () => {
        console.log('[YJS] connected to backend, joining doc', docId);
        socket.emit('joinYDoc', docId);
    });

    // Send local Yjs updates to server
    ydoc.on('update', (update) => {
        socket.emit('yjs-update', {
            docId,
            update, // Uint8Array – Socket.IO handles this as binary
        });
    });

    // Apply remote Yjs updates from server
    socket.on('yjs-update', ({ docId: remoteDocId, update }) => {
        if (remoteDocId !== docId || !update) return;

        const u = update instanceof ArrayBuffer ? new Uint8Array(update) : (update.byteLength !== undefined ? new Uint8Array(update) : update);

        try {
            Y.applyUpdate(ydoc, u);
        } catch (e) {
            console.error('Error applying Yjs update', e);
        }
    });

    // styles
    const style = doc.createElement('style')
    style.textContent = `${CSS}${TIPTAPCSS}`;
    doc.head.appendChild(style)

    // const DragHandleExt = Extension.create({
    //     name: 'dragHandleExt',
    //     addProseMirrorPlugins() {
    //         // adjust gutterLeft/gutterTop as needed
    //         return [DragHandle(openSlashProgrammatically, { gutterLeft: -53, gutterTop: -1 })]
    //     },
    // })

    // editor
    const el = doc.getElementById('editor_main_container')
    const extensions = [
        BlockId,
        StarterKit.configure({
            history: true,
            bulletList: { keepMarks: true, keepAttributes: true },
            orderedList: { keepMarks: true, keepAttributes: true },
        }),
        Collaboration.configure({
            document: ydoc,
            field: 'prosemirror',
        }),
        CustomCollabCursor.configure({
            provider,
            user: {
                name: userName,
                color: userColor,
            },
        }),
        Underline,
        Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading','paragraph'] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        columnResizing({ handleWidth: 6, cellMinWidth: 40, lastColumnResizable: true }),
        tableEditing(),
        TableFormatToolbar,
        Table.configure({ resizable: true }),
        CustomTableHeader,
        TableRow,
        CustomTableCell,
        TableHoverOverlay,
        ResizableImage,
        TableScrollWrapper,
        SlashCommand,
        FontStyle,
        Color,
        FontCommands,
        Dropcursor,
        Gapcursor,
    ];

    const editor = new Editor({
        element: el,
        editorProps: {
            attributes: { class: 'global_editor_edit_main_area block_content_editable_wrapper', id:editorId},
        },
        extensions,
        autofocus: true,
        content: '<p></p>',
        injectCSS: false,
    })

    // safer: never split on a NodeSelection
    function openSlashProgrammatically() {
        const { state } = editor
        const $from = state.selection.$from
        const depth = $from.depth
        const blockPos = $from.before(depth)
        const block = state.doc.nodeAt(blockPos)

        // fallback
        if (!block) {
            editor.chain().focus().insertContent('/').run()
            return
        }

        const hasContent =
            (block.textContent && block.textContent.trim().length > 0) ||
            block.childCount > 0

        const endOfBlock = blockPos + block.nodeSize // pos *after* the block

        const chain = editor.chain().focus()

        if (hasContent) {
            chain
                // move cursor to the end of the current block (convert NodeSelection -> TextSelection)
                .setTextSelection(endOfBlock - 1)
                // insert an empty paragraph *after* the block
                .insertContentAt(endOfBlock, { type: 'paragraph' })
                // place caret inside that new paragraph
                .setTextSelection(endOfBlock + 1)
                // type the slash to open the menu
                .insertContent('/')
                .run()
        } else {
            // block is empty: just type '/'
            chain.insertContent('/').run()
        }
    }

    const toolbarHost = doc.getElementById('ge_toolbar_container_at_top');
    createToolbar(toolbarHost) // your function from the message

    // 2) insert it at the top of your wrap
    const wrap = doc.getElementById('wrap') || doc.body
    wrap.insertBefore(toolbarHost, wrap.firstChild)

    // 3) connect actions/state to TipTap
    wireToolbar(editor, toolbarHost)

    return {editor, toolbar:toolbarHost}
}


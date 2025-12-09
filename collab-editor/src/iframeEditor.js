import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { Extension, } from '@tiptap/core'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import { TableScrollWrapper } from './extensions/TableScrollWrapper.js'
import {createToolbar, wireToolbar} from './toolbar.js'
import { TableHoverOverlay } from './extensions/TableHoverOverlay.js'
import { TableFormatToolbar } from './extensions/TableFormatToolbar.js'
import { CustomTableCell, CustomTableHeader } from './extensions/CustomTableCell.js'
import { columnResizing, tableEditing } from '@tiptap/pm/tables'
import UniqueID from '@tiptap/extension-unique-id'
import SlashCommand from './extensions/SlashCommand.js'
import {ResizableImage} from './extensions/ResizableImage.js'
import {CSS} from "./iframeEditorCss.js";
import {TIPTAPCSS} from "./tiptapcss";
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import * as awarenessProtocol from 'y-protocols/awareness'
import io from 'socket.io-client'
import CollaborationCaret from '@tiptap/extension-collaboration-caret';
import DragHandle from '@tiptap/extension-drag-handle'
import {createSelectionToolbar, wireSelectionToolbar} from "./selectionToolbar.js";
import Placeholder from '@tiptap/extension-placeholder'
import { Selection } from '@tiptap/pm/state'

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
    const {
        width = 0,
        tools = [],
        showFloatingToolbar = false,
        baseServerUrl = 'https://backend.timebox.ai/global-editor-api',
        mainEditorDocumentId,
    } = options

    const isFirefoxExtension =
        typeof window !== 'undefined' &&
        window.location &&
        window.location.protocol === 'moz-extension:'

    if (isFirefoxExtension) {
        // Clear existing contents
        if (doc.body) {
            while (doc.body.firstChild) {
                doc.body.removeChild(doc.body.firstChild)
            }
        }

        // Ensure <html>, <head>, <body> exist
        let htmlEl = doc.documentElement
        if (!htmlEl) {
            htmlEl = doc.createElement('html')
            doc.appendChild(htmlEl)
        }

        let head = doc.querySelector('head')
        if (!head) {
            head = doc.createElement('head')
            htmlEl.appendChild(head)
        }

        let body = doc.querySelector('body')
        if (!body) {
            body = doc.createElement('body')
            htmlEl.appendChild(body)
        }

        body.className = 'doc_editor_body_main'
        body.id = 'main_page'

        // Basic meta tags
        const metaCharset = doc.createElement('meta')
        metaCharset.setAttribute('charset', 'utf-8')
        head.appendChild(metaCharset)

        const metaViewport = doc.createElement('meta')
        metaViewport.name = 'viewport'
        metaViewport.content = 'width=device-width,initial-scale=1'
        head.appendChild(metaViewport)

        // Loader
        const loaderDiv = doc.createElement('div')
        loaderDiv.id = 'ge_editor_loader'
        loaderDiv.className = 'ge_editor_loader'
        loaderDiv.textContent = 'Loading editor...'

        // Outer container + editor container
        const outerMost = doc.createElement('div')
        if(!showFloatingToolbar){
            outerMost.className = 'ge_outer_most_container no_floating_toolbar'
        } else{
            outerMost.className = 'ge_outer_most_container'
        }

        const editorContainer = doc.createElement('div')
        editorContainer.id = 'editor_main_container'
        editorContainer.className = 'doc_placeholder_container'
        editorContainer.style.width = width ? Number(width) + 'px' : '100%'

        // Toolbar container (top)
        const toolbarDiv = doc.createElement('div')
        toolbarDiv.id = 'ge_toolbar_main_element'
        body.appendChild(toolbarDiv)

        outerMost.appendChild(editorContainer)
        body.appendChild(loaderDiv)
        body.appendChild(outerMost)
    } else {
        // ========== LEGACY VERSION (CHROME + NORMAL WEB + CHROME EXT) ==========
        doc.open()
        doc.write(`<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
        </head>
        <body class="doc_editor_body_main" id="main_page">
            <div id="ge_editor_loader" class="ge_editor_loader">Loading editor...</div>
            <div id="ge_toolbar_main_element"></div>
            <div class="ge_outer_most_container ${!showFloatingToolbar ? 'no_floating_toolbar' : ''}">
              <div id="editor_main_container" 
                   class="doc_placeholder_container" 
                   style="width:${width ? Number(width) + 'px' : '100%'}">
              </div>
           </div>
        </body>
    </html>`)
        doc.close()
    }

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
    const userColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const loader = doc.getElementById('ge_editor_loader');
    awareness.setLocalStateField('user', {
        name: userName,
        color: userColor,
    });

    window.addEventListener('beforeunload', () => {
        awareness.setLocalState(null); // marks this client as offline
    });

    awareness.on('update', ({ added, updated, removed }, origin) => {
        const changed = added.concat(updated).concat(removed);
        if (!changed.length) return;
        const update = awarenessProtocol.encodeAwarenessUpdate(awareness, changed);
        socket.emit('yjs-awareness', { docId, update });
    });

    const provider = {
        doc: ydoc,
        awareness,
        on: () => {},
        off: () => {},
    };

    socket.on('yjs-awareness', ({ docId: remoteDocId, update }) => {
        if (remoteDocId !== docId || !update) return;

        const u =
            update instanceof Uint8Array
                ? update
                : update instanceof ArrayBuffer
                    ? new Uint8Array(update)
                    : (update.byteLength !== undefined ? new Uint8Array(update) : update);

        try {
            awarenessProtocol.applyAwarenessUpdate(awareness, u, socket.id);
        } catch (e) {
            console.error('Error applying awareness update', e);
        }
    });


    socket.on('connect', () => {
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

        const u = update instanceof ArrayBuffer
            ? new Uint8Array(update)
            : (update.byteLength !== undefined ? new Uint8Array(update) : update);

        try {
            Y.applyUpdate(ydoc, u);
        } catch (e) {
            console.error('Error applying Yjs update', e);
        }
        if (loader) loader.style.display = 'none';

        // 🔁 Now that remote content has been applied, decide whether to auto-focus
        setTimeout(() => {
            focusEditorOnLoad();
        }, 0);
    });


    // styles
    const style = doc.createElement('style')
    style.textContent = `${CSS}${TIPTAPCSS}`;
    doc.head.appendChild(style)

    // editor
    let dragHandleElement = null;
    const el = doc.getElementById('editor_main_container')
    const extensions = [
        StarterKit.configure({
            history: false,
            dropcursor: false,
            gapcursor: false,
            bulletList: { keepMarks: true, keepAttributes: true },
            orderedList: { keepMarks: true, keepAttributes: true },
        }),
        UniqueID.configure({
            attributeName: 'uid',     // name of the attribute
            types: [                 // nodes that should receive IDs
                'paragraph',
                'heading',
                'listItem',
                'bulletList',
                'orderedList',
                'taskItem',
                'taskList',
                'blockquote',
                'codeBlock',
                'table',
                'tableRow',
                'tableCell',
            ],
        }),
        Collaboration.configure({
            document: ydoc,
            field: 'prosemirror',
        }),
        CollaborationCaret.configure({
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
        // DragHandle.configure({
        //     render: () => {
        //         // IMPORTANT: use iframe document, not global document
        //         const element = doc.createElement('div')
        //         dragHandleElement = element
        //
        //         // Use as a hook for CSS to insert an icon
        //         element.classList.add('custom-drag-handle')
        //         element.classList.add('tiptap-button')
        //         element.classList.add('tiptap-menu-button')
        //
        //         // hide by default on initial load
        //         element.style.display = 'none'
        //
        //         element.innerHTML = `
        //         <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        //           <circle cx="9" cy="5" r="2"></circle><circle cx="9" cy="12" r="2"></circle><circle cx="9" cy="19" r="2"></circle>
        //           <circle cx="15" cy="5" r="2"></circle><circle cx="15" cy="12" r="2"></circle><circle cx="15" cy="19" r="2"></circle>
        //         </svg>
        //         `
        //         return element
        //     },
        // }),
        CustomTableCell,
        TableHoverOverlay,
        ResizableImage,
        TableScrollWrapper,
        SlashCommand,
        FontStyle,
        Color,
        FontCommands,
        Placeholder.configure({
            placeholder: "Start typing...",
            includeChildren: false,
            showOnlyCurrent: true,
            showOnlyWhenEditable: true,
            emptyNodeClass: 'is-empty with-slash',
        }),
    ];

    const editor = new Editor({
        element: el,
        editorProps: {
            attributes: {
                class: 'global_editor_edit_main_area block_content_editable_wrapper',
                id: editorId,
            },
            handlePaste(view, event, slice) {
                const items = event.clipboardData?.items || [];
                let handled = false;

                for (const item of items) {
                    if (item.type && item.type.startsWith('image/')) {
                        const file = item.getAsFile();
                        if (!file) continue;

                        event.preventDefault();
                        handled = true;

                        // upload + insert image node
                        uploadPastedImage(file);
                        break;
                    }
                }

                // if we handled an image, stop the default paste
                if (handled) return true;

                // otherwise, let Tiptap handle normal text/HTML paste
                return false;
            },
        },
        extensions,
        autofocus: false,
        injectCSS: false,
    })

    editor.on('selectionUpdate', ({ editor: ed }) => {
        if (!dragHandleElement) return;

        if (ed.isEmpty) {
            // hide when document is empty (initial load, or user deleted everything)
            dragHandleElement.style.display = 'none';
        } else {
            // show when there is any content
            dragHandleElement.style.display = '';
        }
    });

    const uploadPastedImage = async (file) => {
        try {
            const formData = new FormData();
            const fileName = `${docId}_${Date.now()}_${file.name}`;
            formData.append('attachment', file);
            formData.append('docId', docId);
            formData.append('name', fileName);

            const uploadUrl = `${baseServerUrl}/actionToUploadEditorAttachmentApiCall/${docId}/${fileName}`;

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Image upload failed', response.statusText);
                return;
            }

            const data = await response.json();
            if (!data || !data.url) {
                console.error('Upload response missing URL', data);
                return;
            }

            const src = data.url;

            editor
                .chain()
                .focus()
                .setImage({ src, alt: file.name || 'Image' })
                .run();
        } catch (err) {
            console.error('Error uploading pasted image', err);
        }
    };

    // expose uploader for other extensions (e.g., slash menu)
    editor.storage.uploadPastedImage = uploadPastedImage;

    function setupSave(editor, socket, docId) {
        const save = () => {
            const html = editor.getHTML();
            socket.emit('yjs-save-html', { docId, html });
        };

        // Ctrl+S / Cmd+S inside iframe
        doc.addEventListener('keydown', (event) => {
            // for some browsers event.key is 's', some 'S'
            const key = event.key?.toLowerCase();
            if ((event.ctrlKey || event.metaKey) && key === 's') {
                event.preventDefault();
                save();
            }
        });

        return save;
    }

    const toolbarHost = doc.getElementById('ge_toolbar_main_element');

    if(showFloatingToolbar) {
        createSelectionToolbar(toolbarHost,tools);
        wireSelectionToolbar(editor, toolbarHost);
    } else {
        createToolbar(toolbarHost,tools);
        wireToolbar(editor, toolbarHost);
    }

    const save = setupSave(editor, socket, docId);

    let initialAutoFocusDone = false;

    function focusEditorOnLoad() {
        if (!editor || initialAutoFocusDone) return;

        console.log('[focusEditorOnLoad] called; editor.isEmpty =', editor.isEmpty);

        // If there is ANY content, don't focus and don't touch blocks
        if (!editor.isEmpty) {
            initialAutoFocusDone = true;
            return;
        }

        // Doc is empty here. Ensure there's at least one paragraph block.
        const json = editor.getJSON();
        const content = json.content || [];
        const hasAnyBlock = content.length > 0;

        if (!hasAnyBlock) {
            console.log('[focusEditorOnLoad] no blocks, inserting first paragraph');
            editor.commands.setContent(
                {
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                            content: [],
                        },
                    ],
                },
                false // no extra history entry
            );
        }

        // Defer selection & focus to next frame so DOM + plugins are settled
        requestAnimationFrame(() => {
            try {
                const { state, view } = editor;

                // Position near the end of the doc (but at least 1)
                const pos = Math.max(1, state.doc.content.size);
                const selection = Selection.near(state.doc.resolve(pos));

                console.log('[focusEditorOnLoad] setting PM selection at', pos);

                // Set selection and ensure it's scrolled into view
                const tr = state.tr.setSelection(selection).scrollIntoView();
                view.dispatch(tr);

                // Focus the contenteditable
                if (view.dom && view.dom.focus) {
                    view.dom.focus();
                } else {
                    view.focus();
                }
            } catch (err) {
                console.error('[focusEditorOnLoad] error while focusing', err);
            }
        });

        initialAutoFocusDone = true;
    }

    return { editor, toolbar: toolbarHost, save }
}



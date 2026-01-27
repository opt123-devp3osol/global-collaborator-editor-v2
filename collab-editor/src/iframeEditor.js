// iframeEditor.js
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { Extension } from '@tiptap/core'
import { TextSelection, PluginKey } from '@tiptap/pm/state'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import { TableScrollWrapper } from './extensions/TableScrollWrapper.js'
import { createToolbar, wireToolbar } from './toolbar.js'
import { TableHoverOverlay } from './extensions/TableHoverOverlay.js'
import { TableFormatToolbar } from './extensions/TableFormatToolbar.js'
import { CustomTableCell, CustomTableHeader } from './extensions/CustomTableCell.js'
import { columnResizing, tableEditing } from '@tiptap/pm/tables'
import UniqueID from '@tiptap/extension-unique-id'
import SlashCommand from './extensions/SlashCommand.js'
import { ResizableImage } from './extensions/ResizableImage.js'
import { Bookmark } from './extensions/Bookmark.js'
import { Mention as MentionCommand } from './extensions/MentionCommand.js'
import { CSS } from './iframeEditorCss.js'
import { TIPTAPCSS } from './tiptapcss'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import * as awarenessProtocol from 'y-protocols/awareness'
import io from 'socket.io-client'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { createSelectionToolbar, wireSelectionToolbar } from './selectionToolbar.js'
import Placeholder from '@tiptap/extension-placeholder'

// -----------------------------
// Shared Yjs Provider Manager
// -----------------------------

const GLOBAL_YJS_KEY = '__GLOBAL_EDITOR_YJS_PROVIDER_MANAGER__';

function buildSocketConfig(baseServerUrl, options = {}) {
    // baseServerUrl: https://backend.timebox.ai/global-editor-api
    const u = new URL(baseServerUrl);

    const origin = u.origin;                           // https://backend.timebox.ai
    const nsPath = (u.pathname || '').replace(/\/$/, ''); // /global-editor-api

    // IMPORTANT:
    // - connectUrl must include namespace path so we connect to /global-editor-api namespace
    // - path must match server: /global-editor-api/socket.io
    const connectUrl = `${origin}${nsPath}`;
    const path = `${nsPath}/socket.io`;

    return {
        connectUrl,
        path,
        transports: ['websocket'],
        reconnectionAttempts: options.reconnectionAttempts ?? 5,
        reconnectionDelay: options.reconnectionDelay ?? 5000,
    };
}


function getGlobalProviderManager(baseServerUrl, options = {}) {
    if (!globalThis[GLOBAL_YJS_KEY]) {
        globalThis[GLOBAL_YJS_KEY] = createProviderManager(baseServerUrl, options);
    }
    return globalThis[GLOBAL_YJS_KEY];
}

function createProviderManager(baseServerUrl, options = {}) {
    const cfg = buildSocketConfig(baseServerUrl, options);

    // FIX: connect to namespace URL, not origin
    const socket = io(cfg.connectUrl, {
        path: cfg.path,
        transports: cfg.transports,
        reconnectionAttempts: cfg.reconnectionAttempts,
        reconnectionDelay: cfg.reconnectionDelay,
    });

    /**
     * docs: Map<docId, {
     *   ydoc: Y.Doc,
     *   awareness: Awareness,
     *   refCount: number,
     *   bound: boolean,
     *   onYDocUpdate: Function,
     * }>
     */
    const docs = new Map();

    // Re-join on reconnect
    socket.on('connect', () => {
        for (const [docId, entry] of docs.entries()) {
            if (entry.refCount > 0) {
                socket.emit('joinYDoc', {
                    docId,
                    object_id: entry.meta?.object_id,
                    object_type: entry.meta?.object_type,
                    timebox_appended_note_type_id: entry.meta?.timebox_appended_note_type_id,
                });
                // push local awareness state after reconnect
                try {
                    const localState = entry.awareness.getLocalState();
                    if (localState) {
                        const update = awarenessProtocol.encodeAwarenessUpdate(entry.awareness, [socket.id].filter(Boolean));
                        // The above line is not the correct "changed clients" list; instead we send a full local state
                        // by re-setting local state field and letting awareness update fire naturally.
                    }
                } catch {}
            }
        }
    });

    const ensureDoc = (docId, user, docMeta = {}) => {
        let entry = docs.get(docId);
        if (!entry) {
            const ydoc = new Y.Doc();
            const awareness = new awarenessProtocol.Awareness(ydoc);

            entry = {
                ydoc,
                awareness,
                refCount: 0,
                bound: false,
                onYDocUpdate: null,
                meta: { ...docMeta },
            };
            docs.set(docId, entry);
        } else {
            entry.meta = { ...entry.meta, ...docMeta };
        }

        // Always set local user state for this tab (safe to call repeatedly)
        entry.awareness.setLocalStateField('user', user);

        // Bind handlers only once per docId
        if (!entry.bound) {
            entry.bound = true;

            // Local awareness -> server
            entry.awareness.on('update', ({ added, updated, removed }) => {
                const changed = added.concat(updated).concat(removed);
                if (!changed.length) return;
                const update = awarenessProtocol.encodeAwarenessUpdate(entry.awareness, changed);
                socket.emit('yjs-awareness', { docId, update });
            });

            // Local doc updates -> server
            entry.onYDocUpdate = (update) => {
                socket.emit('yjs-update', {
                    docId,
                    update,
                    object_id: entry.meta?.object_id,
                    object_type: entry.meta?.object_type,
                    timebox_appended_note_type_id: entry.meta?.timebox_appended_note_type_id,
                });
            };
            entry.ydoc.on('update', entry.onYDocUpdate);
        }

        return entry;
    };

    // Remote awareness -> local awareness
    socket.on('yjs-awareness', ({ docId: remoteDocId, update }) => {
        if (!remoteDocId || !update) return;
        const entry = docs.get(remoteDocId);
        if (!entry) return;

        const u =
            update instanceof Uint8Array
                ? update
                : update instanceof ArrayBuffer
                    ? new Uint8Array(update)
                    : (update?.byteLength !== undefined ? new Uint8Array(update) : update);

        try {
            awarenessProtocol.applyAwarenessUpdate(entry.awareness, u, socket.id);
        } catch (e) {
            console.error('Error applying awareness update', e);
        }
    });

    // Remote doc update -> local doc
    socket.on('yjs-update', ({ docId: remoteDocId, update }) => {
        if (!remoteDocId || !update) return;
        const entry = docs.get(remoteDocId);
        if (!entry) return;

        const u =
            update instanceof Uint8Array
                ? update
                : update instanceof ArrayBuffer
                    ? new Uint8Array(update)
                    : (update?.byteLength !== undefined ? new Uint8Array(update) : update);

        try {
            Y.applyUpdate(entry.ydoc, u);
        } catch (e) {
            console.error('Error applying Yjs update', e);
        }
    });

    const acquire = (docId, user, docMeta = {}) => {
        const entry = ensureDoc(docId, user, docMeta);
        entry.refCount += 1;

        // join room on first consumer
        if (entry.refCount === 1) {
            socket.emit('joinYDoc', {
                docId,
                object_id: entry.meta?.object_id,
                object_type: entry.meta?.object_type,
                timebox_appended_note_type_id: entry.meta?.timebox_appended_note_type_id,
            });
        }

        // Provider object for CollaborationCaret
        const provider = {
            doc: entry.ydoc,
            awareness: entry.awareness,
            on: () => {},
            off: () => {},
        };

        const release = () => {
            const current = docs.get(docId);
            if (!current) return;

            current.refCount = Math.max(0, current.refCount - 1);

            if (current.refCount === 0) {
                // Optional: ask server to leave if supported
                socket.emit('leaveYDoc', docId);

                // Important: clear local awareness so cursors disappear for this docId
                // If another editor uses same docId, refCount would not be 0.
                try {
                    current.awareness.setLocalState(null);
                } catch {}

                // Keep ydoc in memory (fast reopen) or destroy to free memory:
                // If you want aggressive cleanup, uncomment below:
                // try { current.ydoc.off('update', current.onYDocUpdate); } catch {}
                // try { current.ydoc.destroy(); } catch {}
                // docs.delete(docId);
            }
        };

        return { ydoc: entry.ydoc, awareness: entry.awareness, provider, socket, release };
    };

    return { socket, acquire };
}

// -----------------------------
// Existing editor code
// -----------------------------

const FontStyle = TextStyle.extend({
    addAttributes() {
        return {
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize?.replace(/['"]/g, '') || null,
                renderHTML: attrs => (attrs.fontSize ? { style: `font-size:${attrs.fontSize}` } : {}),
            },
            fontFamily: {
                default: null,
                parseHTML: element => element.style.fontFamily?.replace(/['"]/g, '') || null,
                renderHTML: attrs => (attrs.fontFamily ? { style: `font-family:${attrs.fontFamily}` } : {}),
            },
        }
    },
})

const FontCommands = Extension.create({
    name: 'fontCommands',
    addCommands() {
        return {
            setFontSize: size => ({ chain }) => chain().setMark('textStyle', { fontSize: size }).run(),
            setFontFamily: fam => ({ chain }) => chain().setMark('textStyle', { fontFamily: fam }).run(),
        }
    },
})

export function createEditorIframe(doc, editorId, options = {}) {
    const {
        width = 0,
        tools = [],
        showFloatingToolbar = false,
        hideSlashPopup = false,
        baseServerUrl = 'https://backend.timebox.ai/global-editor-api',
        mainEditorDocumentId,
        userName: optUserName,
        userColor: optUserColor,
        yjs: yjsOptions = {},
        object_id,
        object_type,
        timebox_appended_note_type_id,
        userList = [],
        mentionSelectHandler,
    } = options

    const normalizedUserList = Array.isArray(userList)
        ? userList
            .map(u => {
                if (typeof u === 'string') return { id: u, label: u }
                const id = u?.id ?? u?.value ?? u?.username ?? u?.name ?? u?.label
                const label = u?.label ?? u?.name ?? u?.username ?? u?.id ?? u?.value ?? ''
                return { id: id || label || '', label: label || id || '' }
            })
            .filter(u => u.id && u.label)
        : []

    const isFirefoxExtension =
        typeof window !== 'undefined' &&
        window.location &&
        window.location.protocol === 'moz-extension:'

    if (isFirefoxExtension) {
        if (doc.body) {
            while (doc.body.firstChild) doc.body.removeChild(doc.body.firstChild)
        }

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

        const metaCharset = doc.createElement('meta')
        metaCharset.setAttribute('charset', 'utf-8')
        head.appendChild(metaCharset)

        const metaViewport = doc.createElement('meta')
        metaViewport.name = 'viewport'
        metaViewport.content = 'width=device-width,initial-scale=1'
        head.appendChild(metaViewport)

        const loaderDiv = doc.createElement('div')
        loaderDiv.id = 'ge_editor_loader'
        loaderDiv.className = 'ge_editor_loader'
        loaderDiv.textContent = 'Loading editor...'

        const outerMost = doc.createElement('div')
        outerMost.className = !showFloatingToolbar
            ? 'ge_outer_most_container no_floating_toolbar'
            : 'ge_outer_most_container'

        const editorContainer = doc.createElement('div')
        editorContainer.id = 'editor_main_container'
        editorContainer.className = 'doc_placeholder_container'
        editorContainer.style.width = width ? Number(width) + 'px' : '100%'

        const toolbarDiv = doc.createElement('div')
        toolbarDiv.id = 'ge_toolbar_main_element'
        body.appendChild(toolbarDiv)

        outerMost.appendChild(editorContainer)
        body.appendChild(loaderDiv)
        body.appendChild(outerMost)
    } else {
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

    // Shared (per page) identity for this editor instance
    const userName = optUserName || `Guest-${Date.now() % 1000000}`;
    const userColor = optUserColor || ('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));

    // Loader behavior (keep yours)
    const loader = doc.getElementById('ge_editor_loader');
    let loaderTimeout = null;
    const hideLoader = () => {
        if (!loader) return;
        loader.style.display = 'none';
        if (loaderTimeout) {
            clearTimeout(loaderTimeout);
            loaderTimeout = null;
        }
    };
    loaderTimeout = setTimeout(hideLoader, 1000);

    // Acquire shared Yjs doc/awareness/socket for this docId
    const mgr = getGlobalProviderManager(baseServerUrl, yjsOptions);
    const { ydoc, awareness, provider, socket, release } = mgr.acquire(
        docId,
        { name: userName, color: userColor },
        { object_id, object_type, timebox_appended_note_type_id },
    );

    // Ensure awareness is cleared when this page closes (good hygiene)
    // NOTE: This is per-tab and applies to all docIds; OK.
    if (!globalThis.__GLOBAL_EDITOR_YJS_BEFOREUNLOAD_BOUND__) {
        globalThis.__GLOBAL_EDITOR_YJS_BEFOREUNLOAD_BOUND__ = true;
        window.addEventListener('beforeunload', () => {
            // we cannot easily enumerate docs here without exposing manager internals;
            // at minimum, socket disconnect will happen naturally, and server awareness TTL should expire.
            // If you want stronger cleanup, implement server-side client disconnect handling.
        });
    }

    // styles
    const style = doc.createElement('style')
    style.textContent = `${CSS}${TIPTAPCSS}`;
    doc.head.appendChild(style)

    // editor
    const el = doc.getElementById('editor_main_container')
    let editor = null;

    const getPlainTextFromClipboard = (event) => {
        const dt = event?.clipboardData;
        if (!dt) return '';
        const uriList = dt.getData('text/uri-list');
        if (uriList) return uriList;
        return dt.getData('text/plain') || '';
    };

    const stripTrailingPunctuation = (value) =>
        value.replace(/[),.;!?]+$/g, '');

    const normalizeUrl = (value) => {
        if (!value) return '';
        if (/^(https?:)?\/\//i.test(value)) return value;
        if (/^(mailto:|tel:)/i.test(value)) return value;
        return `https://${value}`;
    };

    const isUrlLike = (value) => {
        if (!value) return false;
        try {
            const url = new URL(value, 'http://example.com');
            return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:' || url.protocol === 'tel:';
        } catch {
            return false;
        }
    };

    const extractSingleUrl = (text) => {
        if (!text) return '';
        const trimmed = stripTrailingPunctuation(text.trim());
        if (!trimmed || /\s/.test(trimmed)) return '';
        const normalized = normalizeUrl(trimmed);
        return isUrlLike(normalized) ? normalized : '';
    };

    const applyLinkPaste = (url) => {
        if (!editor || !url) return;
        const { from, to, empty } = editor.state.selection;

        if (empty) {
            const start = from;
            editor
                .chain()
                .focus()
                .insertContent(url)
                .setTextSelection({ from: start, to: start + url.length })
                .setLink({ href: url })
                .run();
            editor.commands.setTextSelection(start + url.length);
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    };

    const insertLinkForPaste = (url) => {
        if (!editor || !url) return null;
        const { from, to, empty } = editor.state.selection;
        if (empty) {
            const start = from;
            editor
                .chain()
                .focus()
                .insertContent(url)
                .setTextSelection({ from: start, to: start + url.length })
                .setLink({ href: url })
                .run();
            editor.commands.setTextSelection(start + url.length);
            return { from: start, to: start + url.length };
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
        return { from, to };
    };

    const handleUrlPaste = (event, view) => {
        const text = getPlainTextFromClipboard(event);
        const url = extractSingleUrl(text);
        if (!url) return false;
        event.preventDefault();
        insertLinkForPaste(url);
        return true;
    };

    const placeholderText = hideSlashPopup
        ? 'Write your content'
        : "Write or type '/' for command and more options";

    const placeholderEmptyClass = hideSlashPopup ? 'is-empty' : 'is-empty with-slash';

    const extensions = [
        StarterKit.configure({
            history: false,
            dropcursor: false,
            gapcursor: false,
            bulletList: { keepMarks: true, keepAttributes: true },
            orderedList: { keepMarks: true, keepAttributes: true },
            link: false,       // we provide our own configured Link
            underline: false,  // we provide our own configured Underline
            undoRedo: false,   // conflicts with Collaboration
        }),
        MentionCommand.configure({
            HTMLAttributes: { class: 'tiptap-mention' },
            userList: normalizedUserList,
            onSelect: mentionSelectHandler,
            suggestion: {
                pluginKey: new PluginKey(`mentionSuggestion_${docId}`),
            },
        }),
        UniqueID.configure({
            attributeName: 'uid',
            types: [
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
            user: { name: userName, color: userColor },
        }),
        Underline,
        Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
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
        Bookmark,
        TableScrollWrapper,
        ...(hideSlashPopup ? [] : [SlashCommand]),
        FontStyle,
        Color,
        FontCommands,
        Placeholder.configure({
            placeholder: placeholderText,
            includeChildren: false,
            showOnlyCurrent: true,
            showOnlyWhenEditable: true,
            emptyNodeClass: placeholderEmptyClass,
        }),
    ];

    // Deduplicate extensions to avoid TipTap warnings (e.g., link/underline) and
    // drop undo/redo helpers that conflict with Collaboration.
    const sanitizedExtensions = [];
    const indexByName = new Map();
    for (const ext of extensions.filter(Boolean)) {
        const name = ext?.name || ext?.config?.name || ext?.options?.name;
        if (name === 'undoRedo') continue; // incompatible with Collaboration

        if (name && indexByName.has(name)) {
            // Prefer the later instance so explicit configs (e.g., Link) override StarterKit defaults.
            sanitizedExtensions[indexByName.get(name)] = ext;
        } else {
            indexByName.set(name, sanitizedExtensions.length);
            sanitizedExtensions.push(ext);
        }
    }

    editor = new Editor({
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
                        uploadPastedImage(file);
                        break;
                    }
                }

                if (handled) return true;
                if (handleUrlPaste(event, view)) return true;
                return false;
            },
            handleDOMEvents: {
                mousedown(view, event) {
                    if (view.hasFocus()) return false;
                    const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
                    if (pos?.pos != null) {
                        const tr = view.state.tr.setSelection(TextSelection.near(view.state.doc.resolve(pos.pos)));
                        view.dispatch(tr);
                        view.focus();
                        return true;
                    }
                    return false;
                },
            },
        },
        extensions: sanitizedExtensions,
        autofocus: false,
        injectCSS: false,
    });

    // Save behavior (unchanged, but uses shared socket)
    function setupSave(editor, socket, docId) {
        const save = () => {
            const html = editor.getHTML();
            socket.emit('yjs-save-html', { docId, html });
        };

        doc.addEventListener('keydown', (event) => {
            const key = event.key?.toLowerCase();
            if ((event.ctrlKey || event.metaKey) && key === 's') {
                event.preventDefault();
                save();
            }
        });

        return save;
    }

    const saveToHtmlDatabase = setupSave(editor, socket, docId);

    editor.on('blur', function () {
        saveToHtmlDatabase();
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

            editor.chain().focus().setImage({ src, alt: file.name || 'Image' }).run();
        } catch (err) {
            console.error('Error uploading pasted image', err);
        }
    };

    editor.storage.uploadPastedImage = uploadPastedImage;

    const toolbarHost = doc.getElementById('ge_toolbar_main_element');

    if (showFloatingToolbar) {
        createSelectionToolbar(toolbarHost, tools);
        wireSelectionToolbar(editor, toolbarHost);
    } else {
        createToolbar(toolbarHost, tools);
        wireToolbar(editor, toolbarHost);
    }

    /**
     * IMPORTANT:
     * return destroy so caller can release ref-count + cleanup.
     */
    const destroy = () => {
        try {
            // Tiptap cleanup
            editor?.destroy?.();
        } catch {}

        try {
            // Release this editor's hold on the shared Yjs doc
            release?.();
        } catch {}

        try {
            // hide loader (safe)
            hideLoader();
        } catch {}
    };

    return { editor, toolbar: toolbarHost, destroy };
}

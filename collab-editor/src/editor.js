import { createEditorIframe } from './iframeEditor.js'

export const baseServerUrl = `https://backend.timebox.ai/global-editor-api`;
export let userInfo = null
export let mainEditorDocumentId = null

export class TextEditor {
    constructor(iframeId, editorId, documentId, options = {}) {
        try {
            this.iframe = document.getElementById(iframeId)
            this.editor = null
            this.toolbar = null
            if (!this.iframe) throw new Error(`Element with ID ${iframeId} not found.`)
            this.iframe.style.border = 'unset'

            this.iframeDocument = this.iframe?.contentDocument || this.iframe?.contentWindow.document
            this.iframeDocumentWidth = 0
            mainEditorDocumentId = documentId || null

            if (this.iframeDocument) {
                const { editor, toolbar,save  } = createEditorIframe(this.iframeDocument, editorId, {
                    ...options,
                    baseServerUrl,
                    mainEditorDocumentId: documentId,
                });
                this.editor = editor;
                this.toolbar = toolbar;
                this.options = options || {};
                if (this.options.makeEditorReadOnly) {
                    this.applyReadOnlyMode();
                }
                editor.on('blur', () => {
                    save();
                });
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    applyReadOnlyMode() {
        try {
            this.editor?.setEditable?.(false);
            if (this.editor?.options) this.editor.options.editable = false;

            if (this.toolbar?.remove) this.toolbar.remove();
            this.toolbar = null;

            const doc = this.iframeDocument;
            if (!doc) return;

            const host = doc.querySelector('.ge_outer_most_container') || doc.body;

            let overlay = doc.getElementById('ql-global-readonly-overlay');
            if (!overlay) {
                overlay = doc.createElement('div');
                overlay.id = 'ql-global-readonly-overlay';
                host.appendChild(overlay);

                // Block interactions but DO NOT block scrolling:
                const block = (e) => {
                    if (e.type === 'wheel' || e.type.startsWith('touch')) return; // let scrolling through
                    e.stopImmediatePropagation();
                    e.preventDefault();
                };

                [
                    'mousedown','mouseup','click','dblclick','contextmenu',
                    'pointerdown','pointerup','pointercancel','dragstart',
                    'keydown','keyup','keypress'
                ].forEach(type => {
                    overlay.addEventListener(type, block, { capture: true, passive: false });
                });
            }
        } catch (e) {
            console.error('applyReadOnlyMode error:', e);
        }
    }



    appendNonFormattedContentToEditor(data) {
        const doc = this.iframeDocument;
        const editor = this.editor;
        if (!doc || !editor) return;

        const insertSilently = (html) => {
            // remember whether editor had focus
            const hadFocus = editor.view.hasFocus();

            // append at end without moving selection or focusing editor
            const pos = editor.state.doc.content.size; // end of document
            editor.commands.insertContentAt(pos, html, { updateSelection: false });

            // if editor didn’t have focus before, keep it that way
            if (!hadFocus) {
                // avoid accidental focus flicker
                try { editor.view.dom.blur?.(); } catch {}
            }
        };

        function pastePlaneTextString(doc, _unusedTarget, wrappedHtml) {
            if (!wrappedHtml || !this?.editor) return;

            const parser = new DOMParser();
            const parsed = parser.parseFromString(String(wrappedHtml), 'text/html');
            const root   = parsed.body || parsed.documentElement;

            const looksPlain = root && !root.querySelector('*') && (root.textContent || '').trim().length > 0;
            if (looksPlain) {
                const text = root.textContent || '';
                const blocks = text
                    .split(/\n{2,}/)
                    .map(b => `<p>${b.trim().replace(/\n/g, '<br>')}</p>`)
                    .join('');
                insertSilently(blocks);
                return;
            }

            // --- sanitize minimal HTML whitelist ---
            const ALLOWED_TAGS = new Set(['P','BR','A','STRONG','EM','U','S','H1','H2','H3','H4','H5','H6','UL','OL','LI','BLOCKQUOTE','PRE','CODE','IMG','VIDEO','AUDIO','SOURCE']);
            const ALLOWED_ATTRS = {
                'A': new Set(['href','target','rel']),
                'IMG': new Set(['src','alt','title']),
                'VIDEO': new Set(['controls','preload','poster']),
                'AUDIO': new Set(['controls','preload']),
                'SOURCE': new Set(['src','type'])
            };
            const isSafeUrl = (url) => {
                try { const u = new URL(url, 'http://x'); return ['http:','https:','mailto:','tel:','data:'].includes(u.protocol); }
                catch { return /^([/#.]|[^:]+$)/.test(url); }
            };
            const sanitizeNode = (node) => {
                if (node.nodeType === Node.COMMENT_NODE) { node.remove(); return; }
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const tag = node.tagName;
                    [...node.attributes].forEach(a => {
                        const n = a.name.toLowerCase();
                        if (n.startsWith('on') || n === 'style' || n === 'class') node.removeAttribute(a.name);
                    });
                    if (!ALLOWED_TAGS.has(tag)) {
                        const p = node.parentNode; if (p) { while (node.firstChild) p.insertBefore(node.firstChild, node); p.removeChild(node); }
                        return;
                    }
                    const allowed = ALLOWED_ATTRS[tag] || new Set();
                    [...node.attributes].forEach(a => { if (!allowed.has(a.name)) node.removeAttribute(a.name); });
                    if (tag === 'A') {
                        const href = node.getAttribute('href');
                        if (!href || !isSafeUrl(href)) node.removeAttribute('href');
                        else {
                            if (!node.getAttribute('target')) node.setAttribute('target','_blank');
                            node.setAttribute('rel','noopener noreferrer');
                        }
                    }
                }
                for (let c = node.firstChild, n; c; c = n) { n = c.nextSibling; sanitizeNode(c); }
            };

            const working = root.cloneNode(true);
            sanitizeNode(working);
            const container = working.querySelector('body') || working;
            const sanitizedHTML = container.innerHTML.trim();
            if (!sanitizedHTML) return;

            insertSilently(sanitizedHTML);
        }

        const tmp = doc.createElement('div');
        tmp.innerHTML = data.item;
        const inner = tmp.firstElementChild?.innerHTML || tmp.innerHTML;
        const wrapped = `<html><body>${inner}</body></html>`;
        pastePlaneTextString.call(this, this.iframeDocument, null, wrapped);
    }



    onBlur(callback) {
        try {
            if (typeof callback !== 'function') throw new Error('Callback must be a function.')
            // Tip: you can hook Tiptap blur via editor.on('blur', ...)
            this.editor?.on?.('blur', callback)
        } catch (error) {
            console.error('Error in onBlur:', error.message)
        }
    }

    getContent(format = 'text') {
        if (!this.editor) return ''
        if (format?.toLowerCase() === 'html') return this.editor.getHTML()
        return this.editor.getText()
    }

    setContent(content = {}) {
        this.editor?.commands?.setContent?.(content,true)
    }

    updateWidthOfWindow(width) {
        // optional — using CSS width in iframe creator
        this.editorWidth = width
        this.iframeDocumentWidth = this.iframeDocument.body.clientWidth
        this.iframeDocument.body.style.setProperty('--editor-inner-width', this.editorWidth + 'px')
        this.iframeDocument.body.style.setProperty('--editor-outer-width', this.iframeDocumentWidth + 'px')
    }


    focusEditor() {
        this.editor.chain().focus('end').run();
        // optional: ensure the editor is visible
        this.editor.view.dom.scrollIntoView({block:'nearest'});
    }

    static create(iframeId, editorId, documentId, options) {
        try {
            return new TextEditor(iframeId, editorId, documentId, options)
        } catch (error) {
            console.error('Error in TextEditor.create:', error.message)
        }
    }
}

globalThis.GlobalTextEditorLib = TextEditor;
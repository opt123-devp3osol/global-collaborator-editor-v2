import { createEditorIframe } from './iframeEditor.js'

export const baseServerUrl = `https://backend.timebox.ai/global-editor-api`
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
                const {editor,toolbar} = createEditorIframe(this.iframeDocument, editorId, options);
                this.editor = editor;
                this.toolbar = toolbar;
            }
        } catch (error) {
            console.error(error.message)
        }
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

    setContent(content = '') {
        this.editor?.commands?.setContent?.(content, false)
    }

    updateWidthOfWindow(width) {
        // optional — using CSS width in iframe creator
        this.editorWidth = width
        this.iframeDocumentWidth = this.iframeDocument.body.clientWidth
        this.iframeDocument.body.style.setProperty('--editor-inner-width', this.editorWidth + 'px')
        this.iframeDocument.body.style.setProperty('--editor-outer-width', this.iframeDocumentWidth + 'px')
    }

    static create(iframeId, editorId, documentId, options) {
        try {
            return new TextEditor(iframeId, editorId, documentId, options)
        } catch (error) {
            console.error('Error in TextEditor.create:', error.message)
        }
    }
}

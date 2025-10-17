import { Node, mergeAttributes } from '@tiptap/core'
import { NodeSelection } from 'prosemirror-state'
import {mountImageToolbar} from "./ImageToolbarAddon.js";

export const ResizableImage = Node.create({
    name: 'image',
    group: 'block',
    atom: true,
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: null },
            title: { default: null },
            width: { default: null }, // px number
            align: { default: 'left' },
        }
    },

    parseHTML() {
        return [
            { tag: 'div.node-image' },
            { tag: 'img[src]' }, // allow pasted <img>
        ]
    },

    // SSR-only; runtime uses nodeView
    renderHTML({ HTMLAttributes }) {
        const { width, ...rest } = HTMLAttributes
        return [
            'div',
            { class: 'node-image', contenteditable: 'false', draggable: 'true' },
            ['div', { class: 'tiptap-image', 'data-node-view-wrapper': '', 'data-width': width ?? undefined, style: 'white-space: normal;' },
                ['div', { class: 'tiptap-image-container', style: width ? `width: ${width}px;` : undefined },
                    ['div', { class: 'tiptap-image-content' },
                        ['img', mergeAttributes({ class: 'tiptap-image-img', draggable: 'false' }, rest)],
                    ],
                ],
            ],
        ]
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {


            // --- DOM skeleton (exact structure you want)
            const outer = document.createElement('div')
            outer.className = 'node-image'
            outer.setAttribute('contenteditable', 'false')
            outer.setAttribute('draggable', 'true')

            const wrap = document.createElement('div')
            wrap.className = 'tiptap-image'
            wrap.dataset.nodeViewWrapper = ''
            wrap.style.whiteSpace = 'normal'
            if (node.attrs.width) wrap.dataset.width = String(node.attrs.width)

            const container = document.createElement('div')
            container.className = 'tiptap-image-container'
            if (node.attrs.width) container.style.width = `${node.attrs.width}px`

            const content = document.createElement('div')
            content.className = 'tiptap-image-content' // must be position:relative in CSS

            const img = document.createElement('img')
            img.className = 'tiptap-image-img'
            img.setAttribute('draggable', 'false')
            img.src = node.attrs.src ?? ''
            if (node.attrs.alt) img.alt = node.attrs.alt
            if (node.attrs.title) img.title = node.attrs.title

            content.appendChild(img)
            container.appendChild(content)
            wrap.appendChild(container)
            outer.appendChild(wrap)


            const toolbarApi = mountImageToolbar({
                editor,
                node,
                getPos,
                wrapperEl: outer,  // your block wrapper
                imgEl: img,        // your <img>
                // body: iframeBody, // optional: pass if you already keep a reference
            })

            // ---- Handles
            let leftHandle = null
            let rightHandle = null
            let hovering = false

            const ensureHandles = () => {
                if (!rightHandle) {
                    rightHandle = document.createElement('div')
                    rightHandle.className = 'tiptap-image-handle tiptap-image-handle-right'
                    content.appendChild(rightHandle)
                    rightHandle.addEventListener('mousedown', onDownRight)
                    rightHandle.addEventListener('dragstart', e => e.preventDefault())
                }
                if (!leftHandle) {
                    leftHandle = document.createElement('div')
                    leftHandle.className = 'tiptap-image-handle tiptap-image-handle-left'
                    content.appendChild(leftHandle)
                    leftHandle.addEventListener('mousedown', onDownLeft)
                    leftHandle.addEventListener('dragstart', e => e.preventDefault())
                }
            }

            const removeHandles = () => {
                if (resizing) return
                if (rightHandle && rightHandle.parentNode) rightHandle.parentNode.removeChild(rightHandle)
                if (leftHandle && leftHandle.parentNode) leftHandle.parentNode.removeChild(leftHandle)
                rightHandle = null
                leftHandle = null
            }

            // Show handles only while hovering actual image area
            content.addEventListener('mouseenter', () => {
                hovering = true
                ensureHandles()
            })
            content.addEventListener('mouseleave', () => {
                hovering = false
                removeHandles()
            })

            // ---- Resizing (pointer events with capture)
            let resizing = false
            let startX = 0
            let startW = 0
            let activeSide = 'right'
            let prevDraggableAttr = 'true'

            const onMove = (e) => {
                if (!resizing) return
                const delta = e.clientX - startX
                const next = activeSide === 'right' ? startW + delta : startW - delta
                const clamped = Math.max(40, Math.round(next))
                container.style.width = `${clamped}px`
            }

            const commitWidth = () => {
                const pos = typeof getPos === 'function' ? getPos() : null
                if (pos == null) return
                const width = parseInt(container.style.width || String(startW), 10)
                // Only dispatch if width changed
                if (!Number.isNaN(width) && width !== Math.round(startW)) {
                    editor.chain().focus().command(({ tr }) => {
                        tr.setNodeMarkup(pos, undefined, { ...node.attrs, width })
                        return true
                    }).run()
                }
            }

            const onUp = (e) => {
                if (!resizing) return
                resizing = false
                // release capture (safe even if not captured)
                try { e.target.releasePointerCapture(e.pointerId) } catch (_) {}
                e.target.closest('body').removeEventListener('mousemove', onMove, true)
                e.target.closest('body').removeEventListener('mouseup', onUp, true)
                // restore draggable
                if (prevDraggableAttr != null) outer.setAttribute('draggable', prevDraggableAttr)
                commitWidth()
                // if cursor already left the content while resizing, clear handles now
                if (!hovering) removeHandles()
            }

            const beginResize = ({side, e}) => {
                e.preventDefault()
                e.stopPropagation()
                ensureHandles()
                resizing = true
                activeSide = side
                startX = e.clientX
                startW = container.getBoundingClientRect().width
                // disable node dragging while resizing
                prevDraggableAttr = outer.getAttribute('draggable') ?? 'true'
                outer.setAttribute('draggable', 'false')
                // capture pointer so we keep getting move events
                try { e.target.setPointerCapture(e.pointerId) } catch (_) {}
                e.target.closest('body').addEventListener('mousemove', onMove, true)
                e.target.closest('body').addEventListener('mouseup', onUp, true)
            }

            const onDownLeft  = (e) => beginResize({side: 'left', e: e})
            const onDownRight = (e) => beginResize({side: 'right', e: e})

            // Prevent native drag starting from image while resizing
            img.addEventListener('dragstart', (e) => {
                if (resizing) e.preventDefault()
            })

            // --- Selection (adds/removes ProseMirror-selectednode automatically)
            outer.addEventListener('mousedown', (e) => {
                if (e.target instanceof HTMLElement && e.target.classList.contains('tiptap-image-handle')) return
                const pos = typeof getPos === 'function' ? getPos() : null
                if (pos != null) {
                    const tr = editor.state.tr.setSelection(NodeSelection.create(editor.state.doc, pos))
                    editor.view.dispatch(tr)
                    editor.view.focus()
                }
            })

            return {
                dom: outer,
                contentDOM: null,
                selectNode() {
                    outer.classList.add('ProseMirror-selectednode')
                    toolbarApi?.show();
                    ensureHandles()
                },
                deselectNode() {
                    outer.classList.remove('ProseMirror-selectednode')
                    toolbarApi?.hide()
                    removeHandles()
                },
                stopEvent: (e) => {
                    // Stop PM when resizing or when interacting with the handles
                    if (resizing) return true
                    return e.target instanceof HTMLElement &&
                        e.target.classList.contains('tiptap-image-handle')
                },
                ignoreMutation: () => true,
                update: (updatedNode) => {
                    if (updatedNode.type !== node.type) return false
                    if (updatedNode.attrs.width) {
                        container.style.width = `${updatedNode.attrs.width}px`
                        wrap.dataset.width = String(updatedNode.attrs.width)
                    } else {
                        container.style.width = ''
                        delete wrap.dataset.width
                    }
                    if (updatedNode.attrs.src !== node.attrs.src) img.src = updatedNode.attrs.src || ''

                    toolbarApi?.update(updatedNode)
                    return true
                },
                destroy() {
                    toolbarApi?.destroy()
                    outer.closest('body').removeEventListener('mousemove', onMove, true)
                    outer.closest('body').removeEventListener('mouseup', onUp, true)
                },
            }
        }
    },
})

import { Plugin, PluginKey, NodeSelection } from 'prosemirror-state'

export const dragHandleExactKey = new PluginKey('drag_handle_exact_html')

export default function DragHandle(openSlashFn, { gutterLeft = 0, gutterTop = 0 } = {}) {
    let view = null
    let container = null
    let handle = null
    let dotsBtn = null
    let currentBlock = null
    let currentPos = null
    let lastSelectedDom = null
    let isDragging = false
    let mouseDownTimeout = null

    // ---- DOM ----
    const buildDom = (ownerDoc) => {
        const d = ownerDoc

        const outer = d.createElement('div')
        outer.setAttribute(
            'style',
            'pointer-events:none;position:absolute;top:0;left:0;z-index:999999;'
        )

        const drag = d.createElement('div')
        drag.className = 'drag-handle'
        drag.setAttribute('draggable', 'true')
        drag.setAttribute(
            'style',
            'position:absolute;pointer-events:auto;left:0;top:0;cursor:grab;opacity:0;transition:opacity 0.2s;'
        )
        drag.setAttribute('aria-label', 'Drag block')

        const group = d.createElement('div')
        group.className = 'tiptap-button-group'
        group.setAttribute('data-orientation', 'horizontal')
        group.setAttribute('role', 'group')

        // menu/drag dots (also draggable)
        const dots = d.createElement('button')
        dots.className = 'tiptap-button tiptap-menu-button'
        dots.type = 'button'
        dots.setAttribute('data-style', 'ghost')
        dots.setAttribute('tabindex', '-1')
        dots.setAttribute('data-weight', 'small')
        dots.setAttribute('style', 'cursor:grab;')
        dots.setAttribute('draggable', 'true')
        dots.setAttribute('aria-label', 'Drag block menu')
        dots.innerHTML = `
        <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="5" r="2"></circle><circle cx="9" cy="12" r="2"></circle><circle cx="9" cy="19" r="2"></circle>
          <circle cx="15" cy="5" r="2"></circle><circle cx="15" cy="12" r="2"></circle><circle cx="15" cy="19" r="2"></circle>
        </svg>`.trim()

        group.appendChild(dots)
        drag.appendChild(group)
        outer.appendChild(drag)

        return { outer, drag, dots }
    }

    const attachDom = () => {
        const ownerDoc = view.dom.ownerDocument
        const body = ownerDoc.body
        const { outer, drag, dots } = buildDom(ownerDoc)
        container = outer
        handle = drag
        dotsBtn = dots
        body.appendChild(container)

        // ---- Selection helpers ----
        const markSelectedNode = (pos) => {
            if (lastSelectedDom && lastSelectedDom.classList) {
                lastSelectedDom.classList.remove('ProseMirror-selectednode')
            }
            const dom = view.nodeDOM(pos)
            if (dom && dom.classList) {
                dom.classList.add('ProseMirror-selectednode')
                lastSelectedDom = dom
            } else {
                lastSelectedDom = null
            }
        }

        const setNodeSelection = () => {
            if (!view || currentPos == null) return null
            const { state, dispatch } = view
            const nodeSel = NodeSelection.create(state.doc, currentPos)
            dispatch(state.tr.setSelection(nodeSel))
            markSelectedNode(currentPos)
            return nodeSel
        }

        // ---- Drag handlers ----
        const onMouseDown = (e) => {
            // Compute if missing (don't bail early)
            if (!view) return
            if (currentPos == null) {
                const ok = ensureCurrentFromSelectionOrPointer(e.clientX, e.clientY)
                if (!ok) return
            }

            view.focus()

            // Set selection immediately (so keyboard ops work pre-drag)
            setNodeSelection()

            if (mouseDownTimeout) {
                clearTimeout(mouseDownTimeout)
                mouseDownTimeout = null
            }
        }

        const onDragStart = (e) => {
            if (!view) return

            // Make sure we know which block the handle belongs to
            if (currentPos == null || !currentBlock) {
                const ok = ensureCurrentFromSelectionOrPointer(e.clientX, e.clientY)
                if (!ok) return
            }

            const sel = setNodeSelection()
            if (!sel) return

            isDragging = true

            // 🔥 hide the handle UI while dragging
            if (handle) {
                handle.style.opacity = '0'
                handle.style.pointerEvents = 'none'
            }

            const { state } = view
            const slice = sel.content()

            // Tell ProseMirror what we're dragging (move, not copy)
            view.dragging = { slice, move: true }

            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.setData('application/x-prosemirror-drag', 'block')
                e.dataTransfer.setData(
                    'text/plain',
                    state.doc.textBetween(sel.from, sel.to, '\n')
                )

                // Use the whole block as drag preview (not the small handle)
                const blockDom = currentBlock || view.nodeDOM(sel.from)
                if (blockDom instanceof HTMLElement) {
                    const rect = blockDom.getBoundingClientRect()
                    e.dataTransfer.setDragImage(blockDom, rect.width / 2, 10)
                }
            }
        }

        const onDragEnd = () => {
                isDragging = false
                if (view) {
                    view.dragging = null
                }
                // show handle again
                if (handle) {
                    handle.style.opacity = '1'
                    handle.style.pointerEvents = 'auto'
                }
                // re-position on its new block
                if (currentBlock) {
                    updatePosition(currentBlock)
                }
            }

            // Bind to both draggable elements (outer handle + dots)
        ;[handle, dots].forEach((el) => {
            el.addEventListener('mousedown', onMouseDown)
            // el.addEventListener('dragstart', onDragStart)
            // el.addEventListener('dragend', onDragEnd)
        })

        // Keep handle stable on hover
        handle.addEventListener('mouseenter', (e) => e.stopPropagation())
        handle.addEventListener('mouseleave', (e) => e.stopPropagation())
    }

    const detachDom = () => {
        if (mouseDownTimeout) {
            clearTimeout(mouseDownTimeout)
            mouseDownTimeout = null
        }
        if (container && container.parentNode) container.parentNode.removeChild(container)
        container = handle = dotsBtn = null
        if (lastSelectedDom && lastSelectedDom.classList) {
            lastSelectedDom.classList.remove('ProseMirror-selectednode')
        }
        lastSelectedDom = null
    }

    // ---- Robust block + position helpers ----

    // Finds the nearest editor *block* (direct child of view.dom), even through wrappers/NodeViews
    const findBlockUnder = (target) => {
        if (!view) return null
        const root = view.dom
        if (!target || !root.contains(target)) return null

        let el = target.nodeType === 3 ? target.parentNode : target // normalize text -> element

        // Climb until the parent is the editor root (direct child), or we reach the root
        while (el && el !== root && el.parentNode !== root) {
            el = el.parentNode
        }
        if (!el || el === root) return null
        return el // direct child of the editor root
    }

    // Compute a safe "pos before block" for NodeSelection, tolerant of NodeViews/coords gaps
    const posBeforeFromBlock = (blockEl) => {
        if (!view || !blockEl) return null
        const d = view.dom.ownerDocument

        // 1) Try posAtDOM (fast path)
        try {
            const p = view.posAtDOM(blockEl, 0)
            if (typeof p === 'number' && p >= 0) return Math.max(0, p - 1)
        } catch {}

        // 2) coords fallback via elementFromPoint
        try {
            const r = blockEl.getBoundingClientRect()
            const x = r.left + 1
            const y = r.top + 1
            const hit = d.elementFromPoint(x, y)
            if (hit) {
                const blk = findBlockUnder(hit)
                if (blk) {
                    try {
                        const p2 = view.posAtDOM(blk, 0)
                        if (typeof p2 === 'number' && p2 >= 0) return Math.max(0, p2 - 1)
                    } catch {}
                }
            }
        } catch {}

        return null
    }

    // Resolve the current selection to { blk, posBefore } for the editor block
    const blockFromSelection = () => {
        if (!view) return null
        const { state } = view
        const sel = state.selection
        const d = view.dom.ownerDocument

        // NodeSelection fast path
        if (sel instanceof NodeSelection) {
            const dom = view.nodeDOM(sel.from)
            if (dom) {
                const blk = findBlockUnder(dom)
                if (blk) return { blk, posBefore: sel.from }
            }
        }

        // 1) domAtPos for text/inline selections
        try {
            const at = view.domAtPos(sel.from)
            let el = at.node
            if (el && el.nodeType === 3) el = el.parentNode
            if (el && d.defaultView && el instanceof d.defaultView.HTMLElement) {
                const blk = findBlockUnder(el)
                if (blk) {
                    const posBefore = posBeforeFromBlock(blk)
                    if (posBefore != null) return { blk, posBefore }
                }
            }
        } catch {}

        // 2) coordsAtPos + elementFromPoint fallback
        try {
            const c = view.coordsAtPos(sel.from)
            const elAt = d.elementFromPoint(c.left + 1, c.top + 1)
            if (elAt) {
                const blk = findBlockUnder(elAt)
                if (blk) {
                    const posBefore = posBeforeFromBlock(blk)
                    if (posBefore != null) return { blk, posBefore }
                }
            }
        } catch {}

        return null
    }

    // Return the editor block under the current mouse pointer (even when hovering the handle)
    const blockUnderPointer = (clientX, clientY) => {
        if (!view || !handle) return null
        const d = view.dom.ownerDocument

        // Temporarily let events pass through the handle to hit-test what's underneath
        const prev = handle.style.pointerEvents
        handle.style.pointerEvents = 'none'
        const el = d.elementFromPoint(clientX + 30, clientY)
        handle.style.pointerEvents = prev

        if (!el) return null
        return findBlockUnder(el)
    }

    // Ensure currentBlock/currentPos are set; try selection, then pointer coords
    const ensureCurrentFromSelectionOrPointer = (clientX, clientY) => {
        const blk = blockUnderPointer(clientX, clientY)
        if (blk) {
            currentBlock = blk
            currentPos = posBeforeFromBlock(blk)
            return currentPos != null
        }
        return false
    }

    // ---- Positioning ----

    // Position the floating handle relative to the block
    const updatePosition = (blockEl) => {
        if (!blockEl || !handle) return
        const d = view.dom.ownerDocument
        const win = d.defaultView
        const rect = blockEl.getBoundingClientRect()
        const scrollY =
            (win && win.scrollY) || d.documentElement.scrollTop || d.body.scrollTop || 0
        const scrollX =
            (win && win.scrollX) || d.documentElement.scrollLeft || d.body.scrollLeft || 0
        handle.style.left = rect.left + scrollX + gutterLeft + 'px'
        handle.style.top = rect.top + scrollY + gutterTop + 'px'
        handle.style.opacity = '1'
        handle.style.pointerEvents = 'auto'
    }

    const mousemove = (e) => {
        if (isDragging) return
        const blk = blockUnderPointer(e.clientX, e.clientY)
        if (!blk) {
            currentBlock = null
            currentPos = null
            return
        }
        currentBlock = blk
        currentPos = posBeforeFromBlock(blk)
        updatePosition(blk)
    }

    const scrollOrResize = () => {
        if (currentBlock && !isDragging) updatePosition(currentBlock)
    }

    const syncSelectedClassFromState = () => {
        if (!view) return
        const sel = view.state.selection
        if (sel instanceof NodeSelection) {
            const dom = view.nodeDOM(sel.from)
            if (dom && dom.classList) {
                if (lastSelectedDom && lastSelectedDom !== dom) {
                    lastSelectedDom.classList.remove('ProseMirror-selectednode')
                }
                dom.classList.add('ProseMirror-selectednode')
                lastSelectedDom = dom
            }
        } else if (lastSelectedDom) {
            lastSelectedDom.classList.remove('ProseMirror-selectednode')
            lastSelectedDom = null
        }
    }

    // ---- Plugin ----
    return new Plugin({
        key: dragHandleExactKey,
        view(v) {
            view = v
            attachDom()

            // Seed handle from current selection so it's ready before mousemove
            try {
                const seeded = ensureCurrentFromSelectionOrPointer(0, 0)
                if (seeded && currentBlock) updatePosition(currentBlock)
            } catch {}

            const d = view.dom.ownerDocument
            const body = d.body
            body.addEventListener('mousemove', mousemove)
            d.addEventListener('scroll', scrollOrResize, true)
            d.defaultView && d.defaultView.addEventListener('resize', scrollOrResize)

            return {
                update() {
                    if (!view || !view.state.selection || isDragging) return

                    // keep handle position & selected class in sync
                    syncSelectedClassFromState()

                    try {
                        const found = blockFromSelection()
                        if (found) {
                            currentBlock = found.blk
                            currentPos = found.posBefore
                            updatePosition(found.blk)
                        } else {
                            currentBlock = null
                            currentPos = null
                        }
                    } catch (err) {
                        console.warn('Error updating drag handle:', err)
                    }
                },
                destroy() {
                    const d = view.dom.ownerDocument
                    const body = d.body
                    body.removeEventListener('mousemove', mousemove)
                    d.removeEventListener('scroll', scrollOrResize, true)
                    d.defaultView && d.defaultView.removeEventListener('resize', scrollOrResize)
                    detachDom()
                    view = null
                },
            }
        },

        // Add plugin props for better drag handling
        props: {
            handleDOMEvents: {
                drop(view, event) {
                    isDragging = false
                    return false
                },
                dragend(view, event) {
                    isDragging = false
                    return false
                },
            },
        },
    })
}
// FloatingElement.js
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const FloatingElement = Extension.create({
    name: 'floatingElement',

    addOptions() {
        return {
            /**
             * A DOM element or a function returning the element.
             * Example: () => document.getElementById('selection-toolbar')
             */
            element: null,

            /**
             * Logic to decide when to show.
             */
            shouldShow: ({ editor, state, view, from, to }) => {
                return (
                    view.hasFocus() &&
                    !state.selection.empty &&
                    !editor.isEmpty
                )
            },
        }
    },

    addProseMirrorPlugins() {
        const extension = this

        return [
            new Plugin({
                key: new PluginKey('floatingElement'),

                view(view) {
                    const getEl = () => {
                        if (!extension.options.element) return null
                        return typeof extension.options.element === 'function'
                            ? extension.options.element()
                            : extension.options.element
                    }

                    const el = getEl()
                    if (!el) {
                        console.warn('[floatingElement] element not found')
                        return {}
                    }

                    const doc = el.ownerDocument
                    const HIDDEN_TRANSFORM = 'translate3d(-9999px, -9999px, 0)'

                    // base styles
                    el.style.position = 'absolute'
                    el.style.transform = HIDDEN_TRANSFORM

                    const hide = () => {
                        el.style.transform = HIDDEN_TRANSFORM
                        el.style.opacity = '0'
                        el.style.pointerEvents = 'none'
                    }

                    const showAtSelection = () => {
                        const { state } = view
                        const { from, to } = state.selection

                        const start = view.coordsAtPos(from)
                        const end = view.coordsAtPos(to)

                        const top = Math.min(start.top, end.top)
                        const bottom = Math.max(start.bottom, end.bottom)
                        const left = Math.min(start.left, end.left)
                        const right = Math.max(start.right, end.right)

                        // measure element
                        el.style.opacity = '1'
                        el.style.pointerEvents = 'auto'
                        const parent = el.offsetParent || doc.body
                        const parentRect = parent.getBoundingClientRect()
                        const elRect = el.getBoundingClientRect()

                        let x = (left + right) / 2 - elRect.width / 2
                        let y = top - elRect.height - 8

                        // keep within parent horizontally
                        const padding = 8
                        x = Math.max(
                            parentRect.left + padding,
                            Math.min(x, parentRect.right - elRect.width - padding)
                        )

                        // if not enough space above, put below
                        if (y < parentRect.top + padding) {
                            y = bottom + 8
                        }

                        // convert to parent-local coords
                        x = x - parentRect.left
                        y = y - parentRect.top

                        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
                    }

                    const update = () => {
                        const { state } = view
                        const { from, to } = state.selection

                        if (
                            !extension.options.shouldShow({
                                editor: extension.editor,
                                state,
                                view,
                                from,
                                to,
                            })
                        ) {
                            hide()
                            return
                        }

                        showAtSelection()
                    }

                    // initial
                    hide()
                    update()

                    // reposition on scroll
                    const onScroll = () => {
                        if (el.style.opacity === '1') {
                            update()
                        }
                    }
                    doc.addEventListener('scroll', onScroll, true)

                    return {
                        update(view, prevState) {
                            if (
                                prevState &&
                                prevState.doc.eq(view.state.doc) &&
                                prevState.selection.eq(view.state.selection)
                            ) {
                                return
                            }
                            update()
                        },
                        destroy() {
                            hide()
                            doc.removeEventListener('scroll', onScroll, true)
                        },
                    }
                },
            }),
        ]
    },
})

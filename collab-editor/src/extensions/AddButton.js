// A "+" button in the left gutter that opens your slash menu.
import { Plugin, PluginKey, NodeSelection } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const addButtonKey = new PluginKey('gce_add_button')

export default function AddButtonPlugin(openSlashFn) {
    let viewRef = null

    return new Plugin({
        key: addButtonKey,

        view(view) {
            viewRef = view
            return { destroy() { viewRef = null } }
        },

        props: {
            decorations(state) {
                if (!viewRef) return null
                const ownerDoc = viewRef.dom?.ownerDocument
                const decos = []

                state.doc.descendants((node, pos, parent) => {
                    // Only show for *block* nodes that are direct children of the doc or a list
                    if (!node.isBlock) return false
                    const deco = Decoration.widget(pos, () => {
                        const d = ownerDoc
                        const btn = d.createElement('button')
                        btn.type = 'button'
                        btn.className = 'gce-add-button'
                        btn.setAttribute('contenteditable', 'false')
                        btn.setAttribute('tabindex', '-1')
                        btn.textContent = '+'

                        btn.addEventListener('mousedown', (e) => {
                            e.preventDefault()
                            if (!viewRef) return
                            const { state, dispatch } = viewRef
                            // Select this block so the slash command inserts *here*
                            const $pos = state.doc.resolve(pos)
                            dispatch(state.tr.setSelection(new NodeSelection($pos)))
                        })

                        btn.addEventListener('click', (e) => {
                            e.preventDefault()
                            if (typeof openSlashFn === 'function') {
                                openSlashFn() // your helper inserts "/" and opens suggestion
                            } else if (viewRef) {
                                // Fallback: insert "/" which triggers your SlashCommand
                                viewRef.chain().focus().insertContent('/').run()
                            }
                        })

                        return btn
                    }, { side: -1 })

                    decos.push(deco)
                    return false
                })

                return DecorationSet.create(state.doc, decos)
            },
        },
    })
}

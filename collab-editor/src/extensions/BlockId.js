// ./extensions/BlockId.js
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

function genChunk() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let s = ''
    for (let i = 0; i < 4; i++) s += chars[(Math.random() * chars.length) | 0]
    return s
}

function genId() {
    return `${genChunk()}-${genChunk()}-${genChunk()}-${genChunk()}`
}

export default Extension.create({
    name: 'blockId',

    addGlobalAttributes() {
        const types = [
            'paragraph', 'heading', 'blockquote', 'codeBlock',
            'bulletList', 'orderedList', 'listItem',
            'taskList', 'taskItem',
            'table', 'tableRow', 'tableCell', 'tableHeader',
            'image', 'horizontalRule',
        ]

        return [{
            types,
            attributes: {
                'data-block-id': {
                    default: null,
                    parseHTML: el => el.getAttribute('data-block-id'),
                    renderHTML: attrs =>
                        attrs['data-block-id']
                            ? { 'data-block-id': attrs['data-block-id'] }
                            : {},
                },
            },
        }]
    },

    addCommands() {
        return {
            ensureBlockIds: () => ({ state, dispatch }) => {
                if (!dispatch) return false
                dispatch(state.tr.setMeta('blockId_touch', true))
                return true
            },
        }
    },

    addProseMirrorPlugins() {
        const SKIP_META = 'blockId_skip'

        return [
            new Plugin({
                appendTransaction(transactions, oldState, newState) {
                    // avoid loops
                    if (transactions.some(tr => tr.getMeta(SKIP_META))) return

                    // run only when doc actually changed or we explicitly poked it
                    const relevant = transactions.some(tr =>
                        tr.docChanged || tr.getMeta('blockId_touch')
                    )
                    if (!relevant) return

                    const tr = newState.tr
                    let changed = false
                    const seen = new Set()

                    newState.doc.descendants((node, pos) => {
                        if (node.isText) return

                        const oldId = node.attrs && node.attrs['data-block-id']

                        // Need a new ID if missing OR already used.
                        if (!oldId || seen.has(oldId)) {
                            const newId = genId()
                            tr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                'data-block-id': newId,
                            })
                            seen.add(newId)
                            changed = true
                        } else {
                            seen.add(oldId)
                        }
                    })

                    if (changed) {
                        tr.setMeta(SKIP_META, true)
                        return tr
                    }
                },
            }),
        ]
    },

    onCreate() {
        // seed IDs for initial content
        this.editor.view.dispatch(
            this.editor.state.tr.setMeta('blockId_touch', true),
        )
    },
})

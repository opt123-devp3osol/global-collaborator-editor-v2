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
            'paragraph','heading','blockquote','codeBlock',
            'bulletList','orderedList','listItem',
            'taskList','taskItem',
            'table','tableRow','tableCell','tableHeader',
            'image','horizontalRule'
        ]
        return [{
            types,
            attributes: {
                'data-block-id': {
                    default: null,
                    parseHTML: el => el.getAttribute('data-block-id'),
                    renderHTML: attrs => attrs['data-block-id']
                        ? { 'data-block-id': attrs['data-block-id'] }
                        : {},
                },
            },
        }]
    },

    // Optional: expose a command that *triggers* the appendTransaction logic,
    // without doing mutations directly (prevents loops).
    addCommands() {
        return {
            ensureBlockIds: () => ({ state, dispatch }) => {
                if (!dispatch) return false
                // A no-op tx that will cause appendTransaction to run
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
                    // If this is our own synthetic tx, bail to avoid loops
                    if (transactions.some(tr => tr.getMeta(SKIP_META))) return

                    let changed = false
                    const tr = newState.tr

                    // Walk the whole doc (fast enough; runs only when needed)
                    newState.doc.descendants((node, pos) => {
                        if (node.isText) return
                        const hasId = node.attrs && node.attrs['data-block-id']
                        if (!hasId) {
                            tr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                'data-block-id': genId(),
                            })
                            changed = true
                        }
                    })

                    if (changed) {
                        // Mark so the follow-up render doesn't re-enter
                        tr.setMeta(SKIP_META, true)
                        return tr
                    }
                    // No changes -> no appended transaction
                    return
                },
            }),
        ]
    },

    onCreate() {
        // Kick a single no-op tx to seed IDs for the initial content
        // (handled by appendTransaction above)
        this.editor.view.dispatch(this.editor.state.tr.setMeta('blockId_touch', true))
    },
})

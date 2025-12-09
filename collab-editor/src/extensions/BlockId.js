// ./extensions/BlockId.js
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

// Simple random ID generator
function genChunk() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let s = ''
    for (let i = 0; i < 4; i++) {
        s += chars[(Math.random() * chars.length) | 0]
    }
    return s
}

function genId() {
    return `${genChunk()}-${genChunk()}-${genChunk()}-${genChunk()}`
}

export default Extension.create({
    name: 'blockId',

    /**
     * Attach a `data-block-id` attribute to block-level node types.
     * Adjust the `types` list to match your schema if needed.
     */
    addGlobalAttributes() {
        const types = [
            'paragraph',
            'heading',
            'blockquote',
            'codeBlock',
            'bulletList',
            'orderedList',
            'listItem',
            'taskList',
            'taskItem',
            'table',
            'tableRow',
            'tableCell',
            'tableHeader',
            'image',
            'horizontalRule',
        ]

        return [
            {
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
            },
        ]
    },

    /**
     * No commands – we don't manually poke the doc anymore.
     */
    addCommands() {
        return {}
    },

    /**
     * Core logic: on every *doc-changing* transaction, ensure:
     *  - every non-text node has a data-block-id
     *  - duplicate IDs are fixed
     *
     * It only updates node attributes, never adds/removes nodes,
     * never focuses or scrolls.
     */
    addProseMirrorPlugins() {
        const SKIP_META = 'blockId_skip'

        return [
            new Plugin({
                appendTransaction(transactions, oldState, newState) {
                    // Avoid infinite loop when we apply our own transaction
                    if (transactions.some(tr => tr.getMeta(SKIP_META))) {
                        return
                    }

                    // Only run when the document actually changed
                    const docChanged = transactions.some(tr => tr.docChanged)
                    if (!docChanged) {
                        return
                    }

                    const tr = newState.tr
                    let changed = false
                    const seen = new Set()

                    newState.doc.descendants((node, pos) => {
                        // Ignore text nodes completely
                        if (node.isText) return

                        const oldAttrs = node.attrs || {}
                        const oldId = oldAttrs['data-block-id']

                        // If missing or duplicated, generate a new id
                        if (!oldId || seen.has(oldId)) {
                            const newId = genId()
                            const newAttrs = {
                                ...oldAttrs,
                                'data-block-id': newId,
                            }

                            tr.setNodeMarkup(pos, undefined, newAttrs)
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

                    // If nothing changed, return undefined (no extra transaction)
                    return
                },
            }),
        ]
    },

    /**
     * IMPORTANT:
     * No onCreate logic that dispatches a transaction.
     */
    onCreate() {
        // Intentionally empty — do NOT dispatch anything here.
    },
})

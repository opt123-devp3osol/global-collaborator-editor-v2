// extensions/TableScrollWrapper.js
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

export const TableScrollWrapper = Extension.create({
    name: 'tableScrollWrapper',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                view(view) {
                    const doc = view.dom.ownerDocument

                    // Wrap any bare <table> into a scrolling container
                    const wrapTables = () => {
                        const root = view.dom // ProseMirror root for this editor
                        const tables = root.querySelectorAll('table')

                        tables.forEach(table => {
                            // already wrapped?
                            if (table.parentElement?.classList.contains('tbt-scroll-wrap')) return

                            const wrap = doc.createElement('div')
                            wrap.className = 'tbt-scroll-wrap'
                            table.parentElement?.insertBefore(wrap, table)
                            wrap.appendChild(table)
                        })
                    }

                    // initial & subsequent passes
                    wrapTables()

                    // MutationObserver to wrap tables created later
                    const mo = new MutationObserver(() => wrapTables())
                    mo.observe(view.dom, { childList: true, subtree: true })

                    return {
                        update() { wrapTables() },
                        destroy() { mo.disconnect() },
                    }
                },
            }),
        ]
    },
})

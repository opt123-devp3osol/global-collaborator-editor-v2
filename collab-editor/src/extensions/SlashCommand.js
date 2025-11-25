// SlashCommand.js
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

const ITEMS = [
    // --- Style ---
    { group: 'Style', label: 'Text',          run: ({ editor }) => editor.chain().focus().setParagraph().run() },
    { group: 'Style', label: 'Heading 1',     run: ({ editor }) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { group: 'Style', label: 'Heading 2',     run: ({ editor }) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { group: 'Style', label: 'Heading 3',     run: ({ editor }) => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { group: 'Style', label: 'Bullet List',   run: ({ editor }) => editor.chain().focus().toggleBulletList().run() },
    { group: 'Style', label: 'Numbered List', run: ({ editor }) => editor.chain().focus().toggleOrderedList().run() },
    { group: 'Style', label: 'To-do list',    run: ({ editor }) => editor.chain().focus().toggleTaskList?.().run() || false },
    { group: 'Style', label: 'Blockquote',    run: ({ editor }) => editor.chain().focus().toggleBlockquote().run() },
    { group: 'Style', label: 'Code Block',    run: ({ editor }) => editor.chain().focus().toggleCodeBlock().run() },
    // --- Insert ---
    { group: 'Insert', label: 'Separator',    run: ({ editor }) => editor.chain().focus().setHorizontalRule().run() },
    {
        group: 'Insert',
        label: 'Table',
        run: ({ editor }) => {
            const chain = editor.chain().focus();
            // only run if table extension is loaded
            if (typeof chain.insertTable === 'function') {
                chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                return true;
            }
            return false;
        },
    },
    // --- Upload ---
    {
        group: 'Upload', label: 'Image', run: ({editor}) => {
            const url = typeof prompt === 'function' ? prompt('Image URL') : null
            if (url) editor.chain().focus().setImage?.({src: url}).run()
        }
    },
]

// simple word counter (treats contiguous whitespace as one)
const wordCount = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length

export default Extension.create({
    name: 'slashCommand',

    addOptions() {
        return {
            suggestion: {
                char: '/',
                startOfLine: false,
                allowSpaces: true,
                items: ({ query }) => {
                    const q = (query || '').trim().toLowerCase()
                    const filtered = ITEMS.filter(i => i.label.toLowerCase().includes(q))
                    // Return at least one placeholder entry if empty (we render as disabled)
                    return filtered.length ? filtered : [{ group: 'EMPTY', label: 'No results', disabled: true }]
                },

                // inside addOptions().suggestion.render = () => { ... }
                render: () => {

                    const positionMenu = (el, rectGetter) => {
                        const rect = rectGetter?.()
                        if (!rect) return
                        el.style.position = 'absolute'
                        el.style.left = '0px'
                        el.style.top  = '0px'
                        el.style.zIndex = '1000'
                        el.style.transform = `translate(${Math.round(rect.left)}px, ${Math.round(rect.bottom + 6)}px)`
                    }

                    const buildShell = (doc) => {
                        const outer = doc.createElement('div')
                        outer.setAttribute('tabindex', '-1')
                        outer.setAttribute('data-floating-ui-focusable', '')
                        outer.setAttribute('data-selector', 'tiptap-slash-dropdown-menu')
                        outer.className = 'tiptap-suggestion-menu'
                        outer.setAttribute('role', 'listbox')
                        outer.setAttribute('aria-label', 'Suggestions')
                        outer.setAttribute('style', 'position: absolute; left: 0px; top: 0px; z-index: 1000;')
                        const card = doc.createElement('div')
                        card.className = 'tiptap-card tiptap-slash-card'
                        const body = doc.createElement('div')
                        body.className = 'tiptap-card-body tiptap-slash-card-body'
                        card.appendChild(body)
                        outer.appendChild(card)
                        return { outer, body }
                    }

                    const addSeparator = (doc, body) => {
                        const sep = doc.createElement('div')
                        sep.className = 'tiptap-separator'
                        sep.setAttribute('data-orientation', 'horizontal')
                        sep.setAttribute('role', 'separator')
                        body.appendChild(sep)
                    }

                    const addGroup = (doc, body, groupLabel, items, click) => {
                        const groupWrap = doc.createElement('div')
                        groupWrap.className = 'tiptap-card-item-group'
                        groupWrap.setAttribute('data-orientation', 'vertical')

                        if (groupLabel !== 'EMPTY') {
                            const label = doc.createElement('div')
                            label.className = 'tiptap-card-group-label'
                            label.textContent = groupLabel
                            groupWrap.appendChild(label)
                        }

                        const btnGroup = doc.createElement('div')
                        btnGroup.className = 'tiptap-button-group'
                        btnGroup.setAttribute('data-orientation', 'vertical')
                        btnGroup.setAttribute('role', 'group')

                        items.forEach((it) => {
                            const btn = doc.createElement('button')
                            btn.className = 'tiptap-button'
                            btn.setAttribute('data-style', 'ghost')
                            btn.setAttribute('data-active-state', 'off')
                            btn.type = 'button'

                            const text = doc.createElement('div')
                            text.className = 'tiptap-button-text'
                            text.textContent = it.disabled ? 'No results' : it.label
                            btn.appendChild(text)

                            if (it.disabled) {
                                btn.setAttribute('disabled', 'true')
                            } else {
                                btn.addEventListener('mousedown', e => e.preventDefault())
                                btn.addEventListener('click', () => click(it))
                            }

                            btnGroup.appendChild(btn)
                        })

                        groupWrap.appendChild(btnGroup)
                        body.appendChild(groupWrap)
                    }

                    let root, body, doc, view
                    let currentItems = []
                    let activeIndex = 0
                    let outsideClickHandler = null
                    let focusOutHandler = null

                    const setActive = (i) => {
                        activeIndex = Math.max(0, Math.min(i, currentItems.length - 1))
                        const buttons = body.querySelectorAll('.tiptap-button:not([disabled])')
                        buttons.forEach((b, idx) => b.setAttribute('data-active-state', idx === activeIndex ? 'on' : 'off'))
                    }

                    const rebuild = (props) => {
                        while (body.firstChild) body.removeChild(body.firstChild)
                        currentItems = props.items
                        const byGroup = currentItems.reduce((m, it) => { (m[it.group] ||= []).push(it); return m }, {})
                        const groups = Object.keys(byGroup)
                        groups.forEach((g, i) => {
                            if (i > 0) addSeparator(doc, body)
                            addGroup(doc, body, g, byGroup[g], (it) => {
                                // Pick -> delete whole /query, run item, close
                                const { editor, range } = props
                                editor.chain().focus().deleteRange({ from: range.from, to: range.to }).run()
                                it.run({ editor, range })
                                props.command('close')
                            })
                        })
                        setActive(0)
                        positionMenu(root, props.clientRect, view)
                    }

                    // Plainify the /query: replace the decorated range with raw text `/${query}`
                    const plainifyQueryAndClose = (props) => {
                        const { editor, range, query } = props
                        const text = `/${query || ''}`
                        editor.chain().focus().insertContentAt({ from: range.from, to: range.to }, text).run()
                        props.command('close')
                    }

                    return {
                        onStart: (props) => {
                            view = props.editor.view
                            doc  = view.dom.ownerDocument

                            // 10-word guard on open
                            if (wordCount(props.query) > 10) { plainifyQueryAndClose(props); return }
                            else { props.command('close') }

                            const shell = buildShell(doc)
                            root = shell.outer
                            body = shell.body
                            doc.body.appendChild(root)
                            rebuild(props)

                            // --- Outside click / focus-out to close ---
                            outsideClickHandler = (e) => {
                                if (!root) return
                                const t = e.target
                                const clickedInsideMenu = root.contains(t)
                                const clickedInsideEditor = view.dom.contains(t)
                                if (!clickedInsideMenu && !clickedInsideEditor) {
                                    // just close; decoration disappears and text stays
                                    props.command('close')
                                }
                            }
                            focusOutHandler = (e) => {
                                // when focus leaves both editor and menu, close
                                const t = e.target
                                const related = e.relatedTarget
                                const leavingMenu = root && root.contains(t) && (!related || !root.contains(related))
                                const leavingEditor = view.dom.contains(t) && (!related || !view.dom.contains(related))
                                if (leavingMenu && leavingEditor) props.command('close')
                            }

                            // Use ownerDocument to be iframe-safe
                            doc.addEventListener('mousedown', outsideClickHandler, true)
                            doc.addEventListener('focusout', focusOutHandler, true)
                        },

                        onUpdate: (props) => {
                            // 10-word guard during typing
                            if (wordCount(props.query) > 10) { plainifyQueryAndClose(props); return }
                            rebuild(props)
                        },

                        onKeyDown: (props) => {
                            const { event } = props
                            if (event.key === 'Escape') { props.command('close'); return true }
                            if (!currentItems.length || currentItems[0]?.disabled) return false
                            if (event.key === 'ArrowDown') { setActive(activeIndex + 1); return true }
                            if (event.key === 'ArrowUp')   { setActive(activeIndex - 1); return true }
                            if (event.key === 'Enter') {
                                const item = currentItems[activeIndex]
                                if (item && !item.disabled) {
                                    const { editor, range } = props
                                    editor.chain().focus().deleteRange({ from: range.from, to: range.to }).run()
                                    item.run({ editor, range })
                                    props.command('close')
                                }
                                return true
                            }
                            return false
                        },

                        onExit: () => {
                            // cleanup
                            root?.remove()
                            if (doc && outsideClickHandler) doc.removeEventListener('mousedown', outsideClickHandler, true)
                            if (doc && focusOutHandler) doc.removeEventListener('focusout', focusOutHandler, true)
                            root = body = doc = view = null
                            currentItems = []
                            activeIndex = 0
                            outsideClickHandler = focusOutHandler = null
                        },
                    }
                }

            },
        }
    },

    addProseMirrorPlugins() {
        return [Suggestion({ editor: this.editor, ...this.options.suggestion })]
    },
})

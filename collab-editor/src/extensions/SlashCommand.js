// SlashCommand.js
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

const triggerImageUpload = (editor) => {
    try {
        const doc = editor?.view?.dom?.ownerDocument || document
        const input = doc.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.style.position = 'fixed'
        input.style.left = '-9999px'
        doc.body.appendChild(input)

        input.addEventListener('change', async () => {
            const file = input.files?.[0]
            input.remove()
            if (!file) return

            const uploader = editor?.storage?.uploadPastedImage
            if (typeof uploader === 'function') {
                await uploader(file)
                return
            }

            // Fallback: insert as object URL if uploader is unavailable
            const src = URL.createObjectURL(file)
            editor.chain().focus().setImage?.({ src, alt: file.name || 'Image' }).run()
        }, { once: true })

        input.click()
    } catch (err) {
        console.error('Image upload trigger failed', err)
    }
}

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
            // ensure table extension exists
            if (typeof editor.commands.insertTable !== 'function') return false;

            // 1) insert table
            editor.chain().focus().insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: true
            }).run();

            // 2) Defer focus to next microtask so wrapper/overlay can run
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const view = editor.view;
                    const dom = view.dom;

                    // find first cell
                    const firstCell = dom.querySelector('table tr:first-child td, table tr:first-child th');
                    if (!firstCell) return;

                    try {
                        // 3) compute position
                        const pos = view.posAtDOM(firstCell, 0);

                        // 4) force selection inside cell
                        const { TextSelection } = editor.state.constructor;
                        const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, pos));

                        view.dispatch(tr);

                        // 5) final focus
                        editor.commands.focus();
                    } catch (err) {
                        console.error('Error focusing first cell after table insert:', err);
                    }
                });
            });

            return true;
        }
    },
    // --- Upload ---
    {
        group: 'Upload',
        label: 'Image',
        run: ({ editor }) => triggerImageUpload(editor)
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
                        const vw = (el.ownerDocument?.defaultView?.innerWidth) || window.innerWidth
                        const vh = (el.ownerDocument?.defaultView?.innerHeight) || window.innerHeight
                        el.style.position = 'fixed'
                        el.style.left = '0px'
                        el.style.top  = '0px'
                        el.style.zIndex = '10001'
                        // measure (ensure visible during measurement)
                        const prevDisplay = el.style.display
                        if (!el.offsetHeight) el.style.display = 'block'
                        const menuRect = el.getBoundingClientRect()
                        if (prevDisplay !== undefined) el.style.display = prevDisplay
                        const belowY = Math.round(rect.bottom + 6)
                        const aboveY = Math.round(rect.top - menuRect.height - 6)
                        const fitsBelow = rect.bottom + 6 + menuRect.height <= vh
                        const fitsAbove = rect.top - 6 - menuRect.height >= 0
                        const yCandidate = fitsBelow || !fitsAbove ? belowY : aboveY
                        const y = Math.min(Math.max(yCandidate, 8), Math.max(8, vh - menuRect.height - 8))
                        const x = Math.min(Math.max(Math.round(rect.left), 8), Math.max(8, vw - menuRect.width - 8))
                        el.style.transform = `translate(${x}px, ${y}px)`
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
                    let currentEditor = null
                    let overlay = null

                    const attachOverlay = (doc, onClose) => {
                        if (overlay) return
                        overlay = doc.createElement('div')
                        overlay.className = 'tiptap-slash-overlay'
                        Object.assign(overlay.style, {
                            position: 'fixed',
                            inset: '0',
                            zIndex: '10000',
                            background: 'transparent',
                            pointerEvents: 'auto',
                        })
                        const block = (e) => { e.preventDefault(); e.stopPropagation() }
                        overlay.addEventListener('mousedown', (e) => { block(e); onClose?.() })
                        overlay.addEventListener('touchstart', (e) => { block(e); onClose?.() }, { passive: false })
                        overlay.addEventListener('wheel', block, { passive: false })
                        overlay.addEventListener('scroll', block, { passive: false })
                        doc.body.appendChild(overlay)
                    }

                    const detachOverlay = () => {
                        if (overlay) {
                            overlay.remove()
                            overlay = null
                        }
                    }
                    const closeSuggestions = (props) => {
                        if (typeof props?.command === 'function') {
                            props.command('close')
                        } else {
                            // fallback cleanup if command is missing
                            root?.remove()
                            if (doc && outsideClickHandler) doc.removeEventListener('mousedown', outsideClickHandler, true)
                            if (doc && focusOutHandler) doc.removeEventListener('focusout', focusOutHandler, true)
                            root = body = doc = view = null
                            currentItems = []
                            activeIndex = 0
                            outsideClickHandler = focusOutHandler = null
                            detachOverlay()
                        }
                    }

                    const firstEnabledIndex = () => currentItems.findIndex(it => !it.disabled)

                    const setActive = (i) => {
                        if (!currentItems.length) return
                        const capped = Math.max(0, Math.min(i, currentItems.length - 1))
                        activeIndex = capped
                        const buttons = body.querySelectorAll('.tiptap-button:not([disabled])')
                        buttons.forEach((b, idx) => b.setAttribute('data-active-state', idx === capped ? 'on' : 'off'))
                        const activeBtn = buttons[capped]
                        if (activeBtn?.scrollIntoView) {
                            activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' })
                        }
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
                                closeSuggestions(props)
                            })
                        })
                        const fi = firstEnabledIndex()
                        setActive(fi >= 0 ? fi : 0)
                        positionMenu(root, props.clientRect, view)
                    }

                    // Plainify the /query: replace the decorated range with raw text `/${query}`
                    const plainifyQueryAndClose = (props) => {
                        const { editor, range, query } = props
                        const text = `/${query || ''}`
                        editor.chain().focus().insertContentAt({ from: range.from, to: range.to }, text).run()
                        closeSuggestions(props)
                    }

                    return {
                        onStart: (props) => {
                            currentEditor = props.editor
                            view = props.editor.view
                            doc  = view.dom.ownerDocument
                            attachOverlay(doc, () => closeSuggestions(props))

                            // 10-word guard on open
                            if (wordCount(props.query) > 10) { plainifyQueryAndClose(props); return }
                            else { closeSuggestions(props) }

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
                                    closeSuggestions(props)
                                }
                            }
                            focusOutHandler = (e) => {
                                // when focus leaves both editor and menu, close
                                const t = e.target
                                const related = e.relatedTarget
                                const leavingMenu = root && root.contains(t) && (!related || !root.contains(related))
                                const leavingEditor = view.dom.contains(t) && (!related || !view.dom.contains(related))
                                if (leavingMenu && leavingEditor) closeSuggestions(props)
                            }

                            // Use ownerDocument to be iframe-safe
                            doc.addEventListener('mousedown', outsideClickHandler, true)
                            doc.addEventListener('focusout', focusOutHandler, true)
                        },

                        onUpdate: (props) => {
                            currentEditor = props.editor
                            // 10-word guard during typing
                            if (wordCount(props.query) > 10) { plainifyQueryAndClose(props); return }
                            rebuild(props)
                        },

                        onKeyDown: (props) => {
                            const { event } = props
                            const editor = currentEditor || props.editor
                            if (event.key === 'Escape') {
                                event.preventDefault()
                                if (editor && props.range?.from != null && props.range?.to != null) {
                                    editor.chain().focus().deleteRange({ from: props.range.from, to: props.range.to }).run()
                                }
                                closeSuggestions(props)
                                return true
                            }
                            if (!currentItems.length) {
                                closeSuggestions(props)
                                return true
                            }
                            if (event.key === 'ArrowDown') { setActive(activeIndex + 1); return true }
                            if (event.key === 'ArrowUp')   { setActive(activeIndex - 1); return true }
                            if (event.key === 'Enter') {
                                event.preventDefault()
                                let item = currentItems[activeIndex]
                                if (!item || item.disabled) {
                                    const fi = firstEnabledIndex()
                                    if (fi >= 0) {
                                        setActive(fi)
                                        item = currentItems[fi]
                                    }
                                }

                                if (item && !item.disabled && typeof item.run === 'function' && editor) {
                                    const range = props.range || editor.state.selection
                                    if (range?.from != null && range?.to != null) {
                                        editor.chain().focus().deleteRange({ from: range.from, to: range.to }).run()
                                    } else {
                                        editor.chain().focus()
                                    }
                                    item.run({ editor, range })
                                }
                                // Always swallow Enter while menu is open to avoid inserting new lines
                                closeSuggestions(props)
                                return true
                            }
                            return false
                        },

                        onExit: () => {
                            // cleanup
                            currentEditor = null
                            detachOverlay()
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

// extensions/TableFormatToolbar.js
import { Extension } from '@tiptap/core'
import { Plugin ,TextSelection} from 'prosemirror-state'
import { CellSelection, cellAround } from '@tiptap/pm/tables'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const placeByRect = (rect, el) => {
    // place centered above rect with a small gap; keep on-screen
    const gap = 8
    const vw = window.innerWidth
    const vh = window.innerHeight
    const elW = el.offsetWidth || 280
    const elH = el.offsetHeight || 40
    let x = rect.left  (rect.width  - elW) / 2
    let y = rect.top  - elH - gap
    // if above is off-screen, put it below
    if (y < 0) y = rect.bottom + gap
    x = clamp(x, 8, vw - elW - 8)
    y = clamp(y, 8, vh - elH - 8)
    el.style.left = `${x}px`
    el.style.top  = `${y}px`
}

export const TableFormatToolbar = Extension.create({
    name: 'tableFormatToolbar',

    addStorage() {
        return {
            show: () => {},
            hide: () => {},
            isOpen: () => false,
        }
    },

    addProseMirrorPlugins() {
        const editor = this.editor

        return [
            new Plugin({
                view: (view) => {
                    const doc = view.dom.ownerDocument
                    const win = doc.defaultView

                    const dispatch = (name, detail = {}) => {
                        doc.body.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
                    };

                    // ---------- tiny helpers ----------
                    const el = (tag, cls) => {
                        const e = doc.createElement(tag)
                        if (cls) e.className = cls
                        return e
                    }
                    const showNode = (n) => { n.style.display = 'block' }
                    const hideNode = (n) => { n.style.display = 'none' }

                    // Track where toolbar opened (so actions target the correct cell)
                    let lastContext = { mode: null, x: 0, y: 0 } // 'column' | 'row' | null

                    const isMergedNode = n => !!(n?.attrs?.colspan > 1 || n?.attrs?.rowspan > 1)

                    // replace your selectCellsBetween with this:
                    const selectCellsBetween = (view, firstEl, lastEl) => {
                        if (!firstEl || !lastEl) return
                        const { state } = view

                        const cell$FromEl = (el) => {
                            // try direct
                            try {
                                const pos0 = view.posAtDOM(el, 0)
                                const $0   = state.doc.resolve(pos0)
                                const $c0  = cellAround($0)
                                if ($c0) return $c0
                            } catch {}
                            // fallback to center coords
                            const r = el.getBoundingClientRect()
                            const posC = view.posAtCoords({
                                left: r.left + Math.min(8, r.width / 2),
                                top:  r.top  + Math.min(8, r.height / 2),
                            })?.pos
                            return posC != null ? cellAround(state.doc.resolve(posC)) : null
                        }

                        const $a = cell$FromEl(firstEl)
                        const $b = cell$FromEl(lastEl)
                        if (!$a || !$b) return

                        // 1) ensure focus first
                        if (!view.hasFocus()) view.focus()

                        // 2) move selection *into* the table first (handles “previous selection elsewhere”)
                        let tr = state.tr
                            .setSelection(TextSelection.near($a, 1))
                            .setMeta('addToHistory', false)       // don't pollute undo
                        view.dispatch(tr)

                        // 3) now set the true CellSelection
                        tr = view.state.tr
                            .setSelection(new CellSelection($a, $b))
                            .scrollIntoView()
                        view.dispatch(tr)

                        // 4) re-assert in case any UI races a TextSelection back in
                        queueMicrotask(() => {
                            if (!(view.state.selection instanceof CellSelection)) {
                                const tr2 = view.state.tr.setSelection(new CellSelection($a, $b)).scrollIntoView()
                                view.dispatch(tr2)
                            }
                            // final focus nudge
                            requestAnimationFrame(() => { if (!view.hasFocus()) view.focus() })
                        })
                    }


                    const getOverlayCells = () => {
                        const overlay = doc.querySelector('.ql-table-selection-rect-for-table-embed')
                        if (!overlay || overlay.style.display === 'none') return []
                        const R = overlay.getBoundingClientRect()

                        // Use the table under current selection (or the first in doc)
                        let table = null
                        try {
                            const domAt = view.domAtPos(view.state.selection.from).node
                            table = domAt?.closest?.('table') || doc.querySelector('table')
                        } catch {}
                        if (!table) return []

                        return Array.from(table.querySelectorAll('td,th')).filter(c => {
                            const b = c.getBoundingClientRect()
                            return !(R.right <= b.left || R.left >= b.right || R.bottom <= b.top || R.top >= b.bottom)
                        })
                    }


                    // Execute actions
                    const runAction = (action, payload) => {
                        const allOverlaysSectionCells = getOverlayCells();
                        console.log('allOverlaysSectionCells', allOverlaysSectionCells)
                        if(!allOverlaysSectionCells?.length) return false;

                        selectCellsBetween(editor.view,allOverlaysSectionCells[0],allOverlaysSectionCells[allOverlaysSectionCells?.length-1])

                        setTimeout(() => {
                            console.log('hasFocus', editor.view.hasFocus(),
                                'sel', editor.view.state.selection.constructor.name)
                        }, 0)

                        // === BACKGROUND COLOR across blue area ===
                        if (action === 'cell_bg_color') {
                            const color = payload?.color || 'none'
                            const val = color === 'none' ? '' : color
                            editor.chain().focus().setCellAttribute('backgroundColor', val).run()
                            return false
                        }



                        // === MERGE / UNMERGE across blue area ===
                        if (action === 'merge_cells') {
                            // const group = getSameTagOverlayGroup()
                            // if (!group || group.length < 2) return false
                            // if (!makeRectSelectionFromDomCells(group)) return false
                            return editor.chain().focus().mergeCells().run()
                        }

                        if (action === 'unmerge_cells') {
                            // Unmerge works when caret is in a merged cell or rectangle spans merged cells
                            return editor.chain().focus().splitCell().run()
                        }


                        // === ROW / COLUMN ops (unchanged) ===
                        const chain = editor.chain().focus()
                        switch (action) {
                            case 'add_column_left':  return chain.addColumnBefore().run()
                            case 'add_column_right': return chain.addColumnAfter().run()
                            case 'delete_column':    return chain.deleteColumn().run()
                            case 'add_row_top':      return chain.addRowBefore().run()
                            case 'add_row_bottom':   return chain.addRowAfter().run()
                            case 'delete_row':       return chain.deleteRow().run()
                            default:                 return false
                        }
                    }



                    // ---------- full-screen mask ----------
                    const mask = el('div', 'ql-blot-format-toolbar__mask')
                    Object.assign(mask.style, { position: 'fixed', inset: '0', display: 'none', zIndex: '100000' })
                    mask.setAttribute('aria-hidden', 'true')
                    doc.body.appendChild(mask)

                    mask.addEventListener('mousedown', (e) => {
                        if (e.target === mask) {
                            api.hide()
                            e.preventDefault()
                        }
                    })

                    // ---------- toolbar host ----------
                    const toolbar = el('div', 'ql-blot-format-toolbar ql-blot-format-toolbar-align-center')
                    toolbar.style.position = 'absolute'
                    mask.appendChild(toolbar)

                    // Keep clicks inside the toolbar from closing it
                    toolbar.addEventListener('mousedown', (e) => e.stopPropagation())

                    // ---------- dropdown & color picker toggles (UI only) ----------
                    // Works regardless of when innerHTML is replaced (delegation on static parent)
                    toolbar.addEventListener('mousedown', (e) => {
                        const button = e.target.closest('.ql-blot-format-toolbar__button')
                        if (!button) return
                        const isDropdown = button.dataset.type === 'dropdown'
                        const isColor    = button.dataset.type === 'color_picker'
                        if (!isDropdown && !isColor) return

                        const dropdown = button.querySelector('.ql-blot-format-toolbar__button_dropdown-menu')
                        const picker   = button.querySelector('.ql-blot-format-toolbar__button_color-picker')
                        if (dropdown) {
                            e.preventDefault()
                            dropdown.style.display = (dropdown.style.display === 'none' || !dropdown.style.display) ? 'block' : 'none'
                            // Close any sibling popovers to avoid overlap
                            toolbar.querySelectorAll('.ql-blot-format-toolbar__button_color-picker').forEach(n => { if (n !== picker) n.style.display = 'none' })
                        }
                        if (picker) {
                            e.preventDefault()
                            picker.style.display = (picker.style.display === 'none' || !picker.style.display) ? 'block' : 'none'
                            toolbar.querySelectorAll('.ql-blot-format-toolbar__button_dropdown-menu').forEach(n => { if (n !== dropdown) n.style.display = 'none' })
                        }
                    })

                    // ---------- action bindings (buttons, dropdown items, color swatches) ----------
                    toolbar.addEventListener('mousedown', (e) => {
                        // Color swatch
                        const swatch = e.target.closest('.ql-blot-format-toolbar__button_color-picker_option')
                        if (swatch) {
                            e.preventDefault()
                            const color = swatch.getAttribute('data-color') || 'none'
                            runAction('cell_bg_color', { color })
                            // keep toolbar open; just close the picker for nice UX
                            const picker = swatch.closest('.ql-blot-format-toolbar__button_color-picker')
                            if (picker) picker.style.display = 'none'
                            return
                        }

                        // Dropdown menu item
                        const item = e.target.closest('.ql-blot-format-toolbar__button_dropdown-menu_item')
                        if (item) {
                            e.preventDefault()
                            //if (item.classList.contains('is-disabled') || item.hasAttribute('disabled')) return
                            const action = item.getAttribute('data-action')
                            if (action) {
                                runAction(action)
                                setTimeout(()=> {updateMergeButtons()})
                                // Close the dropdown after action
                                const dropdown = item.closest('.ql-blot-format-toolbar__button_dropdown-menu')
                                if (dropdown) dropdown.style.display = 'none'
                            }
                            return
                        }

                        // Plain action button (NOT the color-picker or dropdown toggles)
                        const btn = e.target.closest('.ql-blot-format-toolbar__button')
                        if (btn) {
                            const t = btn.getAttribute('data-type')
                            if (t === 'dropdown' || t === 'color_picker') return // handled above
                            const action = btn.getAttribute('data-action')
                            if (action) {
                                e.preventDefault()
                                runAction(action)
                            }
                        }
                    })

                    // ---------- HTML (kept external / unchanged) ----------
                    // We just fill these strings in show(); use your existing HTML markup there.
                    const COLORS = ['none','#F7B79D','#FBE49D','#BFD8F6','#E4C8F6','#F6C8D4','#C9E8D2','#D9D9D9']

                    const columnToolbarHTML = `
            <div data-type="button" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="add_column_left">
              <div class="ql-blot-format-toolbar__button_inner"><span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 4.133a53.227 53.227 0 0 0-3.92.192.805.805 0 0 0-.74.745c-.024.308-.046.639-.067.988a1 1 0 1 1-1.996-.116c.02-.36.044-.705.07-1.029a2.805 2.805 0 0 1 2.552-2.58 58.143 58.143 0 0 1 5.1-.208c1.778 0 3.563.069 5.102.209a2.803 2.803 0 0 1 2.552 2.576c.149 1.89.222 4.498.222 7.09 0 2.592-.073 5.2-.222 7.09a2.803 2.803 0 0 1-2.552 2.576c-1.539.14-3.324.209-5.101.209-1.778 0-3.563-.069-5.101-.209a2.805 2.805 0 0 1-2.553-2.58 50.735 50.735 0 0 1-.07-1.028 1 1 0 1 1 1.997-.116c.02.349.043.68.067.988a.805.805 0 0 0 .74.744c1.182.108 2.533.172 3.92.194V4.133Zm2 0V11h4.871c-.016-2.217-.088-4.352-.212-5.933a.803.803 0 0 0-.739-.742A53.225 53.225 0 0 0 13 4.133ZM17.87 13H13v6.867a53.252 53.252 0 0 0 3.92-.193.803.803 0 0 0 .739-.741c.124-1.581.196-3.716.212-5.933ZM5 8.5a1 1 0 0 1 1 1V11h1.5a1 1 0 1 1 0 2H6v1.5a1 1 0 1 1-2 0V13H2.5a1 1 0 1 1 0-2H4V9.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/></svg>
</span></div>
            </div>
            <div data-type="button" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="add_column_right">
              <div class="ql-blot-format-toolbar__button_inner"><span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 4.133a53.227 53.227 0 0 0-3.92.192.803.803 0 0 0-.74.743c-.124 1.58-.195 3.715-.212 5.932H11V4.133Zm2 0c1.386.02 2.737.085 3.92.192a.805.805 0 0 1 .739.745c.024.308.047.639.067.988a1 1 0 1 0 1.997-.116c-.021-.36-.045-.705-.07-1.029a2.805 2.805 0 0 0-2.552-2.58A58.14 58.14 0 0 0 12 2.126a58.14 58.14 0 0 0-5.101.209A2.803 2.803 0 0 0 4.347 4.91C4.197 6.8 4.125 9.408 4.125 12c0 2.591.073 5.199.222 7.09a2.803 2.803 0 0 0 2.552 2.576c3.065.279 7.137.279 10.202 0a2.805 2.805 0 0 0 2.552-2.579c.025-.324.049-.668.07-1.029a1 1 0 1 0-1.997-.116c-.02.35-.043.68-.067.988a.806.806 0 0 1-.74.745 53.274 53.274 0 0 1-3.92.192V4.133Zm-2 15.735V13H6.128c.017 2.217.088 4.352.212 5.932a.803.803 0 0 0 .74.742c1.187.108 2.537.173 3.92.194ZM19 8.5a1 1 0 0 1 1 1V11h1.5a1 1 0 1 1 0 2H20v1.5a1 1 0 1 1-2 0V13h-1.5a1 1 0 1 1 0-2H18V9.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/></svg>
</span></div>
            </div>
            <div data-type="divider" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__divider"></div>

            <div data-type="dropdown" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="merge_cells">
              <div class="ql-blot-format-toolbar__button_inner">
                <div class="ql-blot-format-toolbar__button_inner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.91 4.347c3.76-.296 10.42-.296 14.18 0a2.803 2.803 0 0 1 2.577 2.552c.138 1.526.208 3.302.208 5.079v.044c0 1.777-.07 3.553-.208 5.08a2.803 2.803 0 0 1-2.577 2.551c-3.76.296-10.419.296-14.179 0a2.803 2.803 0 0 1-2.577-2.552c-.278-3.065-.278-7.137 0-10.202A2.803 2.803 0 0 1 4.91 4.347ZM19.869 11H18a1 1 0 1 0 0 2h1.868a53.167 53.167 0 0 1-.193 3.92.803.803 0 0 1-.742.74c-3.655.287-10.21.287-13.865 0a.803.803 0 0 1-.742-.74A53.247 53.247 0 0 1 4.133 13H6a1 1 0 1 0 0-2H4.133c.02-1.382.085-2.733.193-3.92a.803.803 0 0 1 .742-.74c3.655-.287 10.209-.287 13.865 0a.803.803 0 0 1 .742.74c.107 1.187.172 2.538.193 3.92ZM12 8.5a1 1 0 0 1 1 1V11h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V13H9.5a1 1 0 1 1 0-2H11V9.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/></svg>
</div>
                <div class="ql-blot-format-toolbar__button_inner-anchor">
                <svg viewBox="0 0 24 24" fill="#858585" width="17px" ><path  fill-rule="evenodd" d="M6.47 9.47a.75.75 0 0 1 1.06 0L12 13.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
</div>
              </div>
              <div class="ql-blot-format-toolbar__button_dropdown-menu" style="display:none">
                <div class="ql-blot-format-toolbar__button_dropdown-menu_body">
                  <div class="ql-blot-format-toolbar__button_dropdown-menu_items">
                    <button class="ql-blot-format-toolbar__button_dropdown-menu_item" data-action="merge_cells"><div class="ql-blot-format-toolbar__button_dropdown-menu_item-label">Merge Cells</div></button>
                    <button class="ql-blot-format-toolbar__button_dropdown-menu_item" data-action="unmerge_cells"><div class="ql-blot-format-toolbar__button_dropdown-menu_item-label">Unmerge Cells</div></button>
                  </div>
                </div>
              </div>
            </div>

            <div data-type="divider" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__divider"></div>

            <div data-type="color_picker" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="cell_bg_color">
              <div class="ql-blot-format-toolbar__button_inner">
                <div class="ql-blot-format-toolbar__button_inner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path d="M19.988,8.756a7.991,7.991,0,0,0-15.976,0A7.991,7.991,0,0,0,12,22.411,7.992,7.992,0,0,0,19.988,8.756Zm-3.315,4a8,8,0,0,0-2.354-3.713,5.938,5.938,0,0,1,3.625.737A5.963,5.963,0,0,1,16.673,12.754ZM12,20.188a6.013,6.013,0,0,1-2.807-3.706,7.864,7.864,0,0,0,5.614,0A6.013,6.013,0,0,1,12,20.188ZM6.056,9.778a5.934,5.934,0,0,1,3.625-.737,8,8,0,0,0-2.354,3.713A5.963,5.963,0,0,1,6.056,9.778Zm8.888,4.444a5.959,5.959,0,0,1-5.888,0A6,6,0,0,1,12,9.812,6,6,0,0,1,14.944,14.222ZM12,3a6,6,0,0,1,5.807,4.518A7.9,7.9,0,0,0,12,7.589a7.9,7.9,0,0,0-5.807-.071A6,6,0,0,1,12,3ZM9,21a5.993,5.993,0,0,1-4.673-9.754,8.018,8.018,0,0,0,2.685,4,7.971,7.971,0,0,0,2.669,5.715A6.133,6.133,0,0,1,9,21Zm6,0a6.133,6.133,0,0,1-.681-.041,7.971,7.971,0,0,0,2.669-5.715,8.018,8.018,0,0,0,2.685-4A5.993,5.993,0,0,1,15,21Z"/></svg>
</div>
                <div class="ql-blot-format-toolbar__button_inner-anchor">
                <svg viewBox="0 0 24 24" fill="#858585" width="17px" ><path  fill-rule="evenodd" d="M6.47 9.47a.75.75 0 0 1 1.06 0L12 13.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
</div>
              </div>
              <div class="ql-blot-format-toolbar__button_color-picker" style="display:none">
                <div class="ql-blot-format-toolbar__button_color-picker_options ql-blot-format-toolbar__button_color-picker_options-single-row">
                  ${COLORS.map(c => `<div class="ql-blot-format-toolbar__button_color-picker_option" data-color="${c}"></div>`).join('')}
                </div>
              </div>
            </div>

            <div data-type="divider" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__divider"></div>

            <div data-type="button" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="delete_column">
              <div class="ql-blot-format-toolbar__button_inner"><span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#c02828" width="17px" viewBox="0 0 24 24"><path d="M9.28 17.33c.05.52.48.9.99.9l.01-.01h.1a1 1 0 0 0 .89-1.1l-.07-.67c-.08-.84-.16-1.81-.24-2.88-.05-.74-.1-1.54-.14-2.38-.03-.55-.49-.97-1.05-.95-.55.03-.98.5-.95 1.05.05.86.1 1.67.15 2.43.07 1.09.16 2.08.24 2.93l.07.68Zm4.35.9h.1v.03c.5 0 .94-.38.99-.9l.07-.68c.08-.86.16-1.84.24-2.93.06-.76.11-1.58.15-2.43.03-.55-.4-1.02-.95-1.05a.986.986 0 0 0-1.05.95c-.04.84-.09 1.63-.14 2.38-.08 1.07-.16 2.03-.24 2.87l-.07.67c-.05.54.35 1.03.9 1.09Z"/><path fill-rule="evenodd" d="M19.567 8.61c.838-.278 1.423-1.072 1.423-2.02 0-.16-.02-.31-.05-.45-.09-.4-.24-.79-.44-1.16-.38-.71-1.11-1.14-2-1.19-.69-.04-1.75-.09-3.11-.12a2.2 2.2 0 0 0-2.13-1.68h-2.53A2.2 2.2 0 0 0 8.6 3.67c-1.36.04-2.42.08-3.11.12-.89.05-1.62.48-2 1.19-.2.37-.35.76-.44 1.16-.03.14-.05.29-.05.45 0 .949.585 1.742 1.424 2.02.536 4.824 1.278 8.745 1.696 10.71.23 1.09.96 1.91 1.94 2.19.78.23 2.088.49 3.935.49s3.156-.27 3.935-.49c.99-.28 1.71-1.1 1.94-2.19a110.522 110.522 0 0 0 1.697-10.71Zm-.906-1.882.279-.018c.04 0 .08-.06.08-.12-.05-.23-.13-.45-.25-.65-.05-.09-.22-.14-.35-.14-.8-.04-2.11-.1-3.81-.13-.45 0-.84-.32-.95-.76l-.18-.73c-.02-.1-.1-.17-.19-.17h-2.53L10.74 4c-.09 0-.17.07-.19.17l-.18.73c-.11.44-.5.75-.95.76-1.71.03-3.02.09-3.81.13-.13 0-.3.05-.35.14-.11.21-.2.43-.25.65 0 .07.03.12.08.13a38.845 38.845 0 0 0 .31.02c1 .067 2.64.14 5.057.163.49.005 1.01.007 1.563.007 2.867 0 4.846-.073 6.14-.143a48.401 48.401 0 0 0 .501-.03ZM6.46 8.8c.52 4.56 1.22 8.24 1.62 10.12.03.13.15.57.52.68.66.19 1.78.41 3.4.41 1.62 0 2.74-.22 3.4-.41.38-.11.5-.54.53-.68.39-1.87 1.1-5.55 1.62-10.12-1.28.06-3.1.11-5.54.11s-4.26-.05-5.54-.11h-.01Z" clip-rule="evenodd"/></svg>
</span></div>
            </div>
          `

                    const rowToolbarHTML = `
            <div data-type="button" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="add_row_top">
              <div class="ql-blot-format-toolbar__button_inner"><span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 1.5a1 1 0 0 1 1 1V4h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V6H9.5a1 1 0 1 1 0-2H11V2.5a1 1 0 0 1 1-1ZM7 5.217a1 1 0 0 1-.94 1.057c-.35.02-.68.042-.989.067a.805.805 0 0 0-.744.739A53.242 53.242 0 0 0 4.133 11h15.735a53.163 53.163 0 0 0-.193-3.92.805.805 0 0 0-.745-.74c-.308-.024-.639-.046-.988-.066a1 1 0 0 1 .116-1.997c.36.021.705.044 1.03.07a2.805 2.805 0 0 1 2.579 2.552c.278 3.065.278 7.137 0 10.202a2.803 2.803 0 0 1-2.577 2.552c-1.88.148-4.485.222-7.09.222-2.604 0-5.21-.074-7.09-.222a2.803 2.803 0 0 1-2.576-2.552A58.176 58.176 0 0 1 2.125 12c0-1.784.07-3.569.209-5.101a2.805 2.805 0 0 1 2.58-2.552c.323-.026.668-.049 1.028-.07A1 1 0 0 1 7 5.217ZM4.133 13c.02 1.382.085 2.733.193 3.92a.803.803 0 0 0 .742.74c1.589.124 3.725.195 5.932.211V13H4.133ZM13 13v4.871c2.208-.016 4.344-.087 5.933-.212a.803.803 0 0 0 .742-.739c.108-1.187.172-2.538.193-3.92H13Z" clip-rule="evenodd"/></svg>
</span></div>
            </div>
            <div data-type="button" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="add_row_bottom">
              <div class="ql-blot-format-toolbar__button_inner"><span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 6.129c-2.208.016-4.344.087-5.932.212a.803.803 0 0 0-.742.739A53.215 53.215 0 0 0 4.133 11H11V6.129Zm2 0V11h6.868a53.267 53.267 0 0 0-.193-3.92.803.803 0 0 0-.742-.74c-1.59-.124-3.725-.195-5.933-.211Zm8.875 5.849c0-1.777-.07-3.553-.208-5.079a2.803 2.803 0 0 0-2.578-2.552c-3.76-.296-10.418-.296-14.178 0a2.803 2.803 0 0 0-2.577 2.552c-.278 3.065-.278 7.137 0 10.202a2.805 2.805 0 0 0 2.58 2.552c.323.026.668.049 1.028.07a1 1 0 1 0 .116-1.997c-.349-.02-.68-.042-.988-.067a.805.805 0 0 1-.744-.739A53.247 53.247 0 0 1 4.133 13h15.735a53.167 53.167 0 0 1-.193 3.92.805.805 0 0 1-.745.74 48.44 48.44 0 0 1-.987.066 1 1 0 1 0 .116 1.997c.36-.021.704-.044 1.028-.07a2.805 2.805 0 0 0 2.58-2.552c.138-1.526.208-3.302.208-5.079v-.044ZM12 15.5a1 1 0 0 1 1 1V18h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V20H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/></svg>
</span></div>
            </div>
            <div data-type="divider" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__divider"></div>

            <div data-type="dropdown" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="merge_cells">
              <div class="ql-blot-format-toolbar__button_inner">
                <div class="ql-blot-format-toolbar__button_inner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.91 4.347c3.76-.296 10.42-.296 14.18 0a2.803 2.803 0 0 1 2.577 2.552c.138 1.526.208 3.302.208 5.079v.044c0 1.777-.07 3.553-.208 5.08a2.803 2.803 0 0 1-2.577 2.551c-3.76.296-10.419.296-14.179 0a2.803 2.803 0 0 1-2.577-2.552c-.278-3.065-.278-7.137 0-10.202A2.803 2.803 0 0 1 4.91 4.347ZM19.869 11H18a1 1 0 1 0 0 2h1.868a53.167 53.167 0 0 1-.193 3.92.803.803 0 0 1-.742.74c-3.655.287-10.21.287-13.865 0a.803.803 0 0 1-.742-.74A53.247 53.247 0 0 1 4.133 13H6a1 1 0 1 0 0-2H4.133c.02-1.382.085-2.733.193-3.92a.803.803 0 0 1 .742-.74c3.655-.287 10.209-.287 13.865 0a.803.803 0 0 1 .742.74c.107 1.187.172 2.538.193 3.92ZM12 8.5a1 1 0 0 1 1 1V11h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V13H9.5a1 1 0 1 1 0-2H11V9.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/></svg>
</div>
                <div class="ql-blot-format-toolbar__button_inner-anchor">
                <svg viewBox="0 0 24 24" fill="#858585" width="17px" ><path  fill-rule="evenodd" d="M6.47 9.47a.75.75 0 0 1 1.06 0L12 13.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
</div>
              </div>
              <div class="ql-blot-format-toolbar__button_dropdown-menu" style="display:none">
                <div class="ql-blot-format-toolbar__button_dropdown-menu_body">
                  <div class="ql-blot-format-toolbar__button_dropdown-menu_items">
                    <button class="ql-blot-format-toolbar__button_dropdown-menu_item" data-action="merge_cells"><div class="ql-blot-format-toolbar__button_dropdown-menu_item-label">Merge Cells</div></button>
                    <button class="ql-blot-format-toolbar__button_dropdown-menu_item" data-action="unmerge_cells"><div class="ql-blot-format-toolbar__button_dropdown-menu_item-label">Unmerge Cells</div></button>
                  </div>
                </div>
              </div>
            </div>

            <div data-type="divider" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__divider"></div>

            <div data-type="color_picker" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="cell_bg_color">
              <div class="ql-blot-format-toolbar__button_inner">
                <div class="ql-blot-format-toolbar__button_inner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="17px" viewBox="0 0 24 24"><path d="M19.988,8.756a7.991,7.991,0,0,0-15.976,0A7.991,7.991,0,0,0,12,22.411,7.992,7.992,0,0,0,19.988,8.756Zm-3.315,4a8,8,0,0,0-2.354-3.713,5.938,5.938,0,0,1,3.625.737A5.963,5.963,0,0,1,16.673,12.754ZM12,20.188a6.013,6.013,0,0,1-2.807-3.706,7.864,7.864,0,0,0,5.614,0A6.013,6.013,0,0,1,12,20.188ZM6.056,9.778a5.934,5.934,0,0,1,3.625-.737,8,8,0,0,0-2.354,3.713A5.963,5.963,0,0,1,6.056,9.778Zm8.888,4.444a5.959,5.959,0,0,1-5.888,0A6,6,0,0,1,12,9.812,6,6,0,0,1,14.944,14.222ZM12,3a6,6,0,0,1,5.807,4.518A7.9,7.9,0,0,0,12,7.589a7.9,7.9,0,0,0-5.807-.071A6,6,0,0,1,12,3ZM9,21a5.993,5.993,0,0,1-4.673-9.754,8.018,8.018,0,0,0,2.685,4,7.971,7.971,0,0,0,2.669,5.715A6.133,6.133,0,0,1,9,21Zm6,0a6.133,6.133,0,0,1-.681-.041,7.971,7.971,0,0,0,2.669-5.715,8.018,8.018,0,0,0,2.685-4A5.993,5.993,0,0,1,15,21Z"/></svg>
                </div>
                <div class="ql-blot-format-toolbar__button_inner-anchor">
                <svg viewBox="0 0 24 24" fill="#858585" width="17px"><path  fill-rule="evenodd" d="M6.47 9.47a.75.75 0 0 1 1.06 0L12 13.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
                </div>
              </div>
              <div class="ql-blot-format-toolbar__button_color-picker" style="display:none">
                <div class="ql-blot-format-toolbar__button_color-picker_options ql-blot-format-toolbar__button_color-picker_options-single-row">
                  ${COLORS.map(c => `<div class="ql-blot-format-toolbar__button_color-picker_option" data-color="${c}"></div>`).join('')}
                </div>
              </div>
            </div>

            <div data-type="divider" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__divider"></div>

            <div data-type="button" class="ql-blot-format-toolbar__item ql-blot-format-toolbar__button" data-action="delete_row">
              <div class="ql-blot-format-toolbar__button_inner"><span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#c02828" width="17px" viewBox="0 0 24 24"><path d="M9.28 17.33c.05.52.48.9.99.9l.01-.01h.1a1 1 0 0 0 .89-1.1l-.07-.67c-.08-.84-.16-1.81-.24-2.88-.05-.74-.1-1.54-.14-2.38-.03-.55-.49-.97-1.05-.95-.55.03-.98.5-.95 1.05.05.86.1 1.67.15 2.43.07 1.09.16 2.08.24 2.93l.07.68Zm4.35.9h.1v.03c.5 0 .94-.38.99-.9l.07-.68c.08-.86.16-1.84.24-2.93.06-.76.11-1.58.15-2.43.03-.55-.4-1.02-.95-1.05a.986.986 0 0 0-1.05.95c-.04.84-.09 1.63-.14 2.38-.08 1.07-.16 2.03-.24 2.87l-.07.67c-.05.54.35 1.03.9 1.09Z"/><path fill-rule="evenodd" d="M19.567 8.61c.838-.278 1.423-1.072 1.423-2.02 0-.16-.02-.31-.05-.45-.09-.4-.24-.79-.44-1.16-.38-.71-1.11-1.14-2-1.19-.69-.04-1.75-.09-3.11-.12a2.2 2.2 0 0 0-2.13-1.68h-2.53A2.2 2.2 0 0 0 8.6 3.67c-1.36.04-2.42.08-3.11.12-.89.05-1.62.48-2 1.19-.2.37-.35.76-.44 1.16-.03.14-.05.29-.05.45 0 .949.585 1.742 1.424 2.02.536 4.824 1.278 8.745 1.696 10.71.23 1.09.96 1.91 1.94 2.19.78.23 2.088.49 3.935.49s3.156-.27 3.935-.49c.99-.28 1.71-1.1 1.94-2.19a110.522 110.522 0 0 0 1.697-10.71Zm-.906-1.882.279-.018c.04 0 .08-.06.08-.12-.05-.23-.13-.45-.25-.65-.05-.09-.22-.14-.35-.14-.8-.04-2.11-.1-3.81-.13-.45 0-.84-.32-.95-.76l-.18-.73c-.02-.1-.1-.17-.19-.17h-2.53L10.74 4c-.09 0-.17.07-.19.17l-.18.73c-.11.44-.5.75-.95.76-1.71.03-3.02.09-3.81.13-.13 0-.3.05-.35.14-.11.21-.2.43-.25.65 0 .07.03.12.08.13a38.845 38.845 0 0 0 .31.02c1 .067 2.64.14 5.057.163.49.005 1.01.007 1.563.007 2.867 0 4.846-.073 6.14-.143a48.401 48.401 0 0 0 .501-.03ZM6.46 8.8c.52 4.56 1.22 8.24 1.62 10.12.03.13.15.57.52.68.66.19 1.78.41 3.4.41 1.62 0 2.74-.22 3.4-.41.38-.11.5-.54.53-.68.39-1.87 1.1-5.55 1.62-10.12-1.28.06-3.1.11-5.54.11s-4.26-.05-5.54-.11h-.01Z" clip-rule="evenodd"/></svg
                </span></div>
            </div>
          `


                    // Enable/disable merge/unmerge based on current overlay/selection
                    const updateMergeButtons = () => {
                        const mergeItem   = toolbar.querySelector('.ql-blot-format-toolbar__button_dropdown-menu_item[data-action="merge_cells"]')
                        const unmergeItem = toolbar.querySelector('.ql-blot-format-toolbar__button_dropdown-menu_item[data-action="unmerge_cells"]')
                        if (!mergeItem || !unmergeItem) return

                        let canMerge = false
                        let canUnmerge = false
                        const sel = view.state.selection

                        if (sel instanceof CellSelection) {
                            let count = 0, typeName = null, anyMerged = false
                            sel.forEachCell((node) => {
                                count
                                if (!typeName) typeName = node.type.name
                                if (typeName !== node.type.name) typeName = 'mixed'
                                if (isMergedNode(node)) anyMerged = true
                            })
                            // Allow merge for any rectangle of 2 cells with a consistent node type
                            canMerge   = count > 1 && typeName !== 'mixed'
                            canUnmerge = anyMerged
                        } else {
                            // No CellSelection → look at overlay
                            const { group } = getMergeContext() // majority tag (td or th)
                            const overlayCells = getOverlayCells()
                            const anyMerged = overlayCells.some(el => {
                                const pos = resolveCellNodePos(el)
                                return isMergedNode(view.state.doc.nodeAt(pos))
                            })
                            // If the user highlighted 2 cells of the same tag, we can build a rectangle and merge
                            canMerge   = !!(group && group.length > 1)
                            canUnmerge = anyMerged
                        }

                        const setDisabled = (el, disabled) => {
                            if (!el) return
                            if (disabled) { el.classList.add('is-disabled'); el.setAttribute('disabled','') }
                            else { el.classList.remove('is-disabled'); el.removeAttribute('disabled') }
                        }

                        setDisabled(mergeItem,   !canMerge)
                        setDisabled(unmergeItem, !canUnmerge)
                    }



                    // ---------- API ----------
                    const api = {
                        show: ({ mode, x, y, anchorRect = null, withMask = true, hideSelectors = [] }) => {
                            lastContext = { mode, x, y }
                            toolbar.innerHTML = (mode === 'column') ? columnToolbarHTML : rowToolbarHTML

                            if (withMask) showNode(mask); else hideNode(mask)
                            showNode(toolbar)

                            // Position toolbar at coordinates
                            // Position toolbar
                            // If anchorRect provided, compute position from it; else use x/y.
                            if (anchorRect) {
                                // ensure layout so offsetWidth/Height are valid
                                toolbar.style.visibility = 'hidden'
                                requestAnimationFrame(() => {
                                    toolbar.style.visibility = ''
                                    placeByRect(anchorRect, toolbar)
                                })
                            } else {
                                toolbar.style.left = `${x}px`
                                toolbar.style.top  = `${y}px`
                            }

                            //updateMergeButtons()
                            hideSelectors.forEach(sel => toolbar.querySelectorAll(sel).forEach(n => (n.style.display = 'none')))
                            dispatch('tbt-table-toolbar-opened', { mode, x, y });
                        },
                        hide: () => {
                            hideNode(mask)
                            // Close any open popovers
                            toolbar.querySelectorAll('.ql-blot-format-toolbar__button_dropdown-menu, .ql-blot-format-toolbar__button_color-picker')
                                .forEach(n => (n.style.display = 'none'))
                            lastContext = { mode: null, x: 0, y: 0 }

                            dispatch('tbt-table-toolbar-closed');
                        },
                        isOpen: () => mask.style.display !== 'none',
                    }

                    editor.storage.tableFormatToolbar.show = api.show
                    editor.storage.tableFormatToolbar.hide = api.hide
                    editor.storage.tableFormatToolbar.isOpen = api.isOpen

                    return { destroy() { mask.remove() } }
                },
            }),
        ]
    },
})

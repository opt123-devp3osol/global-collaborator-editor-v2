// extensions/TableHoverOverlay.js
import { Extension } from '@tiptap/core'
import { Plugin, TextSelection } from 'prosemirror-state'

let showSelectionOnHover = false;

export const TableHoverOverlay = Extension.create({
    name: 'tableHoverOverlay',

    addProseMirrorPlugins() {
        const editor = this.editor

        return [
            new Plugin({
                view(view) {
                    const doc = view.dom.ownerDocument
                    const win = doc.defaultView

                    // ---------- helpers ----------
                    const el = (tag, cls) => {
                        const e = doc.createElement(tag)
                        if (cls) e.className = cls
                        return e
                    }
                    const show = (n) => { n.style.display = '' }
                    const hide = (n) => { n.style.display = 'none' }

                    // ---------- overlay root (anchors to .tbt-scroll-wrap visible area) ----------
                    const overlay = el('div', 'ql-table-embed-formatter__overlay')
                    overlay.style.position = 'fixed'
                    overlay.style.display = 'none'
                    overlay.classList.add(
                        'ql-table-embed-formatter__overlay-show-row-handle',
                        'ql-table-embed-formatter__overlay-show-column-handle',
                    )
                    doc.body.appendChild(overlay)
                    overlay.setAttribute('tabindex', '-1')

                    const onToolbarClosed = () => {
                        // your 3 lines:
                        showSelectionOnHover = false;      // hide rectangle again
                        hide(selRect);
                        overlay.classList.remove('ql-table-overlay-active');
                        doc.body.addEventListener('tbt-table-toolbar-closed', onToolbarClosed, { capture: true });
                        // optional: clear indices so no re-highlight on next layout pass
                        currentRowIndex = null;
                        currentColIndex = null;
                        areaSelection = null;
                        layoutOverlay();
                    };

                    doc.body.addEventListener('tbt-table-toolbar-closed', onToolbarClosed, { capture: true });

                    const onToolbarOpened = () => {
                        overlay.classList.add('ql-table-overlay-active')
                    }

                    doc.body.addEventListener('tbt-table-toolbar-opened', onToolbarOpened, { capture: true })

                    // ---------- plus buttons ----------
                    const btnAddCols = el('div','ql-table-embed-formatter__handle-add-columns')
                    btnAddCols.innerHTML = `
            <div class="ql-table-embed-formatter__handle-add-columns_inner">
              <div class="ql-table-embed-formatter__handle-add-columns_icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="14px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v5.995a1 1 0 1 0 2 0V13h5.995a1 1 0 1 0 0-2H13V5Z" clip-rule="evenodd"/></svg>
              </div>
            </div>`
                    const btnAddRows = el('div','ql-table-embed-formatter__handle-add-rows')
                    btnAddRows.innerHTML = `
                        <div class="ql-table-embed-formatter__handle-add-rows_inner">
                          <div class="ql-table-embed-formatter__handle-add-rows_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#858585" width="14px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v5.995a1 1 0 1 0 2 0V13h5.995a1 1 0 1 0 0-2H13V5Z" clip-rule="evenodd"/></svg>
                          </div>
                        </div>`
                    overlay.appendChild(btnAddCols)
                    overlay.appendChild(btnAddRows)

                    // ---------- pools for top/left handles ----------
                    let colDots = []
                    let rowDots = []

                    // ---------- selection highlight rectangle ----------
                    const selRect = el('div','ql-table-selection-rect ql-table-selection-rect-v2 ql-table-selection-rect-for-table-embed')
                    selRect.appendChild(el('div','ql-table-selection-mask'))
                    hide(selRect)
                    overlay.appendChild(selRect)

                    // ---------- state ----------
                    let hoveredTable = null
                    let wrapper = null
                    let wrapperScrollHandler = null
                    let currentRowIndex = null
                    let currentColIndex = null
                    let anchorCell = null
                    let areaSelection = null

                    // track which toolbar is open ('column' | 'row' | null)
                    let openToolbarMode = null

                    // ---------- geometry helpers ----------
                    const rowsOf = (table) => Array.from(table.querySelectorAll('tr'))
                    const colsCountOf = (table) => {
                        const r0 = table.querySelector('tr')
                        return r0 ? r0.querySelectorAll('th,td').length : 0
                    }

                    const ensurePools = (rowsCount, colsCount) => {
                        // column handles
                        while (colDots.length < colsCount) {
                            const d = el('div','ql-table-embed-formatter__handle-column')
                            d.innerHTML = `<div class="ql-table-embed-formatter__handle-column_icon">
                                <svg focusable="false" viewBox="0 0 32 32" fill="#858585" width="12px"><path d="M14,5.5c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S14,3.8,14,5.5z M21,8.5c1.7,0,3-1.3,3-3s-1.3-3-3-3s-3,1.3-3,3S19.3,8.5,21,8.5z M11,12.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,12.5,11,12.5z M21,12.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S22.7,12.5,21,12.5z M11,22.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,22.5,11,22.5z M21,22.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S22.7,22.5,21,22.5z"></path></svg>
                              </div>`
                            d.style.position = 'absolute'
                            overlay.appendChild(d)
                            // open column toolbar on click
                            d.addEventListener('mousedown', (e) => {
                                e.preventDefault();
                                const idx = colDots.indexOf(d)
                                if (idx >= 0) {
                                    currentColIndex = idx
                                    showSelectionOnHover = true
                                    showColumnToolbar()
                                    overlay.classList.add('ql-table-overlay-active')
                                }
                            })
                            colDots.push(d)
                        }
                        while (colDots.length > colsCount) colDots.pop().remove()

                        // row handles
                        while (rowDots.length < rowsCount) {
                            const d = el('div','ql-table-embed-formatter__handle-row')
                            d.innerHTML = `<div class="ql-table-embed-formatter__handle-row_icon">
                                    <svg focusable="false" viewBox="0 0 32 32" fill="#858585" width="12px"><path d="M14,5.5c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S14,3.8,14,5.5z M21,8.5c1.7,0,3-1.3,3-3s-1.3-3-3-3s-3,1.3-3,3S19.3,8.5,21,8.5z M11,12.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,12.5,11,12.5z M21,12.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S22.7,12.5,21,12.5z M11,22.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,22.5,11,22.5z M21,22.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S22.7,22.5,21,22.5z"></path></svg>
                                  </div>`
                            d.style.position = 'absolute'
                            overlay.appendChild(d)
                            // open row toolbar on click
                            d.addEventListener('mousedown', (e) => {
                                e.preventDefault();
                                const idx = rowDots.indexOf(d)
                                if (idx >= 0) {
                                    showSelectionOnHover = true
                                    currentRowIndex = idx
                                    showRowToolbar()
                                    overlay.classList.add('ql-table-overlay-active')
                                }
                            })
                            rowDots.push(d)
                        }
                        while (rowDots.length > rowsCount) rowDots.pop().remove()
                    }

                    // ---------- layout & highlighting ----------
                    const layoutOverlay = () => {
                        if (!hoveredTable || !wrapper) return

                        const wrapperRect = wrapper.getBoundingClientRect()
                        const tableRect   = hoveredTable.getBoundingClientRect()

                        // position overlay to visible wrapper
                        overlay.style.left   = `${wrapperRect.left}px`
                        overlay.style.top    = `${wrapperRect.top}px`
                        overlay.style.width  = `${wrapperRect.width}px`
                        overlay.style.height = `${wrapperRect.height}px`
                        overlay.style.display = 'block'

                        const rows = rowsOf(hoveredTable)
                        const cols = colsCountOf(hoveredTable)
                        ensurePools(rows.length, cols)

                        // top column handles at each column top center
                        const firstRow = rows[0]
                        const firstRowCells = firstRow ? Array.from(firstRow.querySelectorAll('th,td')) : []
                        for (let c = 0; c < cols; c++) {
                            const cell = firstRowCells[c]; if (!cell) continue
                            const r = cell.getBoundingClientRect()
                            const left = r.left - wrapperRect.left + r.width/2 - 10
                            const top  = Math.min(-14, tableRect.top - wrapperRect.top - 14)
                            const dot = colDots[c]
                            dot.style.left = `${left}px`
                            dot.style.top  = `${top}px`
                            dot.classList.toggle('is-active', c === currentColIndex)
                        }

                        // left row handles at each row left center
                        for (let ri = 0; ri < rows.length; ri++) {
                            const cell = rows[ri].querySelector('th,td'); if (!cell) continue
                            const r = cell.getBoundingClientRect()
                            const top  = r.top - wrapperRect.top + r.height/2 - 10
                            const left = Math.min(-14, tableRect.left - wrapperRect.left - 14)
                            const dot = rowDots[ri]
                            dot.style.left = `${left}px`
                            dot.style.top  = `${top}px`
                            dot.classList.toggle('is-active', ri === currentRowIndex)
                        }

                        // position plus buttons relative to visible area & table edges
                        btnAddRows.style.position = 'absolute'
                        btnAddRows.style.left = `${tableRect.width/2 - 12}px`
                        btnAddRows.style.top  = `${Math.min(wrapperRect.height - 13, tableRect.bottom - wrapperRect.top) + 2}px`

                        btnAddCols.style.position = 'absolute'
                        btnAddCols.style.left = `${Math.min(wrapperRect.width - 13, tableRect.right - wrapperRect.left) + 2}px`
                        btnAddCols.style.top  = `${wrapperRect.height/2 - 12}px`

                        // keep toolbar aligned if it's open
                        if (editor.storage?.tableFormatToolbar?.isOpen?.() && openToolbarMode) {
                            if (openToolbarMode === 'column' && typeof currentColIndex === 'number') {
                                const cell = rows[0]?.querySelectorAll('th,td')[currentColIndex]
                                if (cell) {
                                    const cr = cell.getBoundingClientRect()
                                    const y = Math.min(cr.top, tableRect.top) - 42
                                    const x = cr.left
                                    editor.storage.tableFormatToolbar.show({ mode: 'column', x, y })
                                }
                            }
                            if (openToolbarMode === 'row' && typeof currentRowIndex === 'number') {
                                const row = rows[currentRowIndex]
                                const firstCell = row?.querySelector('th,td')
                                if (firstCell) {
                                    const fr = firstCell.getBoundingClientRect()
                                    const y = Math.min(fr.top, tableRect.top) - 42
                                    const x = fr.left
                                    editor.storage.tableFormatToolbar.show({ mode: 'row', x, y })
                                }
                            }
                        }

                        // highlight whichever is active
                        // only show selection rectangle if explicitly enabled
                        if (areaSelection && areaSelection.a?.isConnected && areaSelection.b?.isConnected) {
                            // persistent area highlight after mouseup
                            const w = (wrapper || hoveredTable).getBoundingClientRect()
                            setSelRectFromCells(areaSelection.a, areaSelection.b, w)
                        } else if (showSelectionOnHover) {
                            if (typeof currentColIndex === 'number') {
                                highlightColumn(currentColIndex, wrapperRect)
                            } else if (typeof currentRowIndex === 'number') {
                                highlightRow(currentRowIndex, wrapperRect)
                            } else {
                                hide(selRect)
                            }
                        } else {
                            hide(selRect)
                        }

                    }


                    // viewport rect covering both cells
                    const rectOfCells = (a, b) => {
                        const ar = a.getBoundingClientRect()
                        const br = b.getBoundingClientRect()
                        const left   = Math.min(ar.left,   br.left)
                        const top    = Math.min(ar.top,    br.top)
                        const right  = Math.max(ar.right,  br.right)
                        const bottom = Math.max(ar.bottom, br.bottom)
                        return { left, top, right, bottom, width: right-left, height: bottom-top }
                    }
                    // put caret inside a cell so it's editable

                    const setSelRectFromCells = (a, b, wrapperRect) => {
                        if (!a || !b) return hide(selRect)
                        const ar = a.getBoundingClientRect()
                        const br = b.getBoundingClientRect()
                        const x1 = Math.min(ar.left, br.left) - wrapperRect.left
                        const y1 = Math.min(ar.top,  br.top)  - wrapperRect.top
                        const x2 = Math.max(ar.right, br.right) - wrapperRect.left
                        const y2 = Math.max(ar.bottom, br.bottom) - wrapperRect.top
                        selRect.style.position = 'absolute'
                        selRect.style.left   = `${x1}px`
                        selRect.style.top    = `${y1}px`
                        selRect.style.width  = `${x2 - x1}px`
                        selRect.style.height = `${y2 - y1}px`
                        show(selRect)
                    }


                    const highlightColumn = (colIndex, wrapperRect) => {
                        const rows = rowsOf(hoveredTable)
                        if (!rows.length) return
                        const tableRect = hoveredTable.getBoundingClientRect()
                        const cell = rows[0].querySelectorAll('th,td')[colIndex]
                        if (!cell) return hide(selRect)
                        const cellRect = cell.getBoundingClientRect()

                        selRect.style.position = 'absolute'
                        selRect.style.left  = `${cellRect.left - wrapperRect.left}px`
                        selRect.style.top   = `${Math.max(0, tableRect.top - wrapperRect.top)}px`
                        selRect.style.width = `${cellRect.width}px`
                        selRect.style.height = `${Math.min(wrapperRect.bottom, tableRect.bottom) - Math.max(wrapperRect.top, tableRect.top)}px`
                        show(selRect)
                    }

                    const highlightRow = (rowIndex, wrapperRect) => {
                        const rows = rowsOf(hoveredTable)
                        const row = rows[rowIndex]; if (!row) return hide(selRect)
                        const first = row.querySelector('th,td')
                        const last  = row.querySelector('th:last-child,td:last-child') || row.lastElementChild
                        if (!first || !last) return hide(selRect)
                        const fr = first.getBoundingClientRect()
                        const lr = last.getBoundingClientRect()

                        selRect.style.position = 'absolute'
                        selRect.style.left   = `${Math.max(0, fr.left - wrapperRect.left)}px`
                        selRect.style.top    = `${fr.top - wrapperRect.top}px`
                        selRect.style.width  = `${Math.min(wrapperRect.right, lr.right) - Math.max(wrapperRect.left, fr.left)}px`
                        selRect.style.height = `${fr.height}px`
                        show(selRect)
                    }

                    // ---------- open/position toolbars ----------
                    const showColumnToolbar = () => {
                        const rows = rowsOf(hoveredTable)
                        if (!rows.length || currentColIndex == null) return
                        const tableRect = hoveredTable.getBoundingClientRect()
                        const cell = rows[0].querySelectorAll('th,td')[currentColIndex]
                        if (!cell) return
                        const cr = cell.getBoundingClientRect()
                        const y = Math.min(cr.top, tableRect.top) - 42
                        const x = cr.left
                        editor.storage?.tableFormatToolbar?.show?.({ mode: 'column', x, y })
                        openToolbarMode = 'column'
                        // keep highlight consistent
                        const wrapRect = (wrapper || hoveredTable).getBoundingClientRect()
                        highlightColumn(currentColIndex, wrapRect)
                    }

                    const showRowToolbar = () => {
                        const rows = rowsOf(hoveredTable)
                        if (!rows.length || currentRowIndex == null) return
                        const tableRect = hoveredTable.getBoundingClientRect()
                        const row = rows[currentRowIndex]
                        const first = row.querySelector('th,td'); if (!first) return
                        const fr = first.getBoundingClientRect()
                        const y = Math.min(fr.top, tableRect.top) - 42
                        const x = fr.left
                        editor.storage?.tableFormatToolbar?.show?.({ mode: 'row', x, y })
                        openToolbarMode = 'row'
                        const wrapRect = (wrapper || hoveredTable).getBoundingClientRect()
                        highlightRow(currentRowIndex, wrapRect)
                    }

                    const closeToolbars = () => {
                        editor.storage?.tableFormatToolbar?.hide?.()
                        openToolbarMode = null
                        showSelectionOnHover = false   // hide rectangle again
                        hide(selRect)
                        overlay.classList.remove('ql-table-overlay-active')
                    }

                    // ---------- scroll/resize binding ----------
                    const unbindWrapperScroll = () => {
                        if (wrapper && wrapperScrollHandler) {
                            wrapper.removeEventListener('scroll', wrapperScrollHandler, { capture: true })
                            wrapperScrollHandler = null
                        }
                    }
                    const bindWrapperScroll = () => {
                        unbindWrapperScroll()
                        if (!wrapper) return
                        wrapperScrollHandler = () => layoutOverlay()
                        wrapper.addEventListener('scroll', wrapperScrollHandler, { capture: true, passive: true })
                    }

                    // ---------- hover tracking ----------
                    const setHoveredTable = (table) => {
                        hoveredTable = table
                        wrapper = table?.closest('.tbt-scroll-wrap') || table
                        bindWrapperScroll()
                        areaSelection = null
                        currentRowIndex = null
                        currentColIndex = null
                        closeToolbars()
                        layoutOverlay()
                    }

                    const updateActiveFromTarget = (target) => {
                        if (!hoveredTable) return
                        const cell = target.closest?.('td,th')
                        if (!cell || !hoveredTable.contains(cell)) return
                        const rowEl = cell.parentElement
                        const allRows = rowsOf(hoveredTable)
                        currentRowIndex = allRows.indexOf(rowEl)
                        currentColIndex = cell.cellIndex
                        layoutOverlay()
                    }

                    const onMove = (e) => {
                        const t = e.target
                        const table = (t.nodeName === 'TABLE' ? t : t.closest?.('table'))
                        if (table && view.dom.contains(table)) {
                            if (hoveredTable !== table) setHoveredTable(table)
                            updateActiveFromTarget(t)
                        } else {
                            unbindWrapperScroll()
                            hoveredTable = null
                            wrapper = null
                            overlay.style.display = 'none'
                            hide(selRect)
                            // Do NOT force-close toolbar here; the shared mask will close on outside click.
                        }
                    }

                    view.dom.addEventListener('mousedown', (ev) => {
                        // ignore toolbar/mask/handles
                        const bad = ev.target.closest('.ql-blot-format-toolbar, .ql-blot-format-toolbar__mask, .ql-table-embed-formatter__handle-row, .ql-table-embed-formatter__handle-column')
                        if (bad) return
                        const cell = ev.target.closest?.('td,th')
                        if (!cell) return
                        const table = cell.closest('table')
                        if (!table || !view.dom.contains(table)) return
                        if (hoveredTable !== table) setHoveredTable(table)

                        // SHIFTClick → range select; plain click → set anchor only (no overlay)
                        if (ev.shiftKey) {
                            ev.preventDefault()
                            const start = (anchorCell && anchorCell.isConnected && hoveredTable.contains(anchorCell))
                                ? anchorCell
                                : cell

                            // compute rect  show overlay & toolbar
                            const rows = rowsOf(hoveredTable)
                            const rc = (domCell) => ({ r: rows.indexOf(domCell.parentElement), c: domCell.cellIndex })
                            const a = rc(start), b = rc(cell)
                            if (a.r < 0 || a.c < 0 || b.r < 0 || b.c < 0) return

                            const r0 = Math.min(a.r, b.r), r1 = Math.max(a.r, b.r)
                            const c0 = Math.min(a.c, b.c), c1 = Math.max(a.c, b.c)
                            const tl = rows[r0]?.querySelectorAll('th,td')[c0]
                            const br = rows[r1]?.querySelectorAll('th,td')[c1]
                            if (!tl || !br) return

                            areaSelection = { a: tl, b: br }
                            showSelectionOnHover = true
                            overlay.classList.add('ql-table-overlay-active')

                            const anchorRect = rectOfCells(tl, br)
                            const cols = colsCountOf(hoveredTable)
                            const fullRowSpan = (c0 === 0 && c1 === cols - 1)
                            const fullColSpan = (r0 === 0 && r1 === rows.length - 1)
                            const singleCell = (r0 === r1 && c0 === c1)
                            const hideForArea = [
                                '[data-action="add_row_top"]',
                                '[data-action="add_row_bottom"]',
                                '[data-action="delete_row"]',
                                '[data-action="add_column_left"]',
                                '[data-action="add_column_right"]',
                                '[data-action="delete_column"]',
                            ]
                            const withMask = !singleCell
                            if (fullColSpan) {
                                editor.storage?.tableFormatToolbar?.show?.({ mode: 'column', anchorRect, withMask })
                                openToolbarMode = 'column'
                            } else if (fullRowSpan) {
                                editor.storage?.tableFormatToolbar?.show?.({ mode: 'row', anchorRect, withMask })
                                openToolbarMode = 'row'
                            } else {
                                editor.storage?.tableFormatToolbar?.show?.({ mode: 'row', anchorRect, withMask, hideSelectors: hideForArea })
                                openToolbarMode = 'row'
                            }
                            layoutOverlay()
                        } else {
                            // plain click → caret editing and anchor set; no overlay shown
                            anchorCell = cell
                            closeToolbars()
                            // allow default so caret goes inside the cell
                        }
                    }, true)

                    const onDocScrollOrResize = () => {
                        if (hoveredTable) layoutOverlay()
                    }

                    view.dom.addEventListener('mousemove', onMove)
                    doc.addEventListener('scroll', onDocScrollOrResize, true)
                    win?.addEventListener('resize', onDocScrollOrResize)

                    // ---------- plus buttons add row/col after current hover ----------
                    const focusCellAt = (rowIndex, colIndex) => {
                        if (!hoveredTable) return false
                        const rows = rowsOf(hoveredTable)
                        if (rowIndex == null || colIndex == null) return false
                        const targetCell = rows[rowIndex]?.querySelectorAll('th,td')[colIndex]
                        if (!targetCell) return false
                        try {
                            const pos = view.posAtDOM(targetCell, 0)
                            const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, pos))
                            view.dispatch(tr)
                            editor.commands.focus()
                            return true
                        } catch { return false }
                    }

                    btnAddRows.addEventListener('mousedown', (e) => {
                        e.preventDefault()
                        if (!hoveredTable) return
                        const rows = rowsOf(hoveredTable)
                        const rIdx = (typeof currentRowIndex === 'number') ? currentRowIndex : (rows.length - 1)
                        const cIdx = 0
                        if (focusCellAt(rIdx, cIdx)) {
                            editor.chain().addRowAfter().run()
                            setTimeout(layoutOverlay, 0)
                        }
                    })

                    btnAddCols.addEventListener('mousedown', (e) => {
                        e.preventDefault()
                        if (!hoveredTable) return
                        const cols = colsCountOf(hoveredTable)
                        const cIdx = (typeof currentColIndex === 'number') ? currentColIndex : (cols - 1)
                        const rIdx = 0
                        if (focusCellAt(rIdx, cIdx)) {
                            editor.chain().addColumnAfter().run()
                            setTimeout(layoutOverlay, 0)
                        }
                    })

                    // ---------- teardown ----------
                    return {
                        destroy() {
                            view.dom.removeEventListener('mousemove', onMove)
                            doc.removeEventListener('scroll', onDocScrollOrResize, true)
                            win?.removeEventListener('resize', onDocScrollOrResize)
                            unbindWrapperScroll()
                            overlay.remove()
                            editor.storage?.tableFormatToolbar?.hide?.()
                            anchorCell = null
                            areaSelection = null
                            // clean up our listeners
                            doc.body.removeEventListener('tbt-table-toolbar-opened', onToolbarOpened, { capture: true })
                            doc.body.removeEventListener('tbt-table-toolbar-opened', onToolbarClosed, { capture: true })
                        },
                    }
                },
            }),
        ]
    },
})

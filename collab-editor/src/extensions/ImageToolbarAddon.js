import { NodeSelection } from 'prosemirror-state'

/**
 * mountImageToolbar
 * @param {Object} params
 * @param {import('@tiptap/core').Editor} params.editor
 * @param {any} params.node                     // ProseMirror node
 * @param {() => number} params.getPos          // NodeView getPos
 * @param {HTMLElement} params.wrapperEl        // your outer node wrapper (block)
 * @param {HTMLImageElement} params.imgEl       // the <img> element
 * @param {HTMLElement} [params.body]           // (optional) explicit iframe body; if omitted we resolve it
 */
export function mountImageToolbar({ editor, node, getPos, wrapperEl, imgEl, body }) {
    // Resolve iframe-safe document/window/body
    const viewDom = editor?.view?.dom
    const doc = body?.ownerDocument || (viewDom && viewDom.ownerDocument)
    if (!doc) return
    const win = doc.defaultView
    const rootBody = body || doc.body

    // Create toolbar container (absolute, appended to iframe body)
    const toolbar = doc.createElement('div')
    toolbar.setAttribute('tabindex', '-1')
    toolbar.setAttribute('data-floating-ui-focusable', '')
    Object.assign(toolbar.style, {
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: '50',
        transform: 'translate(0,0)',
        transitionProperty: 'opacity',
        transitionDuration: '250ms',
        opacity: '0',
        pointerEvents: 'none',
    })

    // Provided HTML (unchanged structure/icons)
    toolbar.innerHTML = `
<div role="toolbar" aria-label="toolbar" data-variant="floating" class="tiptap-toolbar">
  <div role="group" class="tiptap-toolbar-group"></div>
  <div class="tiptap-separator" data-orientation="vertical" role="none"></div>
  <div role="group" class="tiptap-toolbar-group"></div>
  <div class="tiptap-separator" data-orientation="vertical" role="none"></div>
  <div role="group" class="tiptap-toolbar-group"></div>
  <div class="tiptap-separator" data-orientation="vertical" role="none"></div>
  <div role="group" class="tiptap-toolbar-group">
    <button class="tbt-align-left tiptap-button" aria-label="Image align left" type="button" data-style="ghost" data-active-state="off" data-disabled="false" role="button" tabindex="-1" aria-pressed="false">
      <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 2C4 1.44772 3.55228 1 3 1C2.44772 1 2 1.44772 2 2V22C2 22.5523 2.44772 23 3 23C3.55228 23 4 22.5523 4 22V2Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4C8.34315 4 7 5.34315 7 7V17C7 18.6569 8.34315 20 10 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H10ZM9 7C9 6.44772 9.44772 6 10 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H10C9.44772 18 9 17.5523 9 17V7Z" fill="currentColor"></path></svg>
    </button>
    <button class="tbt-align-center tiptap-button" aria-label="Image align center" type="button" data-style="ghost" data-active-state="off" data-disabled="false" role="button" tabindex="-1" aria-pressed="false">
      <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C12.5523 1 13 1.44772 13 2V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V2C11 1.44772 11.4477 1 12 1Z" fill="currentColor"></path><path d="M2 7C2 5.34315 3.34315 4 5 4H7C7.55228 4 8 4.44772 8 5C8 5.55228 7.55228 6 7 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H7C7.55228 18 8 18.4477 8 19C8 19.5523 7.55228 20 7 20H5C3.34315 20 2 18.6569 2 17V7Z" fill="currentColor"></path><path d="M19 4C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H17C16.4477 20 16 19.5523 16 19C16 18.4477 16.4477 18 17 18H19C19.5523 18 20 17.5523 20 17V7C20 6.44772 19.5523 6 19 6H17C16.4477 6 16 5.55228 16 5C16 4.44772 16.4477 4 17 4H19Z" fill="currentColor"></path></svg>
    </button>
    <button class="tbt-align-right tiptap-button" aria-label="Image align right" type="button" data-style="ghost" data-active-state="off" data-disabled="false" role="button" tabindex="-1" aria-pressed="false">
      <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C21.5523 1 22 1.44772 22 2V22C22 22.5523 21.5523 23 21 23C20.4477 23 20 22.5523 20 22V2C20 1.44772 20.4477 1 21 1Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H14C15.6569 4 17 5.34315 17 7V17C17 18.6569 15.6569 20 14 20H5C3.34315 20 2 18.6569 2 17V7ZM5 6C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H14C14.5523 18 15 17.5523 15 17V7C15 6.44772 14.5523 6 14 6H5Z" fill="currentColor"></path></svg>
    </button>
    <div class="tiptap-separator" data-orientation="vertical" aria-orientation="vertical" role="separator"></div>
    <button class="tbt-download tiptap-button" aria-label="Download image" type="button" data-style="ghost" data-active-state="off" role="button" tabindex="-1" data-disabled="false">
      <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12.5523 2 13 2.44772 13 3V14.5858L17.2929 10.2929C17.6834 9.90237 18.3166 9.90237 18.7071 10.2929C19.0976 10.6834 19.0976 11.3166 18.7071 11.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929C5.68342 9.90237 6.31658 9.90237 6.70711 10.2929L11 14.5858V3C11 2.44772 11.4477 2 12 2Z" fill="currentColor"></path><path d="M5 20C4.44772 20 4 20.4477 4 21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20H5Z" fill="currentColor"></path></svg>
    </button>
    <div class="tiptap-separator" data-orientation="vertical" aria-orientation="vertical" role="separator"></div>
    <button class="tbt-delete tiptap-button" aria-label="Delete" type="button" data-style="ghost" role="button" tabindex="-1">
      <svg width="24" height="24" class="tiptap-button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 3.17477 7.40255 2.43324 7.91789 1.91789C8.43324 1.40255 9.17477 1 10 1H14C14.8252 1 15.5668 1.40255 16.0821 1.91789C16.5975 2.43324 17 3.17477 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H20V20C20 20.8252 19.5975 21.5668 19.0821 22.0821C18.5668 22.5975 17.8252 23 17 23H7C6.17477 23 5.43324 22.5975 4.91789 22.0821C4.40255 21.5668 4 20.8252 4 20V7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7ZM9 4C9 3.82523 9.09745 3.56676 9.33211 3.33211C9.56676 3.09745 9.82523 3 10 3H14C14.1748 3 14.4332 3.09745 14.6679 3.33211C14.9025 3.56676 15 3.82523 15 4V5H9V4ZM6 7V20C6 20.1748 6.09745 20.4332 6.33211 20.6679C6.56676 20.9025 6.82523 21 7 21H17C17.1748 21 17.4332 20.9025 17.6679 20.6679C17.9025 20.4332 18 20.1748 18 20V7H6Z" fill="currentColor"></path></svg>
    </button>
  </div>
  <div role="group" class="tiptap-toolbar-group"></div>
</div>`

    // Mount now (to the iframe body)
    rootBody.appendChild(toolbar)

    // Helpers
    const applyAlign = (a) => {
        const wrapperImageMainEl = wrapperEl.querySelector('.tiptap-image-container');
        if(wrapperImageMainEl) {
            if (a === 'center') {
                wrapperImageMainEl.style.margin = '0 auto'
                wrapperImageMainEl.style.textAlign = 'center'
            } else if (a === 'right') {
                wrapperImageMainEl.style.marginLeft = 'auto'
                wrapperImageMainEl.style.marginRight = '0'
                wrapperImageMainEl.style.textAlign = 'right'
            } else {
                wrapperImageMainEl.style.margin = '0'
                wrapperImageMainEl.style.textAlign = 'left'
            }
        }
    }
    applyAlign(node.attrs.align || 'left')

    const positionToolbar = () => {
        const imgRect = imgEl.getBoundingClientRect()
        const toolbarRect = toolbar.getBoundingClientRect()
        const scrollX = win.scrollX || doc.documentElement.scrollLeft || 0
        const scrollY = win.scrollY || doc.documentElement.scrollTop || 0

        const rawLeft = scrollX + imgRect.left + (imgRect.width - toolbarRect.width) / 2
        const rawTop = scrollY + imgRect.top - toolbarRect.height - 6

        const clampedLeft = Math.max(8, rawLeft)
        const clampedTop = Math.max(8, rawTop)

        toolbar.style.transform = `translate(${clampedLeft}px, ${clampedTop}px)`
    }

    const updateActiveStates = () => {
        const a = node.attrs.align || 'left';
        toolbar.querySelector('.tbt-align-left')?.setAttribute('data-active-state', a === 'left' ? 'on' : 'off')
        toolbar.querySelector('.tbt-align-center')?.setAttribute('data-active-state', a === 'center' ? 'on' : 'off')
        toolbar.querySelector('.tbt-align-right')?.setAttribute('data-active-state', a === 'right' ? 'on' : 'off')
    }

    const showToolbar = () => {
        positionToolbar()
        toolbar.style.opacity = '1'
        toolbar.style.pointerEvents = 'auto'
        updateActiveStates()
    }

    const hideToolbar = () => {
        toolbar.style.opacity = '0'
        toolbar.style.pointerEvents = 'none'
    }

    // Events – all bound to iframe doc/win
    toolbar.addEventListener('mousedown', (e) => e.preventDefault())

    const setAlign = (a) => {
        const pos = getPos()
        editor.chain().setNodeSelection(pos).updateAttributes('image', { align: a }).run()
        applyAlign(a)
        updateActiveStates()
        positionToolbar()
    }

    toolbar.querySelector('.tbt-align-left')?.addEventListener('click', () => setAlign('left'))
    toolbar.querySelector('.tbt-align-center')?.addEventListener('click', () => setAlign('center'))
    toolbar.querySelector('.tbt-align-right')?.addEventListener('click', () => setAlign('right'))

    toolbar.querySelector('.tbt-download')?.addEventListener('click', () => {
        const a = doc.createElement('a')
        a.href = imgEl.src
        a.download = (node.attrs.alt || 'image').replace(/\s+/g, '_')
        rootBody.appendChild(a)
        a.click()
        a.remove()
    })

    toolbar.querySelector('.tbt-delete')?.addEventListener('click', () => {
        const pos = getPos()
        const tr = editor.view.state.tr.setSelection(
            new NodeSelection(editor.view.state.doc.resolve(pos))
        )
        editor.view.dispatch(tr.deleteSelection())
        hideToolbar()
    })

    // Show/hide by clicking the image (no global doc usage)
    const onImageMouseDown = (e) => {
        e.preventDefault()
        const pos = getPos()
        const tr = editor.view.state.tr.setSelection(
            new NodeSelection(editor.view.state.doc.resolve(pos))
        )
        editor.view.dispatch(tr)
        editor.view.focus()
        showToolbar()
    }
    imgEl.addEventListener('mousedown', onImageMouseDown)

    const onAnyMouseDown = (e) => {
        if (wrapperEl.contains(e.target)) return
        if (toolbar.contains(e.target)) return
        hideToolbar()
    }
    doc.addEventListener('mousedown', onAnyMouseDown)

    const onScrollOrResize = () => {
        if (toolbar.style.pointerEvents === 'auto') positionToolbar()
    }
    win.addEventListener('scroll', onScrollOrResize, true)
    win.addEventListener('resize', onScrollOrResize, true)

    // Return APIs you can call from your NodeView's update/destroy
    return {
        update(updatedNode) {
            if (updatedNode.attrs.align !== node.attrs.align) {
                applyAlign(updatedNode.attrs.align)
                updateActiveStates()
                positionToolbar()
            }
            node = updatedNode
        },
        destroy() {
            imgEl.removeEventListener('mousedown', onImageMouseDown)
            doc.removeEventListener('mousedown', onAnyMouseDown)
            win.removeEventListener('scroll', onScrollOrResize, true)
            win.removeEventListener('resize', onScrollOrResize, true)
            toolbar.remove()
        },
        show: showToolbar,
        hide: hideToolbar,
    }
}

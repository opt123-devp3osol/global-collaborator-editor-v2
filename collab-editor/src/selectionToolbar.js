import {buildToolbarButtonsHtml, wireToolbarFunctions} from "./toolbarCommon.js";

export function createSelectionToolbar(toolbarMainDiv, tools = []) {
    toolbarMainDiv.className = 'ge_selection_toolbar global_editor_toolbar';
    const toolbar = document.createElement('div');
    toolbar.className = 'global_editor_toolbar_button_pane';
    toolbar.innerHTML = buildToolbarButtonsHtml(tools);
    toolbarMainDiv.appendChild(toolbar);
}

export function wireSelectionToolbar(editor, root) {
    if (!editor || !root) return;
    const doc = root.ownerDocument;
    const HIDDEN_TRANSFORM = 'translate3d(-9999px, -9999px, 0)';

    const hide = () => {
        root.classList.remove('is-visible');
        root.style.transform = HIDDEN_TRANSFORM;
    };

    const showAtSelection = () => {
        const { state, view } = editor;
        const { selection } = state

        const { from, to, empty  } = selection;
        if (empty || from === to) {
            hide();
            return;
        }
        const selectedText = state.doc.textBetween(from, to, "\n");
        if (!selectedText || !selectedText.trim()) {
            return;
        }

        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);

        const top = Math.min(start.top, end.top);
        const bottom = Math.max(start.bottom, end.bottom);
        const left = Math.min(start.left, end.left);
        const right = Math.max(start.right, end.right);

        const parent = root.offsetParent || doc.body;
        const parentRect = parent.getBoundingClientRect();

        root.classList.add('is-visible');
        const bubbleRect = root.getBoundingClientRect();

        let x = (left + right) / 2 - bubbleRect.width / 2;
        let y = top - bubbleRect.height - 8;

        const padding = 8;
        x = Math.max(
            parentRect.left + padding,
            Math.min(x, parentRect.right - bubbleRect.width - padding),
        );

        if (y < parentRect.top + padding) {
            y = bottom + 8;
        }

        const localX = x - parentRect.left;
        const localY = y - parentRect.top;

        root.style.transform = `translate3d(${localX}px, ${localY}px, 0)`;
    };

    const refresh = wireToolbarFunctions(root,editor,showAtSelection);
    const update = () => refresh?.();
    let isMouseDown = false;
    // Detect drag start
    doc.addEventListener('mousedown', (e) => {
        if(root.contains(e.target)) return;
        isMouseDown = true;
        hide();               // hide bubble while dragging
    });
    // Detect drag end
    doc.addEventListener('mouseup', (e) => {
        // If mouseup is on the floating toolbar itself, don't force-hide it
        if(root.contains(e.target)) return;
        update();
        isMouseDown = false;
    });

    doc.addEventListener(
        'scroll',
        () => {
            if (root.classList.contains('is-visible')) {
                showAtSelection();
            }
        },
        true,
    );

    // // Selection update, but show only after mouse is released
    editor.on('selectionUpdate', () => {
        if (!isMouseDown) update();
    });
    // Show when content changes but only if user isn't dragging
    editor.on('transaction', () => {
        if (!isMouseDown) update();
    });
    // On update from external change (socket)
    editor.on('update', () => {
        if (!isMouseDown) update();
    });

    // Initial state
    hide();
}

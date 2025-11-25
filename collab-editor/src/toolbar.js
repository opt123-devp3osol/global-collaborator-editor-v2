// Alignment SVGs shown on the Paragraph Formatting button
import {buildToolbarButtonsHtml, wireToolbarFunctions} from "./toolbarCommon.js";

export function createToolbar(toolbarMainDiv, tools = []) {
    toolbarMainDiv.className = 'ge_tool_bar_container_at_top ge_above_the_editor global_editor_toolbar';
    const toolbar = document.createElement('div');
    toolbar.className = 'global_editor_toolbar_button_pane';
    toolbar.innerHTML = buildToolbarButtonsHtml(tools);
    toolbarMainDiv.appendChild(toolbar);
}

// Call *after* you've called createToolbar() and inserted its HTML.
export function wireToolbar(editor, root) {
    const refresh = wireToolbarFunctions(root,editor)
    editor.on('selectionUpdate', refresh);
    editor.on('update', refresh);
    editor.on('transaction', refresh);
    setTimeout(refresh, 0);
}

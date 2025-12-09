// Alignment SVGs shown on the Paragraph Formatting button
const ALIGN_ICONS = {
    left: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.5 13.5"><g transform="translate(20282.75 12757.75)"><line x2="14" transform="translate(-20282 -12757)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(-20282 -12749)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(-20282 -12753)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(-20282 -12745)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
  `,
    center: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.5 13.5"><g transform="translate(-1237.75 -88.25)"><line x2="14" transform="translate(1238.5 89)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(1238.5 97)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(1241.5 93)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(1241.5 101)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
  `,
    right: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.5 13.5"><g transform="translate(0.75 0.75)"><line x1="14" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x1="14" transform="translate(0 8)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x1="8" transform="translate(6 4)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x1="8" transform="translate(6 12)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
  `,
    justify: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.5 13.5"><g transform="translate(-1237.75 -88.25)"><line x2="14" transform="translate(1238.5 89)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(1238.5 97)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(1238.5 93)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(1238.5 101)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
  `,
};

// List SVGs shown on the List button & dropdown
export const LIST_ICONS = {
    bullet: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
      <g fill="none" stroke="#1a1f22" stroke-width="1.4" stroke-linecap="round">
        <circle cx="2.5" cy="3" r="0.9"></circle>
        <circle cx="2.5" cy="8" r="0.9"></circle>
        <circle cx="2.5" cy="13" r="0.9"></circle>
        <line x1="5" y1="3" x2="14" y2="3"></line>
        <line x1="5" y1="8" x2="14" y2="8"></line>
        <line x1="5" y1="13" x2="14" y2="13"></line>
      </g>
    </svg>
  `,
    ordered: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
      <g fill="none" stroke="#1a1f22" stroke-width="1.4" stroke-linecap="round">
        <path d="M2.2 2.5h1.1V1H1.5"></path>
        <path d="M1.5 7h1.2l-1.2 1.2V9h2.1"></path>
        <path d="M1.5 11.5h2.1L1.5 14h2.1"></path>
        <line x1="5.5" y1="3"  x2="14" y2="3"></line>
        <line x1="5.5" y1="8"  x2="14" y2="8"></line>
        <line x1="5.5" y1="13" x2="14" y2="13"></line>
      </g>
    </svg>
  `,
    task: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
      <g fill="none" stroke="#1a1f22" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1.5" y="1.5" width="3" height="3" rx="0.6"></rect>
        <rect x="1.5" y="6.5" width="3" height="3" rx="0.6"></rect>
        <rect x="1.5" y="11.5" width="3" height="3" rx="0.6"></rect>
        <polyline points="2.1 3.4 2.9 4.2 4 2.7"></polyline>
        <line x1="5.5" y1="3"  x2="14" y2="3"></line>
        <line x1="5.5" y1="8"  x2="14" y2="8"></line>
        <line x1="5.5" y1="13" x2="14" y2="13"></line>
      </g>
    </svg>
  `,
};


export function buildToolbarButtonsHtml(tools = []) {
    let html = '';

    if (tools.includes('text') || !tools?.length) {
        html += `
          <!-- Text -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="boldButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 11.382 15.5"><path d="M6,10.588h5.765a3.294,3.294,0,0,0,3.294-3.294h0A3.294,3.294,0,0,0,11.765,4H7.647A1.647,1.647,0,0,0,6,5.647Zm0,0v5.765A1.647,1.647,0,0,0,7.647,18h4.529a3.706,3.706,0,0,0,3.706-3.706h0a3.706,3.706,0,0,0-3.706-3.706Z" transform="translate(-5.25 -3.25)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5" fill-rule="evenodd"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Strong</span><span class="shortcut">Ctrl+B</span></div>
            </div>
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="italicButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Emphasis</span><span class="shortcut">Ctrl+I</span></div>
            </div>
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="underlineButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 14.5 15.5"><g transform="translate(20404.113 12759.75)"><path d="M6,4V9.587a4.789,4.789,0,0,0,4.789,4.789h0a4.789,4.789,0,0,0,4.789-4.789V4" transform="translate(-20407.416 -12763)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5" fill-rule="evenodd"></path><line x2="13" transform="translate(-20403.363 -12745)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Underline</span><span class="shortcut">Ctrl+U</span></div>
            </div>
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="strikeButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16.5 16.501"><g transform="translate(-3.25 -3.25)"><g transform="translate(4 4)"><path d="M11.5,11.5a5.608,5.608,0,0,1,2.386.522,4.725,4.725,0,0,1,.9.55,3.97,3.97,0,0,1,.826.871,3.164,3.164,0,0,1,.577,1.924,3.245,3.245,0,0,1-.727,1.892,4.475,4.475,0,0,1-1.83,1.332,5.7,5.7,0,0,1-2.422.4,5.5,5.5,0,0,1-2.34-.641,4.127,4.127,0,0,1-1.607-1.5M11.5,11.5H4m7.5,0H19M15.742,6.154a4.126,4.126,0,0,0-1.607-1.5,5.5,5.5,0,0,0-2.34-.641,5.7,5.7,0,0,0-2.423.4,4.476,4.476,0,0,0-1.83,1.332,3.245,3.245,0,0,0-.727,1.892,3,3,0,0,0,.035.586" transform="translate(-4 -4)" fill="none" stroke="#0c0311" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></g></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Strikethrough</span></div>
            </div>
          </div>
          <!-- Text -->
        `;
    }

    if (tools.includes('text_format') || !tools?.length) {
        html += `
          <!-- Text Format -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" id="textFormatSelectButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span id="textFormatSelectButtonText" class="toolbar_selected_text font_family_text">T</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="anchor_tag" width="6" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Text Format</span></div>
            </div>
            <div id="textFormatSelectDropdown" class="dropdown-content">
              <div data-format="div" data-name="T" class="dropdown-item font_dropdown active">Text</div>
              <div data-format="h1" data-name="H1" class="dropdown-item font_dropdown">H1</div>
              <div data-format="h2" data-name="H2" class="dropdown-item font_dropdown">H2</div>
              <div data-format="h3" data-name="H3" class="dropdown-item font_dropdown">H3</div>
              <div data-format="h4" data-name="H4" class="dropdown-item font_dropdown">H4</div>
            </div>
          </div>
          <!-- Text Format -->
        `;
    }

    if (tools.includes('list') || !tools?.length) {
        html += `
          <!-- List Formatting -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" id="listButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span class="toolbar_selected_text">
                  ${LIST_ICONS.bullet}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795">
                  <path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path>
                </svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">List</span></div>
            </div>
            <div id="listDropdown" class="dropdown-content">
              <div class="dropdown-item font_dropdown" id="bulletListButton">
                <div class="dropdown_ele_icon">${LIST_ICONS.bullet}</div><span>Bulleted list</span>
              </div>
              <div class="dropdown-item font_dropdown" id="orderedListButton">
                <div class="dropdown_ele_icon">${LIST_ICONS.ordered}</div><span>Numbered list</span>
              </div>
              <div class="dropdown-item font_dropdown" id="taskListButton">
                <div class="dropdown_ele_icon">${LIST_ICONS.task}</div><span>Checklist</span>
              </div>
            </div>
          </div>
          <!-- List Formatting -->
        `;
    }


    if (tools.includes('font') || !tools?.length) {
        html += `
          <!-- Font Family -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" id="fontFamilyButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span id="fontFamilyButtonText" class="toolbar_selected_text font_family_text">Calibri</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Font Family</span></div>
            </div>
            <div id="fontFamilyDropdown" class="dropdown-content">
              <div style="font-family: Calibri ,sans-serif" data-font="Calibri" class="dropdown-item font_dropdown active">Calibri</div>
              <div style="font-family: Arial ,sans-serif" data-font="Arial" class="dropdown-item font_dropdown">Arial</div>
              <div style="font-family: Courier,'Courier New' ,sans-serif" data-font="Courier New" class="dropdown-item font_dropdown">Courier New</div>
              <div style="font-family: Times,'Times New Roman' ,sans-serif" data-font="Times New Roman" class="dropdown-item font_dropdown">Times New Roman</div>
              <div style="font-family: Georgia ,sans-serif" data-font="Georgia" class="dropdown-item font_dropdown">Georgia</div>
              <div style="font-family: Impact ,sans-serif" data-font="Impact" class="dropdown-item font_dropdown">Impact</div>
            </div>
          </div>
          <!-- Font Family -->
        
          <!-- Font Size -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" id="fontSizeButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span id="fontSizeButtonText" class="toolbar_selected_text">3</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Font Size</span></div>
            </div>
            <div id="fontSizeDropdown" class="dropdown-content auto_width">
              <div data-size="1" class="dropdown-item font_dropdown">1</div>
              <div data-size="2" class="dropdown-item font_dropdown">2</div>
              <div data-size="3" class="dropdown-item font_dropdown active">3</div>
              <div data-size="4" class="dropdown-item font_dropdown">4</div>
              <div data-size="5" class="dropdown-item font_dropdown">5</div>
              <div data-size="6" class="dropdown-item font_dropdown">6</div>
              <div data-size="7" class="dropdown-item font_dropdown">7</div>
            </div>
          </div>
          <!-- Font Size -->
    
          <!-- Text Color -->
          <div class="global_editor_button_group event_group_tool">
            <button type="button" id="colorButton" class="global_editor_button dropdown-button" title="Text Color" tabindex="-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 11.529 14">
                <g transform="translate(5229.765 2136.001)">
                  <path d="M11.176,4h-.824a.825.825,0,0,0-.758.5L5.614,13.882H7.4l1.048-2.471h4.615l1.044,2.471H15.9L11.935,4.5A.824.824,0,0,0,11.176,4ZM9.151,9.765l1.613-3.8,1.607,3.8Z" transform="translate(-5234.765 -2140.001)"></path>
                  <path id="colorButtonText" d="M5,15.529H16.529V18H5Z" transform="translate(-5234.765 -2140.001)" style="fill: rgb(0, 0, 0)"></path>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Text Color</span></div>
            </button>
            <div id="colorDropdown" class="dropdown-content color_pallet_content">
              <div data-color="rgb(0, 0, 0)" class="color_pallet dropdown-item active" style="background-color: rgb(0, 0, 0);"></div>
              <div data-color="rgb(255, 0, 0)" class="color_pallet dropdown-item" style="background-color: rgb(255, 0, 0);"></div>
              <div data-color="rgb(0, 255, 0)" class="color_pallet dropdown-item" style="background-color: rgb(0, 255, 0);"></div>
              <div data-color="rgb(0, 0, 255)" class="color_pallet dropdown-item" style="background-color: rgb(0, 0, 255);"></div>
              <div data-color="rgb(255, 255, 0)" class="color_pallet dropdown-item" style="background-color: rgb(255, 255, 0);"></div>
              <div data-color="rgb(255, 0, 255)" class="color_pallet dropdown-item" style="background-color: rgb(255, 0, 255);"></div>
              <div data-color="rgb(0, 255, 255)" class="color_pallet dropdown-item" style="background-color: rgb(0, 255, 255);"></div>
              <div data-color="rgb(255, 255, 255)" class="color_pallet dropdown-item" style="background-color: rgb(255, 255, 255);"></div>
            </div>
          </div>
           <!-- Text Color -->
        `;
    }

    if (tools.includes('highlight') || !tools?.length) {
        html += `
          <!-- Highlight -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" id="highlightColorButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span id="colorButtonHighlight" class="color_button_toolbar"></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Highlight Color</span></div>
            </div>
            <div id="highlightColorDropdown" class="dropdown-content color_pallet_content">
              <div data-color="rgb(255, 255, 255)" class="color_pallet dropdown-item active" style="background-color: rgb(255, 255, 255);"></div>
              <div data-color="rgb(0, 0, 0)" class="color_pallet dropdown-item" style="background-color: rgb(0, 0, 0);"></div>
              <div data-color="rgb(255, 0, 0)" class="color_pallet dropdown-item" style="background-color: rgb(255, 0, 0);"></div>
              <div data-color="rgb(0, 255, 0)" class="color_pallet dropdown-item" style="background-color: rgb(0, 255, 0);"></div>
              <div data-color="rgb(0, 0, 255)" class="color_pallet dropdown-item" style="background-color: rgb(0, 0, 255);"></div>
              <div data-color="rgb(255, 255, 0)" class="color_pallet dropdown-item" style="background-color: rgb(255, 255, 0);"></div>
              <div data-color="rgb(255, 0, 255)" class="color_pallet dropdown-item" style="background-color: rgb(255, 0, 255);"></div>
              <div data-color="rgb(0, 255, 255)" class="color_pallet dropdown-item" style="background-color: rgb(0, 255, 255);"></div>
            </div>
          </div>
          <!-- Highlight -->
        `;
    }

    if (tools.includes('align') || !tools?.length) {
        html += `
          <!-- Paragraph Formatting (alignment) -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" id="paraFormattingButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span class="toolbar_selected_text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.5 13.5"><g transform="translate(20282.75 12757.75)"><line x2="14" transform="translate(-20282 -12757)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(-20282 -12749)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(-20282 -12753)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(-20282 -12745)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Paragraph Formatting</span></div>
            </div>
            <div id="paraFormattingDropdown" class="dropdown-content">
              <div class="dropdown-item font_dropdown" id="justifyLeftButton"><div class="dropdown_ele_icon">${ALIGN_ICONS.left}</div><span>Align Left</span></div>
              <div class="dropdown-item font_dropdown" id="justifyCenterButton"><div class="dropdown_ele_icon">${ALIGN_ICONS.center}</div><span>Align Center</span></div>
              <div class="dropdown-item font_dropdown" id="justifyFullButton"><div class="dropdown_ele_icon">${ALIGN_ICONS.justify}</div><span>Align Justify</span></div>
              <div class="dropdown-item font_dropdown" id="justifyRightButton"><div class="dropdown_ele_icon">${ALIGN_ICONS.right}</div><span>Align Right</span></div>
            </div>
          </div>
          <!-- Paragraph Formatting (alignment) -->
        `;
    }

    // Link
    if (tools.includes('link') || !tools?.length) {
        html += `
          <!-- Link -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="linkButton">
                  <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" width="12px" height="12px" viewBox="0 0 486.465 486.465"><g><g><path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143    L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94    c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503    c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384    c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342    c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104    c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308    l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"/><path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043    l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974    c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463    c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151    L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582    c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819    c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"/></g></g></svg>
              </button>
              <div class="ge_tooltip_wrapper">
                <span class="hover_ele_type">Link</span>
                <span class="shortcut">Ctrl+K</span>
              </div>
            </div>
          </div>
          <!-- Link -->
       `;
    }

    // Remove formatting
    html += `
       <!-- Remove Formatting -->
       <div class="global_editor_button_group event_group_tool">
         <div class="tool_bar_wrap">
           <button type="button" class="global_editor_button" tabindex="-1" id="removeFormatButton">
             <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 17.5 14"><path d="M9.19,11.377H8.884l.254-.76L7.3,9.2l-.724,2.176H5.69a.437.437,0,0,0-.437.437v.875a.437.437,0,0,0,.437.437h3.5a.437.437,0,0,0,.437-.437v-.875A.437.437,0,0,0,9.19,11.377Zm8.142,1.151L10.311,7.1l1.345-4.035h3.221v.875a.437.437,0,0,0,.437.437h.875a.437.437,0,0,0,.437-.437V1.316a.437.437,0,0,0-.437-.437H4.816a.437.437,0,0,0-.437.437v1.2L1.248.1A.437.437,0,0,0,.633.173L.1.865a.437.437,0,0,0,.077.615L16.26,13.911a.437.437,0,0,0,.615-.077l.536-.692a.437.437,0,0,1-.077-.615ZM8.476,5.685,6.128,3.87v-.8H9.348Z" transform="translate(-0.004 -0.004)" fill="#1a1f22"></path></svg>
           </button>
           <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Remove Formatting</span></div>
         </div>
       </div>
       <!-- Remove Formatting -->
    `;

    return html;
}

export function wireToolbarFunctions(root,editor,showAtSelection = null) {
    const $ = (sel) => root.querySelector(sel);
    const $$ = (sel) => Array.from(root.querySelectorAll(sel));

    const safe = (fn) => (e) => { e?.preventDefault?.(); editor.chain().focus(); fn(); };
    const closeAllDropdowns = () => $$('.dropdown-content').forEach(d => d.classList.remove('open'));
    const toggleDropdown = (btnSel, dropSel) => {
        const btn = $(btnSel), dd = $(dropSel);
        if (!btn || !dd) return;
        btn.addEventListener('mousedown', e => e.preventDefault()); // keep selection
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = dd.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) dd.classList.add('open');
        });
    };

    const rootDoc = (root && root.ownerDocument) ? root.ownerDocument : (typeof document !== 'undefined' ? document : null);
    rootDoc && rootDoc.addEventListener('click', () => closeAllDropdowns());

    const getActiveAlign = () => {
        const p = editor.getAttributes('paragraph') || {};
        const h = editor.getAttributes('heading') || {};
        const val = h.textAlign || p.textAlign;
        if (val) return val;
        if (editor.isActive({ textAlign: 'center' })) return 'center';
        if (editor.isActive({ textAlign: 'right' })) return 'right';
        if (editor.isActive({ textAlign: 'justify' })) return 'justify';
        return 'left';
    };

    function refresh() {
        const hasExt = name => !!editor.extensionManager.extensions.find(e => e.name === name);
        const getAttrs = name => {
            if (!hasExt(name)) return {};
            const a = editor.getAttributes(name) || {};
            if (Object.keys(a).length) return a;

            const { state } = editor;
            const marks = (state.storedMarks || state.selection.$from.marks()) || [];
            const mark = marks.find(m => m.type.name === name);
            return mark ? (mark.attrs || {}) : {};
        };

        const setActiveWrap = (btnSel, on) => {
            const wrap = root.querySelector(btnSel)?.closest('.tool_bar_wrap');
            if (wrap && wrap.classList) wrap.classList.toggle('active', !!on);
        };

        // marks
        setActiveWrap('#boldButton', editor.isActive('bold'));
        setActiveWrap('#italicButton', editor.isActive('italic'));
        setActiveWrap('#underlineButton', editor.isActive('underline'));
        setActiveWrap('#strikeButton', editor.isActive('strike'));
        setActiveWrap('#linkButton',   editor.isActive('link'));

        // alignment icon + active states
        const align = getActiveAlign();
        const iconHost = root.querySelector('#paraFormattingButton span');
        if (iconHost) iconHost.innerHTML = ALIGN_ICONS[align] || ALIGN_ICONS.left;

        const setBtn = (sel, on) => {
            const el = root.querySelector(sel);
            if (el) el.classList.toggle('active', !!on);
        };
        setBtn('#justifyLeftButton',   align === 'left');
        setBtn('#justifyCenterButton', align === 'center');
        setBtn('#justifyRightButton',  align === 'right');
        setBtn('#justifyFullButton',   align === 'justify');

        // heading label & dropdown active states
        {
            const tLabel = root.querySelector('#textFormatSelectButtonText');
            if (tLabel) {
                const { $from } = editor.state.selection;
                const node = $from.parent;
                const h = /heading/.test(node.type.name) ? node.attrs.level : null;
                tLabel.textContent = h ? `H${h}` : 'T';
                root.querySelectorAll('#textFormatSelectDropdown .dropdown-item').forEach(it => {
                    const fmt = it.getAttribute('data-format');
                    const isActive = (fmt === 'div' && !h) || (fmt === `h${h}`);
                    it.classList.toggle('active', !!isActive);
                });
            }
        }

        // font family
        {
            const { fontFamily } = getAttrs('textStyle');
            const ffLabel = root.querySelector('#fontFamilyButtonText');
            if (ffLabel) ffLabel.textContent = fontFamily || 'Font';
            root.querySelectorAll('#fontFamilyDropdown .dropdown-item').forEach(it => {
                it.classList.toggle('active', it.getAttribute('data-font') === fontFamily);
            });
        }

        // font size (map back to 1–7)
        {
            const { fontSize } = getAttrs('textStyle');
            const fsLabel = root.querySelector('#fontSizeButtonText');
            const sizeMap = { 1: '12px', 2: '14px', 3: '16px', 4: '18px', 5: '24px', 6: '32px', 7: '40px' };
            const n = Object.entries(sizeMap).find(([, px]) => px === fontSize)?.[0] || '3';
            if (fsLabel) fsLabel.textContent = n;
            root.querySelectorAll('#fontSizeDropdown .dropdown-item').forEach(it => {
                it.classList.toggle('active', it.getAttribute('data-size') === n);
            });
        }

        // text color swatch
        {
            const { color: c1 } = getAttrs('textStyle');
            const { color: c2 } = hasExt('color') ? getAttrs('color') : {};
            const color = c2 || c1;
            const sw = root.querySelector('#colorButtonText');
            if (sw) sw.style.fill = color || '';
        }

        // highlight swatch
        {
            const { color: hColor } = hasExt('highlight') ? getAttrs('highlight') : {};
            const swH = root.querySelector('#colorButtonHighlight');
            if (swH) swH.style.background = hColor || 'transparent';
        }

        // enable/disable common mark buttons
        const setDisabled = (sel, disabled) => {
            const el = root.querySelector(sel);
            if (el) el.toggleAttribute('disabled', !!disabled);
        };
        setDisabled('#boldButton', !editor.can().chain().focus().toggleBold().run());
        setDisabled('#italicButton', !editor.can().chain().focus().toggleItalic().run());
        setDisabled('#strikeButton', !editor.can().chain().focus().toggleStrike().run());

        // LIST state (bullet / ordered / task)
        {
            const isBullet  = editor.isActive('bulletList');
            const isOrdered = editor.isActive('orderedList');
            const isTask    = editor.isActive('taskItem') || editor.isActive('taskList');

            // mark main button group as active if any list is active
            setActiveWrap('#listButton', isBullet || isOrdered || isTask);

            // change main icon based on current list type
            const listIconHost = root.querySelector('#listButton span');
            if (listIconHost) {
                if (isOrdered)      listIconHost.innerHTML = LIST_ICONS.ordered;
                else if (isTask)    listIconHost.innerHTML = LIST_ICONS.task;
                else                listIconHost.innerHTML = LIST_ICONS.bullet;
            }

            // dropdown active item
            const bulletItem  = root.querySelector('#bulletListButton');
            const orderedItem = root.querySelector('#orderedListButton');
            const taskItem    = root.querySelector('#taskListButton');

            bulletItem?.classList.toggle('active',  isBullet && !isTask && !isOrdered);
            orderedItem?.classList.toggle('active', isOrdered);
            taskItem?.classList.toggle('active',    isTask);
        }


        setTimeout(()=>{
            showAtSelection?.();
        },200)
    }


    // marks
    $('#boldButton')?.addEventListener('click', safe(() => editor.chain().focus().toggleBold().run()));
    $('#italicButton')?.addEventListener('click', safe(() => editor.chain().focus().toggleItalic().run()));
    $('#underlineButton')?.addEventListener('click', safe(() => editor.chain().focus().toggleUnderline().run()));
    $('#strikeButton')?.addEventListener('click', safe(() => editor.chain().focus().toggleStrike().run()));



    // LIST dropdown
    toggleDropdown('#listButton', '#listDropdown');

    $('#bulletListButton')?.addEventListener('click', e => {
        e.preventDefault();
        const chain = editor.chain().focus();
        chain.toggleBulletList().run();
        closeAllDropdowns();
        refresh();
    });

    $('#orderedListButton')?.addEventListener('click', e => {
        e.preventDefault();
        const chain = editor.chain().focus();
        chain.toggleOrderedList().run();
        closeAllDropdowns();
        refresh();
    });

    $('#taskListButton')?.addEventListener('click', e => {
        e.preventDefault();
        const chain = editor.chain().focus();
        // toggleTaskList is available only if you added the TaskList extension
        if (typeof chain.toggleTaskList === 'function') {
            chain.toggleTaskList().run();
        } else {
            // optional: fallback to bullet list if task list not installed
            chain.toggleBulletList().run();
        }
        closeAllDropdowns();
        refresh();
    });


    // --- Link bubble setup ---
    let linkBubble = null;
    let linkInput = null;
    let linkHighlightRange = null;

    const hasHighlightExt = () =>
        !!editor.extensionManager.extensions.find(e => e.name === 'highlight');

    function addLinkTempHighlight() {
        if (!hasHighlightExt()) return;

        const { state } = editor;
        const { from, to, empty } = state.selection;
        if (empty) return;

        // If selection already has a highlight, remember its color
        const existing = editor.getAttributes('highlight') || {};
        const prevColor = existing.color || null;

        // store range + previous color
        linkHighlightRange = { from, to, prevColor };

        // apply a soft cyan highlight over the selection
        editor
            .chain()
            .focus()
            .setHighlight({ color: 'rgb(98 41 255 / 15%)' })
            .run();
    }

    function clearLinkTempHighlight() {
        if (!hasHighlightExt()) return;
        if (!linkHighlightRange) return;

        const { from, to, prevColor } = linkHighlightRange;
        linkHighlightRange = null;

        try {
            const chain = editor.chain().focus().setTextSelection({ from, to });

            if (prevColor) {
                // There was a highlight before → restore its color
                chain.setHighlight({ color: prevColor }).run();
            } else {
                // No previous highlight → remove our temp highlight
                chain.unsetHighlight().run();
            }
        } catch (e) {
            // Fallback if range is invalid (doc changed)
            const chain = editor.chain().focus();

            if (prevColor) {
                chain.setHighlight({ color: prevColor }).run();
            } else {
                chain.unsetHighlight().run();
            }
        }
    }


    function ensureLinkBubble() {
        if (!rootDoc || linkBubble) return;
        linkBubble = rootDoc.createElement('div');
        linkBubble.className = 'ge_link_bubble';
        linkBubble.innerHTML = `
          <input type="text" class="ge_link_input" placeholder="Paste a link…" />
          <button type="button" class="ge_link_apply">Apply</button>
          <button type="button" class="ge_link_remove" title="Remove link">✕</button>
        `;
        rootDoc.body.appendChild(linkBubble);
        linkInput = linkBubble.querySelector('.ge_link_input');

        const applyBtn = linkBubble.querySelector('.ge_link_apply');
        const removeBtn = linkBubble.querySelector('.ge_link_remove');

        applyBtn.addEventListener('click', () => applyLink());
        removeBtn.addEventListener('click', () => {
            editor.chain().focus().unsetLink().run();
            closeLinkBubble(); // clears highlight too
        });

        linkInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyLink();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeLinkBubble();
            }
        });
    }

    function closeLinkBubble() {
        if (!linkBubble) return;
        linkBubble.classList.remove('open');
        clearLinkTempHighlight();
    }


    function applyLink() {
        if (!linkInput) return;
        let url = linkInput.value.trim();
        if (!url) {
            editor.chain().focus().unsetLink().run();
            closeLinkBubble();
            return;
        }
        // prepend protocol if missing
        if (!/^https?:\/\//i.test(url) &&
            !/^mailto:|tel:/i.test(url)) {
            url = 'https://' + url;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
        closeLinkBubble(); // will also clear temporary highlight
    }

    function openLinkBubble() {
        ensureLinkBubble();
        if (!linkBubble || !rootDoc) return;

        const { state, view } = editor;
        const { from, to } = state.selection;

        // Need some selection
        if (from === to) return;

        // add temporary highlight over current selection
        addLinkTempHighlight();

        // current href if selection already has link
        const existing = editor.getAttributes('link') || {};

        linkInput.value = existing.href || '';
        linkInput.select();

        // position bubble near the selection
        const pos = Math.round((from + to) / 2);
        const coords = view.coordsAtPos(pos);

        const docRect = rootDoc.body.getBoundingClientRect();
        linkBubble.style.position = 'absolute';
        linkBubble.style.top = `${coords.bottom - docRect.top + 8}px`;
        linkBubble.style.left = `${coords.left - docRect.left}px`;

        linkBubble.classList.add('open');
        setTimeout(() => linkInput?.focus(), 0);
    }

    // Close bubble when clicking outside
    rootDoc && rootDoc.addEventListener('mousedown', (e) => {
        if (!linkBubble || !linkBubble.classList.contains('open')) return;
        if (e.target === linkBubble || linkBubble.contains(e.target)) return;
        closeLinkBubble();
    });

    // link open bubble
    const linkBtn = $('#linkButton');
    if (linkBtn) {
        // prevent editor selection from collapsing on mousedown
        linkBtn.addEventListener('mousedown', e => e.preventDefault());

        linkBtn.addEventListener('click', e => {
            e.preventDefault();
            editor.chain().focus();
            openLinkBubble(); // handles highlight
        });
    }
    // keyboard shortcut Ctrl/Cmd + K
    if (rootDoc) {
        rootDoc.addEventListener('keydown', e => {
            const key = e.key?.toLowerCase();
            if ((e.ctrlKey || e.metaKey) && key === 'k') {
                e.preventDefault();
                editor.chain().focus();
                openLinkBubble();
            }
        });
    }

    // text format (paragraph / heading)
    toggleDropdown('#textFormatSelectButton', '#textFormatSelectDropdown');
    $$('#textFormatSelectDropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const fmt = item.getAttribute('data-format');
            editor.chain().focus();
            if (fmt === 'div') {
                editor.chain().focus().setParagraph().run();
            } else {
                const level = parseInt(fmt.replace('h', ''), 10);
                editor.chain().focus().toggleHeading({ level }).run();
            }
            closeAllDropdowns();
            refresh();
        });
    });

    // font family
    toggleDropdown('#fontFamilyButton', '#fontFamilyDropdown');
    $$('#fontFamilyDropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const ff = item.getAttribute('data-font');
            editor.chain().focus().setMark('textStyle', { fontFamily: ff }).run();
            closeAllDropdowns();
            refresh();
        });
    });

    // font size map
    const sizeMap = { 1: '12px', 2: '14px', 3: '16px', 4: '18px', 5: '24px', 6: '32px', 7: '40px' };
    toggleDropdown('#fontSizeButton', '#fontSizeDropdown');
    $$('#fontSizeDropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const n = item.getAttribute('data-size');
            const px = sizeMap[n] || '16px';
            editor.chain().focus().setMark('textStyle', { fontSize: px }).run();
            closeAllDropdowns();
            refresh();
        });
    });

    // text color
    toggleDropdown('#colorButton', '#colorDropdown');
    $$('#colorDropdown .color_pallet').forEach(item => {
        item.addEventListener('click', () => {
            const color = item.getAttribute('data-color');
            editor.chain().focus().setColor(color).run();
            closeAllDropdowns();
            refresh();
        });
    });

    // highlight color
    toggleDropdown('#highlightColorButton', '#highlightColorDropdown');
    $$('#highlightColorDropdown .color_pallet').forEach(item => {
        item.addEventListener('click', () => {
            const color = item.getAttribute('data-color');
            if (color === 'rgb(255, 255, 255)') {
                editor.chain().focus().unsetHighlight().run();
            } else {
                editor.chain().focus().toggleHighlight({ color }).run();
            }
            closeAllDropdowns();
            refresh();
        });
    });

    // alignment
    toggleDropdown('#paraFormattingButton', '#paraFormattingDropdown');
    $('#justifyLeftButton')?.addEventListener('click', safe(() => { editor.chain().focus().setTextAlign('left').run(); closeAllDropdowns(); refresh(); }));
    $('#justifyCenterButton')?.addEventListener('click', safe(() => { editor.chain().focus().setTextAlign('center').run(); closeAllDropdowns(); refresh(); }));
    $('#justifyRightButton')?.addEventListener('click', safe(() => { editor.chain().focus().setTextAlign('right').run(); closeAllDropdowns(); refresh(); }));
    $('#justifyFullButton')?.addEventListener('click', safe(() => { editor.chain().focus().setTextAlign('justify').run(); closeAllDropdowns(); refresh(); }));

    // remove formatting (fix: use chain + focus)
    $('#removeFormatButton')?.addEventListener('click', safe(() => {
        editor.chain().focus().unsetAllMarks().clearNodes().run();
        refresh();
    }));

    return refresh;
}

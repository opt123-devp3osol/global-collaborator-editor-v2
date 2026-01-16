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
   
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.75 14.375">
  <g id="Group_17487" data-name="Group 17487" transform="translate(20313.385 12758.126)">
    <line id="Path" x2="9" transform="translate(-20307.385 -12757)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
    <line id="Path-2" data-name="Path" x2="9" transform="translate(-20307.385 -12745)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
    <line id="Path-3" data-name="Path" x2="9" transform="translate(-20307.385 -12751)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
    <g id="Rectangle_6884" data-name="Rectangle 6884" transform="translate(-20313.385 -12752.251)" fill="#0c0310" stroke="#0c0310" stroke-width="1">
      <rect width="2.5" height="2.5" rx="1.25" stroke="none"/>
      <rect x="0.5" y="0.5" width="1.5" height="1.5" rx="0.75" fill="none"/>
    </g>
    <g id="Rectangle_6886" data-name="Rectangle 6886" transform="translate(-20313.385 -12758.126)" fill="#0c0310" stroke="#0c0310" stroke-width="1">
      <rect width="2.5" height="2.5" rx="1.25" stroke="none"/>
      <rect x="0.5" y="0.5" width="1.5" height="1.5" rx="0.75" fill="none"/>
    </g>
    <g id="Rectangle_6885" data-name="Rectangle 6885" transform="translate(-20313.385 -12746.251)" fill="#0c0310" stroke="#0c0310" stroke-width="1">
      <rect width="2.5" height="2.5" rx="1.25" stroke="none"/>
      <rect x="0.5" y="0.5" width="1.5" height="1.5" rx="0.75" fill="none"/>
    </g>
  </g>
</svg>

  `,
    ordered: `
   
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.518 14.912">
  <g id="Group_17486" data-name="Group 17486" transform="translate(20312.768 12758.332)">
    <line id="Path" x2="9" transform="translate(-20307 -12757)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
    <line id="Path-2" data-name="Path" x2="9" transform="translate(-20307 -12745)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
    <line id="Path-3" data-name="Path" x2="9" transform="translate(-20307 -12751)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
    <path id="Path-4" data-name="Path" d="M5.252,5.676,4.776,6l-.448-.7,1-.64h.88V7.5h-.96Z" transform="translate(-20317 -12763)" fill="#0c0310"/>
    <path id="Path-5" data-name="Path" d="M5.484,11.864a.511.511,0,0,0,.112-.116.23.23,0,0,0,.044-.132.207.207,0,0,0-.052-.14.188.188,0,0,0-.156-.06.239.239,0,0,0-.192.092.412.412,0,0,0-.084.248l-.908-.1a1.175,1.175,0,0,1,.144-.476,1.123,1.123,0,0,1,.288-.332,1.174,1.174,0,0,1,.388-.192,1.553,1.553,0,0,1,.444-.064,1.66,1.66,0,0,1,.412.052,1.1,1.1,0,0,1,.368.164.834.834,0,0,1,.26.284.845.845,0,0,1,.1.424.935.935,0,0,1-.048.312.8.8,0,0,1-.124.236,1.068,1.068,0,0,1-.176.188,2.462,2.462,0,0,1-.2.16l-.416.3H6.66v.8h-2.3v-.74Z" transform="translate(-20317 -12763)" fill="#292d32"/>
    <path id="Path-6" data-name="Path" d="M6.232,18.016a.715.715,0,0,1,.2.1.689.689,0,0,1,.156.148.606.606,0,0,1,.1.184.554.554,0,0,1,.036.2.841.841,0,0,1-.1.428.919.919,0,0,1-.272.292,1.19,1.19,0,0,1-.38.164,1.787,1.787,0,0,1-.856,0,1.278,1.278,0,0,1-.384-.156,1.225,1.225,0,0,1-.3-.272,1.025,1.025,0,0,1-.184-.392L5.12,18.5a.386.386,0,0,0,.116.192.347.347,0,0,0,.244.088.473.473,0,0,0,.084-.008.36.36,0,0,0,.08-.032.214.214,0,0,0,.06-.06.184.184,0,0,0-.088-.26.915.915,0,0,0-.3-.04H5.044v-.656h.3a.62.62,0,0,0,.244-.04.165.165,0,0,0,.092-.164.131.131,0,0,0-.072-.128.335.335,0,0,0-.152-.036.3.3,0,0,0-.184.064.263.263,0,0,0-.1.18l-.884-.188a1.1,1.1,0,0,1,.5-.644,1.278,1.278,0,0,1,.364-.136,1.752,1.752,0,0,1,.384-.044,1.66,1.66,0,0,1,.388.048,1.125,1.125,0,0,1,.364.148.832.832,0,0,1,.268.26.67.67,0,0,1,.1.38.557.557,0,0,1-.128.384.633.633,0,0,1-.3.192Z" transform="translate(-20317 -12763)" fill="#292d32"/>
  </g>
</svg>

  `,
    task: `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
      <g fill="none" stroke="#0c0310" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
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

    if (tools.includes('text_format') || !tools?.length) {
        html += `
          <!-- Text Format -->
          <div class="global_editor_button_group event_group_tool has-no-divider">
            <div class="tool_bar_wrap">
              <button type="button" id="textFormatSelectButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span id="textFormatSelectButtonText" class="toolbar_selected_text font_family_text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.719" height="13.353" viewBox="0 0 10.719 13.353">
                      <path id="Font_Style" data-name="Font Style" d="M9.609,3V14.852m-1.387,0H11M14.219,3H5" transform="translate(-4.25 -2.25)" fill="#0b0e10" stroke="#0b0e10" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                    </svg>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="anchor_tag" width="6" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#1a1f22"></path></svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Text Format</span></div>
            </div>
            <div id="textFormatSelectDropdown" class="dropdown-content">
              <div data-format="div" data-name="T" class="dropdown-item font_dropdown active">
               <div class="dropdown_ele_icon">             
                <svg xmlns="http://www.w3.org/2000/svg" width="9" viewBox="0 0 10.719 13.353">
                  <path id="Font_Style" data-name="Font Style" d="M9.609,3V14.852m-1.387,0H11M14.219,3H5" transform="translate(-4.25 -2.25)" fill="#0b0e10" stroke="#0b0e10" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
               </div>
              Text
              </div>
              <div data-format="h1" data-name="H1" class="dropdown-item font_dropdown">
              <div class="dropdown_ele_icon">          
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 18 16">
                  <path id="Path_19316" data-name="Path 19316" d="M424,920l3-1v10m-16-14v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-410 -914)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                </div>
                Heading 1
              </div>
              <div data-format="h2" data-name="H2" class="dropdown-item font_dropdown">
              <div class="dropdown_ele_icon">         
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 16">
                  <path id="Path_19317" data-name="Path 19317" d="M735,922.5V922a3,3,0,0,1,3-3h.172a2.829,2.829,0,0,1,2,4.829L735,929h6m-18-14v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-722 -914)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </div>
              Heading 2
              </div>
              <div data-format="h3" data-name="H3" class="dropdown-item font_dropdown">
               <div class="dropdown_ele_icon">               
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 16">
                  <path id="Path_19326" data-name="Path 19326" d="M111,975h6l-4,4h1a3,3,0,1,1-2.829,4M99,971v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-98 -970)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </div>
              Heading 3
              </div>
              <div data-format="h4" data-name="H4" class="dropdown-item font_dropdown">
              <div class="dropdown_ele_icon">                 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 16">
                  <path id="Path_19325" data-name="Path 19325" d="M426,975l-2.5,8H428m0,0h1m-1,0v-3m0,3v2m-17-14v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-410 -970)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </div>
              Heading 4
              </div>
            </div>
          </div>
          <!-- Text Format -->
        `;
    }

    if (tools.includes('font') || !tools?.length) {
        html += `
          <!-- Font Family -->
          <div class="global_editor_button_group event_group_tool has-no-divider">
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
            <div id="fontSizeDropdown" class="dropdown-content auto_width font-size_dropdown">
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
    
        `;
    }

    if (tools.includes('text') || !tools?.length) {
        html += `
          <!-- Text -->
          <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="boldButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="91" height="13" viewBox="0 0 9.971 13.5">
              <path id="Bold" d="M6,9.647h4.941a2.824,2.824,0,0,0,2.824-2.824h0A2.824,2.824,0,0,0,10.941,4H7.412A1.412,1.412,0,0,0,6,5.412Zm0,0v4.941A1.412,1.412,0,0,0,7.412,16h3.882a3.176,3.176,0,0,0,3.176-3.176h0a3.176,3.176,0,0,0-3.176-3.176Z" transform="translate(-5.25 -3.25)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5" fill-rule="evenodd"></path>
            </svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Strong</span><span class="shortcut">Ctrl+B</span></div>
            </div>
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="italicButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9.215 13.786">
                  <g id="Italic" transform="translate(20370.75 12759.893)">
                    <line id="Path" y1="12" x2="2.625" transform="translate(-20367.555 -12759)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line>
                    <line id="Path-2" data-name="Path" x2="7" transform="translate(-20369.285 -12759)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line>
                    <line id="Path-3" data-name="Path" x2="7" transform="translate(-20370 -12747)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line>
                  </g>
                </svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Emphasis</span><span class="shortcut">Ctrl+I</span></div>
            </div>
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="underlineButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 13.5 14.5">
                      <g id="Underline" transform="translate(20404.113 12759.75)">
                        <path id="Path" d="M6,4V9.027a4.309,4.309,0,0,0,4.309,4.309h0a4.309,4.309,0,0,0,4.309-4.309V4" transform="translate(-20407.611 -12763)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5" fill-rule="evenodd"></path>
                        <line id="Path-2" data-name="Path" x2="12" transform="translate(-20403.363 -12746)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line>
                      </g>
                    </svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Underline</span><span class="shortcut">Ctrl+U</span></div>
            </div>
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="strikeButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14.051 14.052">
                      <g id="SVGRepo_iconCarrier" transform="translate(-3.25 -3.25)">
                        <g id="Edit_Strikethrough" data-name="Edit / Strikethrough" transform="translate(4 4)">
                          <path id="Vector" d="M10.276,10.275a4.692,4.692,0,0,1,2,.437,3.953,3.953,0,0,1,.749.46,3.321,3.321,0,0,1,.691.729,2.647,2.647,0,0,1,.483,1.61,2.715,2.715,0,0,1-.609,1.583,3.745,3.745,0,0,1-1.531,1.114,4.765,4.765,0,0,1-2.027.336,4.6,4.6,0,0,1-1.958-.537,3.453,3.453,0,0,1-1.344-1.259m3.549-4.474H4m6.276,0h6.275M13.824,5.8A3.453,3.453,0,0,0,12.48,4.543a4.6,4.6,0,0,0-1.958-.537,4.765,4.765,0,0,0-2.027.336A3.745,3.745,0,0,0,6.964,5.457,2.715,2.715,0,0,0,6.355,7.04a2.514,2.514,0,0,0,.029.49" transform="translate(-4 -4)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                        </g>
                      </g>
                    </svg>
              </button>
              <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Strikethrough</span></div>
            </div>
          </div>
          <!-- Text -->
        `;
    }

    if (tools.includes('font') || !tools?.length) {
        html += `
          <!-- Text Color -->
          <div class="global_editor_button_group event_group_tool has-no-divider">
            <button type="button" id="colorButton" class="global_editor_button dropdown-button" title="Text Color" tabindex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="11.529" height="13.991" viewBox="0 0 11.529 13.991">
                  <g id="Font_Color" data-name="Font Color" transform="translate(5229.765 2135.992)">
                    <path id="Path_16098" data-name="Path 16098" d="M5,15.529H16.529V18H5Z" transform="translate(-5234.765 -2140.001)" fill="#f2117a"/>
                    <path id="colorButtonText" data-name="Path 19352" d="M417.971,1036.365,414.486,1028,411,1036.365m5.577-2.788h-4.183" transform="translate(-5638.485 -3163.242)" fill="none" stroke="rgb(0, 0, 0)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
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
          <div class="global_editor_button_group event_group_tool has-no-divider">
            <div class="tool_bar_wrap">
              <button type="button" id="paraFormattingButton" class="global_editor_button dropdown-button" tabindex="-1">
                <span class="toolbar_selected_text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15.5 13.5"><g transform="translate(20282.75 12757.75)"><line x2="14" transform="translate(-20282 -12757)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="14" transform="translate(-20282 -12749)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(-20282 -12753)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line><line x2="8" transform="translate(-20282 -12745)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"></line></g></svg>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" class="anchor_tag" height="3.795" viewBox="0 0 6 3.795"><path d="M7.205,14h5.6a.208.208,0,0,1,.142.348L10.209,17.7a.253.253,0,0,1-.4,0L7.047,14.348A.213.213,0,0,1,7.205,14Z" transform="translate(-7 -14)" fill="#0c0310"></path></svg>
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


    // Link
    if (tools.includes('link') || !tools?.length) {
        html += `
          <!-- Link -->
          <div class="global_editor_button_group event_group_tool has-no-divider">
            <div class="tool_bar_wrap">
              <button type="button" class="global_editor_button" tabindex="-1" id="linkButton">                  
                <svg xmlns="http://www.w3.org/2000/svg" width="15.5" height="8.5" viewBox="0 0 15.5 8.5"  style="transform: rotate(45deg);">
                  <g id="Link" transform="translate(-1.25 -6.25)">
                    <path id="Path_16079" data-name="Path 16079" d="M10.4,10.5A3.5,3.5,0,0,1,6.9,14H5.5a3.5,3.5,0,0,1,0-7h.35M7.6,10.5A3.5,3.5,0,0,1,11.1,7h1.4a3.5,3.5,0,0,1,0,7h-.35" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5"/>
                  </g>
                </svg>
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
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 13.598 15.346">
                  <path id="text_format" data-name="text format" d="M6024.6,7423.347a.5.5,0,1,1,0-1h1.4v-6.467l1.6,2.286v4.181h1.4a.5.5,0,1,1,0,1Zm7.784-.22a.777.777,0,0,1-.5-.319l-9.515-13.587a.775.775,0,1,1,1.271-.889l9.515,13.585a.775.775,0,0,1-.635,1.22A.83.83,0,0,1,6032.383,7423.127Zm-4.786-10.509-1.6-2.282v-.328h-.229l-1.12-1.6h8.149a.8.8,0,0,1,.8.8v1a.8.8,0,1,1-1.6,0v-.2h-4.4v2.614Zm-7.6-2.411v-1a.8.8,0,0,1,.79-.8l-.015.011,1.112,1.587h-.287v.2a.8.8,0,1,1-1.6,0Z" transform="translate(-6020 -7408.001)" fill="#0c0310"></path>
             </svg>
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
            if (!isOpen) {
                dd.classList.add('open');
                requestAnimationFrame(() => updateDropdownPosition(btn, dd));
            }
        });
    };

    const rootDoc = (root && root.ownerDocument) ? root.ownerDocument : (typeof document !== 'undefined' ? document : null);
    rootDoc && rootDoc.addEventListener('click', () => closeAllDropdowns());
    rootDoc && rootDoc.addEventListener('scroll', () => reflowOpenDropdowns(), true);
    rootDoc?.defaultView?.addEventListener('resize', () => reflowOpenDropdowns());

    // Inject minimal CSS to flip tooltip arrow/position when forced above.
    function ensureTooltipFlipStyles() {
        if (!rootDoc) return;
        if (rootDoc.getElementById('ge-tooltip-flip-style')) return;
        const style = rootDoc.createElement('style');
        style.id = 'ge-tooltip-flip-style';
        style.textContent = `
          .ge_tooltip_wrapper.tooltip-below{top:100%;bottom:auto;margin-top:2px;margin-bottom:0;}
          .ge_tooltip_wrapper.tooltip-below:after{top:-3px;bottom:auto;}
          .ge_tooltip_wrapper.tooltip-above{bottom:100%;top:auto;margin-bottom:8px;margin-top:0;}
          .ge_tooltip_wrapper.tooltip-above:after{bottom:-4px;top:auto;}
          .dropdown-content.dropdown-below{top:100%;bottom:auto;margin-top:6px;margin-bottom:0;}
          .dropdown-content.dropdown-above{bottom:100%;top:auto;margin-bottom:6px;margin-top:0;}
          .dropdown-content.font-size_dropdown {min-width: 60px;width: 60px;}
          .dropdown-content.dropdown-below,
          .dropdown-content.dropdown-above{overflow-y:auto;}
        `;
        (rootDoc.head || rootDoc.body || rootDoc.documentElement).appendChild(style);
    }

    const measureElement = (el) => {
        const prevVis = el.style.visibility;
        const prevDisplay = el.style.display;
        el.style.visibility = 'hidden';
        el.style.display = 'block';
        const rect = el.getBoundingClientRect();
        el.style.visibility = prevVis;
        el.style.display = prevDisplay;
        return rect;
    };

    const updateTooltipPosition = (wrap) => {
        if (!wrap || !rootDoc) return;
        const tooltip = wrap.querySelector('.ge_tooltip_wrapper');
        if (!tooltip) return;

        ensureTooltipFlipStyles();
        const tooltipRect = measureElement(tooltip);
        const wrapRect = wrap.getBoundingClientRect();
        const bodyRect = rootDoc.body.getBoundingClientRect();
        const spaceBelow = bodyRect.bottom - wrapRect.bottom;
        const spaceAbove = wrapRect.top - bodyRect.top;

        const placeBelow = spaceBelow >= (tooltipRect.height + 8) || spaceBelow >= spaceAbove;
        tooltip.classList.toggle('tooltip-below', placeBelow);
        tooltip.classList.toggle('tooltip-above', !placeBelow);
    };

    function enableAutoTooltipPositioning() {
        if (!rootDoc) return;
        $$('.tool_bar_wrap').forEach(wrap => {
            const handler = () => updateTooltipPosition(wrap);
            wrap.addEventListener('mouseenter', handler);
            wrap.addEventListener('focusin', handler);
        });
    }

    const updateDropdownPosition = (btn, dd) => {
        if (!btn || !dd || !rootDoc) return;
        ensureTooltipFlipStyles();
        const ddRect = measureElement(dd);
        const btnRect = btn.getBoundingClientRect();
        const bodyRect = rootDoc.body.getBoundingClientRect();

        const spaceBelow = bodyRect.bottom - btnRect.bottom;
        const spaceAbove = btnRect.top - bodyRect.top;
        const gap = 8;

        const availableBelow = Math.max(0, spaceBelow - gap);
        const availableAbove = Math.max(0, spaceAbove - gap);
        const placeBelow = availableBelow >= availableAbove;
        const available = placeBelow ? availableBelow : availableAbove;
        const maxHeight = Math.max(80, Math.floor(available || ddRect.height));

        dd.style.maxHeight = `${maxHeight}px`;
        dd.style.overflowY = 'auto';
        dd.classList.toggle('dropdown-below', placeBelow);
        dd.classList.toggle('dropdown-above', !placeBelow);
    };

    const reflowOpenDropdowns = () => {
        $$('.dropdown-content.open').forEach(dd => {
            const btn = dd.closest('.global_editor_button_group')?.querySelector('.dropdown-button');
            updateDropdownPosition(btn, dd);
        });
    };

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
                tLabel.innerHTML = h
                    ? (
                     h === 1 ? `
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 16">
                      <path id="Path_19316" data-name="Path 19316" d="M424,920l3-1v10m-16-14v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-410 -914)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                  ` :
                    h === 2 ? `     
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 16">
                         <path id="Path_19317" data-name="Path 19317" d="M735,922.5V922a3,3,0,0,1,3-3h.172a2.829,2.829,0,0,1,2,4.829L735,929h6m-18-14v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-722 -914)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    ` :
                       h === 3 ? `
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 16">
                          <path id="Path_19326" data-name="Path 19326" d="M111,975h6l-4,4h1a3,3,0,1,1-2.829,4M99,971v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-98 -970)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                        
                      ` :
                       h === 4 ? `    
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 16">
                          <path id="Path_19325" data-name="Path 19325" d="M426,975l-2.5,8H428m0,0h1m-1,0v-3m0,3v2m-17-14v7m0,0v7m0-7h8m0-7v7m0,0v7" transform="translate(-410 -970)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                  ` : `H${h}`
                    )
                    : `
                <svg xmlns="http://www.w3.org/2000/svg" width="10.719" height="13.353" viewBox="0 0 10.719 13.353">
                  <path d="M9.609,3V14.852m-1.387,0H11M14.219,3H5"
                    transform="translate(-4.25 -2.25)"
                    fill="#0c0310"
                    stroke="#0c0310"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"/>
                </svg>
  `;

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
    let linkBubbleMode = 'edit';
    let linkActiveRange = null;
    let linkOverlay = null;
    let isHoveringBubble = false;
    let hoverHideTimer = null;

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

    function setLinkBubbleMode(mode) {
        linkBubbleMode = mode === 'view' ? 'view' : 'edit';
        if (!linkBubble) return;
        linkBubble.classList.toggle('is-edit', linkBubbleMode === 'edit');
        linkBubble.classList.toggle('is-view', linkBubbleMode === 'view');
        if (linkBubbleMode === 'edit') {
            ensureLinkOverlay();
            linkOverlay?.classList?.add('open');
        } else {
            linkOverlay?.classList?.remove('open');
        }
    }

    function ensureLinkBubble() {
        if (!rootDoc || linkBubble) return;
        linkBubble = rootDoc.createElement('div');
        linkBubble.className = 'ge_link_bubble';
        linkBubble.innerHTML = `
          <div class="ge_link_view_row">
            <a class="ge_link_preview" target="_blank" rel="noopener noreferrer"></a>
            <button type="button" class="ge_link_edit">Edit</button>
            <button type="button" class="ge_link_remove" title="Remove link">Remove</button>
          </div>
          <div class="ge_link_edit_row">
            <input type="text" class="ge_link_input" placeholder="Paste a link..." />
            <button type="button" class="ge_link_apply">Apply</button>
            <button type="button" class="ge_link_cancel">Cancel</button>
          </div>
        `;
        rootDoc.body.appendChild(linkBubble);
        linkInput = linkBubble.querySelector('.ge_link_input');

        const applyBtn = linkBubble.querySelector('.ge_link_apply');
        const removeBtn = linkBubble.querySelector('.ge_link_remove');
        const previewLink = linkBubble.querySelector('.ge_link_preview');
        const editBtn = linkBubble.querySelector('.ge_link_edit');
        const cancelBtn = linkBubble.querySelector('.ge_link_cancel');

        applyBtn.addEventListener('click', () => applyLink());
        removeBtn.addEventListener('click', () => {
            editor.chain().focus().unsetLink().run();
            closeLinkBubble(); // clears highlight too
        });
        editBtn.addEventListener('click', () => {
            setLinkBubbleMode('edit');
            if (previewLink?.href) {
                linkInput.value = previewLink.href;
            }
            linkInput.select();
        });
        cancelBtn.addEventListener('click', () => {
            const existing = editor.getAttributes('link') || {};
            if (existing.href) {
                setLinkBubbleMode('view');
            } else {
                closeLinkBubble();
            }
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

        linkBubble.addEventListener('mouseenter', () => {
            isHoveringBubble = true;
            if (hoverHideTimer) {
                clearTimeout(hoverHideTimer);
                hoverHideTimer = null;
            }
        });
        linkBubble.addEventListener('mouseleave', () => {
            isHoveringBubble = false;
            scheduleHoverClose();
        });
    }

    function ensureLinkOverlay() {
        if (!rootDoc || linkOverlay) return;
        linkOverlay = rootDoc.createElement('div');
        linkOverlay.className = 'ge_link_overlay';
        rootDoc.body.appendChild(linkOverlay);
        linkOverlay.addEventListener('mousedown', (e) => {
            e.preventDefault();
            closeLinkBubble();
        });
    }

    function closeLinkBubble() {
        if (!linkBubble) return;
        linkBubble.classList.remove('open');
        linkOverlay?.classList?.remove('open');
        clearLinkTempHighlight();
        linkActiveRange = null;
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

        const { from, to, empty } = editor.state.selection;
        const existing = editor.getAttributes('link') || {};
        const hasLink = !!existing.href;

        if (hasLink && linkActiveRange) {
            editor
                .chain()
                .focus()
                .setTextSelection(linkActiveRange)
                .setLink({ href: url })
                .insertContentAt(linkActiveRange, url)
                .setTextSelection({ from: linkActiveRange.from, to: linkActiveRange.from + url.length })
                .setLink({ href: url })
                .run();
            editor.commands.setTextSelection(linkActiveRange.from + url.length);
            closeLinkBubble();
            return;
        }

        if (empty) {
            const start = from;
            editor
                .chain()
                .focus()
                .insertContent(url)
                .setTextSelection({ from: start, to: start + url.length })
                .setLink({ href: url })
                .run();
            editor.commands.setTextSelection(start + url.length);
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
        }
        closeLinkBubble(); // will also clear temporary highlight
    }

    function getMarkRangeAtPos($pos, markType) {
        if (!$pos || !markType) return null;
        if (!$pos.parent.isTextblock) return null;

        const parent = $pos.parent;
        const parentPos = $pos.start();
        let startIndex = $pos.index();
        let endIndex = startIndex;

        if (parent.childCount === 0) return null;
        const hasMarkAtIndex = (index) => {
            if (index < 0 || index >= parent.childCount) return false;
            const node = parent.child(index);
            return node.isText && node.marks.some(m => m.type === markType);
        };

        if (startIndex >= parent.childCount) {
            startIndex = parent.childCount - 1;
        }

        if (!hasMarkAtIndex(startIndex)) {
            const prevIndex = startIndex - 1;
            const nextIndex = Math.min(parent.childCount - 1, startIndex + 1);
            if (hasMarkAtIndex(prevIndex)) {
                startIndex = prevIndex;
            } else if (hasMarkAtIndex(nextIndex)) {
                startIndex = nextIndex;
            } else {
                return null;
            }
        }

        let fromOffset = 0;
        for (let i = 0; i < parent.childCount; i += 1) {
            const child = parent.child(i);
            const size = child.nodeSize;
            if (i < startIndex) {
                fromOffset += size;
                continue;
            }
            if (i === startIndex) break;
        }

        let startOffset = fromOffset;
        for (let i = startIndex; i > 0; i -= 1) {
            if (!hasMarkAtIndex(i - 1)) break;
            startOffset -= parent.child(i - 1).nodeSize;
        }

        let endOffset = fromOffset + parent.child(startIndex).nodeSize;
        for (let i = startIndex + 1; i < parent.childCount; i += 1) {
            if (!hasMarkAtIndex(i)) break;
            endOffset += parent.child(i).nodeSize;
        }

        return { from: parentPos + startOffset, to: parentPos + endOffset };
    }

    function getLinkRange() {
        const { state } = editor;
        const markType = state.schema.marks.link;
        if (!markType) return null;
        const { $from } = state.selection;
        return getMarkRangeAtPos($from, markType);
    }

    function openLinkBubble(mode = 'edit') {
        ensureLinkBubble();
        if (!linkBubble || !rootDoc) return;

        const { state, view } = editor;
        const { from, to, empty } = state.selection;
        const existing = editor.getAttributes('link') || {};
        const href = existing.href || '';

        if (empty && !href && mode === 'view') return;

        if (!empty) {
            addLinkTempHighlight();
        }

        const previewLink = linkBubble.querySelector('.ge_link_preview');
        if (previewLink) {
            previewLink.textContent = href || 'Link';
            previewLink.href = href || '#';
        }

        linkActiveRange = getLinkRange();

        if (mode === 'view' && !href) mode = 'edit';
        setLinkBubbleMode(mode);
        if (mode === 'edit') {
            linkInput.value = href;
            linkInput.select();
        }

        // position bubble near the selection
        const pos = empty ? from : Math.round((from + to) / 2);
        const coords = view.coordsAtPos(pos);

        const docRect = rootDoc.body.getBoundingClientRect();
        linkBubble.style.position = 'absolute';
        linkBubble.style.top = `${coords.bottom - docRect.top}px`;
        linkBubble.style.left = `${coords.left - docRect.left}px`;

        linkBubble.classList.add('open');
        if (mode === 'edit') {
            setTimeout(() => linkInput?.focus(), 0);
        }
    }

    function scheduleHoverClose() {
        if (linkBubbleMode !== 'view') return;
        if (hoverHideTimer) clearTimeout(hoverHideTimer);
        hoverHideTimer = setTimeout(() => {
            if (isHoveringBubble) return;
            closeLinkBubble();
        }, 120);
    }

    editor.view.dom.addEventListener('click', () => {
        // Clicks should not auto-open the link bubble; handled via hover.
        if (!editor.isActive('link')) closeLinkBubble();
    });

    // Avoid closing bubble when toolbar link button steals focus briefly.
    let suppressBlurClose = false;

    // Close bubble when clicking outside
    rootDoc && rootDoc.addEventListener('mousedown', (e) => {
        if (!linkBubble || !linkBubble.classList.contains('open')) return;
        if (e.target === linkBubble || linkBubble.contains(e.target)) return;
        closeLinkBubble();
    });

    editor.view.dom.addEventListener('mouseover', (event) => {
        const anchor = event.target?.closest?.('a');
        if (!anchor || !editor.view.dom.contains(anchor)) return;
        const pos = editor.view.posAtDOM(anchor, 0);
        editor.chain().setTextSelection(pos).run();
        openLinkBubble('view');
    });

    editor.view.dom.addEventListener('mouseout', (event) => {
        if (event.target?.closest?.('a')) scheduleHoverClose();
    });

    editor.on('selectionUpdate', () => {
        if (linkBubbleMode === 'edit') return;
        closeLinkBubble();
    });
    editor.on('blur', () => {
        if (suppressBlurClose) return;
        closeLinkBubble();
    });

    // link open bubble
    const linkBtn = $('#linkButton');
    if (linkBtn) {
        // prevent editor selection from collapsing on mousedown
        linkBtn.addEventListener('mousedown', e => {
            suppressBlurClose = true;
            e.preventDefault();
        });

        linkBtn.addEventListener('click', e => {
            e.preventDefault();
            editor.chain().focus();
            const existing = editor.getAttributes('link') || {};
            const activeRange = getLinkRange();
            if (existing?.href && activeRange) {
                // If link already exists, clicking the button unlinks immediately.
                editor
                    .chain()
                    .focus()
                    .setTextSelection(activeRange)
                    .unsetLink()
                    .run();
                closeLinkBubble();
                setTimeout(() => { suppressBlurClose = false; }, 0);
                return;
            }
            openLinkBubble('edit'); // handles highlight
            // allow blur closing after the click cycle completes
            setTimeout(() => { suppressBlurClose = false; }, 0);
        });
    }
    // keyboard shortcut Ctrl/Cmd + K
    if (rootDoc) {
        rootDoc.addEventListener('keydown', e => {
            const key = e.key?.toLowerCase();
            if ((e.ctrlKey || e.metaKey) && key === 'k') {
                e.preventDefault();
                editor.chain().focus();
                const existing = editor.getAttributes('link') || {};
                const activeRange = getLinkRange();
                if (existing?.href && activeRange) {
                    editor
                        .chain()
                        .focus()
                        .setTextSelection(activeRange)
                        .unsetLink()
                        .run();
                    closeLinkBubble();
                    return;
                }
                openLinkBubble('edit');
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

    // Position tooltips so they don't spill outside the iframe/body.
    enableAutoTooltipPositioning();

    return refresh;
}


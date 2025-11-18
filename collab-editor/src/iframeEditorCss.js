
export const CSS = `
                     body,html{ 
                         width:auto;
                         height:auto;
                         overflow:hidden!important;
                     }
                     body { 
                         font-family: sans-serif; 
                         margin: 0;
                     }
                     *{
                       outline:none;
                     }
                     h1,h2,h3,h4,h5{margin: 0;}
                     .ge_outer_most_container {position: relative;}
                    .global_editor_toolbar_button_pane{display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%;min-height:36px;background:#ecf0f1;border-bottom:1px solid #d7e0e2;margin:0;padding:0 5px;position:relative;list-style-type:none;line-height:10px;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;z-index:11}
                    .global_editor_toolbar_button_pane:before{content:" ";display:block;position:absolute;top:35px;left:0;right:0;width:100%;height:1px;background:#d7e0e2}
                    .global_editor_toolbar_button_pane .global_editor_button_group{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}
                    .global_editor_toolbar_button_pane .global_editor_button_group::after{content:" ";display:block;width:1px;background:#d7e0e2;margin:0 5px;height:35px;vertical-align:top}
                    .global_editor_toolbar_button_pane button,.global_editor_toolbar_button_pane input[type=color],.global_editor_toolbar_button_pane select{display:block;position:relative;width:35px;height:35px;padding:1px 6px!important;margin-bottom:1px;overflow:hidden;border:none;cursor:pointer;background:0 0;vertical-align:middle;-webkit-transition:background-color 150ms,opacity 150ms;-o-transition:background-color 150ms,opacity 150ms;transition:background-color 150ms,opacity 150ms;font-family:"Open Sans",sans-serif;font-size:18px;color:#222;text-transform:none;line-height:normal;font-weight:400}
                    .global_editor_toolbar_button_pane svg{color:#222;}
                    .global_editor_toolbar_button_pane button:active,.global_editor_toolbar_button_pane input[type=color]:active,.global_editor_toolbar_button_pane select:active{transform:scale(.95)}
                    .global_editor_toolbar_button_pane select{padding:5px}
                    .global_editor_toolbar_button_pane input[type=color]{width:40px;height:35px;border:none;padding:0}
                    .global_editor_edit_main_area{background-color:#fff;font-family:Calibri,serif;line-height:1.6}
                    .global_editor_edit_main_area {
                        height: auto;
                        width: 100%;
                        min-height: 100%!important;
                        padding: 0px;
                        padding-bottom: 500px;
                        overflow: visible;
                        text-align: left;
                        direction: ltr;
                        position: relative;
                        contain: content;
                        max-height: 2000000px;
                    }
                    .global_editor_edit_main_area>*{
                       max-width: var(--editor-inner-width);
                       margin-left: auto!important;
                       margin-right: auto!important;
                    }
                    .global_editor_edit_main_area.global_editor_empty::before{content:'Type / to get editor options menu';color:#999;pointer-events:none;position:absolute}
                    .global_editor_edit_main_area.global_editor_empty_without_slash::before{content:'Type your text here';color:#999;pointer-events:none;position:absolute}
                    
                    .global_editor_edit_main_area:focus,.global_editor_textarea_section:focus{outline:0 solid transparent;text-rendering:auto!important}
                    .global_editor_edit_main_area .slashMenu{position:absolute;background:#fff;border:1px solid #ccc;box-shadow:0 2px 5px rgba(0,0,0,.1);border-radius:4px;padding:5px;z-index:1001}
                    .global_editor_edit_main_area table{border-collapse:collapse;border:1px solid #ccc;table-layout:fixed;width:100%}
                    .global_editor_edit_main_area table td,.global_editor_edit_main_area table th{border:1px solid #ccc;padding:8px;text-align:left;width:100px;overflow:hidden}
                    .global_editor_edit_main_area table td::after,.global_editor_edit_main_area table th{content:'';top:0;right:0;width:5px;position:absolute;cursor:col-resize;user-select:none;background-color:var(--resizer-color);height:var(--resizer-height)}
  
                    .global_editor_textarea_section{display:block;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;margin-bottom:1px;position:relative;overflow:auto;font-size:14px;font-family:Consolas,Courier,"Courier New",monospace;line-height:18px;color:#222;font-weight:300;height:100%!important;width:100%!important;resize:none!important;padding:15px;border:none!important;margin-top:10px;background-color:#fff;border-radius:4px;box-shadow:0 2px 5px rgba(0,0,0,.1)}
                    .global_editor_button_group .dropdown-content{display:none;position:absolute;background-color:#f9f9f9;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1000;max-height:150px;overflow:auto}
                    .global_editor_button_group .dropdown-button{display:inline-flex;align-items:center;padding:8px 12px;cursor:pointer;font-size:14px;width:auto}
                    .global_editor_button_group .dropdown-content div{padding:8px 16px;cursor:pointer}
                    .global_editor_button_group .dropdown-contents div:hover{background-color:#f1f1f1}
                    .global_editor_button_group .dropdown-button svg{margin-left:8px;vertical-align:middle}
                    .global_editor_button_group .dropdown-button .color_button_toolbar{height:20px;display:flex;width:20px;border-radius:50%}
                    .global_editor_button_group .dropdown-content.color_pallet_content .color_pallet{display:flex;border-radius:50%;height:25px;width:25px;padding:unset;margin:10px 10px}
                    .global_editor_button_group .dropdown-item.font_dropdown.active{background:#7f7f7f;color:#fff}
                    .global_editor_button_group .dropdown-item.color_pallet.active{position:relative}
                    .global_editor_button_group .dropdown-item.color_pallet.active::before{content:'✔';position:absolute;top:50%;left:7px;transform:translateY(-50%);color:#fff;font-size:12px}
                    .slash-dropdown-menu{overflow:auto;width:auto;height:153px;background:#fff;border-radius:4px;box-shadow:-2px 2px 19px 0 #cccccc9c}
                    .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item{padding:10px;font-size:15px;border-bottom:1px solid #d4d4d4;cursor:pointer}
                    .global_editor_modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.4);padding-top:60px}
                    .global_editor_modal .modal-content{background-color:#fefefe;margin:5% auto;padding:20px;border:1px solid #888;width:80%;max-width:300px;box-shadow:0 5px 15px rgba(0,0,0,.3);border-radius:8px}
                    .global_editor_modal .close{color:#333;float:right;font-size:28px;font-weight:500;cursor:pointer}
                    .global_editor_modal .close:focus,.global_editor_modal .close:hover{color:#000;text-decoration:none}
                    .global_editor_modal .form-group{margin-bottom:15px}
                    .global_editor_modal .form-group label{display:block;margin-bottom:5px}
                    .global_editor_modal .form-group input{width:calc(100% - 18px);padding:8px;border:1px solid #ccc;border-radius:4px}
                    .global_editor_modal .ge_create_modal_button{background-color:#8f8f8f;color:#fff;padding:10px 20px;border:none;border-radius:4px;width:100%;font-size:15px;cursor:pointer}
                    .global_editor_button_group.tool_event_disabled{opacity:.5;pointer-events:none}
                    .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item.active{background:#f4f7f7}
                    .global_editor_toolbar .global_editor_toolbar_button_pane .global_editor_button.active{background:#d8d8d8}
                    .global_editor_edit_main_area .ge_option_table_div{position:absolute;right:6px;top:0;cursor:pointer}
                    .global_editor_edit_main_area .ge_section_element_locked_by_other_user{background:#e3e3e3!important;user-select:none!important;cursor:not-allowed!important}
                    .global_editor_edit_main_area .ge_option_table_div.active svg{stroke:#0058e0}
                    .global_editor_edit_main_area .dropdown-content div{padding:8px 16px;cursor:pointer}
                    .global_editor_edit_main_area .dropdown-content div:hover{background-color:#f1f1f1}
                    .global_editor_edit_main_area .dropdown-content{display:none;position:fixed;background-color:#f9f9f9;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1000;max-height:150px;overflow:auto;user-select:none}
                   
                    .ge_tooltip_wrapper{display:none; opacity:0;position:absolute;z-index:99;background:#3b4146;color:#fff;padding:8px 6px;border-radius:4px;top:100%;bottom:auto;left:50%;margin:auto;transform:translate(-50%,0);margin-top:2px}
                    .ge_tooltip_wrapper span{display:block;text-align:center;padding:0 2px;white-space:pre;font-size:12px}
                    .hover_ele_type{color:#fff;font-size:13px;font-weight:500}
                    .shortcut{color:rgb(255 255 255 / 80%);margin-top:5px}
                    .tool_bar_wrap:hover .ge_tooltip_wrapper{opacity:1; display:block}
                    .global_editor_toolbar_button_pane{overflow:unset!important}

                    
                    .global_editor_toolbar .global_editor_toolbar_button_pane{display:inline-flex;margin:auto;width:auto;background:0 0;border:0}
                    .global_editor_toolbar .global_editor_toolbar_button_pane:before{display:none}
                    .global_editor_button_group.event_group_tool button svg{width:auto;height:auto}
                    .global_editor_toolbar_button_pane button:hover{background:#efefef}
                    .toolbar_selected_text{font-size:15px;font-weight:500;color:#1a1f22}
                    .global_editor_toolbar_button_pane .global_editor_button_group::after{margin:6px 5px!important;height:20px!important}
                    .global_editor_button_group .dropdown-content .dropdown-item{display:flex;align-items:center;padding:2px 4px;min-height:30px;border-radius:4px;font-size:14px}
                    .dropdown_ele_icon{display:inline-flex;width:24px;height:24px;border-radius:4px;align-items:center;justify-content:center;background:#e2e8ea;margin-right:6px;font-size:12px;padding:0!important}
                    .global_editor_button_group .dropdown-content .dropdown-item:hover{background:#f4f7f7}
                    .global_editor_button_group .dropdown-content{padding:4px;min-width:200px;border:1px solid #e2e8ea;border-radius:8px;background:#fff!important;max-height:300px!important}
                    .global_editor_edit_main_area{word-break:break-word}
                    .global_editor_toolbar_button_pane button svg.stroke_icon{fill:transparent}
                    .global_editor_toolbar_button_pane button{margin:0 5px}
                    .dropdown-content.color_pallet_content{width:192px;max-width:192px;min-width:auto}
                    .global_editor_button_group .dropdown-content.color_pallet_content .color_pallet{margin:0 3px;min-height:16px;border-radius:4px;height:16px;width:16px;border:1px solid #ebebeb}
                    .dropdown-content.color_pallet_content.active{display:flex!important;padding:7px 6px;flex-wrap:wrap}
                    .global_editor_button_group .dropdown-content.color_pallet_content .color_pallet::before{left:4px;font-size:10px}
                    .global_editor_button_group .dropdown-item.font_dropdown.active{background:#fff;color:#000}
                    .global_editor_toolbar_button_pane button:hover+.ge_tooltip_wrapper{opacity:1}
                    .global_editor_toolbar .global_editor_toolbar_button_pane .global_editor_button.active{background:#0e9af11a!important}
                    .global_editor_button.active svg *{stroke:#0E9AEF!important}
                    .tool_bar_wrap{position:relative}
                    .global_editor_toolbar_button_pane button:hover+.ge_tooltip_wrapper{opacity:1}
                    .global_editor_button.dropdown-button svg:first-child{margin-left:0}
                    .global_editor_button_group .dropdown-button .color_button_toolbar{border-radius:4px!important}
                    .global_editor_button_group .dropdown-button .color_button_toolbar svg{margin:0;position:relative;top:3px}
                    .global_editor_button_group .dropdown-button .color_button_toolbar{border-radius:4px!important;padding:0;width:25px!important;height:25px!important;max-width:25px;display:inline-block!important}
                    .global_editor_button_group .dropdown-button .color_button_toolbar svg *{stroke:#ffffff}
                    .global_editor_button .toolbar_selected_text{max-width:250px;white-space:nowrap;overflow:hidden;font-family:sans-serif;text-overflow:ellipsis;font-size:15px}
                    .global_editor_button_group .dropdown-button svg:first-child{margin-left:0}
                 
                    .global_editor_button.dropdown-button .color_button_toolbar[style="background: rgb(255, 255, 255);"] svg *{stroke:#333333}
                    .global_editor_button.dropdown-button .color_button_toolbar{border:1px solid #00000026}
                    .ge_slash-dropdown-menu {
                        padding: 4px;
                        min-width: 180px;
                        border: 1px solid #e2e8ea;
                        border-radius: 8px;
                        background: #fff !important;
                        height: auto;
                        max-height: 360px;
                        overflow: auto;
                        overflow-x: hidden;
                        z-index: 999;
                    }
                    .ge_e_overlay_editor_block_events {
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                        z-index: 99;
                    }
                    .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item{display:flex;align-items:center;padding:2px 4px;min-height:30px;border-radius:4px;font-size:14px;border:0}
                    .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item:hover{background:#f4f7f7}
                    .dropdown-item.font_dropdown.active:after,.ge_slash-dropdown-menu .ge_slash-menu-dropdown-item.active:after{content:url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.828' height='9.289' viewBox='0 0 12.828 9.289'%3E%3Cg id='tick' transform='translate(-2.586 -5.086)'%3E%3Cpath id='Path_5418' data-name='Path 5418' d='M4,10.319l3.077,3.056L14,6.5' fill='none' stroke='%232C72E4' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E%0A");position:absolute;right:10px}
                    .ge_cursor_user{position:absolute;width:2px;height:20px}
                    .global_editor_modal label{margin-bottom:8px!important;font-size:13px;font-weight:600;color:#282c34;line-height:normal}
                    .global_editor_modal .ge_create_modal_button{padding:0 8px!important;font-size:13px;margin:0;background:#0e9aef!important}
                    .global_editor_modal .ge_create_modal_button:hover{background:#1a7bb9!important}
                    .global_editor_modal .form-group input:focus-visible{outline:1px solid #1a7bb9!important}
                    .global_editor_edit_main_area .global_editor_textarea_section{width:auto!important;padding:16px;margin:0;border:0!important;box-shadow:none}
                    .ge_tooltip_wrapper:after{content:'';position:absolute;width:8px;height:8px;background:#333;top:-3px;left:0;right:0;margin:auto;transform:rotate(45deg)}
                  
                    .ge_below_the_editor .ge_tooltip_wrapper:after{bottom:-4px;top:auto}
                    .ge_below_the_editor .ge_tooltip_wrapper{bottom:100%;top:auto;margin-bottom:8px}
                    .ge_below_the_editor.global_editor_toolbar{
                        border: 1px solid #e7e8e8;
                        border-radius: 8px;
                        position: absolute;
                    }
                    .global_editor_toolbar_button_pane .global_editor_button_group.event_group_tool:last-child:after{display:none}
                    .global_editor_toolbar_button_pane button:active,.global_editor_toolbar_button_pane input[type=color]:active,.global_editor_toolbar_button_pane select:active{transform:unset!important}
                    .slash-dropdown-menu .ge_slash-menu-dropdown-item.active{background:#fff!important}
                    .global_editor_modal .modal-header{justify-content:start;padding:15px 15px;text-align:left;align-items:center;display:flex;border-bottom:1px solid #dee2e6;position:relative}
                    .global_editor_modal .modal-header .modal-title{font-size:18px;margin:initial;text-align:left!important;font-weight:600;line-height:normal;color:#000}
                    .global_editor_modal .modal-header button.close.close_bg_on_hover{right:6px;top:0;left:auto;position:absolute;bottom:0;margin:auto}
                    .modal-footer{padding:10px 15px;background-color:#fff;border-bottom-left-radius:4px;border-bottom-right-radius:4px}
                    .btn{font-size:14px;line-height:1.42857143;margin:0;padding:6px 12px}
                    .btn-default{background:#fff;border:1px solid #e7eaec;color:inherit}
                    .modal-body{padding:15px}
                    .modal-footer{border-top:1px solid #dee2e6;text-align:right;display:flex;justify-content:right}
                    .btn-default{color:inherit;background:#fff;border:1px solid #e7eaec}
                    .modal-footer .btn-default{background:#fff!important;border:1px solid #e7eaec!important;font-size:14px}
                    .modal-footer .btn{font-size:14px!important}
                    .global_editor_modal .modal-content{padding:0!important}
                    .modal-body .form-group:last-child{margin-bottom:0}
                    .global_editor_toolbar_button_pane button:hover{background:#efefef!important}
                    .grid_col_1.grid_col_line {
                        left: calc(((var(--editor-outer-width) - var(--editor-inner-width)) / 2) - 8px);
                    }
                    
                    .grid_col_2.grid_col_line {
                        left: calc(((var(--editor-outer-width) - var(--editor-inner-width)) / 2 + var(--editor-inner-width) / 5 * 1) - 8px);
                    }
                    
                    .grid_col_3.grid_col_line {
                        left: calc(((var(--editor-outer-width) - var(--editor-inner-width)) / 2 + var(--editor-inner-width) / 5 * 2) - 8px);
                    }
                    
                    .grid_col_4.grid_col_line {
                        left: calc(((var(--editor-outer-width) - var(--editor-inner-width)) / 2 + var(--editor-inner-width) / 5 * 3) - 8px);
                    }
                    
                    .grid_col_5.grid_col_line {
                        left: calc(((var(--editor-outer-width) - var(--editor-inner-width)) / 2 + var(--editor-inner-width) / 5 * 4) - 8px);
                    }
                    
                    .grid_col_6.grid_col_line {
                        left: calc(((var(--editor-outer-width) - var(--editor-inner-width)) / 2 + var(--editor-inner-width) / 5 * 5) - 8px);
                    }

                   
                    .content_section_inner_container{display:block;position:relative;min-height:25px;width:100%;line-height:24px}
                    .content_section_inner_container.gl_doc_selectable_div.has_new_user_editing_lock_this.editable_draggable_handle{display:none!important}
                    .content_section_inner_container.has_new_user_editing_lock_this{background:#b2b7b924}
                    .content_section_inner_container.has_new_user_editing_lock_this{opacity:.8}
                    .cursor_none{cursor:none!important}
                   
                    .doc_type_icon img.doc_icon_gdrive{width:15px;margin-right:9px}
                    .image-border{
                        position: absolute;
                        z-index: 999;
                    }
                    .full_width_layout_content_column{font-kerning:auto;width:100%}
                    /*.full_width_layout_content_column{margin:0 14px!important;}*/
                    .editable_content_section_li_section{width:100%;min-height:21px}
                    li.preview_li_section.list_checked.editable_content_section_li_section{opacity:.6;text-decoration:line-through rgb(55 53 47 / .25)}
                    li.content_section_inner_container{min-height:22px}
                    .preview_ul_section.ol_list.preview_li_section{padding-left:5px!important}
                    .content_section_inner_container.gl_doc_selectable_div.has_new_user_editing_lock_this .editable_draggable_handle{display:none!important}
                    .content_section_inner_container.gl_doc_selectable_div.three_dropdown_active{background:rgb(14 154 239 / 10%)}
                    .content_section_inner_container.gl_doc_selectable_div{color:#000000;font-size: 17px;padding: 2px;hyphens:auto;}
                    .image-container.content_section_inner_container{position: relative;}
                    .image-container{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}
                    .image-container.cropping_image{overflow:hidden}
                    .image-container img.gl_doc_image{max-width:100%;width:100%;-webkit-user-drag:none}
                    .image-container.audio_container{padding:0}
                    .editor-ui-resize-handle.y-middle{top:calc(50% - 10px)}
                    .editor-ui-resize-handle.x-start{left:-10px}
                    .editor-ui-resize-handle.x-end{right:-10px}
                    .editor-ui-resize-handle.y-end{bottom:-10px}
                    .editor-ui-resize-handle.y-start{top:-10px}
                    .editor-ui-resize-handle.no-caret-move.x-end.y-end.nwse-resize{cursor:nw-resize}
                    .editor-ui-resize-handle.no-caret-move.x-start.y-middle.ew-resize{cursor:e-resize}
                    .editor-ui-resize-handle.no-caret-move.x-start.y-end.nesw-resize{cursor:ne-resize}
                    .editor-ui-resize-handle.no-caret-move.x-end.y-start.nesw-resize{cursor:ne-resize}
                    .editor-ui-resize-handle.no-caret-move.x-end.y-middle.ew-resize{cursor:e-resize}
                    .editor-ui-resize-handle:after{content:"";width:8px;height:8px;cursor:row-resize;border-radius:4px;background-color:#fff;box-shadow:0 0 0 1px #ccc}
                    .editor-ui-resize-handle{position:absolute;width:20px;height:20px;pointer-events:all;display:flex!important;justify-content:center;align-items:center;z-index:9}
                    .cropping_image .image-cropping-border{display:block}
                    .image-cropping-border{display:none;bottom:0;left:0;position:absolute;margin:5px;right:0;top:0;border:2px dashed #0e9aef;box-shadow:0 0 0 1000000px rgba(0,0,0,.5)}
                    .image-container img.gl_doc_image{max-width:100%;width:100%;-webkit-user-drag:none}
                    .crop-overlay-resize-handle.top-left{top:-6px;left:-6px;cursor:nwse-resize;z-index:100}
                    .crop-overlay-resize-handle.top-right{top:-6px;right:-6px;cursor:nesw-resize}
                    .crop-overlay-resize-handle.bottom-left{bottom:-6px;left:-6px;cursor:nesw-resize}
                    .crop-overlay-resize-handle.bottom-right{bottom:-6px;right:-6px;cursor:nwse-resize}
                    .crop-overlay-resize-handle{background-color:#0e9aef;position:absolute;width:10px;height:10px;border-radius:1px;border:1px solid #0e9aef}
                    .cropping_image .image-cropping-border{display:block}
                    .editable_content_draggable_div_hover{width:100%;border:1px solid #3d87f5;position:absolute;z-index:9;}
                    .editable_content_draggable_div_hover:before{content:"";width:10px;height:10px;border-radius:100%;display:inline-block;background-color:#0e9aef;position:absolute;left:-11px;top:-5px}
                    .editable_content_draggable_div_hover:after{content:"";width:10px;height:10px;border-radius:100%;display:inline-block;background-color:#0e9aef;position:absolute;right:-11px;top:-5px}
                    .image-border {
                        max-width: 100%;
                        pointer-events: none;
                        position: absolute;
                        border: 2px solid #0e9aef;
                    }
                    #editor-default-section-text-overlay{font-size: 14px;-webkit-backface-visibility:hidden;backface-visibility:hidden;position:absolute;z-index:9999999999;user-select:none;display:inline-flex;font-kerning:auto;line-height:27px;font-weight:400;color:#a5a5a5}
                    #editor-default-section-text-overlay>div>span:first-child{background:#ececec;display:inline;border-radius:2px;padding:0 1px;height:auto;color:#353535}
                    .editable_draggable_handle .inline_icon_tray {
                        display: inline-flex;
                    }
                    .editable_draggable_handle svg {
                        cursor: grab;
                        width: 15px;
                        height: 20px;
                        border-radius: 5px;
                        transition: background 20ms ease-in 0s,opacity .25s ease-in 0s;
                        -webkit-transition: background 20ms ease-in 0s,opacity .25s ease-in 0s;
                        -moz-transition: background 20ms ease-in 0s,opacity .25s ease-in 0s;
                        -ms-transition: background 20ms ease-in 0s,opacity .25s ease-in 0s;
                        -o-transition: background 20ms ease-in 0s,opacity .25s ease-in 0s;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        display: inline-flex;
                    }
                    .editable_draggable_handle i {
                        margin-top: 0px;
                        color: #8e8e8e;
                        font-size: 12px;
                    }
                    .editable_draggable_handle svg {
                        fill: #8e8e8e;
                        width: 15px;
                        padding: 0 0px !important;
                    }
                    .editable_draggable_handle i:hover {
                        background-color: #dfdddd;
                        color: #333333;
                    }
                    .editable_draggable_handle svg:hover {
                        background-color: #dfdddd;
                        color: #333333; fill:#333333;
                    }
                    .editable_draggable_handle{
                        z-index: 999999;
                        background: #ebebeb;
                        border-radius: 2px;
                        padding: 1px 3px;
                    }
                    .content_section_inner_container.gl_doc_selectable_div.has_new_user_editing_lock_this .editable_draggable_handle {
                        display: none!important;
                    }
                    #new_image_draggable_clone .editable_content_draggable_div_hover{
                        display: none!important;
                    }
                    #new_image_draggable_clone .custom_draggable_tooltip{
                        display: none!important;
                    }
                    #new_image_draggable_clone img.gl_doc_image {
                        width: 133px;
                    }
                    #new_image_draggable_clone {
                        position: fixed;
                        z-index: 9999999999999;
                        height: auto;
                        width: auto;
                        opacity: 0.4;
                    }
                    .grid_col_line {
                        display:none;
                        position: absolute;
                        top: 0;
                        width: 1px;
                        background-color: rgba(230, 230, 231, 1);
                        height: 100%;
                        z-index: 1;
                    }
                    .new_user_editing_this_line {
                        position: absolute;
                        cursor: pointer;
                        width: 24px;
                        height: 24px;
                        display: inline-flex;
                        padding: 0;
                        border-radius: 100%;
                        color: #fff;
                        background: #7a7a7a;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        line-height: 24px;
                        font-weight: 600;
                        font-size: 13px;
                        box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
                        -webkit-box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
                        -moz-box-shadow: 0 3px 6px rgba(0,0,0,.1607843137254902);
                        -ms-box-shadow: 0 3px 6px rgba(0,0,0,.1607843137254902);
                        -o-box-shadow: 0 3px 6px rgba(0,0,0,.1607843137254902);
                    }
                    
                    .new_user_editing_this_line .second_letter_editing {
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    #other_user_context_menu_dropdown {
                        position: absolute;
                        background: #fff;
                        border-radius: 5px;
                        padding: 10px;
                        font-size: 13px;
                        box-shadow: 1px 0px 15px 3px #bfbfbf87;
                    }
                    
                    .three_dot_dropdown_ctrl ul {
                        list-style: none;
                        padding: 0px;
                    }
                    
                    .three_dot_dropdown_ctrl ul li {
                        cursor: pointer;
                        font-size: 12px;
                    }
                    
                    .three_dot_dropdown_ctrl .section_is_locked_by_user_header_section {
                        color: #5c5c5c;
                        font-size: 11px;
                    }
                    .media-placeholder.on-focus-outer-box-shadow {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        -ms-user-select: none;
                        -webkit-user-select: none;
                        user-select: none;
                        cursor: pointer;
                        width: 100%;
                        background-color: #f5f5f7;
                        border: 2px solid #dee0e1;
                    }
                    .media-placeholder.on-focus-outer-box-shadow:hover {
                        background-color: #dbdee5;
                    }
                    .clicked .media-placeholder.on-focus-outer-box-shadow {
                        border: 2px solid transparent;
                    }
                    .media-placeholder-with-text {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-size: 12px;
                        color: #6D6D6D;
                        text-align: center;
                        width: 100%;
                        padding: 0;
                        height: 93px;
                        justify-content: center;
                    }
                    .media-placeholder-with-text .text_icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        width:100%;
                    }
                    .media-placeholder-with-text .text_icon svg {
                        display: inline-flex;
                        margin: 0 5px 0 0;
                        height: auto;
                    }
                    .media-placeholder-with-text .text {
                        padding: 0 20px;
                        width: 100%;
                    }
                   
                    .image-placeholder-container.on-focus-outer-box-shadow.object_placeholder_container_click {
                        width: 100%;
                    }
                  .options_category {
                    font-size: 11px;
                    color: rgb(37 34 34 / 69%);
                    opacity: 1;
                    padding: 4px 7px 4px 7px;
                    height: auto;
                    display: inline-block;
                    width: 100%;
                    cursor: default;
                }
                .preview_ul_section {
                    width: 100%;
                }
                .preview_ul_section.check_list{
                    list-style-type: none;
                }
                ul.preview_ul_section.check_list li.preview_li_section { display: flex;word-break: break-all; padding:0 0 0 23px; align-items:flex-start; position:relative; }
                li.preview_li_section.list_checked .editable_content_section_li_section {opacity: 0.6;text-decoration: line-through rgba(55, 53, 47, 0.25);}
                .preview_ul_section.ol_list .preview_li_section {padding-left: 5px!important;}
                ul.preview_ul_section.check_list li.preview_li_section .checkboxSquare, ul.preview_ul_section.check_list li.preview_li_section .checkbox {margin: 4px 0;}
                .preview_li_section svg.checkbox {
                    background: rgb(46, 170, 220);
                    fill: #fff;
                    padding: 1px 1px 1px 1px;
                }
                .preview_li_section svg {
                    margin-right: 0;
                    margin-top: 0;
                    cursor: pointer;
                    position: absolute;
                    left: 0;
                    width: 15px;
                    height: 15px !important;
                    border-radius: 0;
                }
                hr.editable_content_section_not_editable{
                 border: unset;
                 min-height: 1px!important;
                 background: #cccccc;
                }
                .preview_ul_section {
                    width: 100%;
                    margin: 0px;
                    padding: 0px 20px;
                }
                .preview_ul_section.check_list {
                    list-style-type: none;
                    padding: 0px;
                }
                .second_popup_inner_body {
                    padding-left: 7px;
                }
                .embed_capture_iframe_section {
                    border: 1px solid #000000;
                    width: 100%;
                }
                .iframe_overlay_prevent_event{
                   position: absolute;
                   width: 100%;
                   height: 100%;
                   background: transparent;
                   top: 0px;
                   left: 0px;
                }
                .iframe-container-embed{
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    padding: 20px;
                    background: #ffffff;
                    border: 1px solid #d6d6d6;
                    cursor: pointer;
                    border-radius: 5px;
                }
                
                ul,ol{padding: 0px;}


/* Indentation classes */
.gel-intend-1 {
    margin-left: 20px; /* Indent for first level of nesting */
}

.gel-intend-2 {
    margin-left: 40px; /* Indent for second level of nesting */
}

.gel-intend-3 {
    margin-left: 60px; /* Indent for third level of nesting */
}

.gel-intend-4 {
    margin-left: 80px; /* Indent for fourth level of nesting */
}

.gel-intend-5 {
    margin-left: 100px; /* Indent for fifth level of nesting */
}

.gel-intend-6 {
    margin-left: 120px; /* Indent for sixth level of nesting */
}

li.ordered:before {
    padding-right: 5px;
    line-height: 1;
    position: absolute;
    top: 6px;
    left: 0px;
}

li.bullet:before {
    padding-right: 5px;
    line-height: 1;
    position: absolute;
    content: "\\2022";
    font-size: 1.5em;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: middle;
    top: 2px;
    left: 0px;
}

ol {
    counter-reset: main-counter; /* Initialize main counter */
    list-style-type: none; /* Remove default styling */
    padding-left: 0; /* Remove default padding */
}
ol > li.ordered {
    padding-left: 20px; /* Indent for top-level ordered items */
    position: relative; /* Position for custom bullets */
}
/* Main list items */
ol > li.ordered:not(.gel-intend-1):not(.gel-intend-2):not(.gel-intend-3):not(.gel-intend-4):not(.gel-intend-5):not(.gel-intend-6) {
    counter-increment: main-counter; /* Increment main counter for top-level items */
}

/* Main numbering style */
ol > li.ordered:not(.gel-intend-1):not(.gel-intend-2):not(.gel-intend-3):not(.gel-intend-4):not(.gel-intend-5):not(.gel-intend-6):before {
    content: counter(main-counter) ". ";
}

ol > li.ordered:before {
    padding-right: 5px;
    line-height: 1;
}

/* Unordered list bullets styled as dots */
/* Root ordered list counter */
.ordered {
    counter-reset: nested-counter-1; /* Reset for top-level ordered items */
}

/* Reset and increment for each indentation level */

/* Indentation level 1 */
.gel-intend-1 {
    counter-reset: nested-counter-2; /* Reset the next level */
}

.ordered.gel-intend-1:before {
    content: counter(nested-counter-1, decimal) ". "; /* Decimal numbering */
    counter-increment: nested-counter-1; 
    line-height: 1;
}

/* Indentation level 2 */
.gel-intend-2 {
    counter-reset: nested-counter-3; /* Reset for the next indentation level */
}

.ordered.gel-intend-2:before {
    content: counter(nested-counter-2, lower-alpha) ". "; /* Lowercase alphabet */
    counter-increment: nested-counter-2;
    line-height: 1;
}

/* Indentation level 3 */
.gel-intend-3 {
    counter-reset: nested-counter-4; /* Reset for the next indentation level */
}

.ordered.gel-intend-3:before {
    content: counter(nested-counter-3, lower-roman) ". "; /* Roman numerals */
    counter-increment: nested-counter-3;
    line-height: 1;
}

/* Indentation level 4 */
.gel-intend-4 {
    counter-reset: nested-counter-5;
}

.ordered.gel-intend-4:before {
    content: counter(nested-counter-4, decimal) ". ";
    counter-increment: nested-counter-4;
    line-height: 1;
}

/* Indentation level 5 */
.gel-intend-5 {
    counter-reset: nested-counter-6;
}

.ordered.gel-intend-5:before {
    content: counter(nested-counter-5, lower-alpha) ". ";
    counter-increment: nested-counter-5;
    line-height: 1;
}

/* Indentation level 6 */
.gel-intend-6 {
    counter-reset: none; /* No further reset */
}

.ordered.gel-intend-6:before {
    content: counter(nested-counter-6, lower-roman) ". ";
    counter-increment: nested-counter-6;
    line-height: 1;
}

li.content_section_inner_container {
    padding-left: 25px!important;
    position: relative;
}

.gel-table-formatter__overlay {
    pointer-events: none
}
.gel-table-formatter__overlay-show-column-handle .gel-table-formatter__handle-column,.gel-table-formatter__overlay-show-row-handle .gel-table-formatter__handle-row {
    display: flex
}

.gel-table-formatter__overlay-show-add-columns-handle .gel-table-formatter__handle-add-columns,.gel-table-formatter__overlay-show-add-rows-handle .gel-table-formatter__handle-add-rows,.gel-table-formatter__overlay-show-add-rows-columns-handle .gel-table-formatter__handle-add-rows-columns {
    display: block
}

.gel-table-formatter__resizer {
    position: absolute;
    display: none;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #000000;
    cursor: ew-resize;
    z-index: 20;
    pointer-events: all
}

.gel-table-formatter__resizer:before,.gel-table-formatter__resizer:after {
    content: "";
    display: block;
    height: 100%;
    width: 5px;
    position: absolute
}

.gel-table-formatter__resizer:before {
    left: -4px
}

.gel-table-formatter__resizer:after {
    right: -4px
}

.gel-table-formatter__handle-column,.gel-table-formatter__handle-row {
    align-items: center;
    border-radius: 3px;
    border: 1px solid #e8eaed;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .055);
    background-color: #ffffff;
    display: none;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    transform: translate(-50%,-50%);
    pointer-events: all
}

.gel-table-formatter__handle-column:hover,.gel-table-formatter__handle-row:hover {
    background-color: #e8eaed
}

.gel-table-formatter__handle-column_icon,.gel-table-formatter__handle-row_icon {
    fill: #656f7d;
    width: 13px;
    height: 13px;
}

.gel-table-formatter__handle-column_icon svg,.gel-table-formatter__handle-row_icon svg {
    width: 100%;
    height: 100%
}

.gel-table-formatter__handle-column.active,.gel-table-formatter__handle-row.active {
    background-color: #000000;
}

.gel-table-formatter__handle-column.active .gel-table-formatter__handle-column_icon,.gel-table-formatter__handle-column.active .gel-table-formatter__handle-row_icon,.gel-table-formatter__handle-row.active .gel-table-formatter__handle-column_icon,.gel-table-formatter__handle-row.active .gel-table-formatter__handle-row_icon {
    fill: #fff
}

.gel-table-formatter__handle-column {
   height: 11px;
    width: 19px;
    top: -7px;
}
.gel-table-formatter__handle-row{
left:-7px;
}

.gel-table-formatter__handle-column_icon {
    transform: rotate(90deg)
}

.gel-table-formatter__handle-row {
    height: 19px;
    width: 11px
}

.gel-table-formatter__handle-add-columns,.gel-table-formatter__handle-add-rows,.gel-table-formatter__handle-add-rows-columns {
    position: absolute;
    pointer-events: all;
    display: none
}

.gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-rows-columns_inner {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: 1px solid #f0f1f3;
    background-color: #f0f1f3
}

.gel-table-formatter__handle-add-columns_icon,.gel-table-formatter__handle-add-rows_icon,.gel-table-formatter__handle-add-rows-columns_icon {
    width: 12px;
    height: 12px;
    fill: #656f7d
}

.gel-table-formatter__handle-add-columns_icon svg,.gel-table-formatter__handle-add-rows_icon svg,.gel-table-formatter__handle-add-rows-columns_icon svg {
    width: 100%;
    height: 100%
}

.gel-table-formatter__handle-add-columns:hover .gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-columns:hover .gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-columns:hover .gel-table-formatter__handle-add-rows-columns_inner,.gel-table-formatter__handle-add-rows:hover .gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-rows:hover .gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-rows:hover .gel-table-formatter__handle-add-rows-columns_inner,.gel-table-formatter__handle-add-rows-columns:hover .gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-rows-columns:hover .gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-rows-columns:hover .gel-table-formatter__handle-add-rows-columns_inner {
    background-color: #e8eaed
}

.gel-table-formatter__handle-add-columns.active .gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-columns.active .gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-columns.active .gel-table-formatter__handle-add-rows-columns_inner,.gel-table-formatter__handle-add-rows.active .gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-rows.active .gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-rows.active .gel-table-formatter__handle-add-rows-columns_inner,.gel-table-formatter__handle-add-rows-columns.active .gel-table-formatter__handle-add-columns_inner,.gel-table-formatter__handle-add-rows-columns.active .gel-table-formatter__handle-add-rows_inner,.gel-table-formatter__handle-add-rows-columns.active .gel-table-formatter__handle-add-rows-columns_inner {
    background-color: #000000;
}

.gel-table-formatter__handle-add-columns.active .gel-table-formatter__handle-add-columns_icon,.gel-table-formatter__handle-add-columns.active .gel-table-formatter__handle-add-rows_icon,.gel-table-formatter__handle-add-columns.active .gel-table-formatter__handle-add-rows-columns_icon,.gel-table-formatter__handle-add-rows.active .gel-table-formatter__handle-add-columns_icon,.gel-table-formatter__handle-add-rows.active .gel-table-formatter__handle-add-rows_icon,.gel-table-formatter__handle-add-rows.active .gel-table-formatter__handle-add-rows-columns_icon,.gel-table-formatter__handle-add-rows-columns.active .gel-table-formatter__handle-add-columns_icon,.gel-table-formatter__handle-add-rows-columns.active .gel-table-formatter__handle-add-rows_icon,.gel-table-formatter__handle-add-rows-columns.active .gel-table-formatter__handle-add-rows-columns_icon {
    fill: #fff
}

.gel-table-formatter__handle-add-columns {
    right: -16px;
    width: 27px;
    top: -8px;
    bottom: 9px;
    display: block;
    cursor: ew-resize;
}

.gel-table-formatter__handle-add-columns_inner {
    width: 12px;
    height: 100%;
    top: 0;
    left: 6px
}

.gel-table-formatter__handle-add-rows {
    left: -1px;
    right: -1px;
    bottom: -16px;
    height: 18px;
    display: block;
    cursor: ns-resize
}
.gel-table-formatter__resizer{
 top: -7px;
  bottom: -1px;
}

.gel-table-formatter__handle-add-rows_inner {
    height: 12px;
    width: 100%;
    top: -3px;
    left: -7px;
}

.gel-table-formatter__handle-add-rows-columns {
    width: 18px;
    height: 18px;
    bottom: -15px;
    right: -16px;
    z-index: 2;
    cursor: nwse-resize
}

.gel-table-formatter__handle-add-rows-columns_inner {
    height: 12px;
    width: 12px;
    bottom: 0;
    right: 0;
}

.ge_table_view.ge_table_view_wide {
    width: 100% !important;
    max-width: var(--editor-inner-width);
    scrollbar-color: rgb(173,179,189) rgb(255,255,255);
    scrollbar-width: thin;
    overflow: auto;
    padding: 0 0 1rem 0 !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
video{
    width: 100%;
}
image{
    width: 100%;
}
.selection_click_icon_section{position:absolute;overflow:hidden;top:0;right:0;width:20px;height:20px;z-index:9}

.selection_on_hover,.selection_on_hover_visible{position:absolute;top:-8px;right:-8px;width:25px;height:25px;border-radius:100%;border:2px solid #fff;cursor:pointer}
.selection_on_hover_visible{background-color:#0e9aef}
.selection_on_hover{background-color:#acb1b9}
.selection_on_hover_visible{opacity:0;background-color:#0e9aef}
.selection_click_icon_section:hover .selection_on_hover_visible{opacity:1}
.selection_click_icon_section:hover .selection_on_hover{opacity:0}
.clicked .selection_on_hover_visible{display:block!important}
.clicked .selection_on_hover_visible{opacity:1!important}
.clicked .selection_on_hover{opacity:0!important}
h1 {
    font-size: 21px !important;
    color: #8b0000 !important;
    font-weight: bold !important;
    margin-bottom: 9px!important;
    margin-top: 9px!important;
}
h2 {
    font-size: 19px !important;
    color: rgb(28, 69, 135) !important;
    font-weight: bold !important;
    line-height: 30px !important;
    margin-top: 7px!important;
    margin-bottom: 7px!important;
}

h2:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background: #000000!important;
    bottom: 0px;
    left: 0;
}
h3 {
    font-size: 18px !important;
    color: rgb(0, 112, 192) !important;
    font-weight: bold !important;
    line-height: 28px !important;
    margin-top: 5px!important;
    margin-bottom: 5px!important;
}
h4 {
    font-size: 17px !important;
    color: #000000 !important;
    font-weight: bold !important;
    line-height: 26px !important;
    margin-top: 4px!important;
    margin-bottom: 4px!important;
}
hr {
    height: 1px;
    background: #cbcbcb !important;
    bottom: 0;
    line-height: 0 !important;
    padding: 0!important;
    min-height: 1px !important;
    font-size: 0 !important;
    border: none !important;
    margin-top: 40px !important;
    margin-bottom: 40px !important;
}


.li_section.check{
   position: relative;
}

.li_section.check:before{
    background-color: #ffffff;
    margin: 0;
    translate: calc(-12px - 50%) calc(1.5 * 15px / 2 - 50%);
    background: #0000;
    border: 1px solid #000000;
    border-radius: 50%;
    content: "";
    margin-left: -4px;
    padding: 0;
    transform: translateX(0);
    height: 15px;
    width: 15px;
    position: absolute;
    text-align: center;
    white-space: nowrap;
    color: #777;
    cursor: pointer;
    user-select: none;
}

.li_section.check[data-list=checked]:before{
    background: #0000;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23FFFFFF"><path fill-rule="evenodd" d="M18.707 7.293a1 1 0 0 1 0 1.414l-7.996 7.996-.003.004a1 1 0 0 1-1.415 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M18.707 7.293a1 1 0 0 1 0 1.414l-7.996 7.996-.003.004a1 1 0 0 1-1.415 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"/></svg>'), linear-gradient(#67cb48, #67cb48);
    background-position: 50%;
    background-size: 12px;
    border-color: #67cb48;
}

.li_section.check[data-list=checked]{
  color: #6f6f6f;
  text-decoration: line-through;
}

h1.editable_content_section:before {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M8.34 17.052c.166.953 1.301 1.249 2.183.605.632-.463 1.454-1.1 2.483-1.967 1.238-1.043 2.026-1.865 2.523-2.466.628-.759.628-1.69 0-2.448-.497-.601-1.285-1.423-2.523-2.466a46.254 46.254 0 0 0-2.483-1.967c-.881-.644-2.017-.348-2.183.605C8.16 7.978 8 9.577 8 12c0 2.423.16 4.021.34 5.052Z'></path></svg>");
    content: "";
    margin-left: 2px;
    margin-top: 1px;
    translate: calc(-12px - 50%) calc(1.5 * 15px / 2 - 50%);
    padding: 0;
    transform: translateX(0);
    height: 20px;
    width: 20px;
    position: absolute;
    text-align: center;
    white-space: nowrap;
    rotate: 90deg;
    cursor: pointer;
    background-repeat: no-repeat;
    user-select: none;
    background-position: 50%;
    background-size: 16px;
    border-color: #ffffff;
    border-radius: 5px;
    opacity: 0;
}

h1.editable_content_section:hover:before{ 
    background-color: #e5e5e5; 
    opacity: 1; 
}

h1.editable_content_section[data-collapsed=true]:before{ rotate: 0deg;opacity: 1; }

/* ---- Table overlay menu ---- */
.gel-table-menu{
  position:absolute;
  z-index:971;
  min-width:180px;
  max-width:280px;
  max-height:260px;           /* scroll if many items */
  overflow:auto;
  padding:6px;
  background:#fff;
  border:1px solid #D0D5DD;
  border-radius:8px;
  box-shadow:0 8px 24px rgba(0,0,0,.12);
  pointer-events:auto;        /* clickable even if parent has none */
  -webkit-font-smoothing:antialiased;
  animation: gel-menu-fade 120ms ease-out;
}

/* optional little arrow; set data-arrow="top|left|right|bottom" on the menu if you want */
.gel-table-menu[data-arrow]::after{
  content:"";
  position:absolute;
  width:10px; height:10px;
  background:#fff;
  border-left:1px solid #D0D5DD;
  border-top:1px solid #D0D5DD;
  transform:rotate(45deg);
}
.gel-table-menu[data-arrow="top"]::after{    top:-6px;  left:12px; }
.gel-table-menu[data-arrow="left"]::after{   left:-6px; top:12px;  }
.gel-table-menu[data-arrow="right"]::after{  right:-6px; top:12px; }
.gel-table-menu[data-arrow="bottom"]::after{ bottom:-6px; left:12px; }

/* ---- Items ---- */
.gel-table-menu .gel-menu-item{
  display:flex;
  align-items:center;
  gap:8px;
  width:100%;
  padding:8px 10px;
  margin:2px 0;
  background:transparent;
  border:0;
  border-radius:6px;
  cursor:pointer;
  font-size: 14px;
  color:#101828;
  text-align:left;
}
.gel-table-menu .gel-menu-item:hover{ background:#F2F4F7; }
.gel-table-menu .gel-menu-item:active{ background:#E4E7EC; }
.gel-table-menu .gel-menu-item:focus-visible{
  outline:2px solid #2E90FA;
  outline-offset:2px;
}

/* icon sizing (if present) */
.gel-table-menu .gel-menu-item svg{
  width:14px; height:14px; flex:0 0 auto;
}

/* separators and section labels (optional) */
.gel-table-menu .gel-menu-sep{
  height:1px; background:#EAECF0; margin:6px 8px;
}
.gel-table-menu .gel-menu-label{
  font-size:12px; color:#667085; padding:6px 10px 4px; cursor:default;
}

/* danger + disabled states */
.gel-table-menu .gel-menu-item.is-danger,
.gel-table-menu .gel-menu-item[data-action*="delete"]{ color:#B42318; }
.gel-table-menu .gel-menu-item[aria-disabled="true"]{
  opacity:.45; cursor:not-allowed; pointer-events:none;
}

/* tiny fade */
@keyframes gel-menu-fade{
  from{ opacity:0; transform:translateY(-2px); }
  to{   opacity:1; transform:translateY(0); }
}

/* optional dark mode */
@media (prefers-color-scheme: dark){
  .gel-table-menu{
    background:#0B0F14; border-color:#233041; box-shadow:0 8px 24px rgba(0,0,0,.5);
  }
  .gel-table-menu[data-arrow]::after{
    background:#0B0F14; border-color:#233041;
  }
  .gel-table-menu .gel-menu-item{ color:#DEE7F3; }
  .gel-table-menu .gel-menu-item:hover{ background:#15202B; }
  .gel-table-menu .gel-menu-sep{ background:#1E2A38; }
  
}

body.doc_editor_body_main {
    position: relative;
}

.ge_outer_most_container.live_editing_mode {
padding-top: 50px;
height: calc(100vh - 55px);
overflow:auto;
}
.ge_outer_most_container {
  position: relative;
}
.collaboration-cursor__caret {
  position: relative;
  border-left: 2px solid;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
}

.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  padding: 1px 4px;
  border-radius: 3px;
  color: #fff;
  font-size: 11px;
  line-height: 1.2;
  white-space: nowrap;
}
#ql-global-readonly-overlay {
  position: absolute;   /* relative to .ge_outer_most_container */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: transparent;
  z-index: 2147483647;
  pointer-events: auto;
  user-select: none;
  touch-action: pan-x pan-y; /* allow scroll gestures */
}
.doc_placeholder_container{
height:100%;
margin:auto;
}
.ge_tool_bar_container_at_top.global_editor_toolbar{
    background:#fff;
    display:flex;
    border-bottom:1px solid #e7e8e8;
    user-select:none; 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 9;
}

.global_editor_toolbar_button_pane button{
    overflow:unset!important;
    display:flex!important;
    border-radius:6px;
    align-items:center;
    justify-content:center;
    gap:15px;
}
#editor_tool_main_header_container_items .tool_bar_wrap .global_editor_button .tool_bar_wrap_button_text {
    color: #1A1F22;
    font-size: 13px;
}

#editor_tool_main_header_container_items .tool_bar_wrap button {
    display: grid;
    gap:8px;
    min-width: 120px;
    border: 1px solid #00000026;
}
/* Parent groups must not clip the dropdowns */
.ge_tool_bar_container_at_top,
.global_editor_toolbar,
.global_editor_toolbar_button_pane,
.global_editor_button_group.event_group_tool {
  overflow: visible !important;
}

/* Each group is a positioning context for its dropdown */
.global_editor_button_group.event_group_tool {
  position: relative;
}

/* Base (hidden) state for all dropdowns */
.dropdown-content {
  position: absolute;
  top: calc(100% + 6px);   /* below the button */
  left: 0;
  display: none;
  min-width: 160px;
  max-height: 320px;
  overflow: auto;
  z-index: 9999;           /* above toolbar/editor */
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}
.dropdown-content{
z-index:999999;
}
/* Visible state toggled by JS */
.dropdown-content.open {
  display: block;
}
.dropdown-content.color_pallet_content.open {
  display: flex;
}

/* Optional: dropdown items */
.dropdown-item { cursor: pointer; padding: 6px 10px; }
.dropdown-item.active { background: #f3f4f6; }



`
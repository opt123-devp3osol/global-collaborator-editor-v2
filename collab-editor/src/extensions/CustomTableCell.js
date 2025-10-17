// extensions/CustomTableCell.js
import BaseTableCell from '@tiptap/extension-table-cell'
import BaseTableHeader from '@tiptap/extension-table-header'

export const CustomTableCell = BaseTableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            backgroundColor: {
                default: null,
                parseHTML: el => el.style.backgroundColor || null,
                renderHTML: attrs => attrs.backgroundColor ? { style: `background-color:${attrs.backgroundColor}` } : {},
            },
        }
    },
})

export const CustomTableHeader = BaseTableHeader.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            backgroundColor: {
                default: null,
                parseHTML: el => el.style.backgroundColor || null,
                renderHTML: attrs => attrs.backgroundColor ? { style: `background-color:${attrs.backgroundColor}` } : {},
            },
        }
    },
})

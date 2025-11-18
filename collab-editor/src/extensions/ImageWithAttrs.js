import Image from '@tiptap/extension-image';

export const ImageWithAttrs = Image.extend({
    name: 'image',

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: el => el.getAttribute('src'),
                renderHTML: attrs => attrs.src ? { src: attrs.src } : {},
            },
            alt: {
                default: null,
                parseHTML: el => el.getAttribute('alt'),
                renderHTML: attrs => attrs.alt ? { alt: attrs.alt } : {},
            },
            title: {
                default: null,
                parseHTML: el => el.getAttribute('title'),
                renderHTML: attrs => attrs.title ? { title: attrs.title } : {},
            },
            align: {
                default: null,
                parseHTML: el => el.getAttribute('align'),
                renderHTML: attrs => attrs.align ? { align: attrs.align } : {},
            },
            class: {
                default: null,
                parseHTML: el => el.getAttribute('class'),
                renderHTML: attrs => attrs.class ? { class: attrs.class } : {},
            },
            draggable: {
                default: null,
                parseHTML: el => el.getAttribute('draggable'),
                renderHTML: attrs => attrs.draggable ? { draggable: attrs.draggable } : {},
            },
            blockId: {
                default: null,
                parseHTML: el => el.getAttribute('data-block-id'),
                renderHTML: attrs => attrs.blockId ? { 'data-block-id': attrs.blockId } : {},
            },
        };
    },
});

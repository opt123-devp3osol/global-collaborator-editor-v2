import { Node } from '@tiptap/core'

const buildAttrs = (attrs = {}) => {
    const { id = '', href = '', title = 'Untitled' } = attrs || {};
    return {
        'data-subpage-id': id,
        'data-subpage-title': title,
        href,
        role: 'link',
        target:"_self",
        rel: 'noopener noreferrer',
        style: 'display:block;margin-bottom: 10px;margin-top: 10px;color:inherit;text-decoration:none;user-select:none;transition:background 20ms ease-in;cursor:pointer;border-radius:4px;fill:inherit;',
    };
};

export const SubPageLink = Node.create({
    name: 'subPageLink',

    group: 'block',
    draggable: false,
    selectable: true,
    atom: true,
    isolating: true,

    addAttributes() {
        return {
            id: { default: '' },
            href: { default: '' },
            title: { default: 'Untitled' },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'a[data-subpage-id]',
                getAttrs: (dom) => {
                    if (!(dom instanceof HTMLElement)) return false;
                    return {
                        id: dom.getAttribute('data-subpage-id') || '',
                        href: dom.getAttribute('href') || '',
                        title: dom.getAttribute('data-subpage-title') || dom.textContent || 'Untitled',
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const attrs = buildAttrs(HTMLAttributes);
        const title = HTMLAttributes.title || 'Untitled';
        return [
            'a',
            attrs,
            ['div', { class: 'tb-subpage-title tb-subpage-title-with-icon', style: 'display:inline-block;vertical-align:middle;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500;line-height:1.3;border-bottom:1px solid rgba(0,0,0,0.08);' }, title],
        ];
    },

    addCommands() {
        return {
            setSubPageLink:
                (attrs) =>
                    ({ chain, state }) => {
                        const pos = state.selection.from;
                        return chain().insertContentAt(pos, { type: this.name, attrs }).run();
                    },
        };
    },
});

export default SubPageLink;

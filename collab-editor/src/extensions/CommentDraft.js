import { Mark } from '@tiptap/core'

export const CommentDraft = Mark.create({
    name: 'commentDraft',

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'tipt-comment-draft',
                id: 'coment_draft_section',
            },
        };
    },

    addAttributes() {
        return {
            id: {
                default: null,
            },
            state: {
                default: 'draft', // draft | orig
            },
            subObjectId: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span.tipt-comment-draft',
                getAttrs: el => {
                    const state = el.classList.contains('tipt-comment-orig') ? 'orig' : 'draft';
                    return {
                        id: el.getAttribute('id') || el.getAttribute('data-id') || null,
                        state,
                        subObjectId: el.getAttribute('data-sub-object-id') || null,
                    };
                },
            },
            {
                tag: 'span.tipt-comment-orig',
                getAttrs: el => {
                    return {
                        id: el.getAttribute('id') || el.getAttribute('data-id') || null,
                        state: 'orig',
                        subObjectId: el.getAttribute('data-sub-object-id') || null,
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const base = { ...this.options.HTMLAttributes, ...HTMLAttributes };
        const cls = HTMLAttributes.state === 'orig' ? 'tipt-comment-orig' : 'tipt-comment-draft';
        const attrs = {
            ...base,
            class: cls,
        };
        if (HTMLAttributes.subObjectId) {
            attrs['data-sub-object-id'] = HTMLAttributes.subObjectId;
        }
        return ['span', attrs, 0];
    },

    addCommands() {
        return {
            setCommentDraft: attrs => ({ chain }) =>
                chain().setMark(this.name, attrs).run(),
            unsetCommentDraft: () => ({ chain }) =>
                chain().unsetMark(this.name).run(),
        };
    },
});

export default CommentDraft;

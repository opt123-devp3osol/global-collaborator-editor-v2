import { Mark } from '@tiptap/core'

export const TaskDraft = Mark.create({
    name: 'taskDraft',

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'temp_draft_task_creation',
            },
        };
    },

    addAttributes() {
        return {
            id: { default: null },
            state: { default: 'draft' }, // draft | orig (reserved for future use)
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span.temp_draft_task_creation',
                getAttrs: el => ({
                    id: el.getAttribute('id') || el.getAttribute('data-id') || null,
                    state: el.classList.contains('task-orig') ? 'orig' : 'draft',
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const attrs = {
            ...this.options.HTMLAttributes,
            ...HTMLAttributes,
            class: 'temp_draft_task_creation',
        };
        return ['span', attrs, 0];
    },

    addCommands() {
        return {
            setTaskDraft: attrs => ({ chain }) =>
                chain().setMark(this.name, attrs).run(),
            unsetTaskDraft: () => ({ chain }) =>
                chain().unsetMark(this.name).run(),
        };
    },
});

export default TaskDraft;

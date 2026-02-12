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
            dataTimeEntryId: { default: null },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span.temp_draft_task_creation',
                getAttrs: el => ({
                    id: el.getAttribute('id') || el.getAttribute('data-id') || null,
                    state: el.classList.contains('org_draft_task_creation') ? 'orig' : 'draft',
                    dataTimeEntryId: el.getAttribute('data-time-entry-id') || null,
                }),
            },
            {
                tag: 'span.org_draft_task_creation',
                getAttrs: el => ({
                    id: el.getAttribute('id') || el.getAttribute('data-id') || null,
                    state: 'orig',
                    dataTimeEntryId: el.getAttribute('data-time-entry-id') || null,
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const attrs = {
            ...this.options.HTMLAttributes,
            ...HTMLAttributes,
            class: HTMLAttributes.state === 'orig' ? 'org_draft_task_creation' : 'temp_draft_task_creation',
        };
        if (HTMLAttributes.dataTimeEntryId) {
            attrs['data-time-entry-id'] = HTMLAttributes.dataTimeEntryId;
        }
        delete attrs.dataTimeEntryId;
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

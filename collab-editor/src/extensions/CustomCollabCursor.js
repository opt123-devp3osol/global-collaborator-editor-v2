import { yCursorPlugin, defaultSelectionBuilder } from 'y-prosemirror'
import { Extension, } from '@tiptap/core'


export const CustomCollabCursor = Extension.create({
    name: 'customCollabCursor',

    addOptions() {
        return {
            awareness: null,
            user: { name: null, color: null },
            render(user) {
                const caret = document.createElement('span');
                caret.classList.add('collaboration-cursor__caret');
                caret.style.borderColor = user.color || '#ff6b6b';

                const label = document.createElement('div');
                label.classList.add('collaboration-cursor__label');
                label.style.backgroundColor = user.color || '#ff6b6b';
                label.textContent = user.name || 'Guest';

                caret.appendChild(label);
                return caret;
            },
            selectionRender: defaultSelectionBuilder,
        };
    },

    addStorage() {
        return { users: [] };
    },

    addCommands() {
        return {
            updateUser:
                attrs => () => {
                    this.options.user = { ...this.options.user, ...attrs };
                    if (this.options.awareness) {
                        this.options.awareness.setLocalStateField('user', this.options.user);
                    }
                    return true;
                },
        };
    },

    addProseMirrorPlugins() {
        const awareness = this.options.awareness;
        if (!awareness) return [];

        // keep local user state in awareness
        awareness.setLocalStateField('user', this.options.user);

        // optional: track users for a presence list later
        const updateUsers = () => {
            const entries = Array.from(awareness.states.entries());
            this.storage.users = entries.map(([clientId, state]) => ({
                clientId,
                ...(state.user || {}),
            }));
        };

        updateUsers();
        awareness.on('update', updateUsers);

        return [
            yCursorPlugin(awareness, {
                cursorBuilder: this.options.render,
                selectionBuilder: this.options.selectionRender,
            }),
        ];
    },
});

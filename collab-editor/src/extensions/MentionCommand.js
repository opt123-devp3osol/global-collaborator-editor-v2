import { Node } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { PluginKey } from '@tiptap/pm/state';

// A drop-in replacement resembling Mention.configure({ HTMLAttributes, suggestion })
export const Mention = Node.create({
  name: 'mention',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: false,
  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: { class: 'tiptap-mention' },
      suggestion: {},
      userList: [],
      onSelect: null,
      pluginKey: null,
    };
  },

  addAttributes() {
    return {
      id: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-id') || '',
        renderHTML: (attrs) => (attrs.id ? { 'data-id': attrs.id } : {}),
      },
      label: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-label') || '',
        renderHTML: (attrs) => (attrs.label ? { 'data-label': attrs.label } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-mention]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const label = node.attrs.label || node.attrs.id || '';
    return [
      'span',
      {
        'data-mention': '',
        ...HTMLAttributes,
      },
      `@${label}`,
    ];
  },

  addProseMirrorPlugins() {
    const suggestion = this.options.suggestion || {};
    const userList = Array.isArray(this.options.userList)
      ? this.options.userList
          .map((u) => {
            if (typeof u === 'string') return { id: u, label: u };
            const id = u?.id || u?.value || u?.username || u?.name || u?.label;
            const label = u?.label || u?.name || u?.username || u?.id || u?.value || '';
            return { id: id || label, label: label || id || '' };
          })
          .filter((u) => u.id && u.label)
      : [];

    const key =
      this.options.pluginKey ||
      new PluginKey(`mentionSuggestion_${this.editor?.options?.element?.id || Math.random().toString(36).slice(2)}`);

    return [
      Suggestion({
        pluginKey: key,
        editor: this.editor,
        char: '@',
        startOfLine: false,
        items: ({ query }) => {
          const q = (query || '').toLowerCase();
          return userList.filter((u) => u.label.toLowerCase().includes(q)).slice(0, 8);
        },
        command: ({ editor, range, props }) => {
          const label = props.label || props.name || props.value || props.id || '';
          const id = props.id || label;
          if (!label) return;
          editor
            .chain()
            .focus()
            .insertContentAt(
              range,
              [
                { type: 'mention', attrs: { id, label } },
                { type: 'text', text: ' ' },
              ],
              { updateSelection: false },
            )
            .setTextSelection(range.from + label.length + 2) // after "@label "
            .run();
          this.options.onSelect?.({ id, label, range });
        },
        render: () => {
          let popup;
          let list;
          let selectedIndex = 0;
          const resetSelection = () => {
            if (!list) return;
            const items = Array.from(list.querySelectorAll('li'));
            items.forEach((li, idx) => li.classList.toggle('is-active', idx === selectedIndex));
          };
          const renderList = (props) => {
            if (!list || !popup) return;
            selectedIndex = Math.max(0, Math.min(selectedIndex, Math.max(0, props.items.length - 1)));
            list.innerHTML = '';
            props.items.forEach((item, idx) => {
              const li = this.editor?.view?.dom.ownerDocument?.createElement('li') || document.createElement('li');
              li.textContent = `@${item.label}`;
              li.className = 'ge_mention_item';
              li.addEventListener('mousedown', (e) => {
                e.preventDefault();
                props.command({ id: item.id, label: item.label });
              });
              list.appendChild(li);
              if (idx === selectedIndex) li.classList.add('is-active');
            });
            const coords = this.editor.view.coordsAtPos(props.range.from);
            const docRect = this.editor.view.dom.ownerDocument.body.getBoundingClientRect();
            popup.style.position = 'absolute';
            popup.style.left = `${coords.left - docRect.left}px`;
            popup.style.top = `${coords.bottom - docRect.top + 4}px`;
          };
          return {
            onStart: (props) => {
              const doc = this.editor.view.dom.ownerDocument;
              popup = doc.createElement('div');
              popup.className = 'ge_mention_suggestion';
              list = doc.createElement('ul');
              list.className = 'ge_mention_suggestion_list';
              popup.appendChild(list);
              doc.body.appendChild(popup);
              selectedIndex = 0;
              renderList(props);
            },
            onUpdate: (props) => {
              renderList(props);
            },
            onKeyDown: (props) => {
              if (!props.items?.length) return false;
              if (props.event.key === 'ArrowDown') {
                selectedIndex = (selectedIndex + 1) % props.items.length;
                resetSelection();
                return true;
              }
              if (props.event.key === 'ArrowUp') {
                selectedIndex = (selectedIndex - 1 + props.items.length) % props.items.length;
                resetSelection();
                return true;
              }
              if (props.event.key === 'Enter') {
                const item = props.items[selectedIndex];
                if (item) props.command({ id: item.id, label: item.label });
                return true;
              }
              return false;
            },
            onExit: () => {
              popup?.remove();
              popup = null;
              list = null;
              selectedIndex = 0;
            },
          };
        },
        ...suggestion,
      }),
    ];
  },
});

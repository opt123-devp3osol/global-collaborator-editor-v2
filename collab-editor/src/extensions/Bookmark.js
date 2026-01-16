import { Node } from '@tiptap/core';

const isSafeUrl = (value) => {
    if (!value) return false;
    try {
        const url = new URL(value, 'http://example.com');
        return (
            url.protocol === 'http:' ||
            url.protocol === 'https:' ||
            url.protocol === 'mailto:' ||
            url.protocol === 'tel:'
        );
    } catch {
        return false;
    }
};

const normalizeUrl = (value) => {
    if (!value) return '';
    if (/^(https?:)?\/\//i.test(value)) return value;
    if (/^(mailto:|tel:)/i.test(value)) return value;
    return `https://${value}`;
};

const readBookmarkAttrs = (el) => {
    const dataHref =
        el.getAttribute('data-href') ||
        el.getAttribute('href') ||
        el.querySelector?.('a[href]')?.getAttribute('href') ||
        '';

    const href = normalizeUrl(dataHref);

    const dataTitle =
        el.getAttribute('data-title') ||
        el.querySelector?.('.ge_bookmark_title')?.textContent ||
        el.textContent ||
        '';

    const title = (dataTitle || '').trim();

    return {
        href: isSafeUrl(href) ? href : '',
        title,
    };
};

export const Bookmark = Node.create({
    name: 'bookmark',
    group: 'block',
    atom: true,
    selectable: true,
    draggable: true,
    isolating: true,
    defining: true,

    addAttributes() {
        return {
            href: { default: '' },
            title: { default: '' },
        };
    },

    parseHTML() {
        return [
            // Your canonical form
            {
                tag: 'div[data-bookmark]',
                priority: 1000,
                getAttrs: (el) => readBookmarkAttrs(el),
            },

            // Your existing class-based form
            {
                tag: 'div.ge_bookmark_card',
                priority: 900,
                getAttrs: (el) => readBookmarkAttrs(el),
            },

            // Common variations from other editors/apps
            {
                tag: 'figure[data-bookmark]',
                priority: 800,
                getAttrs: (el) => readBookmarkAttrs(el),
            },
            {
                tag: 'div[data-href]',
                priority: 700,
                getAttrs: (el) => readBookmarkAttrs(el),
            },

            // If someone pastes only the "Open" link or a standalone anchor
            {
                tag: 'a.ge_bookmark_open[href]',
                priority: 600,
                getAttrs: (el) => readBookmarkAttrs(el),
            },
            {
                tag: 'a[href]',
                priority: 1, // very low so it won’t steal normal links
                getAttrs: (el) => {
                    // Only treat as bookmark if explicitly marked
                    if (!el.hasAttribute('data-bookmark')) return false;
                    return readBookmarkAttrs(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const href = normalizeUrl(HTMLAttributes.href || '');
        const safeHref = isSafeUrl(href) ? href : '';
        const title = (HTMLAttributes.title || safeHref || 'Link').trim();

        return [
            'div',
            {
                'data-bookmark': 'true',
                'data-href': safeHref,
                'data-title': title,
                class: 'ge_bookmark_card',
                contenteditable: 'false',
            },
            [
                'div',
                { class: 'ge_bookmark_meta' },
                ['div', { class: 'ge_bookmark_title' }, title],
                ['div', { class: 'ge_bookmark_url' }, safeHref],
            ],
            [
                'a',
                {
                    class: 'ge_bookmark_open',
                    href: safeHref,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                'Open',
            ],
        ];
    },
});

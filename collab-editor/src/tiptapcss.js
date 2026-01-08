export const TIPTAPCSS = `

:root {
    overflow-wrap: break-word;
    text-size-adjust: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --tt-gray-light-a-50: rgba(56,56,56,0.04);
    --tt-gray-light-a-100: rgba(15,22,36,0.05);
    --tt-gray-light-a-200: rgba(37,39,45,0.1);
    --tt-gray-light-a-300: rgba(47,50,55,0.2);
    --tt-gray-light-a-400: rgba(40,44,51,0.42);
    --tt-gray-light-a-500: rgba(52,55,60,0.64);
    --tt-gray-light-a-600: rgba(36,39,46,0.78);
    --tt-gray-light-a-700: rgba(35,37,42,0.87);
    --tt-gray-light-a-800: rgba(30,32,36,0.95);
    --tt-gray-light-a-900: rgba(29,30,32,0.98);
    --tt-gray-light-50: rgba(250,250,250,1);
    --tt-gray-light-100: rgba(244,244,245,1);
    --tt-gray-light-200: rgba(234,234,235,1);
    --tt-gray-light-300: rgba(213,214,215,1);
    --tt-gray-light-400: rgba(166,167,171,1);
    --tt-gray-light-500: rgba(125,127,130,1);
    --tt-gray-light-600: rgba(83,86,90,1);
    --tt-gray-light-700: rgba(64,65,69,1);
    --tt-gray-light-800: rgba(44,45,48,1);
    --tt-gray-light-900: rgba(34,35,37,1);
    --tt-gray-dark-a-50: rgba(232,232,253,0.05);
    --tt-gray-dark-a-100: rgba(231,231,243,0.07);
    --tt-gray-dark-a-200: rgba(238,238,246,0.11);
    --tt-gray-dark-a-300: rgba(239,239,245,0.22);
    --tt-gray-dark-a-400: rgba(244,244,255,0.37);
    --tt-gray-dark-a-500: rgba(236,238,253,0.5);
    --tt-gray-dark-a-600: rgba(247,247,253,0.64);
    --tt-gray-dark-a-700: rgba(251,251,254,0.75);
    --tt-gray-dark-a-800: rgba(253,253,253,0.88);
    --tt-gray-dark-a-900: rgba(255,255,255,0.96);
    --tt-gray-dark-50: rgba(25,25,26,1);
    --tt-gray-dark-100: rgba(32,32,34,1);
    --tt-gray-dark-200: rgba(45,45,47,1);
    --tt-gray-dark-300: rgba(70,70,73,1);
    --tt-gray-dark-400: rgba(99,99,105,1);
    --tt-gray-dark-500: rgba(124,124,131,1);
    --tt-gray-dark-600: rgba(163,163,168,1);
    --tt-gray-dark-700: rgba(192,192,195,1);
    --tt-gray-dark-800: rgba(224,224,225,1);
    --tt-gray-dark-900: rgba(245,245,245,1);
    --tt-brand-color-50: rgba(239,238,255,1);
    --tt-brand-color-100: rgba(222,219,255,1);
    --tt-brand-color-200: rgba(195,189,255,1);
    --tt-brand-color-300: rgba(157,138,255,1);
    --tt-brand-color-400: rgba(122,82,255,1);
    --tt-brand-color-500: rgba(98,41,255,1);
    --tt-brand-color-600: rgba(84,0,229,1);
    --tt-brand-color-700: rgba(75,0,204,1);
    --tt-brand-color-800: rgba(56,0,153,1);
    --tt-brand-color-900: rgba(43,25,102,1);
    --tt-brand-color-950: hsla(257,100%,9%,1);
    --tt-color-green-inc-5: hsla(129,100%,97%,1);
    --tt-color-green-inc-4: hsla(129,100%,92%,1);
    --tt-color-green-inc-3: hsla(131,100%,86%,1);
    --tt-color-green-inc-2: hsla(133,98%,78%,1);
    --tt-color-green-inc-1: hsla(137,99%,70%,1);
    --tt-color-green-base: hsla(147,99%,50%,1);
    --tt-color-green-dec-1: hsla(147,97%,41%,1);
    --tt-color-green-dec-2: hsla(146,98%,32%,1);
    --tt-color-green-dec-3: hsla(146,100%,24%,1);
    --tt-color-green-dec-4: hsla(144,100%,16%,1);
    --tt-color-green-dec-5: hsla(140,100%,9%,1);
    --tt-color-yellow-inc-5: hsla(50,100%,97%,1);
    --tt-color-yellow-inc-4: hsla(50,100%,91%,1);
    --tt-color-yellow-inc-3: hsla(50,100%,84%,1);
    --tt-color-yellow-inc-2: hsla(50,100%,77%,1);
    --tt-color-yellow-inc-1: hsla(50,100%,68%,1);
    --tt-color-yellow-base: hsla(52,100%,50%,1);
    --tt-color-yellow-dec-1: hsla(52,100%,41%,1);
    --tt-color-yellow-dec-2: hsla(52,100%,32%,1);
    --tt-color-yellow-dec-3: hsla(52,100%,24%,1);
    --tt-color-yellow-dec-4: hsla(51,100%,16%,1);
    --tt-color-yellow-dec-5: hsla(50,100%,9%,1);
    --tt-color-red-inc-5: hsla(11,100%,96%,1);
    --tt-color-red-inc-4: hsla(11,100%,88%,1);
    --tt-color-red-inc-3: hsla(10,100%,80%,1);
    --tt-color-red-inc-2: hsla(9,100%,73%,1);
    --tt-color-red-inc-1: hsla(7,100%,64%,1);
    --tt-color-red-base: hsla(7,100%,54%,1);
    --tt-color-red-dec-1: hsla(7,100%,41%,1);
    --tt-color-red-dec-2: hsla(5,100%,32%,1);
    --tt-color-red-dec-3: hsla(4,100%,24%,1);
    --tt-color-red-dec-4: hsla(3,100%,16%,1);
    --tt-color-red-dec-5: hsla(1,100%,9%,1);
    --white: rgba(255,255,255,1);
    --black: rgba(14,14,17,1);
    --transparent: rgba(255,255,255,0);
    --tt-shadow-elevated-md: 0px 16px 48px 0px rgba(17,24,39,0.04),0px 12px 24px 0px rgba(17,24,39,0.04),0px 6px 8px 0px rgba(17,24,39,0.02),0px 2px 3px 0px rgba(17,24,39,0.02);
    --tt-radius-xxs: 0.125rem;
    --tt-radius-xs: 0.25rem;
    --tt-radius-sm: 0.375rem;
    --tt-radius-md: 0.5rem;
    --tt-radius-lg: 0.75rem;
    --tt-radius-xl: 1rem;
    --tt-transition-duration-short: 0.1s;
    --tt-transition-duration-default: 0.2s;
    --tt-transition-duration-long: 0.64s;
    --tt-transition-easing-default: cubic-bezier(0.46,0.03,0.52,0.96);
    --tt-transition-easing-cubic: cubic-bezier(0.65,0.05,0.36,1);
    --tt-transition-easing-quart: cubic-bezier(0.77,0,0.18,1);
    --tt-transition-easing-circ: cubic-bezier(0.79,0.14,0.15,0.86);
    --tt-transition-easing-back: cubic-bezier(0.68,-0.55,0.27,1.55);
    --tt-accent-contrast: 8%;
    --tt-destructive-contrast: 8%;
    --tt-foreground-contrast: 8%
     --white: #fff;
    --black: #2e2b29;
    --black-contrast: #110f0e;
    --gray-1: rgba(61, 37, 20, .05);
    --gray-2: rgba(61, 37, 20, .08);
    --gray-3: rgba(61, 37, 20, .12);
    --gray-4: rgba(53, 38, 28, .3);
    --gray-5: rgba(28, 25, 23, .6);
    --green: #22c55e;
    --purple: #6a00f5;
    --purple-contrast: #5800cc;
    --purple-light: rgba(88, 5, 255, .05);
    --yellow-contrast: #facc15;
    --yellow: rgba(250, 204, 21, .4);
    --yellow-light: #fffae5;
    --red: #ff5c33;
    --red-light: #ffebe5;
    --shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04)

}

:root,:root *,:root :after,:root :before {
    box-sizing: border-box;
    transition: none var(--tt-transition-duration-default) var(--tt-transition-easing-default)
}

:root {
    --tt-bg-color: var(--white);
    --tt-border-color: var(--tt-gray-light-a-200);
    --tt-border-color-tint: var(--tt-gray-light-a-100);
    --tt-sidebar-bg-color: var(--tt-gray-light-100);
    --tt-scrollbar-color: var(--tt-gray-light-a-200);
    --tt-cursor-color: var(--tt-brand-color-500);
    --tt-selection-color: rgba(157,138,255,0.2);
    --tt-card-bg-color: var(--white);
    --tt-card-border-color: var(--tt-gray-light-a-100)
}

.dark {
    --tt-bg-color: var(--black);
    --tt-border-color: var(--tt-gray-dark-a-200);
    --tt-border-color-tint: var(--tt-gray-dark-a-100);
    --tt-sidebar-bg-color: var(--tt-gray-dark-100);
    --tt-scrollbar-color: var(--tt-gray-dark-a-200);
    --tt-cursor-color: var(--tt-brand-color-400);
    --tt-selection-color: rgba(122,82,255,0.2);
    --tt-card-bg-color: var(--tt-gray-dark-50);
    --tt-card-border-color: var(--tt-gray-dark-a-50);
    --tt-shadow-elevated-md: 0px 16px 48px 0px rgba(0,0,0,0.5),0px 12px 24px 0px rgba(0,0,0,0.24),0px 6px 8px 0px rgba(0,0,0,0.22),0px 2px 3px 0px rgba(0,0,0,0.12)
}

:root {
    --tt-color-text-gray: hsl(45,2%,46%);
    --tt-color-text-brown: hsl(19,31%,47%);
    --tt-color-text-orange: hsl(30,89%,45%);
    --tt-color-text-yellow: hsl(38,62%,49%);
    --tt-color-text-green: hsl(148,32%,39%);
    --tt-color-text-blue: hsl(202,54%,43%);
    --tt-color-text-purple: hsl(274,32%,54%);
    --tt-color-text-pink: hsl(328,49%,53%);
    --tt-color-text-red: hsl(2,62%,55%);
    --tt-color-text-gray-contrast: hsla(39,26%,26%,0.15);
    --tt-color-text-brown-contrast: hsla(18,43%,69%,0.35);
    --tt-color-text-orange-contrast: hsla(24,73%,55%,0.27);
    --tt-color-text-yellow-contrast: hsla(44,82%,59%,0.39);
    --tt-color-text-green-contrast: hsla(126,29%,60%,0.27);
    --tt-color-text-blue-contrast: hsla(202,54%,59%,0.27);
    --tt-color-text-purple-contrast: hsla(274,37%,64%,0.27);
    --tt-color-text-pink-contrast: hsla(331,60%,71%,0.27);
    --tt-color-text-red-contrast: hsla(8,79%,79%,0.4)
}

.dark {
    --tt-color-text-gray: hsl(0,0%,61%);
    --tt-color-text-brown: hsl(18,35%,58%);
    --tt-color-text-orange: hsl(25,53%,53%);
    --tt-color-text-yellow: hsl(36,54%,55%);
    --tt-color-text-green: hsl(145,32%,47%);
    --tt-color-text-blue: hsl(202,64%,52%);
    --tt-color-text-purple: hsl(270,55%,62%);
    --tt-color-text-pink: hsl(329,57%,58%);
    --tt-color-text-red: hsl(1,69%,60%);
    --tt-color-text-gray-contrast: hsla(0,0%,100%,0.09);
    --tt-color-text-brown-contrast: hsla(17,45%,50%,0.25);
    --tt-color-text-orange-contrast: hsla(27,82%,53%,0.2);
    --tt-color-text-yellow-contrast: hsla(35,49%,47%,0.2);
    --tt-color-text-green-contrast: hsla(151,55%,39%,0.2);
    --tt-color-text-blue-contrast: hsla(202,54%,43%,0.2);
    --tt-color-text-purple-contrast: hsla(271,56%,60%,0.18);
    --tt-color-text-pink-contrast: hsla(331,67%,58%,0.22);
    --tt-color-text-red-contrast: hsla(0,67%,60%,0.25)
}

:root {
    --tt-color-highlight-yellow: #fef9c3;
    --tt-color-highlight-green: #dcfce7;
    --tt-color-highlight-blue: #e0f2fe;
    --tt-color-highlight-purple: #f3e8ff;
    --tt-color-highlight-red: #ffe4e6;
    --tt-color-highlight-gray: rgb(248,248,247);
    --tt-color-highlight-brown: rgb(244,238,238);
    --tt-color-highlight-orange: rgb(251,236,221);
    --tt-color-highlight-pink: rgb(252,241,246);
    --tt-color-highlight-yellow-contrast: #fbe604;
    --tt-color-highlight-green-contrast: #c7fad8;
    --tt-color-highlight-blue-contrast: #ceeafd;
    --tt-color-highlight-purple-contrast: #e4ccff;
    --tt-color-highlight-red-contrast: #ffccd0;
    --tt-color-highlight-gray-contrast: rgba(84,72,49,0.15);
    --tt-color-highlight-brown-contrast: rgba(210,162,141,0.35);
    --tt-color-highlight-orange-contrast: rgba(224,124,57,0.27);
    --tt-color-highlight-pink-contrast: rgba(225,136,179,0.27)
}

.dark {
    --tt-color-highlight-yellow: #6b6524;
    --tt-color-highlight-green: #509568;
    --tt-color-highlight-blue: #6e92aa;
    --tt-color-highlight-purple: #583e74;
    --tt-color-highlight-red: #743e42;
    --tt-color-highlight-gray: rgb(47,47,47);
    --tt-color-highlight-brown: rgb(74,50,40);
    --tt-color-highlight-orange: rgb(92,59,35);
    --tt-color-highlight-pink: rgb(78,44,60);
    --tt-color-highlight-yellow-contrast: #58531e;
    --tt-color-highlight-green-contrast: #47855d;
    --tt-color-highlight-blue-contrast: #5e86a1;
    --tt-color-highlight-purple-contrast: #4c3564;
    --tt-color-highlight-red-contrast: #643539;
    --tt-color-highlight-gray-contrast: rgba(255,255,255,0.094);
    --tt-color-highlight-brown-contrast: rgba(184,101,69,0.25);
    --tt-color-highlight-orange-contrast: rgba(233,126,37,0.2);
    --tt-color-highlight-pink-contrast: rgba(220,76,145,0.22)
}

.tiptap.ProseMirror {
    --tt-checklist-bg-color: var(--tt-gray-light-a-100);
    --tt-checklist-bg-active-color: var(--tt-gray-light-a-900);
    --tt-checklist-border-color: var(--tt-gray-light-a-200);
    --tt-checklist-border-active-color: var(--tt-gray-light-a-900);
    --tt-checklist-check-icon-color: var(--white);
    --tt-checklist-text-active: var(--tt-gray-light-a-500)
}

.dark .tiptap.ProseMirror {
    --tt-checklist-bg-color: var(--tt-gray-dark-a-100);
    --tt-checklist-bg-active-color: var(--tt-gray-dark-a-900);
    --tt-checklist-border-color: var(--tt-gray-dark-a-200);
    --tt-checklist-border-active-color: var(--tt-gray-dark-a-900);
    --tt-checklist-check-icon-color: var(--black);
    --tt-checklist-text-active: var(--tt-gray-dark-a-500)
}

.tiptap.ProseMirror ol,.tiptap.ProseMirror ul {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding-left: 1.5em
}

.tiptap.ProseMirror ol:first-child,.tiptap.ProseMirror ul:first-child {
    margin-top: 0
}

.tiptap.ProseMirror ol:last-child,.tiptap.ProseMirror ul:last-child {
    margin-bottom: 0
}

.tiptap.ProseMirror ol ol,.tiptap.ProseMirror ol ul,.tiptap.ProseMirror ul ol,.tiptap.ProseMirror ul ul {
    margin-top: 0;
    margin-bottom: 0
}

.tiptap.ProseMirror li p {
    margin-top: 0;
    line-height: 1.6
}

.tiptap.ProseMirror ol {
    list-style: decimal
}

.tiptap.ProseMirror ol ol {
    list-style: lower-alpha
}

.tiptap.ProseMirror ol ol ol {
    list-style: lower-roman
}

.tiptap.ProseMirror ul:not([data-type=taskList]) {
    list-style: disc
}

.tiptap.ProseMirror ul:not([data-type=taskList]) ul {
    list-style: circle
}

.tiptap.ProseMirror ul:not([data-type=taskList]) ul ul {
    list-style: square
}

.tiptap.ProseMirror ul[data-type=taskList] {
    padding-left: .25em
}

.tiptap.ProseMirror ul[data-type=taskList] li {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.tiptap.ProseMirror ul[data-type=taskList] li:not(:has(>p:first-child)) {
    list-style-type: none
}

.tiptap.ProseMirror ul[data-type=taskList] li[data-checked=true]>div>p {
    opacity: .5;
    text-decoration: line-through
}

.tiptap.ProseMirror ul[data-type=taskList] li[data-checked=true]>div>p span {
    text-decoration: line-through
}

.tiptap.ProseMirror ul[data-type=taskList] li label {
    position: relative;
    padding-right: .5rem
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0
}

.tiptap.ProseMirror ul[data-type=taskList] li label span {
    display: block;
    width: 1em;
    height: 1em;
    border: 1px solid var(--tt-checklist-border-color);
    border-radius: var(--tt-radius-xs,.25rem);
    position: relative;
    cursor: pointer;
    background-color: var(--tt-checklist-bg-color);
    transition: background-color 80ms ease-out,border-color 80ms ease-out
}

.tiptap.ProseMirror ul[data-type=taskList] li label span:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: .75em;
    height: .75em;
    background-color: var(--tt-checklist-check-icon-color);
    opacity: 0;
    -webkit-mask: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.4142%204.58579C22.1953%205.36683%2022.1953%206.63317%2021.4142%207.41421L10.4142%2018.4142C9.63317%2019.1953%208.36684%2019.1953%207.58579%2018.4142L2.58579%2013.4142C1.80474%2012.6332%201.80474%2011.3668%202.58579%2010.5858C3.36683%209.80474%204.63317%209.80474%205.41421%2010.5858L9%2014.1716L18.5858%204.58579C19.3668%203.80474%2020.6332%203.80474%2021.4142%204.58579Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E") center/contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.4142%204.58579C22.1953%205.36683%2022.1953%206.63317%2021.4142%207.41421L10.4142%2018.4142C9.63317%2019.1953%208.36684%2019.1953%207.58579%2018.4142L2.58579%2013.4142C1.80474%2012.6332%201.80474%2011.3668%202.58579%2010.5858C3.36683%209.80474%204.63317%209.80474%205.41421%2010.5858L9%2014.1716L18.5858%204.58579C19.3668%203.80474%2020.6332%203.80474%2021.4142%204.58579Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E") center/contain no-repeat
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox]:checked+span {
    background: var(--tt-checklist-bg-active-color);
    border-color: var(--tt-checklist-border-active-color)
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox]:checked+span:before {
    opacity: 1
}

.tiptap.ProseMirror ul[data-type=taskList] li div {
    flex: 1 1;
    min-width: 0
}


:root {
    --tiptap-image-handle-bg: var(--tt-brand-color-600)
}

.dark {
    --tiptap-image-handle-bg: var(--tt-brand-color-400)
}

.tiptap.ProseMirror .ProseMirror-selectednode .tiptap-image .tiptap-image-container {
    outline: .125rem solid rgba(0,0,0,0);
    outline-color: var(--tt-brand-color-500);
    border-radius: var(--tt-radius-xs,.25rem)
}

.tiptap.ProseMirror .tiptap-image {
    display: flex;
    width: 100%;
    margin: 1.5rem 0;
    background: #ffffff;
}

.tiptap.ProseMirror .tiptap-image[data-align=right] {
    text-align: right;
    justify-content: flex-end
}

.tiptap.ProseMirror .tiptap-image[data-align=center] {
    text-align: center;
    justify-content: center
}

.tiptap.ProseMirror .tiptap-image-container {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    flex-direction: column;
    display: flex
}

.tiptap.ProseMirror .tiptap-image-content {
    align-items: center;
    max-width: 100%;
    display: flex;
    position: relative
}

.tiptap.ProseMirror .tiptap-image-img {
    width: 100%;
    border-radius: var(--tt-radius-xs,.25rem)
}

.tiptap.ProseMirror .tiptap-image-handle {
    position: absolute;
    top: 50%;
    width: .375rem;
    height: 3rem;
    background-color: var(--tiptap-image-handle-bg);
    border-radius: 1.875rem;
    cursor: ew-resize;
    transform: translateY(-50%);
    z-index: 10
}

.tiptap.ProseMirror .tiptap-image-handle.tiptap-image-handle-left {
    left: 4px
}

.tiptap.ProseMirror .tiptap-image-handle.tiptap-image-handle-right {
    right: 4px
}

.tiptap.ProseMirror h1,.tiptap.ProseMirror h2,.tiptap.ProseMirror h3,.tiptap.ProseMirror h4 {
    position: relative;
    color: inherit;
    font-style: inherit;
}

.tiptap.ProseMirror h1:first-child,.tiptap.ProseMirror h2:first-child,.tiptap.ProseMirror h3:first-child,.tiptap.ProseMirror h4:first-child {
    margin-top: 0;
}

.tiptap.ProseMirror h1 {
    font-size: 1.5em;
    font-weight: 700;
    margin-top: 3em;
}

.tiptap.ProseMirror h2 {
    font-size: 1.25em;
    font-weight: 700;
    margin-top: 2.5em
}

.tiptap.ProseMirror h3 {
    font-size: 1.125em;
    font-weight: 600;
    margin-top: 2em
}

.tiptap.ProseMirror h4 {
    font-size: 1em;
    font-weight: 600;
    margin-top: 2em
}

.tiptap.ProseMirror {
    --blockquote-bg-color: var(--tt-gray-light-900)
}

.dark .tiptap.ProseMirror {
    --blockquote-bg-color: var(--tt-gray-dark-900)
}

.tiptap.ProseMirror blockquote {
    position: relative;
    padding-left: 1em;
    padding-top: .375em;
    padding-bottom: .375em;
    margin: 1.5rem 0
}

.tiptap.ProseMirror blockquote p {
    margin-top: 0
}

.tiptap.ProseMirror.ProseMirror-focused blockquote.is-empty:before,.tiptap.ProseMirror.ProseMirror-focused blockquote:before {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    height: 100%;
    width: .25em;
    background-color: var(--blockquote-bg-color);
    content: "";
    border-radius: 0
}
button.ql-blot-format-toolbar__button_dropdown-menu_item.is-disabled {
    opacity: .6;
    cursor: not-allowed;
}

.tiptap.ProseMirror {
    --tt-inline-code-bg-color: var(--tt-gray-light-a-100);
    --tt-inline-code-text-color: var(--tt-gray-light-a-700);
    --tt-inline-code-border-color: var(--tt-gray-light-a-200);
    --tt-codeblock-bg: var(--tt-gray-light-a-50);
    --tt-codeblock-text: var(--tt-gray-light-a-800);
    --tt-codeblock-border: var(--tt-gray-light-a-200)
}

.dark .tiptap.ProseMirror {
    --tt-inline-code-bg-color: var(--tt-gray-dark-a-100);
    --tt-inline-code-text-color: var(--tt-gray-dark-a-700);
    --tt-inline-code-border-color: var(--tt-gray-dark-a-200);
    --tt-codeblock-bg: var(--tt-gray-dark-a-50);
    --tt-codeblock-text: var(--tt-gray-dark-a-800);
    --tt-codeblock-border: var(--tt-gray-dark-a-200)
}

.tiptap.ProseMirror code {
    background-color: var(--tt-inline-code-bg-color);
    color: var(--tt-inline-code-text-color);
    border: 1px solid var(--tt-inline-code-border-color);
    font-family: JetBrains Mono NL,monospace;
    font-size: .875em;
    line-height: 1.4;
    border-radius: 6px/.375rem;
    padding: .1em .2em
}

.tiptap.ProseMirror pre {
    background-color: var(--tt-codeblock-bg);
    color: var(--tt-codeblock-text);
    border: 1px solid var(--tt-codeblock-border);
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding: 1em;
    font-size: 1rem;
    border-radius: 6px/.375rem
}

.tiptap.ProseMirror pre code {
    background-color: rgba(0,0,0,0);
    border: none;
    border-radius: 0;
    -webkit-text-fill-color: inherit;
    color: inherit
}



.tiptap.ProseMirror {
    --horizontal-rule-color: var(--tt-gray-light-a-200)
}

.dark .tiptap.ProseMirror {
    --horizontal-rule-color: var(--tt-gray-dark-a-200)
}

.tiptap.ProseMirror hr {
    border: none;
    height: 1px;
    background-color: var(--horizontal-rule-color)
}

.tiptap.ProseMirror [data-type=horizontalRule] {
    margin-top: 2.25em;
    margin-bottom: 2.25em;
    padding-top: .75rem;
    padding-bottom: .75rem
}


.tiptap.ProseMirror img {
    max-width: 100%;
    height: auto;
    display: block
}

.tiptap.ProseMirror>img:not([data-type=emoji] img) {
    margin: 2rem 0;
    outline: .125rem solid rgba(0,0,0,0);
    border-radius: var(--tt-radius-xs,.25rem)
}

.tiptap.ProseMirror img:not([data-type=emoji] img).ProseMirror-selectednode {
    outline-color: var(--tt-brand-color-500)
}

.tiptap.ProseMirror .tiptap-thread:has(>img) {
    margin: 2rem 0
}

.tiptap.ProseMirror .tiptap-thread:has(>img) img {
    outline: .125rem solid rgba(0,0,0,0);
    border-radius: var(--tt-radius-xs,.25rem)
}

.tiptap.ProseMirror .tiptap-thread img {
    margin: 0
}

.tiptap.ProseMirror {
    --tt-collaboration-carets-label: var(--tt-gray-light-900);
    --link-text-color: var(--tt-brand-color-500);
    --thread-text: var(--tt-gray-light-900);
    --placeholder-color: var(--tt-gray-light-a-400);
    --thread-bg-color: var(--tt-color-yellow-inc-2);
    --tiptap-ai-insertion-color: var(--tt-brand-color-600)
}

.dark .tiptap.ProseMirror {
    --tt-collaboration-carets-label: var(--tt-gray-dark-100);
    --link-text-color: var(--tt-brand-color-400);
    --thread-text: var(--tt-gray-dark-900);
    --placeholder-color: var(--tt-gray-dark-a-400);
    --thread-bg-color: var(--tt-color-yellow-dec-2);
    --tiptap-ai-insertion-color: var(--tt-brand-color-400)
}

.tiptap.ProseMirror>* {
    position: relative;
    padding:0px;
}

.tiptap.ProseMirror {
    white-space: pre-wrap;
    outline: none;
    display:block;
    caret-color: var(--tt-cursor-color)
}

.tiptap.ProseMirror:not(.readonly):not(.ProseMirror-hideselection) ::selection {
    background-color: var(--tt-selection-color)
}

.tiptap.ProseMirror:not(.readonly):not(.ProseMirror-hideselection) .selection::selection {
    background: rgba(0,0,0,0)
}

.tiptap.ProseMirror .selection {
    display: inline;
    background-color: var(--tt-selection-color)
}

.tiptap.ProseMirror .ProseMirror-hideselection {
    caret-color: rgba(0,0,0,0)
}

.tiptap.ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize
}

.tiptap.ProseMirror a span {
    text-decoration: underline
}

.tiptap.ProseMirror s span {
    text-decoration: line-through
}

.tiptap.ProseMirror u span {
    text-decoration: underline
}

.tiptap.ProseMirror .tiptap-ai-insertion {
    color: var(--tiptap-ai-insertion-color)
}

.tiptap.ProseMirror .collaboration-carets__caret {
    border-right: 1px solid rgba(0,0,0,0);
    border-left: 1px solid rgba(0,0,0,0);
    pointer-events: none;
    margin-left: -1px;
    margin-right: -1px;
    position: relative;
    word-break: normal
}

.tiptap.ProseMirror .collaboration-carets__label {
    color: #ffffff;
    border-radius: .25rem;
    border-bottom-left-radius: 0;
    font-size: .75rem;
    font-weight: 600;
    left: -1px;
    line-height: 1;
    padding: .125rem .375rem;
    position: absolute;
    top: -1.3em;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    white-space: nowrap
}

.tiptap.ProseMirror [data-type=emoji] img {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    cursor: text
}

.tiptap.ProseMirror a {
    color: var(--link-text-color);
    text-decoration: underline
}

.tiptap.ProseMirror [data-type=mention] {
    display: inline-block;
    color: var(--tt-brand-color-500)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--inline {
    transition: color .2s ease-in-out,background-color .2s ease-in-out;
    color: var(--thread-text);
    border-bottom: 2px dashed var(--tt-color-yellow-base);
    font-weight: 600
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--inline.tiptap-thread--hovered,.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--inline.tiptap-thread--selected {
    background-color: var(--thread-bg-color);
    border-bottom-color: rgba(0,0,0,0)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:has(img) {
    outline: .125rem solid var(--tt-color-yellow-base);
    border-radius: var(--tt-radius-xs,.25rem);
    overflow: hidden;
    width: -moz-fit-content;
    width: fit-content
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:has(img).tiptap-thread--selected {
    outline-width: .25rem;
    outline-color: var(--tt-color-yellow-base)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:has(img).tiptap-thread--hovered {
    outline-width: .25rem
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:not(:has(img)) {
    border-radius: .25rem;
    border-bottom: .125rem dashed var(--tt-color-yellow-base);
    padding-bottom: .5rem;
    outline: .25rem solid rgba(0,0,0,0)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:not(:has(img)).tiptap-thread--hovered,.tiptap.ProseMirror .tiptap-thread.tiptap-thread--unresolved.tiptap-thread--block:not(:has(img)).tiptap-thread--selected {
    background-color: var(--tt-color-yellow-base);
    outline-color: var(--tt-color-yellow-base)
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--resolved.tiptap-thread--inline.tiptap-thread--selected {
    background-color: var(--tt-color-yellow-base);
    border-color: rgba(0,0,0,0);
    opacity: .5
}

.tiptap.ProseMirror .tiptap-thread.tiptap-thread--block:has(.react-renderer) {
    margin-top: 3rem;
    margin-bottom: 3rem
}

.tiptap.ProseMirror .is-empty:not(.with-slash)[data-placeholder]:has(>.ProseMirror-trailingBreak:only-child):before {
    content: attr(data-placeholder)
    font-style: italic;
}

.tiptap.ProseMirror .is-empty.with-slash[data-placeholder]:has(>.ProseMirror-trailingBreak:only-child):before {
    content: "Write or type '/' for command and more options";
    font-style: italic
}

.tiptap.ProseMirror .is-empty[data-placeholder]:has(>.ProseMirror-trailingBreak:only-child):before {
    pointer-events: none;
    height: 0;
    position: absolute;
    width: 100%;
    text-align: inherit;
    left: 0;
    right: 0
}

.tiptap.ProseMirror .is-empty[data-placeholder]:has(>.ProseMirror-trailingBreak):before {
    color: var(--placeholder-color)
}

.prosemirror-dropcursor-block,.prosemirror-dropcursor-inline {
    background: var(--tt-brand-color-400)!important;
    border-radius: .25rem;
    margin-left: -1px;
    margin-right: -1px;
    width: 100%;
    height: .188rem;
    cursor: -webkit-grabbing;
    cursor: grabbing
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox]:checked+span:before {
    opacity: 1;
}

.tiptap.ProseMirror ul[data-type=taskList] li label input[type=checkbox]:checked+span {
    background: var(--tt-checklist-bg-active-color);
    border-color: var(--tt-checklist-border-active-color);
}

.tiptap.ProseMirror {
    padding: 1rem 3rem 15rem 3rem;
}

:root {
    --tt-toolbar-height: 2.75rem;
    --tt-safe-area-bottom: env(safe-area-inset-bottom,0px);
    --tt-toolbar-bg-color: var(--white);
    --tt-toolbar-border-color: var(--tt-gray-light-a-100)
}

.dark {
    --tt-toolbar-bg-color: var(--black);
    --tt-toolbar-border-color: var(--tt-gray-dark-a-50)
}

.tiptap-toolbar {
    display: flex;
    align-items: center;
    gap: .25rem
}

.tiptap-toolbar-group {
    display: flex;
    align-items: center;
    gap: .125rem
}

.tiptap-separator+.tiptap-toolbar-group:empty,.tiptap-toolbar-group:empty,.tiptap-toolbar-group:empty+.tiptap-separator {
    display: none
}

.tiptap-toolbar[data-variant=fixed] {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    min-height: var(--tt-toolbar-height);
    background: var(--tt-toolbar-bg-color);
    border-bottom: 1px solid var(--tt-toolbar-border-color);
    padding: 0 .5rem;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none
}

.tiptap-toolbar[data-variant=fixed]::-webkit-scrollbar {
    display: none
}

@media(max-width: 480px) {
    .tiptap-toolbar[data-variant=fixed] {
        position:absolute;
        top: auto;
        height: calc(var(--tt-toolbar-height) + var(--tt-safe-area-bottom));
        border-top: 1px solid var(--tt-toolbar-border-color);
        border-bottom: none;
        padding: 0 .5rem var(--tt-safe-area-bottom);
        flex-wrap: nowrap;
        justify-content: flex-start
    }

    .tiptap-toolbar[data-variant=fixed] .tiptap-toolbar-group {
        flex: 0 0 auto
    }
}

.tiptap-toolbar[data-variant=floating] {
    --tt-toolbar-padding: 0.125rem;
    --tt-toolbar-border-width: 1px;
    padding: .188rem;
    border-radius: calc(var(--tt-toolbar-padding) + var(--tt-radius-lg) + var(--tt-toolbar-border-width));
    border: var(--tt-toolbar-border-width) solid var(--tt-toolbar-border-color);
    background-color: var(--tt-toolbar-bg-color);
    box-shadow: var(--tt-shadow-elevated-md);
    outline: none;
    overflow: hidden
}

.tiptap-toolbar[data-variant=floating][data-plain=true] {
    padding: 0;
    border-radius: 0;
    border: none;
    box-shadow: none;
    background-color: rgba(0,0,0,0)
}

@media screen and (max-width: 480px) {
    .tiptap-toolbar[data-variant=floating] {
        width:100%;
        border-radius: 0;
        border: none;
        box-shadow: none
    }
}


.tiptap-tooltip {
    --tt-tooltip-bg: var(--tt-gray-light-900);
    --tt-tooltip-text: var(--white);
    --tt-kbd: var(--tt-gray-dark-a-400)
}

.dark .tiptap-tooltip {
    --tt-tooltip-bg: var(--white);
    --tt-tooltip-text: var(--tt-gray-light-600);
    --tt-kbd: var(--tt-gray-light-a-400)
}

.tiptap-tooltip {
    z-index: 200;
    overflow: hidden;
    border-radius: var(--tt-radius-md,.375rem);
    background-color: var(--tt-tooltip-bg);
    padding: .375rem .5rem;
    font-size: .75rem;
    font-weight: 500;
    color: var(--tt-tooltip-text);
    box-shadow: 0 4px 6px -1px rgba(0,0,0,.1);
    text-align: center
}

.tiptap-tooltip kbd {
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif;
    text-transform: capitalize;
    color: var(--tt-kbd)
}

.tiptap-button {
    --tt-button-default-bg-color: var(--tt-gray-light-a-100);
    --tt-button-hover-bg-color: var(--tt-gray-light-200);
    --tt-button-active-bg-color: var(--tt-gray-light-a-200);
    --tt-button-active-bg-color-emphasized: var( --tt-brand-color-100 );
    --tt-button-active-bg-color-subdued: var( --tt-gray-light-a-200 );
    --tt-button-active-hover-bg-color: var(--tt-gray-light-300);
    --tt-button-active-hover-bg-color-emphasized: var( --tt-brand-color-200 );
    --tt-button-active-hover-bg-color-subdued: var( --tt-gray-light-a-300 );
    --tt-button-disabled-bg-color: var(--tt-gray-light-a-50)
}

.dark .tiptap-button {
    --tt-button-default-bg-color: var(--tt-gray-dark-a-100);
    --tt-button-hover-bg-color: var(--tt-gray-dark-200);
    --tt-button-active-bg-color: var(--tt-gray-dark-a-200);
    --tt-button-active-bg-color-emphasized: var( --tt-brand-color-900 );
    --tt-button-active-bg-color-subdued: var( --tt-gray-dark-a-200 );
    --tt-button-active-hover-bg-color: var(--tt-gray-dark-300);
    --tt-button-active-hover-bg-color-emphasized: var( --tt-brand-color-800 );
    --tt-button-active-hover-bg-color-subdued: var( --tt-gray-dark-a-300 );
    --tt-button-disabled-bg-color: var(--tt-gray-dark-a-50)
}

.tiptap-button {
    --tt-button-default-text-color: var(--tt-gray-light-a-600);
    --tt-button-hover-text-color: var(--tt-gray-light-a-900);
    --tt-button-active-text-color: var(--tt-gray-light-a-900);
    --tt-button-active-text-color-emphasized: var(--tt-gray-light-a-900);
    --tt-button-active-text-color-subdued: var(--tt-gray-light-a-900);
    --tt-button-disabled-text-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button {
    --tt-button-default-text-color: var(--tt-gray-dark-a-600);
    --tt-button-hover-text-color: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color-emphasized: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color-subdued: var(--tt-gray-dark-a-900);
    --tt-button-disabled-text-color: var(--tt-gray-dark-a-300)
}

.tiptap-button {
    --tt-button-default-icon-color: var(--tt-gray-light-a-600);
    --tt-button-hover-icon-color: var(--tt-gray-light-a-900);
    --tt-button-active-icon-color: var(--tt-brand-color-500);
    --tt-button-active-icon-color-emphasized: var(--tt-brand-color-600);
    --tt-button-active-icon-color-subdued: var(--tt-gray-light-a-900);
    --tt-button-disabled-icon-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button {
    --tt-button-default-icon-color: var(--tt-gray-dark-a-600);
    --tt-button-hover-icon-color: var(--tt-gray-dark-a-900);
    --tt-button-active-icon-color: var(--tt-brand-color-400);
    --tt-button-active-icon-color-emphasized: var(--tt-brand-color-400);
    --tt-button-active-icon-color-subdued: var(--tt-gray-dark-a-900);
    --tt-button-disabled-icon-color: var(--tt-gray-dark-a-400)
}

.tiptap-button {
    --tt-button-default-icon-sub-color: var(--tt-gray-light-a-400);
    --tt-button-hover-icon-sub-color: var(--tt-gray-light-a-500);
    --tt-button-active-icon-sub-color: var(--tt-gray-light-a-400);
    --tt-button-active-icon-sub-color-emphasized: var(--tt-gray-light-a-500);
    --tt-button-active-icon-sub-color-subdued: var(--tt-gray-light-a-400);
    --tt-button-disabled-icon-sub-color: var(--tt-gray-light-a-100)
}

.dark .tiptap-button {
    --tt-button-default-icon-sub-color: var(--tt-gray-dark-a-300);
    --tt-button-hover-icon-sub-color: var(--tt-gray-dark-a-400);
    --tt-button-active-icon-sub-color: var(--tt-gray-dark-a-300);
    --tt-button-active-icon-sub-color-emphasized: var(--tt-gray-dark-a-400);
    --tt-button-active-icon-sub-color-subdued: var(--tt-gray-dark-a-300);
    --tt-button-disabled-icon-sub-color: var(--tt-gray-dark-a-100)
}

.tiptap-button {
    --tt-button-default-dropdown-arrows-color: var(--tt-gray-light-a-600);
    --tt-button-hover-dropdown-arrows-color: var(--tt-gray-light-a-700);
    --tt-button-active-dropdown-arrows-color: var(--tt-gray-light-a-600);
    --tt-button-active-dropdown-arrows-color-emphasized: var( --tt-gray-light-a-700 );
    --tt-button-active-dropdown-arrows-color-subdued: var(--tt-gray-light-a-600);
    --tt-button-disabled-dropdown-arrows-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button {
    --tt-button-default-dropdown-arrows-color: var(--tt-gray-dark-a-600);
    --tt-button-hover-dropdown-arrows-color: var(--tt-gray-dark-a-700);
    --tt-button-active-dropdown-arrows-color: var(--tt-gray-dark-a-600);
    --tt-button-active-dropdown-arrows-color-emphasized: var( --tt-gray-dark-a-700 );
    --tt-button-active-dropdown-arrows-color-subdued: var(--tt-gray-dark-a-600);
    --tt-button-disabled-dropdown-arrows-color: var(--tt-gray-dark-a-400)
}

.tiptap-button[data-style=ghost] {
    --tt-button-default-bg-color: var(--transparent);
    --tt-button-hover-bg-color: var(--tt-gray-light-200);
    --tt-button-active-bg-color: var(--tt-gray-light-a-100);
    --tt-button-active-bg-color-emphasized: var( --tt-brand-color-100 );
    --tt-button-active-bg-color-subdued: var( --tt-gray-light-a-100 );
    --tt-button-active-hover-bg-color: var(--tt-gray-light-200);
    --tt-button-active-hover-bg-color-emphasized: var( --tt-brand-color-200 );
    --tt-button-active-hover-bg-color-subdued: var( --tt-gray-light-a-200 );
    --tt-button-disabled-bg-color: var(--transparent)
}

.dark .tiptap-button[data-style=ghost] {
    --tt-button-default-bg-color: var(--transparent);
    --tt-button-hover-bg-color: var(--tt-gray-dark-200);
    --tt-button-active-bg-color: var(--tt-gray-dark-a-100);
    --tt-button-active-bg-color-emphasized: var( --tt-brand-color-900 );
    --tt-button-active-bg-color-subdued: var( --tt-gray-dark-a-100 );
    --tt-button-active-hover-bg-color: var(--tt-gray-dark-200);
    --tt-button-active-hover-bg-color-emphasized: var( --tt-brand-color-800 );
    --tt-button-active-hover-bg-color-subdued: var( --tt-gray-dark-a-200 );
    --tt-button-disabled-bg-color: var(--transparent)
}

.tiptap-button[data-style=ghost] {
    --tt-button-default-text-color: var(--tt-gray-light-a-600);
    --tt-button-hover-text-color: var(--tt-gray-light-a-900);
    --tt-button-active-text-color: var(--tt-gray-light-a-900);
    --tt-button-active-text-color-emphasized: var(--tt-gray-light-a-900);
    --tt-button-active-text-color-subdued: var(--tt-gray-light-a-900);
    --tt-button-disabled-text-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button[data-style=ghost] {
    --tt-button-default-text-color: var(--tt-gray-dark-a-600);
    --tt-button-hover-text-color: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color-emphasized: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color-subdued: var(--tt-gray-dark-a-900);
    --tt-button-disabled-text-color: var(--tt-gray-dark-a-300)
}

.tiptap-button[data-style=ghost] {
    --tt-button-default-icon-color: var(--tt-gray-light-a-600);
    --tt-button-hover-icon-color: var(--tt-gray-light-a-900);
    --tt-button-active-icon-color: var(--tt-brand-color-500);
    --tt-button-active-icon-color-emphasized: var(--tt-brand-color-600);
    --tt-button-active-icon-color-subdued: var(--tt-gray-light-a-900);
    --tt-button-disabled-icon-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button[data-style=ghost] {
    --tt-button-default-icon-color: var(--tt-gray-dark-a-600);
    --tt-button-hover-icon-color: var(--tt-gray-dark-a-900);
    --tt-button-active-icon-color: var(--tt-brand-color-400);
    --tt-button-active-icon-color-emphasized: var(--tt-brand-color-300);
    --tt-button-active-icon-color-subdued: var(--tt-gray-dark-a-900);
    --tt-button-disabled-icon-color: var(--tt-gray-dark-a-400)
}

.tiptap-button[data-style=ghost] {
    --tt-button-default-icon-sub-color: var(--tt-gray-light-a-400);
    --tt-button-hover-icon-sub-color: var(--tt-gray-light-a-500);
    --tt-button-active-icon-sub-color: var(--tt-gray-light-a-400);
    --tt-button-active-icon-sub-color-emphasized: var(--tt-gray-light-a-500);
    --tt-button-active-icon-sub-color-subdued: var(--tt-gray-light-a-400);
    --tt-button-disabled-icon-sub-color: var(--tt-gray-light-a-100)
}

.dark .tiptap-button[data-style=ghost] {
    --tt-button-default-icon-sub-color: var(--tt-gray-dark-a-300);
    --tt-button-hover-icon-sub-color: var(--tt-gray-dark-a-400);
    --tt-button-active-icon-sub-color: var(--tt-gray-dark-a-300);
    --tt-button-active-icon-sub-color-emphasized: var(--tt-gray-dark-a-400);
    --tt-button-active-icon-sub-color-subdued: var(--tt-gray-dark-a-300);
    --tt-button-disabled-icon-sub-color: var(--tt-gray-dark-a-100)
}

.tiptap-button[data-style=ghost] {
    --tt-button-default-dropdown-arrows-color: var(--tt-gray-light-a-600);
    --tt-button-hover-dropdown-arrows-color: var(--tt-gray-light-a-700);
    --tt-button-active-dropdown-arrows-color: var(--tt-gray-light-a-600);
    --tt-button-active-dropdown-arrows-color-emphasized: var( --tt-gray-light-a-700 );
    --tt-button-active-dropdown-arrows-color-subdued: var( --tt-gray-light-a-600 );
    --tt-button-disabled-dropdown-arrows-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button[data-style=ghost] {
    --tt-button-default-dropdown-arrows-color: var(--tt-gray-dark-a-600);
    --tt-button-hover-dropdown-arrows-color: var(--tt-gray-dark-a-700);
    --tt-button-active-dropdown-arrows-color: var(--tt-gray-dark-a-600);
    --tt-button-active-dropdown-arrows-color-emphasized: var( --tt-gray-dark-a-700 );
    --tt-button-active-dropdown-arrows-color-subdued: var( --tt-gray-dark-a-600 );
    --tt-button-disabled-dropdown-arrows-color: var(--tt-gray-dark-a-400)
}

.tiptap-button[data-style=primary] {
    --tt-button-default-bg-color: var(--tt-brand-color-500);
    --tt-button-hover-bg-color: var(--tt-brand-color-600);
    --tt-button-active-bg-color: var(--tt-brand-color-100);
    --tt-button-active-bg-color-emphasized: var( --tt-brand-color-100 );
    --tt-button-active-bg-color-subdued: var( --tt-brand-color-100 );
    --tt-button-active-hover-bg-color: var(--tt-brand-color-200);
    --tt-button-active-hover-bg-color-emphasized: var( --tt-brand-color-200 );
    --tt-button-active-hover-bg-color-subdued: var( --tt-brand-color-200 );
    --tt-button-disabled-bg-color: var(--tt-gray-light-a-100)
}

.dark .tiptap-button[data-style=primary] {
    --tt-button-default-bg-color: var(--tt-brand-color-500);
    --tt-button-hover-bg-color: var(--tt-brand-color-600);
    --tt-button-active-bg-color: var(--tt-brand-color-900);
    --tt-button-active-bg-color-emphasized: var( --tt-brand-color-900 );
    --tt-button-active-bg-color-subdued: var( --tt-brand-color-900 );
    --tt-button-active-hover-bg-color: var(--tt-brand-color-800);
    --tt-button-active-hover-bg-color-emphasized: var( --tt-brand-color-800 );
    --tt-button-active-hover-bg-color-subdued: var( --tt-brand-color-800 );
    --tt-button-disabled-bg-color: var(--tt-gray-dark-a-100)
}

.tiptap-button[data-style=primary] {
    --tt-button-default-text-color: var(--white);
    --tt-button-hover-text-color: var(--white);
    --tt-button-active-text-color: var(--tt-gray-light-a-900);
    --tt-button-active-text-color-emphasized: var(--tt-gray-light-a-900);
    --tt-button-active-text-color-subdued: var(--tt-gray-light-a-900);
    --tt-button-disabled-text-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button[data-style=primary] {
    --tt-button-default-text-color: var(--white);
    --tt-button-hover-text-color: var(--white);
    --tt-button-active-text-color: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color-emphasized: var(--tt-gray-dark-a-900);
    --tt-button-active-text-color-subdued: var(--tt-gray-dark-a-900);
    --tt-button-disabled-text-color: var(--tt-gray-dark-a-300)
}

.tiptap-button[data-style=primary] {
    --tt-button-default-icon-color: var(--white);
    --tt-button-hover-icon-color: var(--white);
    --tt-button-active-icon-color: var(--tt-brand-color-600);
    --tt-button-active-icon-color-emphasized: var(--tt-brand-color-600);
    --tt-button-active-icon-color-subdued: var(--tt-brand-color-600);
    --tt-button-disabled-icon-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button[data-style=primary] {
    --tt-button-default-icon-color: var(--white);
    --tt-button-hover-icon-color: var(--white);
    --tt-button-active-icon-color: var(--tt-brand-color-400);
    --tt-button-active-icon-color-emphasized: var(--tt-brand-color-400);
    --tt-button-active-icon-color-subdued: var(--tt-brand-color-400);
    --tt-button-disabled-icon-color: var(--tt-gray-dark-a-300)
}

.tiptap-button[data-style=primary] {
    --tt-button-default-icon-sub-color: var(--tt-gray-dark-a-500);
    --tt-button-hover-icon-sub-color: var(--tt-gray-dark-a-500);
    --tt-button-active-icon-sub-color: var(--tt-gray-light-a-500);
    --tt-button-active-icon-sub-color-emphasized: var(--tt-gray-light-a-500);
    --tt-button-active-icon-sub-color-subdued: var(--tt-gray-light-a-500);
    --tt-button-disabled-icon-sub-color: var(--tt-gray-light-a-100)
}

.dark .tiptap-button[data-style=primary] {
    --tt-button-default-icon-sub-color: var(--tt-gray-dark-a-400);
    --tt-button-hover-icon-sub-color: var(--tt-gray-dark-a-500);
    --tt-button-active-icon-sub-color: var(--tt-gray-dark-a-300);
    --tt-button-active-icon-sub-color-emphasized: var(--tt-gray-dark-a-400);
    --tt-button-active-icon-sub-color-subdued: var(--tt-gray-dark-a-300);
    --tt-button-disabled-icon-sub-color: var(--tt-gray-dark-a-100)
}

.tiptap-button[data-style=primary] {
    --tt-button-default-dropdown-arrows-color: var(--white);
    --tt-button-hover-dropdown-arrows-color: var(--white);
    --tt-button-active-dropdown-arrows-color: var(--tt-gray-light-a-700);
    --tt-button-active-dropdown-arrows-color-emphasized: var( --tt-gray-light-a-700 );
    --tt-button-active-dropdown-arrows-color-subdued: var( --tt-gray-light-a-700 );
    --tt-button-disabled-dropdown-arrows-color: var(--tt-gray-light-a-400)
}

.dark .tiptap-button[data-style=primary] {
    --tt-button-default-dropdown-arrows-color: var(--white);
    --tt-button-hover-dropdown-arrows-color: var(--white);
    --tt-button-active-dropdown-arrows-color: var(--tt-gray-dark-a-600);
    --tt-button-active-dropdown-arrows-color-emphasized: var( --tt-gray-dark-a-600 );
    --tt-button-active-dropdown-arrows-color-subdued: var( --tt-gray-dark-a-600 );
    --tt-button-disabled-dropdown-arrows-color: var(--tt-gray-dark-a-400)
}

.tiptap-button-group {
    position: relative;
    display: flex;
    vertical-align: middle
}

.tiptap-button-group[data-orientation=vertical] {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: max-content
}

.tiptap-button-group[data-orientation=vertical]>.tiptap-button {
    width: 100%
}

.tiptap-button-group[data-orientation=horizontal] {
    gap: .125rem;
    flex-direction: row;
    align-items: center
}

.tiptap-button {
    font-size: .875rem;
    font-weight: 500;
    font-feature-settings: "salt" on,"cv01" on;
    line-height: 1.15;
    height: 2rem;
    min-width: 2rem;
    border: none;
    padding: .5rem;
    gap: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--tt-radius-lg,.75rem);
    transition-property: background,color,opacity;
    transition-duration: var(--tt-transition-duration-default);
    transition-timing-function: var(--tt-transition-easing-default)
}

.tiptap-button:focus-visible {
    outline: none
}

.tiptap-button[data-focus-visible=true],.tiptap-button[data-highlighted=true] {
    background-color: var(--tt-button-hover-bg-color);
    color: var(--tt-button-hover-text-color)
}

.tiptap-button[data-weight=small] {
    width: 1.5rem;
    min-width: 1.5rem;
    padding-right: 0;
    padding-left: 0
}

.tiptap-button[data-size=large] {
    font-size: .9375rem;
    height: 2.375rem;
    min-width: 2.375rem;
    padding: .625rem
}

.tiptap-button[data-size=small] {
    font-size: .75rem;
    line-height: 1.2;
    height: 1.5rem;
    min-width: 1.5rem;
    padding: .3125rem;
    border-radius: var(--tt-radius-md,.5rem)
}

.tiptap-button .tiptap-button-text {
    padding: 0 .125rem;
    flex-grow: 1;
    text-align: left;
    line-height: 1.5rem
}

.tiptap-button[data-text-trim=on] .tiptap-button-text {
    text-overflow: ellipsis;
    overflow: hidden
}

.tiptap-button .tiptap-button-dropdown-arrows,.tiptap-button .tiptap-button-dropdown-small,.tiptap-button .tiptap-button-icon,.tiptap-button .tiptap-button-icon-sub {
    flex-shrink: 0
}

.tiptap-button .tiptap-button-icon {
    width: 1rem;
    height: 1rem
}

.tiptap-button[data-size=large] .tiptap-button-icon {
    width: 1.125rem;
    height: 1.125rem
}

.tiptap-button[data-size=small] .tiptap-button-icon {
    width: .875rem;
    height: .875rem
}

.tiptap-button .tiptap-button-icon-sub {
    width: 1rem;
    height: 1rem
}

.tiptap-button[data-size=large] .tiptap-button-icon-sub {
    width: 1.125rem;
    height: 1.125rem
}

.tiptap-button[data-size=small] .tiptap-button-icon-sub {
    width: .875rem;
    height: .875rem
}

.tiptap-button .tiptap-button-dropdown-arrows {
    width: .75rem;
    height: .75rem
}

.tiptap-button[data-size=large] .tiptap-button-dropdown-arrows {
    width: .875rem;
    height: .875rem
}

.tiptap-button .tiptap-button-dropdown-small,.tiptap-button[data-size=small] .tiptap-button-dropdown-arrows {
    width: .625rem;
    height: .625rem
}

.tiptap-button[data-size=large] .tiptap-button-dropdown-small {
    width: .75rem;
    height: .75rem
}

.tiptap-button[data-size=small] .tiptap-button-dropdown-small {
    width: .5rem;
    height: .5rem
}
.custom-drag-handle{
   cursor: grab;
}
.tiptap-button:has(>svg):not(:has(>:not(svg))) {
    gap: .125rem
}

.tiptap-button:has(>svg):not(:has(>:not(svg)))[data-size=large],.tiptap-button:has(>svg):not(:has(>:not(svg)))[data-size=small] {
    gap: .125rem
}

.tiptap-button:has(>svg:nth-of-type(2)):has(>.tiptap-button-dropdown-small):not(:has(>svg:nth-of-type(3))):not(:has(>.tiptap-button-text)) {
    gap: 0;
    padding-right: .25rem
}

.tiptap-button:has(>svg:nth-of-type(2)):has(>.tiptap-button-dropdown-small):not(:has(>svg:nth-of-type(3))):not(:has(>.tiptap-button-text))[data-size=large] {
    padding-right: .375rem
}

.tiptap-button:has(>svg:nth-of-type(2)):has(>.tiptap-button-dropdown-small):not(:has(>svg:nth-of-type(3))):not(:has(>.tiptap-button-text))[data-size=small] {
    padding-right: .25rem
}

.tiptap-button .tiptap-button-emoji {
    width: 1rem;
    display: flex;
    justify-content: center
}

.tiptap-button[data-size=large] .tiptap-button-emoji {
    width: 1.125rem
}

.tiptap-button[data-size=small] .tiptap-button-emoji {
    width: .875rem
}

.tiptap-button {
    background-color: var(--tt-button-default-bg-color);
    color: var(--tt-button-default-text-color)
}

.tiptap-button .tiptap-button-icon {
    color: var(--tt-button-default-icon-color)
}

.tiptap-button .tiptap-button-icon-sub {
    color: var(--tt-button-default-icon-sub-color)
}

.tiptap-button .tiptap-button-dropdown-arrows,.tiptap-button .tiptap-button-dropdown-small {
    color: var(--tt-button-default-dropdown-arrows-color)
}

.tiptap-button:hover:not([data-active-item=true]):not([disabled]),.tiptap-button[data-active-item=true]:not([disabled]),.tiptap-button[data-highlighted]:not([disabled]):not([data-highlighted=false]) {
    background-color: var(--tt-button-hover-bg-color);
    color: var(--tt-button-hover-text-color)
}

.tiptap-button:hover:not([data-active-item=true]):not([disabled]) .tiptap-button-icon,.tiptap-button[data-active-item=true]:not([disabled]) .tiptap-button-icon,.tiptap-button[data-highlighted]:not([disabled]):not([data-highlighted=false]) .tiptap-button-icon {
    color: var(--tt-button-hover-icon-color)
}

.tiptap-button:hover:not([data-active-item=true]):not([disabled]) .tiptap-button-icon-sub,.tiptap-button[data-active-item=true]:not([disabled]) .tiptap-button-icon-sub,.tiptap-button[data-highlighted]:not([disabled]):not([data-highlighted=false]) .tiptap-button-icon-sub {
    color: var(--tt-button-hover-icon-sub-color)
}

.tiptap-button:hover:not([data-active-item=true]):not([disabled]) .tiptap-button-dropdown-arrows,.tiptap-button:hover:not([data-active-item=true]):not([disabled]) .tiptap-button-dropdown-small,.tiptap-button[data-active-item=true]:not([disabled]) .tiptap-button-dropdown-arrows,.tiptap-button[data-active-item=true]:not([disabled]) .tiptap-button-dropdown-small,.tiptap-button[data-highlighted]:not([disabled]):not([data-highlighted=false]) .tiptap-button-dropdown-arrows,.tiptap-button[data-highlighted]:not([disabled]):not([data-highlighted=false]) .tiptap-button-dropdown-small {
    color: var(--tt-button-hover-dropdown-arrows-color)
}

.tiptap-button[data-active-state=on]:not([disabled]),.tiptap-button[data-state=open]:not([disabled]) {
    background-color: var(--tt-button-active-bg-color);
    color: var(--tt-button-active-text-color)
}

.tiptap-button[data-active-state=on]:not([disabled]) .tiptap-button-icon,.tiptap-button[data-state=open]:not([disabled]) .tiptap-button-icon {
    color: var(--tt-button-active-icon-color)
}

.tiptap-button[data-active-state=on]:not([disabled]) .tiptap-button-icon-sub,.tiptap-button[data-state=open]:not([disabled]) .tiptap-button-icon-sub {
    color: var(--tt-button-active-icon-sub-color)
}

.tiptap-button[data-active-state=on]:not([disabled]) .tiptap-button-dropdown-arrows,.tiptap-button[data-active-state=on]:not([disabled]) .tiptap-button-dropdown-small,.tiptap-button[data-state=open]:not([disabled]) .tiptap-button-dropdown-arrows,.tiptap-button[data-state=open]:not([disabled]) .tiptap-button-dropdown-small {
    color: var(--tt-button-active-dropdown-arrows-color)
}

.tiptap-button[data-active-state=on]:not([disabled]):hover,.tiptap-button[data-state=open]:not([disabled]):hover {
    background-color: var(--tt-button-active-hover-bg-color)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=emphasized],.tiptap-button[data-state=open]:not([disabled])[data-appearance=emphasized] {
    background-color: var(--tt-button-active-bg-color-emphasized);
    color: var(--tt-button-active-text-color-emphasized)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=emphasized] .tiptap-button-icon,.tiptap-button[data-state=open]:not([disabled])[data-appearance=emphasized] .tiptap-button-icon {
    color: var(--tt-button-active-icon-color-emphasized)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=emphasized] .tiptap-button-icon-sub,.tiptap-button[data-state=open]:not([disabled])[data-appearance=emphasized] .tiptap-button-icon-sub {
    color: var(--tt-button-active-icon-sub-color-emphasized)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=emphasized] .tiptap-button-dropdown-arrows,.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=emphasized] .tiptap-button-dropdown-small,.tiptap-button[data-state=open]:not([disabled])[data-appearance=emphasized] .tiptap-button-dropdown-arrows,.tiptap-button[data-state=open]:not([disabled])[data-appearance=emphasized] .tiptap-button-dropdown-small {
    color: var(--tt-button-active-dropdown-arrows-color-emphasized)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=emphasized]:hover,.tiptap-button[data-state=open]:not([disabled])[data-appearance=emphasized]:hover {
    background-color: var(--tt-button-active-hover-bg-color-emphasized)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued],.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued] {
    background-color: var(--tt-button-active-bg-color-subdued);
    color: var(--tt-button-active-text-color-subdued)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued] .tiptap-button-icon,.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued] .tiptap-button-icon {
    color: var(--tt-button-active-icon-color-subdued)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued] .tiptap-button-icon-sub,.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued] .tiptap-button-icon-sub {
    color: var(--tt-button-active-icon-sub-color-subdued)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued] .tiptap-button-dropdown-arrows,.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued] .tiptap-button-dropdown-small,.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued] .tiptap-button-dropdown-arrows,.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued] .tiptap-button-dropdown-small {
    color: var(--tt-button-active-dropdown-arrows-color-subdued)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued]:hover,.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued]:hover {
    background-color: var(--tt-button-active-hover-bg-color-subdued)
}

.tiptap-button[data-active-state=on]:not([disabled])[data-appearance=subdued]:hover .tiptap-button-icon,.tiptap-button[data-state=open]:not([disabled])[data-appearance=subdued]:hover .tiptap-button-icon {
    color: var(--tt-button-active-icon-color-subdued)
}

.tiptap-button:disabled {
    background-color: var(--tt-button-disabled-bg-color);
    color: var(--tt-button-disabled-text-color)
}

.tiptap-button:disabled .tiptap-button-icon {
    color: var(--tt-button-disabled-icon-color)
}
:root {
    --tt-slash-decoration-bg-color: var(--tt-gray-light-a-100);
    --tt-slash-decoration-color: var(--tt-gray-light-a-400)
}

.dark {
    --tt-slash-decoration-bg-color: var(--tt-gray-dark-a-100);
    --tt-slash-decoration-color: var(--tt-gray-dark-a-400)
}

span.suggestion {
    background: var(--tt-slash-decoration-bg-color);
    border-radius: var(--tt-radius-xs);
    outline: 5.5px solid var(--tt-slash-decoration-bg-color)
}

span.suggestion:after {
    color: var(--tt-slash-decoration-color)
}

span.suggestion.is-empty:after {
    content: 'Filter...';
}

.tiptap-slash-card-body {
    width: 100%
}

@media screen and (min-width: 480px) {
    .tiptap-slash-card {
        min-width:200px;
    }
}

 :root {
    --tiptap-card-bg-color: var(--white);
    --tiptap-card-border-color: var(--tt-gray-light-a-100);
    --tiptap-card-group-label-color: var(--tt-gray-light-a-800)
}

.dark {
    --tiptap-card-bg-color: var(--tt-gray-dark-50);
    --tiptap-card-border-color: var(--tt-gray-dark-a-100);
    --tiptap-card-group-label-color: var(--tt-gray-dark-a-800)
}

.tiptap-card {
    --padding: 0.375rem;
    --border-width: 1px;
    max-height:322px;
    border-radius: calc(var(--padding) + var(--tt-radius-lg));
    box-shadow: var(--tt-shadow-elevated-md);
    background-color: var(--tiptap-card-bg-color);
    border: 1px solid var(--tiptap-card-border-color);
    display: flex;
    flex-direction: column;
    outline: none;
    align-items: center;
    position: relative;
    min-width: 230px;
    word-wrap: break-word;
    background-clip: border-box
}

.tiptap-card-header {
    padding: .375rem;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: var(--border-width) solid var(--tiptap-card-border-color)
}

.tiptap-card-body {
    padding: .375rem;
    flex: 1 1 auto;
    overflow-y: auto
}

.tiptap-card-item-group {
    position: relative;
    display: flex;
    vertical-align: middle;
    min-width: max-content
}

.tiptap-card-item-group[data-orientation=vertical] {
    flex-direction: column;
    justify-content: center
}

.tiptap-card-item-group[data-orientation=horizontal] {
    gap: .25rem;
    flex-direction: row;
    align-items: center
}

.tiptap-card-group-label {
    padding: .75rem .5rem .25rem;
    font-size: .75rem;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
    color: var(--tiptap-card-group-label-color)
}

::-webkit-scrollbar {
    width: .25rem
}

* {
    scrollbar-width: thin;
    scrollbar-color: var(--tt-scrollbar-color) rgba(0,0,0,0)
}

::-webkit-scrollbar-thumb {
    background-color: var(--tt-scrollbar-color);
    border-radius: 9999px
}

::-webkit-scrollbar-track {
    background: rgba(0,0,0,0)
}

.tiptap.ProseMirror p:not(:first-child),
.tiptap.ProseMirror div:not(:first-child),
.tiptap.ProseMirror ul:not(:first-child),
.tiptap.ProseMirror ol:not(:first-child){
    margin-top: 10px
}

.tiptap.ProseMirror p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 10px
}
.tiptap :first-child {
    margin-top: 0
}



.postmirror-dropcursor-block {
    background-color: #8e22ff;
    height: 2px;
    z-index: 999;
    pointer-events: none;
    width: var(--editor-width);
}


/* Hover buttons */
.tbt-hover-btn {
  position: fixed;
  z-index: 9999;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a90e2;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  transition: transform .1s ease, background .1s ease;
}
.tbt-hover-btn:hover { transform: scale(1.1); }
.tbt-row-del, .tbt-col-del { background: #e24a4a; } /* delete = red */



.ProseMirror table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
}
.ProseMirror table td,
.ProseMirror table th {
  border: 2px solid #ced4da;
  box-sizing: border-box;
  vertical-align: baseline!important;
  min-width: 8em;
  min-height: 5em;
  padding: 3px 5px;
  position: relative;
}
.ProseMirror table td > *,
.ProseMirror table th > * {
  margin-bottom: 0;
}
.ProseMirror table th {
  font-weight: bold;
  text-align: left;
}
.ProseMirror table .selectedCell:after {
  background: rgba(200, 200, 255, 0.4);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}
.ProseMirror table .column-resize-handle {
  background-color: blue;
  bottom: 0px;
  position: absolute;
  right: 0px;
  pointer-events: none;
  height: 100%;
  top: -2;
  width: 3px;
}
.ProseMirror table p {
  margin: 0;
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}


/* Overlay host */
.ql-table-embed-formatter__overlay{
  z-index: 10000;
  pointer-events: none; /* overlay doesn't block selection */
}

/* Buttons/handles use pointer events so they can be clicked when you wire actions later */
.ql-table-embed-formatter__handle-add-columns,
.ql-table-embed-formatter__handle-add-rows,
.ql-table-embed-formatter__handle-add-rows-columns,
.ql-table-embed-formatter__handle-row,
.ql-table-embed-formatter__handle-column{
  pointer-events: auto;
}

.ql-table-embed-formatter__handle-row,
.ql-table-embed-formatter__handle-column{
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
  display: flex; align-items: center; justify-content: center;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  display: none;
  opacity: 0;
}

/* subtle hover/active */
.ql-table-embed-formatter__handle-row.is-active,
.ql-table-embed-formatter__handle-column.is-active{
  display: flex;
  opacity: 1;
}

/* plus buttons */
.ql-table-embed-formatter__handle-add-rows,
.ql-table-embed-formatter__handle-add-columns,
.ql-table-embed-formatter__handle-add-rows-columns{
  width: 25px; 
  height: 25px;
  cursor: pointer;
  display: flex;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
  display:flex; align-items:center; justify-content:center;
  color:#4a90e2;
  font-weight:700;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
}

.ql-table-embed-formatter__handle-column_icon {
    display: flex;
}
.ql-table-embed-formatter__handle-column_icon svg {
    rotate: 90deg;
}
.ql-table-embed-formatter__handle-row_icon {
    display: flex;
}
/* Scroll container around tables */
.tbt-scroll-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch; /* smooth on iOS */
  max-width: 100%;
  position: relative;  /* lets you position overlay relative to the visible box if needed */
  padding-bottom: 6px; /* tiny space so the scrollbar doesn't overlap table border */
}

/* Make the table use its natural width so it can extend and scroll horizontally */
.tbt-scroll-wrap > table {
  width: max-content;     /* grow to fit content */
  min-width: 100%;        /* but never smaller than the editor width */
  table-layout: fixed;    /* consistent column sizing/resizing */
  border-collapse: collapse;
}

/* full-screen mask that blocks events */
.ql-blot-format-toolbar__mask{
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: none;
  background: transparent; /* transparent but still intercepts clicks */
  pointer-events: auto;    /* important: consumes outside clicks */
}

/* toolbar container */
.ql-blot-format-toolbar{
  position: absolute;
  min-height: 36px;
  max-width: 90vw;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 12px;

  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
  border: 1px solid rgba(0,0,0,0.06);
}

/* items */
.ql-blot-format-toolbar__item{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border-radius: 8px;
  user-select: none;
}

.ql-blot-format-toolbar__button{
  padding: 0 10px;
  cursor: pointer;
  position:relative;
  background: transparent;
  transition: background .12s ease, transform .06s ease;
}
.ql-blot-format-toolbar__button:hover{
  background: rgba(0,0,0,0.06);
}
.ql-blot-format-toolbar__button:active{
  transform: translateY(1px);
}

.ql-blot-format-toolbar__button_inner{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 500 13px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial;
  color: #2b2f38;
}
.ql-blot-format-toolbar__button_inner-icon{ width: 16px; text-align:center; }
.ql-blot-format-toolbar__button_inner-anchor{ font-size: 12px; opacity: .7; }

/* divider */
.ql-blot-format-toolbar__divider{
  width: 1px;
  height: 20px;
  background: rgba(0,0,0,0.08);
  margin: 0 4px;
}

/* dropdown menu */
.ql-blot-format-toolbar__button_dropdown-menu{
  position: absolute;
  top: 36px;
  left: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
  border: 1px solid rgba(0,0,0,0.06);
  padding: 6px;
  display: none;
}
.ql-blot-format-toolbar__button_dropdown-menu_body{ max-height: 240px; overflow: auto; }
.ql-blot-format-toolbar__button_dropdown-menu_items{ display: flex; flex-direction: column; gap: 2px; }
.ql-blot-format-toolbar__button_dropdown-menu_item{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    text-align: left;
    font-size: 11px;
    color: #626262;
}
.ql-blot-format-toolbar__button_dropdown-menu_item:hover{ background: rgba(0,0,0,0.06); }

/* color picker */
.ql-blot-format-toolbar__button_color-picker{
  position: absolute;
  top: 36px; left: 0;
  background: #fff; border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
  border: 1px solid rgba(0,0,0,0.06);
  padding: 8px; display: none;
}
.ql-blot-format-toolbar__button_color-picker_options{
  display: grid; grid-auto-flow: column; gap: 6px;
}
.ql-blot-format-toolbar__button_color-picker_options-single-row{ grid-auto-columns: 24px; }
.ql-blot-format-toolbar__button_color-picker_option{
  width: 24px; height: 24px; border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
  display: inline-flex; align-items:center; justify-content:center;
  font-size: 10px; color: #333; cursor: pointer;
}
.ql-blot-format-toolbar__button_color-picker_option:hover{
  transform: scale(1.05);
}

/* selection rectangle from overlay */
.ql-table-selection-rect{
  border: 2px solid #4a90e2;
  background: rgba(74,144,226,0.08);
  border-radius: 4px;
  pointer-events: none;
}

.ql-table-embed-formatter__overlay.ql-table-overlay-active .ql-table-embed-formatter__handle-add-columns {
    display: none;
}

.ql-table-embed-formatter__overlay.ql-table-overlay-active .ql-table-embed-formatter__handle-add-rows {
    display: none;
}

.ql-table-embed-formatter__overlay.ql-table-overlay-active .ql-table-embed-formatter__handle-column {
    display: none;
}

.ql-table-embed-formatter__overlay.ql-table-overlay-active .ql-table-embed-formatter__handle-row {
    display: none;
}

.ql-blot-format-toolbar__button_color-picker_option[data-color="#F7B79D"] { background: #F7B79D; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="#FBE49D"] { background: #FBE49D; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="#BFD8F6"] { background: #BFD8F6; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="#E4C8F6"] { background: #E4C8F6; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="#F6C8D4"] { background: #F6C8D4; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="#C9E8D2"] { background: #C9E8D2; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="#D9D9D9"] { background: #D9D9D9; }
.ql-blot-format-toolbar__button_color-picker_option[data-color="none"] {
   background: transparent;
}
.ql-table-selection-rect,
.ql-table-selection-mask {
  pointer-events: none;
  user-select: none;
}

/* Remove the default blue cell selection background */
.ProseMirror .selectedCell {
  outline: none !important;
}

/* Also neutralize ProseMirror's after-pseudo border */
.ProseMirror .selectedCell::after {
  content: none !important;
}

.ProseMirror table { table-layout: fixed; width: auto; border-collapse: collapse; }
.ProseMirror th, .ProseMirror td { box-sizing: border-box; }

.ql-table-cell--single-selected {
  outline: 2px solid #63a3ff;
  outline-offset: -2px;
  background: rgba(99,163,255,.12);
}
`;

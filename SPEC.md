# Sycee UI — Component Specification

This document is the single source of truth for implementing components across the
React (`@sycee-ui/react`) and Vue (`@sycee-ui/vue`) packages. Both implementations
MUST render identical DOM structure and class names, so the shared SCSS in
`packages/styles` styles both frameworks with one codebase.

---

## 1. Design principles

- **One design system, two frameworks.** Identical class names, identical visual output, parallel APIs.
- **CSS variables for theming.** All colors/spacing/radii come from `var(--sy-*)` tokens. Never hardcode colors in components.
- **Accessibility first** (Radix/Chakra spirit): WAI-ARIA roles, keyboard support, focus-visible rings.
- **TypeScript-first** (Naive UI/Mantine spirit): strict types, no `any` in public APIs.
- **Composable, predictable APIs** (Ant Design/Element Plus familiarity): common prop names (`size`, `disabled`, `loading`), BEM classes.
- **No runtime CSS-in-JS.** Static SCSS compiled to CSS.

## 2. Class naming conventions

- Block: `sy-<name>` (e.g. `sy-button`, `sy-input`).
- Element: `sy-<name>__<element>` (e.g. `sy-select__dropdown`).
- Variant modifiers: `sy-<name>--<variant>` (e.g. `sy-button--primary`, `sy-button--sm`).
- State classes: `is-checked`, `is-open`, `is-active`, `is-selected`, `is-disabled`, `is-loading`, `is-closing`, `is-error`.
- Sub-components share the parent block: `CheckboxGroup` → `sy-checkbox-group`.

## 3. File layout

```
packages/react/src/
  index.ts                  # public exports (maintained by integrator, NOT agents)
  utils/cx.ts               # tiny classname helper (exists)
  components/
    <name>/                 # one folder per component, kebab-case
      <Name>.tsx            # kebab-case folder, PascalCase file, e.g. components/button/Button.tsx

packages/vue/src/
  index.ts                  # public exports (maintained by integrator, NOT agents)
  utils/cx.ts               # tiny classname helper (exists)
  components/
    <name>/
      <Name>.vue            # e.g. components/button/Button.vue
```

- **Do NOT** edit `src/index.ts`, vite configs, package.json, SCSS files, or SPEC.md.
- **Do NOT** run `pnpm install`, builds, or tests. Only write files.
- Use ONLY tokens/mixins documented here and classes in section 5.

## 4. Framework conventions

### React (`packages/react`)
- Named function components wrapped in `forwardRef` when a DOM ref is meaningful. Export as named export.
- Props interface: `export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> { ... }` — always extend the natural HTML attributes so native props pass through.
- Apply `className` via the `cx()` helper from `../../utils/cx`; merge with incoming `props.className` where sensible.
- Destructured default values (no `defaultProps`).
- Events use native React handlers (`onClick`, `onChange`).
- JSX transform is automatic — import hooks/types only: `import { forwardRef, useState } from 'react'` / `import type { HTMLAttributes } from 'react'`.
- `useId()` from React for accessible ids when needed.

### Vue (`packages/vue`)
- `<script setup lang="ts">` + `defineOptions({ name: 'SyButton' })`.
- Props via `defineProps<XxxProps>()` with reactive destructure defaults (Vue 3.5):
  `const { size = 'md' } = defineProps<XxxProps>();`
- Props interfaces must import shared types: `import type { ComponentSize } from '../../types';` (exists — declares `ComponentSize`, `ColorType`, and common helpers).
- `v-model` via `defineModel<boolean>()` / `defineModel<string>()`.
- Emits via `defineEmits<{ change: [value: string]; ... }>()`.
- Slots via `<slot />`; scoped slots via `<slot name="x" :item="item" />`.
- `useId()` from Vue 3.5 for accessible ids when needed.
- Root class binding via `cx()` helper from `../../utils/cx` (Vue accepts the same signature).

### Shared types (`packages/*/src/types.ts` — already created)
```ts
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ColorType = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type BorderType = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
```
(If a file is missing, create it exactly with the contents above.)

## 5. Icon system

`Icon` component (implemented in both packages already): `<Icon name="close" :size="16" />`.
Available names (type `IconName`): `check`, `close`, `chevron-down`, `chevron-up`,
`chevron-left`, `chevron-right`, `info`, `success`, `warning`, `danger`, `search`,
`eye`, `eye-off`. All SVGs use `currentColor`. Import `{ Icon }` from `../icon/Icon`.

## 6. Utilities available

- `cx(...args)` — classname joiner, skips falsy. Both packages have it at `src/utils/cx.ts`.
- React: `import { cx } from '../../utils/cx'`. Vue: same path.
- CSS token helpers to know: `--sy-color-*`, `--sy-radius-*`, `--sy-shadow-*`, `--sy-font-size-*`,
  `--sy-height-sm|md|lg`, `--sy-space-1..8`, `--sy-duration-fast|base|slow`, `--sy-ease`.

## 7. Component contracts

Each entry: props (P), events (E), slots (S), DOM & classes (C), a11y (A).
Default size everywhere: `md`. Sizes map to `--sm/--md/--lg` modifiers.

---

### 7.1 Button — DONE (exemplar, do not reimplement)
### 7.2 Icon — DONE (exemplar)
### 7.3 Input — DONE (exemplar)

---

### 7.4 Textarea
- P: `value`/`v-model: string`, `placeholder?: string`, `size?: ComponentSize`, `disabled?: boolean`, `readonly?: boolean`, `status?: 'default' | 'error' | 'warning'`, `rows?: number (default 3)`, `maxlength?: number`, `showCount?: boolean`
- E: change, input/blur/focus
- S: none
- C: `.sy-textarea[.--sm|--lg][.sy-textarea--error|--warning][.is-disabled]` > `textarea.sy-textarea__native`; when `showCount`, sibling `<span class="sy-textarea__count">{len}/{maxlength}</span>` inside a wrapper `.sy-textarea-wrapper`. If `showCount` is false, root is `.sy-textarea` only (wrapper optional — keep `.sy-textarea-wrapper` ALWAYS as root for both cases; inner `.sy-textarea` then `.sy-textarea__count` optional).
- A: native textarea semantics; `aria-disabled` when disabled.

### 7.5 Select
- P: `modelValue`/`value: string | number | null`, `options: Array<{ label: string; value: string | number; disabled?: boolean }>`, `placeholder?: string`, `size?: ComponentSize`, `disabled?: boolean`, `clearable?: boolean`, `status?: 'default' | 'error' | 'warning'`
- E: `change(value)`, `clear`
- S: none
- C:
  - Root `.sy-select[.--sm|--lg][.sy-select--error|--warning][.is-disabled][.is-open]`
  - `.sy-select__trigger` (button, role="combobox", aria-haspopup="listbox", aria-expanded, aria-labelledby)
  - inside trigger: `.sy-select__value` (shows selected label or `.sy-select__placeholder` span), `.sy-select__clear` (Icon close, only when clearable && has value), `.sy-select__arrow` (Icon chevron-down; `.is-open` rotates 180°)
  - `.sy-select__dropdown` (absolutely positioned under trigger; class `--top` when flipped above)
    - `ul.sy-select__list` role="listbox"
    - `li.sy-select__option[.is-selected][.is-active][.is-disabled]` role="option", aria-selected; check Icon on selected
- A: trigger keyboard: Enter/Space/ArrowDown opens; ArrowUp/Down move `.is-active` (wrap); Enter selects active; Esc closes; Home/End jump. Outside click closes. Selected label shown in trigger.
- Note: dropdown closes on option click; document-level listeners cleaned up on unmount.

### 7.6 Checkbox / CheckboxGroup
- Checkbox P: `v-model/checked: boolean`, `label?: string`, `disabled?: boolean`, `indeterminate?: boolean`, `size?: 'sm'|'md'` (default md)
- Checkbox E: `change(checked: boolean)`
- Checkbox C: `.sy-checkbox[.--sm][.is-checked][.is-indeterminate][.is-disabled]` > `input.sy-checkbox__native[type=checkbox]` + `.sy-checkbox__box` > (Icon check shown when checked) + `.sy-checkbox__label`
- Group P: `v-model/modelValue: Array<string | number>`, `options?: Array<{ label: string; value: string | number; disabled?: boolean }>`, `disabled?: boolean`
- Group C: `.sy-checkbox-group` (flex wrap, gap) — renders Checkbox children from options; slot supported alternatively.
- A: input is visually hidden but focusable; focus ring drawn on `.sy-checkbox__box` via `.sy-checkbox:has(input:focus-visible) .sy-checkbox__box` or `input:focus-visible + .sy-checkbox__box`.

### 7.7 Radio / RadioGroup
- Radio P: `v-model/checked: boolean`, `label?: string`, `disabled?: boolean`, `value?: string | number` (when used inside group)
- Radio E: `change(checked: boolean)`
- Radio C: `.sy-radio[.is-checked][.is-disabled]` > `input.sy-radio__native[type=radio]` + `.sy-radio__dot` + `.sy-radio__label`
- Group P: `v-model/modelValue: string | number | null`, `options?: same as checkbox`, `disabled?: boolean`
- Group C: `.sy-radio-group`
- A: same focus-visible pattern as checkbox; radios in a group share `name` (group generates one via useId).

### 7.8 Switch
- P: `v-model/checked: boolean`, `disabled?: boolean`, `loading?: boolean`, `size?: 'sm'|'md'` (default md)
- E: `change(checked: boolean)`
- C: `.sy-switch[.--sm][.is-checked][.is-loading][.is-disabled]` (a `<button role="switch">`) > `.sy-switch__thumb` (when loading, spinner is drawn via CSS on thumb)
- A: `role="switch"`, `aria-checked`, keyboard: Space/Enter toggle (native button click).

### 7.9 Modal
- P: `open`/`v-model:open: boolean`, `title?: string`, `width?: number|string (default 460)`, `okText?: string ('OK')`, `cancelText?: string ('Cancel')`, `showFooter?: boolean (true)`, `maskClosable?: boolean (true)`, `closeOnEsc?: boolean (true)`
- E: `ok`, `cancel`, `open`, `close`
- S: default (body), `title`, `footer`
- C:
  - Portal to `document.body`.
  - `.sy-modal-mask` (fixed, covers viewport, flex-centered) > `.sy-modal` (panel, `style.width`), inside panel:
    - `.sy-modal__header` > `.sy-modal__title` + `.sy-modal__close` (Icon close button)
    - `.sy-modal__body` (slot)
    - `.sy-modal__footer` > Cancel (ghost button) + OK (primary button)
  - Enter animation: mask fades in, panel scales 0.96→1 + translateY 8px→0. Exit: same reversed via `.is-closing` on mask; unmount after ~200ms. (Vue: use `<Transition name="sy-modal">` — SCSS defines the matching `sy-modal-enter-*`/`sy-modal-leave-*` classes.)
- A: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title id via useId). Esc closes (when closeOnEsc). Body scroll locked while open. Focus moves into panel on open, returns to previously focused element on close. Minimal Tab trap (loop first/last focusable).
- Imperative API: `dialog.confirm(config)`, `dialog.alert(config)` plus `dialog.clear()`. `config`: `title`, `content` (string/VNode in Vue, ReactNode in React), `okText` ('OK'), `cancelText` ('Cancel', confirm only), `width` (460), `maskClosable` (true), `closeOnEsc` (true), `onOk`, `onCancel`. Returns `{ destroy() }`.
- Imperative semantics: OK → `onOk` fires, then the dialog closes itself; any other dismissal (cancel button, close button, mask, Escape) → `onCancel`; `destroy()`/`clear()` fire no callbacks.
- Imperative implementation: each call mounts the regular Modal into its own container `<div>` on `document.body` (`createVNode`/`render` in Vue, `createRoot` in React); the container unmounts after the ~200ms exit animation. Reuses Modal classes/behavior — no extra classes or styles.

### 7.10 Tooltip
- P: `content: string`, `placement?: 'top'|'bottom'|'left'|'right' (default 'top')`, `trigger?: 'hover'|'click'|'focus' (default 'hover')`, `disabled?: boolean`, `theme?: 'dark'|'light' (default 'dark')`
- S: default (trigger), `content`
- C: root `.sy-tooltip` (inline-flex wrapper) > trigger slot + (when open) `.sy-tooltip__bubble[.sy-tooltip__bubble--light]` with inline `style { position: fixed; top; left; transform }` and `sy-tooltip__arrow` (inline-positioned, rotated square). Bubble `role="tooltip"`.
- A: `aria-describedby` on trigger; opens on hover/focus (per trigger prop); closes on leave/blur/esc; 120ms open delay, instant close. Position computed from trigger `getBoundingClientRect`; flips to opposite placement if it would overflow the viewport.
- Note: never wrap block-level layout — wrapper is `display: inline-flex`.

### 7.11 Message (imperative, no component import needed by users)
- API: `message.info(content, duration?)`, `message.success(...)`, `message.warning(...)`, `message.danger(...)`, plus `message.clear()`. `duration` default 3000ms.
- React: exported factory `message` created at module load: a dedicated container `<div class="sy-message-wrapper">` appended to body; first call creates a React root inside it.
- Vue: same exported factory implemented with `createVNode`/`render` from `vue` on the same wrapper.
- C: `.sy-message-wrapper` (fixed top-center, column stack) > `.sy-message.sy-message--info|success|warning|danger[.is-closing]` > `Icon` + `span.sy-message__content`
- A: `role="status"`, `aria-live="polite"` on wrapper.
- Implementation detail: items auto-remove after duration; exit uses `.is-closing` + 200ms removal. Cap stack at 8 (drop oldest).

### 7.12 Card
- P: `title?: string`, `hoverable?: boolean`, `borderless?: boolean`, `padding?: boolean (true)`
- S: default (body), `title`, `extra`, `footer`
- C: `.sy-card[.sy-card--hoverable][.sy-card--borderless]` > `.sy-card__header` (when title/extra/`#title` slot) containing `.sy-card__title` + `.sy-card__extra` + `.sy-card__body` + `.sy-card__footer`

### 7.13 Tag
- P: `color?: ColorType (default 'neutral')`, `variant?: 'soft'|'solid'|'outline' (default 'soft')`, `closable?: boolean`, `disabled?: boolean`, `size?: 'sm'|'md'`
- E: `close`
- S: default, `icon`
- C: `.sy-tag.sy-tag--{color}.sy-tag--{variant}[.sy-tag--sm][.sy-tag--outline|...]` > optional `.sy-tag__icon` + text + optional `.sy-tag__close` (Icon close)
- A: close button has `aria-label="Remove"`.

### 7.14 Alert
- P: `type?: 'info'|'success'|'warning'|'danger' (default 'info')`, `title?: string`, `showIcon?: boolean (true)`, `closable?: boolean (false)`
- E: `close`
- S: default (description), `title`, `icon`
- C: `.sy-alert.sy-alert--{type}` > `.sy-alert__icon` (info/success/warning/danger icon) + `.sy-alert__content` > `.sy-alert__title` + `.sy-alert__description` + `.sy-alert__close`
- A: `role="alert"`.

### 7.15 Avatar / AvatarGroup
- Avatar P: `src?: string`, `alt?: string`, `size?: number | 'sm'|'md'|'lg' (default 'md')`, `shape?: 'circle'|'square' (default 'circle')`
- S: default (custom content, e.g. initials) — fallback chain: slot → alt initials (first char) → Icon `sy` placeholder? keep: slot > first char of alt > Icon 'user'? No user icon — use empty rounded block with bg. Keep: slot > alt char.
- C: `.sy-avatar[.sy-avatar--sm|--lg][.sy-avatar--square]` > `img.sy-avatar__img` or `span.sy-avatar__text`; numeric size sets inline width/height/font-size.
- Group C: `.sy-avatar-group` — children overlap (`& > .sy-avatar:not(:first-child)` negative margin, ring border). P: `size` passthrough, `max?: number` shows `+N` overflow avatar (slot children only; agents implement max for slot usage by counting `useSlots().default()` — if complex, accept `max` but implement only overlap, no +N truncation. Document +N as not supported.)
- A: `img` alt from prop; text fallback `aria-hidden` (alt provided separately).

### 7.16 Badge
- P: `count?: number | string`, `dot?: boolean (false)`, `max?: number (99)`, `showZero?: boolean (false)`, `color?: ColorType (default 'danger')`
- S: default (the wrapped element; renders `.sy-badge__count` absolutely positioned over it)
- C: `.sy-badge[.sy-badge--dot]` > default slot + `sup.sy-badge__count[.is-empty when count 0 && !showZero]`
- A: count text is real text; `aria-label` with count on sup when dot.

### 7.17 Spinner
- P: `size?: number | 'sm'|'md'|'lg' (default 'md')`, `color?: ColorType (default 'primary')`, `label?: string`
- C: `.sy-spinner.sy-spinner--{color}` > `.sy-spinner__circle` + `.sy-spinner__label`
- A: `role="status"`; `aria-label` from `label` (default "Loading"); label text visible.

### 7.18 Progress
- P: `value?: number (0-100, default 0)`, `status?: 'primary'|'success'|'warning'|'danger' (default 'primary')`, `showText?: boolean (true)`, `height?: number (default 8)`, `indeterminate?: boolean`
- C: `.sy-progress[.sy-progress--success|--warning|--danger][.sy-progress--indeterminate]` > `.sy-progress__track` (inline height) > `.sy-progress__bar` (inline width %) + `.sy-progress__text` ("42%")
- A: `role="progressbar"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`; indeterminate sets `aria-busy`.

### 7.19 Tabs
- P: `v-model/active: string | number`, `items?: Array<{ label: string; value: string | number; disabled?: boolean }>`, `size?: ComponentSize`
- E: `change(value)`
- S: default = pane content per tab — use scoped slot pattern: `#pane-{value}`? Simplify: panes rendered from `items[].content?: string | slot not supported in v1`. Additionally support controlled usage without panes (nav-only, like a segmented control).
- C: `.sy-tabs[.--sm|--lg]` > `.sy-tabs__nav` > `.sy-tabs__tab[.is-active][.is-disabled]` (buttons, role="tab") + `.sy-tabs__indicator` (absolute underline, animated `transform`) + `.sy-tabs__panes` > `.sy-tabs__pane[.is-active]` (content: item.content)
- A: nav `role="tablist"`; ArrowLeft/Right move active among enabled tabs; Home/End; Enter/Space activate focused tab; tabs `aria-selected`, panes `role="tabpanel"`.
- Indicator: width/left computed from active tab element (`getBoundingClientRect` relative to nav), updated on active change + resize (ResizeObserver) + on mount via requestAnimationFrame.

### 7.20 Pagination
- P: `v-model:page/page: number (default 1)`, `total: number`, `pageSize?: number (default 10)`, `siblingCount?: number (default 1)`, `disabled?: boolean`
- E: `change(page)`
- C: `.sy-pagination[.is-disabled]` > nav `.sy-pagination__nav` (aria-label="Pagination") > buttons `.sy-pagination__item[.is-active][.is-disabled][.sy-pagination__item--arrow]` + `.sy-pagination__ellipsis` (…, non-interactive)
- A: current page `aria-current="page"`. Items: prev/next chevrons + numeric pages with ellipsis ranges (standard logic: 1 … around-current … last). Page count min 1.

### 7.21 Table
- P: `columns: Array<{ key: string; title: string; width?: number|string; align?: 'left'|'center'|'right'; render?: (row: Record<string, unknown>, index: number) => unknown }>`
- P: `data: Array<Record<string, unknown>>`, `striped?: boolean`, `bordered?: boolean`, `loading?: boolean`, `rowKey?: (row, index) => string | number`
- S: `empty` (default: text "No data")
- C: `.sy-table[.sy-table--striped][.sy-table--bordered][.is-loading]` > `.sy-table__scroll` (overflow-x auto) > `table.sy-table__table` > `thead > tr > th.sy-table__th[.sy-table__th--center|--right]` + `tbody > tr.sy-table__row > td.sy-table__td`; empty state row `.sy-table__empty` (colSpan = columns.length); loading overlay `.sy-table__loading` (Spinner, covers table).
- A: `th scope="col"`; render fn output stringified via `String()` unless it is a valid React/Vue node — framework side: React render returns `ReactNode`; Vue render returns `VNodeChild`. Both: if render missing, show `String(row[key] ?? '')`.

### 7.22 Space
- P: `size?: 'sm'|'md'|'lg'|number (default 'md')`, `vertical?: boolean`, `wrap?: boolean`, `align?: 'start'|'center'|'end'|'baseline' (default 'center' horizontal / 'stretch' vertical)`
- C: `.sy-space[.sy-space--vertical][.sy-space--wrap]` > child wrappers NOT needed — use CSS gap on the container (children rendered bare via Fragment/slot). Numeric size → inline gap.
- Note: render children directly (React Fragment / Vue slot) with `display:flex; gap`.

### 7.23 Divider
- P: `vertical?: boolean`, `dashed?: boolean`, `labelPlacement?: 'left'|'center'|'right' (default 'center')`
- S: default (label text)
- C: `.sy-divider[.sy-divider--vertical][.sy-divider--dashed][.sy-divider--{left|right}]` > optional `span.sy-divider__label`

### 7.24 Empty
- P: `description?: string (default 'No data')`
- S: default (replaces description), `image`
- C: `.sy-empty` > `.sy-empty__image` (inline SVG illustration, currentColor-based, subtle) + `.sy-empty__description`

### 7.25 NinePatch
- P: `src?: string` — a raw `.9.png` source (1px guide borders) or an AAPT-compiled PNG (npTc chunk)
- P: `customOptions?: { padding?: NinePatchBoxEdges; borderImageSlice?: NinePatchBoxEdges; borderInset?: number }` — manual overrides; when set, the image is not parsed at all
- P: `NinePatchBoxEdges = { top?: number; right?: number; bottom?: number; left?: number }` (px)
- S: default (content rendered on top of the stretched background)
- C: `.sy-nine-patch` (div) — border-image source/slice/width + padding longhands applied inline from parsed data (xDivs → left/right slice, yDivs → top/bottom slice); raw sources add `clip-path: inset(1px)` via `borderInset`; content box keeps `height: 100%`
- A: static container; default slot/children content stays accessible
- Note: parsing is delegated to the `ninepatch-core` runtime dependency (raw border rules or npTc chunk); the stretchable background is painted by CSS `border-image`, so the block ships no themed styles — only layout baselines in `_nine-patch.scss`

### 7.26 Skeleton
- P: `width?: number|string`, `height?: number|string`, `shape?: 'rect'|'circle'|'text' (default 'rect')`, `animated?: boolean (true)`
- C: `.sy-skeleton[.sy-skeleton--circle|--text][.sy-skeleton--animated]` (div, inline width/height)
- A: `aria-hidden="true"` — purely decorative; pulse animation disabled under `prefers-reduced-motion`

### 7.27 Breadcrumb
- P: `items?: Array<{ label: ReactNode|string; href?: string; disabled?: boolean }>`
- C: `nav.sy-breadcrumb[aria-label="Breadcrumb"]` > `ol.sy-breadcrumb__list` > `li.sy-breadcrumb__item[.is-current][.is-disabled]` > `a.sy-breadcrumb__link` or `span.sy-breadcrumb__label`; separator drawn by `li:not(:last-child)::after` (CSS content, outside the a11y tree)
- A: `aria-label="Breadcrumb"` on nav; current item `aria-current="page"`

### 7.28 Result
- P: `status?: 'info'|'success'|'warning'|'danger' (default 'info')`, `title?`, `description?`, `icon?`
- S: default (extra actions below), `icon`/`title`/`description` slots (Vue)
- C: `.sy-result.sy-result--{status}` > `.sy-result__icon` (64px soft-tinted circle, Icon by status) + `.sy-result__title` + `.sy-result__description` + `.sy-result__extra`
- A: `role="status"`

### 7.29 Steps
- P: `items: Array<{ label: ReactNode|string; description?: ReactNode|string; disabled?: boolean }>`, `active?: number (default 0)`, `onChange?: (index)` (React) / `change(index)` emit (Vue)
- C: `.sy-steps` > `.sy-steps__item[.is-done][.is-active][.is-disabled][.is-clickable]` > `.sy-steps__marker` (number, check Icon when done) + `.sy-steps__body` > `.sy-steps__label` + `.sy-steps__description`; connector line drawn by `item:not(:last-child)::after`
- A: active item `aria-current="step"`; clickable items are `role="button"` (tabIndex 0) responding to Enter/Space; clickable only when an `onChange` listener exists

### 7.30 Timeline
- P: `items: Array<{ title: ReactNode|string; description?: ReactNode|string; color?: ColorType (default 'neutral') }>`
- C: `.sy-timeline` > `.sy-timeline__item.sy-timeline__item--{color}` > `.sy-timeline__dot` + `.sy-timeline__content` > `.sy-timeline__title` + `.sy-timeline__description`; vertical connector drawn by `item:not(:last-child)::before`

### 7.31 Notification (imperative)
- API: `notification.info(title, content?, duration?)`, `success`, `warning`, `danger`, plus `notification.clear()`. `duration` default 4500ms; `0` disables the auto-close timer.
- React: factory created at module load — shared `.sy-notification-wrapper` div on body, one React root reused. Vue: `createVNode`/`render` on the same wrapper (array copy per render).
- C: `.sy-notification-wrapper` (fixed top-right, width 340px, column stack) > `.sy-notification.sy-notification--{type}[.is-closing]` > Icon + `.sy-notification__body` (`.sy-notification__title` + `.sy-notification__content`) + `.sy-notification__close` (button)
- A: `role="status"`, `aria-live="polite"` on wrapper; close button `aria-label="Close"`
- Implementation: items auto-remove after duration (exit via `.is-closing` + 200ms); manual close through the button; cap stack at 8 (drop oldest)

### 7.32 Popconfirm
- P: `title?: string`, `content?: string`, `placement?: 'top'|'bottom'|'left'|'right' (default 'top')`, `okText ('OK')`, `cancelText ('Cancel')`, `danger?: boolean`, `disabled?: boolean`
- E: confirm, cancel (bubble closes on both; Esc/outside click count as cancel without emitting)
- S: default (trigger)
- C: root `.sy-popconfirm` (inline-flex wrapper, click handlers on wrapper) > trigger + (when open) portal `.sy-popconfirm__bubble` (fixed positioning computed from trigger rect, viewport flip like Tooltip) with `.sy-popconfirm__title` + `.sy-popconfirm__description` + `.sy-popconfirm__actions` (ghost sm Cancel + solid sm OK, danger color when `danger`) + `.sy-popconfirm__arrow` (inline-positioned rotated square)
- A: trigger `aria-expanded`; bubble `aria-labelledby` to title id; Esc closes

### 7.33 Drawer
- P: `open`/`v-model:open: boolean`, `title?: string`, `placement?: 'right'|'left'|'top'|'bottom' (default 'right')`, `width?: number|string (400, left/right)`, `height?: number|string (320, top/bottom)`, `maskClosable (true)`, `closeOnEsc (true)`
- E: `open`, `close`
- S: default (body), `title`
- C: Portal to body. `.sy-drawer-mask.sy-drawer-mask--{placement}[.is-closing]` > `.sy-drawer.sy-drawer--{placement}` (panel, inline width/height per placement) > `.sy-drawer__header` (`.sy-drawer__title` + `.sy-drawer__close`) + `.sy-drawer__body`. React: mask fade + panel slide via `sy-drawer-{in,out}-{right,left,top,bottom}` keyframes gated by `:not(.sy-drawer-enter-active):not(.sy-drawer-leave-active)`; Vue: `<Transition name="sy-drawer">` (mask opacity + panel `transform` transition) — both class sets live in `_drawer.scss`.
- A: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title id). Esc closes the topmost overlay only; body scroll locked (module-level shared lock); focus moves into the panel on open and returns on close; minimal Tab trap — same mechanics as Modal.

### 7.34 Image
- P: `src: string`, `alt?: string`, `width?: number|string`, `height?: number|string`, `preview?: boolean (true)`, `errorText?: string ('Preview unavailable')`
- C: `.sy-image[.is-loading][.is-error][.sy-image--preview]` > `img.sy-image__img` + loading overlay (`.sy-image__overlay` with Spinner), replaced by an error block (`.sy-image__error` with eye-off Icon + errorText) after a load failure; when open, portal `.sy-image-viewer[.is-closing]` (fixed mask, zoom-out cursor) > `.sy-image-viewer__img` + `.sy-image-viewer__close`
- A: viewer `role="dialog"`, `aria-modal="true"`, `aria-label` from alt; Esc/mask/close button close; focus moves in on open and returns on close. Vue uses `<Transition name="sy-image-viewer">`, React `.is-closing`.

### 7.35 InputNumber
- P: `value`/`v-model: number | null`, `defaultValue?: number | null`, `min (−Infinity)`, `max (+Infinity)`, `step (1)`, `precision?: number`, `disabled`, `readonly`, `placeholder?`, `size?: ComponentSize`, `status?: InputStatus`, `controls?: boolean (true)`
- E: change(value)
- C: `.sy-input-number[.--sm|--lg][.--error|--warning][.is-disabled]` > optional `button.sy-input-number__decrease` (minus Icon) + `input.sy-input-number__native` (type text, inputmode decimal) + optional `button.sy-input-number__increase` (plus Icon)
- A: input `role="spinbutton"` with `aria-valuemin/max/now`; ArrowUp/Down steps, Enter commits, native spinners hidden via CSS
- Semantics: typed text stays a draft until blur/Enter, then parses, clamps (`min`/`max`) and rounds to `precision`; step buttons commit immediately

### 7.36 Rate
- P: `value`/`v-model: number`, `defaultValue (0)`, `max (5)`, `readonly`, `disabled`, `size?: 'sm'|'md'|'lg'`
- E: change(value)
- C: `.sy-rate[.--sm|--lg][.is-readonly][.is-disabled]` (role="slider", `aria-valuemin/max/now`, tabIndex 0 when interactive) > buttons `.sy-rate__star[.is-active]` (star Icon, empty stars colored via border-strong token)
- A: Arrow keys change the value; hover previews (`hoverValue`) without committing; stars carry `aria-label="Rate N of max"`

### 7.37 Slider
- P: `value`/`v-model: number`, `defaultValue (0)`, `min (0)`, `max (100)`, `step (1)`, `disabled`
- E: change(value)
- C: `.sy-slider[.is-disabled]` > `.sy-slider__track` > `.sy-slider__fill` (width %) + `.sy-slider__thumb` (left %, role="slider", `aria-valuemin/max/now`, `aria-busy` while dragging, tabIndex 0)
- A: pointer drag via pointer capture on the root (`touch-action: none`); keyboard Arrow/Page/Home/End; values snap to `step` and clamp to `[min, max]`

### 7.38 Form / FormItem
- Form P: `model?: Record<string, unknown>`, `rules?: Record<string, FormRule[]>`, `labelWidth?: number|string`, `labelPosition?: 'left'|'top' (default 'left')`
- Form C: `.sy-form[.sy-form--top]` (flex column, gap) — renders `form` element with `@submit.prevent`
- Form API: `validate(): Promise<boolean>` — Vue `defineExpose`, React `useImperativeHandle` (`FormHandle`); FormItems self-register (provide/inject in Vue, Context in React) and unregister on unmount
- FormItem P: `prop?: string` (model key), `label?: string|ReactNode`, `required?: boolean`, `rules?: FormRule[]`
- FormItem C: `.sy-form-item[.is-error]` > `.sy-form-item__label` (inline width from `labelWidth`, `.sy-form-item__asterisk` when required) + `.sy-form-item__control` (slot) + `.sy-form-item__error[role="alert"]`
- Rule shape: `{ required?: boolean; message?: string; validator?: (value) => boolean | string | Promise<boolean | string> }`; `required` rejects null/undefined/''/[]; empty check `isEmptyValue`, runner `runRule`; item rules override form rules for the same key; an explicit `required` prop injects a required rule
- Validation timing: rules run on `validate()` and re-run on model changes once the item was touched (blur/focusout)
- A: error text `role="alert"`

### 7.39 Collapse / CollapseItem
- Collapse P: `openKeys?: Array<string|number>` (React controlled) / `v-model` (Vue, Array), `defaultOpenKeys?: Array (default [])`, `accordion?: boolean (false)`
- Collapse E: openChange (Vue) / `onOpenChange` (React)
- CollapseItem P: `name: string|number`, `title?: string|ReactNode`, `disabled?: boolean`
- C: `.sy-collapse` > `.sy-collapse__item[.is-open][.is-disabled]` > `button.sy-collapse__header[aria-expanded][aria-controls]` (title + chevron-down Icon rotating when open) + `.sy-collapse__content` (grid-template-rows 0fr→1fr animation) > `.sy-collapse__body`
- A: content `role="region"` labelled by header id; item must be rendered inside a Collapse (throws otherwise); Vue shares state via provide/inject (`collapse/context.ts`), React via Context

### 7.40 Dropdown
- P: `options?: Array<{ label; value?; disabled?; divider? }>`, `defaultOpen (false)`, `open? (React controlled)`, `disabled`
- E: select(value) (value defaults to label), openChange (Vue) / `onOpenChange` (React)
- S: default (trigger)
- C: root `.sy-dropdown` (inline-flex, click on wrapper) > trigger + (when open) portal `.sy-dropdown__menu[role="menu"]` (fixed under trigger, flips up when the viewport bottom would overflow) > buttons `.sy-dropdown__item[role="menuitem"][.is-disabled]` or `span.sy-dropdown__item--divider`
- A: trigger `aria-haspopup="menu"` + `aria-expanded`; Esc/outside mousedown close; item click selects and closes

### 7.41 DatePicker
- P: `value`/`v-model: string | null` (ISO `YYYY-MM-DD`), `defaultValue?: string | null`, `min?: string`, `max?: string`, `weekStartsOn?: 0|1 (default 0)`, `disabled`, `placeholder ('Select date')`, `size?: ComponentSize`, `status?: InputStatus`
- C: trigger `.sy-date-picker[.--sm|--lg][.--error|--warning][.is-disabled][.is-open]` (field base, value or placeholder + calendar Icon) + portal `.sy-date-picker__panel` (fixed, flips up) > `__panel-header` (prev/next month nav + `__panel-title` `YYYY – MM`) + `__panel-weekdays` (7 labels) + `__panel-grid` (6×7 `__panel-day` buttons)
- A: grid `role="grid"`, days `role="gridcell"` with `aria-selected` and ISO `aria-label`; outside days dimmed (`.is-outside`), today outlined (`.is-today`), selected filled (`.is-selected`); days outside `min`/`max` disabled; Esc/outside click close; reopening centers on the selection
- Note: date math uses local-time helpers in the component file (`parseISO`/`formatISO`/`addMonths`/`buildGrid`)

### 7.42 Cascader
- P: `value`/`v-model: Array<string|number> | null` (root→leaf path), `defaultValue?: path | null`, `options: Array<{ label: string; value: string|number; children?; disabled? }>`, `clearable?: boolean`, `disabled`, `placeholder ('Select')`, `size?: ComponentSize`, `status?: InputStatus`
- C: trigger `.sy-cascader[.…same modifiers as DatePicker]` (path labels joined by ' / ' + chevron; optional `.sy-cascader__clear` button) + portal `.sy-cascader__panel` (fixed, flex row) > `ul.sy-cascader__panel-column[role="listbox"]` per level > buttons `.sy-cascader__panel-option[role="option"][.is-active][.is-disabled]` (chevron-right on branches)
- Semantics: branch click expands the next column; leaf click commits the path and closes; opening resets columns to the top level; Esc/outside click close

### 7.43 Tree
- P: `data: TreeNodeData[]` (`{ key; label: string; children?; disabled? }`), `checkable?: boolean (false)`, `selectable?: boolean (true)`, `defaultExpandedKeys/expandedKeys?: Array<key>`, `defaultCheckedKeys/checkedKeys?: Array<key>`, `defaultSelectedKey/selectedKey?: key | null`
- E: expandedChange(keys), checkedChange(keys), select(key) (Vue emits; React `onExpandedChange`/`onCheckedChange`/`onSelect`)
- C: `.sy-tree[role="tree"]` > (recursive) `.sy-tree__node[role="treeitem"][.is-selected][.is-disabled]` (depth via `--sy-tree-depth` → `.sy-tree__indent` width) > `button.sy-tree__arrow[.is-expanded][.is-hidden]` (chevron-right) + optional `input[type=checkbox].sy-tree__checkbox.sy-checkbox__native` + `.sy-tree__label`; expanded children in `.sy-tree__group[role="group"]`
- Semantics: checking a node cascades to all descendants; a parent displays checked when all enabled children are checked, otherwise indeterminate (`element.indeterminate`)
- A: treeitem `aria-expanded` (branch only), `aria-selected`, `aria-checked` (`mixed` when indeterminate); keyboard Enter/Space selects, ArrowRight/Left expand/collapse; Vue renders recursion via `tree/TreeItem.vue` with provide/inject (`tree/context.ts`)

### 7.44 Upload
- P: `fileList`/`v-model: UploadFile[]` (`{ uid; name; size?; status: 'uploading'|'success'|'error' }`), `defaultValue?: UploadFile[]`, `multiple?: boolean`, `accept?: string`, `maxCount?: number`, `drag?: boolean`, `disabled`, `beforeUpload?: (file: File) => boolean|Promise<boolean>`, `request?: (options: { file; onSuccess; onError }) => void`
- E: change(files), remove(file), error(file) (Vue); `onChange`/`onRemove` (React)
- C: `.sy-upload[.sy-upload--drag][.is-dragover][.is-disabled]` > hidden `input[type=file].sy-upload__input` (aria-hidden) + trigger (`.sy-upload__trigger` button or drag `role="button"` area with upload Icon) + `.sy-upload__list` > `.sy-upload__item[.is-uploading|.is-success|.is-error]` (file Icon + `.sy-upload__name` + `.sy-upload__status` (Spinner / success / danger Icon) + `.sy-upload__remove` button)
- Semantics: entries start as `uploading`; default `request` marks success immediately (no transport); `beforeUpload` returning false rejects the file; exceeding `maxCount` ignores extra files; re-selecting the same file re-fires change (input value reset)
- A: hidden input is `aria-hidden`/non-focusable; status spans carry `aria-label` with the status; remove buttons `aria-label="Remove <name>"`

### 7.45 Countdown
- P: `target: number|string|Date`, `format?: string ('DD:HH:mm:ss')`, `size?: ComponentSize`, `boxed?: boolean`, `label?: string`
- E: finish (Vue) / `onFinish` (React), fired once when the remaining time reaches zero
- C: `.sy-countdown[.--sm|.--lg][.--boxed][.is-finished]` > `.sy-countdown__segment` per date token and `.sy-countdown__separator` for literal pattern text
- A: root `role="timer"`; the optional `label` supplies the accessible name; separators are `aria-hidden`
- Tokens: `DD`, `HH`, `mm`, `ss`, and single-digit `D`, `H`, `m`, `s`. Timers start on mount so SSR builds do not retain active intervals.

### 7.46 Carousel
- P: `items: CarouselItem[]` (`{ key?; content; ariaLabel? }`), `active?/v-model:active`, `defaultActive (0)`, `autoplay (true)`, `interval (4500)`, `loop (true)`, `pauseOnHover (true)`, `showArrows (true)`, `showIndicators (true)`, `height?`
- E: change(index) (Vue) / `onChange` (React)
- C: `.sy-carousel[role="region"][aria-roledescription="carousel"]` > `.sy-carousel__viewport` > `.sy-carousel__track` > `.sy-carousel__slide[.is-active]` + `__arrow--prev/next` + `__indicators` > `__indicator[.is-active]`
- A: focusable carousel; ArrowLeft/Right, Home and End navigate; slide labels default to `1 / N`; inactive slides are `aria-hidden`; autoplay pauses on hover and under reduced motion

### 7.47 Danmaku
- P: `items: DanmakuItem[]` (`{ id?; content; color?; speed?; delay?; track? }`), `height (180)`, `tracks (4)`, `speed (12)`, `paused?`/`v-model:paused`, `defaultPaused (false)`, `loop (true)`, `showControls (false)`
- E: itemClick(item,index) (Vue) / `onItemClick` (React)
- C: `.sy-danmaku[.is-paused]` > `.sy-danmaku__stage` > `button.sy-danmaku__item` (CSS variables for lane, duration, delay and iterations) + optional `.sy-danmaku__control`
- A: root is a `role="log"` region; paused state becomes polite; reduced motion freezes comments in place; every comment is a real focusable button

### 7.48 Marquee
- P: `direction?: 'left'|'right'|'up'|'down' (left)`, `duration (18 seconds)`, `pauseOnHover (true)`, `fade (true)`, `gap ('48px')`
- S: default (React: children)
- C: `.sy-marquee.sy-marquee--{direction}[.sy-marquee--pause-on-hover][.sy-marquee--fade]` > `.sy-marquee__motion` > two `.sy-marquee__group` copies for seamless looping; the second copy is `aria-hidden`
- A: hover pause and reduced-motion pause; duplicated content is omitted from the accessibility tree

### 7.49 Copy
- P: `text: string`, `label?`, `copiedLabel?`, `errorLabel?`, `color?: ColorType (neutral)`, `variant?: BorderType (ghost)`, `size?: ComponentSize (md)`, `type?: 'button'|'submit'|'reset' (button)`, `iconOnly (false)`, `duration (2000)`, `disabled`
- E: copied(text) / `onCopied` (React), copyError(error) / `onCopyError` (React)
- C: `button.sy-copy.sy-button.sy-button--{color}.sy-button--{variant}[.sy-button--sm|lg][.sy-copy--icon-only][.is-copied|.is-error]` > `.sy-copy__icon` (copy, check or danger Icon) + `.sy-copy__label` (`role="status"`, visually hidden when `iconOnly`)
- A: native button semantics and keyboard activation; accessible name follows the current label for icon-only usage; success/error labels are announced politely; feedback resets after `duration` unless it is `0`
- Clipboard: use `navigator.clipboard.writeText` when available, then fall back to a temporary textarea + `document.execCommand('copy')`; restore the previously focused element after fallback
- Imperative API: `copy(text, { onSuccess?, onError? }) => Promise<boolean>` resolves false on failure and never rejects from clipboard access; `copyText(text)` is the throwing low-level primitive

### 7.50 InfiniteScroll
- P: `loading? (false)`, `finished? (false)`, `error? (false)`, `disabled? (false)`, `distance? (120)`, `height?: number|string`
- E: loadMore (Vue) / `onLoadMore` (React); the built-in retry button emits the same event
- S: default (list content), `loading`, `finished`, `error` (React: `loadingContent`, `finishedContent`, `errorContent`)
- C: `.sy-infinite-scroll[.sy-infinite-scroll--contained][.is-loading][.is-error][.is-finished][.is-disabled]` > `.sy-infinite-scroll__content` + `.sy-infinite-scroll__footer` > optional `.sy-infinite-scroll__status[role="status"|"alert"]` + `.sy-infinite-scroll__sentinel` (aria-hidden)
- Behavior: observes the sentinel with `IntersectionObserver` and fires `loadMore` once per intersection cycle; `distance` is the bottom `rootMargin` in pixels. A supplied `height` makes the root the scroll container; otherwise the viewport is observed.
- State: loading, finished, error and disabled all suspend observation while true. When loading changes back to false, observation is re-created so another page can load if the sentinel is still visible. Without `IntersectionObserver`, scroll/resize detection is used as a fallback.
- Status: loading shows an inline Spinner and locale copy; error shows locale copy and a focusable retry button; finished shows locale copy. `aria-busy` reflects `loading`.

### 7.51 Localization and utilities
- `LocaleProvider` (React/Vue) accepts `locale: 'en'|'zh'` and optional `messages` overrides. No provider means English.
- Built-in component labels, placeholders, empty states and accessibility copy resolve through the provider; examples include close, clear, remove, pagination, loading, date placeholders, upload states and carousel controls.
- `@sycee-ui/utils` is framework-agnostic and re-exported by both component packages.
- Utilities: `formatDate`, `formatDateTime`, `formatRelativeTime`, `formatNumber`, `formatCurrency`, `formatPercent`, `clamp`, `debounce` and browser-only `copy` / `copyText`.
- Date token output is deterministic; invalid dates throw `RangeError`. Non-finite numeric formatting returns `—`.

---

## 8. SCSS notes (styles package — maintained by integrator)

- Each component has `packages/styles/scss/components/_<name>.scss` matching section 5 classes.
- Tokens: `:root` variables + `[data-theme='dark']` overrides — see `scss/_tokens.scss`.
- Mixins: `scss/_mixins.scss` — `@mixin sy-focus-ring`, `@mixin sy-ellipsis`, `@mixin sy-control-base` (common control styles: inline-flex, font inherit, transition, radius, border, height/size modifiers are per-component).
- Never hardcode hex colors in component SCSS — use tokens (`var(--sy-color-primary)` etc.) or `color-mix(in srgb, var(--sy-color-primary) 12%, transparent)` for soft tints.

## 9. Versioning & compatibility

- React peer: `react >= 18`, Vue peer: `vue >= 3.4`.
- Browser target: modern evergreen (ES2020, `:has()` and `color-mix` allowed).
- Dark mode: `data-theme="dark"` attribute on `<html>`.

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

<div align="center">

<img src="docs/public/logo.svg" width="88" alt="Sycee UI logo" />

# Sycee UI

**One design system, two frameworks.**

A unified component library for React and Vue — the same tokens, the same
class names, the same visual output, with parallel APIs across both packages.

[![CI](https://github.com/midi-zeng/sycee-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/midi-zeng/sycee-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@sycee-ui/react?label=%40sycee-ui%2Freact&logo=npm&color=cb3837)](https://www.npmjs.com/package/@sycee-ui/react)
[![npm](https://img.shields.io/npm/v/@sycee-ui/vue?label=%40sycee-ui%2Fvue&logo=npm&color=cb3837)](https://www.npmjs.com/package/@sycee-ui/vue)
[![Docs](https://img.shields.io/badge/docs-github%20pages-blue)](https://midi-zeng.github.io/sycee-ui/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

[Documentation](https://midi-zeng.github.io/sycee-ui/) · [Playground](https://midi-zeng.github.io/sycee-ui/playground/) · [Changelog](https://github.com/midi-zeng/sycee-ui/releases) · [Sponsor ♥](https://github.com/sponsors/midi-zeng)

</div>

---

## Why Sycee UI

Mainstream libraries each solved part of the design-system problem very well.
Sycee UI takes the best idea from each and applies it to **both** ecosystems:

| Idea | Borrowed from |
| --- | --- |
| Familiar, enterprise-friendly APIs (`size`, `color`, `loading`, `disabled`) | Ant Design · Element Plus |
| Theme everything with CSS variables + first-class dark mode | Naive UI · Arco Design |
| Strict TypeScript everywhere | Naive UI · Mantine |
| Accessibility-first interaction patterns (ARIA, keyboard, focus) | Radix UI · Chakra UI |
| Composable, lightweight primitives | Radix UI · Headless UI |
| One design language across frameworks | Sycee UI |

## Packages

| Package | Description | Version |
| --- | --- | --- |
| [`@sycee-ui/react`](./packages/react) | 50 React components (forwardRef, strict types) | [![npm](https://img.shields.io/npm/v/@sycee-ui/react)](https://www.npmjs.com/package/@sycee-ui/react) |
| [`@sycee-ui/vue`](./packages/vue) | The same 50 components as Vue 3 SFCs (`v-model`, slots) | [![npm](https://img.shields.io/npm/v/@sycee-ui/vue)](https://www.npmjs.com/package/@sycee-ui/vue) |
| [`@sycee-ui/styles`](./packages/styles) | SCSS design tokens + compiled stylesheet | [![npm](https://img.shields.io/npm/v/@sycee-ui/styles)](https://www.npmjs.com/package/@sycee-ui/styles) |

Requires **React ≥ 18** or **Vue ≥ 3.4**. Both component packages ship the
compiled stylesheet themselves (`styles.css`), so `@sycee-ui/styles` is only
needed if you want the SCSS source.

## Quick start

### React

```bash
npm install @sycee-ui/react
```

```tsx
import '@sycee-ui/react/styles.css';
import { Button, Input } from '@sycee-ui/react';

export function App() {
  return (
    <>
      <Input placeholder="Your name" clearable />
      <Button onClick={() => console.log('hey')}>Save</Button>
    </>
  );
}
```

### Vue

```bash
npm install @sycee-ui/vue
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input } from '@sycee-ui/vue';

const name = ref('');
</script>

<template>
  <Input v-model="name" placeholder="Your name" clearable />
  <Button @click="console.log(name)">Save</Button>
</template>
```

Don't forget: `import '@sycee-ui/vue/styles.css'`.

## Components

50 components, identical in both packages — every docs page shows live demos
for React and Vue side by side:

| Category | Components |
| --- | --- |
| General | [Button](https://midi-zeng.github.io/sycee-ui/components/button) · [Copy](https://midi-zeng.github.io/sycee-ui/components/copy) · [Watermark](https://midi-zeng.github.io/sycee-ui/components/watermark) · [Icon](https://midi-zeng.github.io/sycee-ui/components/icon) · [Card](https://midi-zeng.github.io/sycee-ui/components/card) · [Tag](https://midi-zeng.github.io/sycee-ui/components/tag) · [Avatar](https://midi-zeng.github.io/sycee-ui/components/avatar) · [Badge](https://midi-zeng.github.io/sycee-ui/components/badge) · [Divider](https://midi-zeng.github.io/sycee-ui/components/divider) · [Empty](https://midi-zeng.github.io/sycee-ui/components/empty) · [Space](https://midi-zeng.github.io/sycee-ui/components/space) · [Skeleton](https://midi-zeng.github.io/sycee-ui/components/skeleton) · [NinePatch](https://midi-zeng.github.io/sycee-ui/components/nine-patch) |
| Data entry | [Input](https://midi-zeng.github.io/sycee-ui/components/input) · [Textarea](https://midi-zeng.github.io/sycee-ui/components/textarea) · [InputNumber](https://midi-zeng.github.io/sycee-ui/components/input-number) · [Select](https://midi-zeng.github.io/sycee-ui/components/select) · [Checkbox](https://midi-zeng.github.io/sycee-ui/components/checkbox) · [Radio](https://midi-zeng.github.io/sycee-ui/components/radio) · [Switch](https://midi-zeng.github.io/sycee-ui/components/switch) · [Rate](https://midi-zeng.github.io/sycee-ui/components/rate) · [Slider](https://midi-zeng.github.io/sycee-ui/components/slider) · [DatePicker](https://midi-zeng.github.io/sycee-ui/components/date-picker) · [Cascader](https://midi-zeng.github.io/sycee-ui/components/cascader) · [Tree](https://midi-zeng.github.io/sycee-ui/components/tree) · [Upload](https://midi-zeng.github.io/sycee-ui/components/upload) · [Form](https://midi-zeng.github.io/sycee-ui/components/form) |
| Feedback | [Alert](https://midi-zeng.github.io/sycee-ui/components/alert) · [Message](https://midi-zeng.github.io/sycee-ui/components/message) · [Notification](https://midi-zeng.github.io/sycee-ui/components/notification) · [Modal](https://midi-zeng.github.io/sycee-ui/components/modal) · [Drawer](https://midi-zeng.github.io/sycee-ui/components/drawer) · [Tooltip](https://midi-zeng.github.io/sycee-ui/components/tooltip) · [Popconfirm](https://midi-zeng.github.io/sycee-ui/components/popconfirm) · [Spinner](https://midi-zeng.github.io/sycee-ui/components/spinner) · [Progress](https://midi-zeng.github.io/sycee-ui/components/progress) · [Result](https://midi-zeng.github.io/sycee-ui/components/result) · [Image](https://midi-zeng.github.io/sycee-ui/components/image) |
| Navigation | [Breadcrumb](https://midi-zeng.github.io/sycee-ui/components/breadcrumb) · [Tabs](https://midi-zeng.github.io/sycee-ui/components/tabs) · [Pagination](https://midi-zeng.github.io/sycee-ui/components/pagination) · [Steps](https://midi-zeng.github.io/sycee-ui/components/steps) · [Dropdown](https://midi-zeng.github.io/sycee-ui/components/dropdown) · [Collapse](https://midi-zeng.github.io/sycee-ui/components/collapse) |
| Data display | [Table](https://midi-zeng.github.io/sycee-ui/components/table) · [Timeline](https://midi-zeng.github.io/sycee-ui/components/timeline) · [InfiniteScroll](https://midi-zeng.github.io/sycee-ui/components/infinite-scroll) · [Carousel](https://midi-zeng.github.io/sycee-ui/components/carousel) · [Marquee](https://midi-zeng.github.io/sycee-ui/components/marquee) · [Danmaku](https://midi-zeng.github.io/sycee-ui/components/danmaku) |
| Animation & time | [Countdown](https://midi-zeng.github.io/sycee-ui/components/countdown) |

## Utilities and localization

`@sycee-ui/utils` adds framework-agnostic date, number, currency, percentage,
relative-time, clamp, debounce, and clipboard helpers including imperative
`copy(text)`. Both framework packages also export `LocaleProvider`; built-in
UI copy supports English (`en`, default) and Chinese (`zh`).

## Hooks and composables

Both packages include browser-safe state utilities for common UI patterns:
`useMounted`, `useDebouncedValue`, `useEventListener`, `useClickOutside`,
`useMediaQuery`, and `useLocalStorage`. React returns hooks, while Vue returns
equivalent composables with ref-based values and cleanup tied to component
scope.

```tsx
const isWide = useMediaQuery('(min-width: 1024px)');
const searchRef = useClickOutside<HTMLDivElement>(closeSuggestions);
const [theme, setTheme] = useLocalStorage('app-theme', 'light');
```

## Imperative APIs

`message` and `dialog` work without any template/JSX state — call them from
event handlers, effects or stores. Both packages export the same signatures.

```tsx
import { message, dialog } from '@sycee-ui/react'; // or '@sycee-ui/vue'

message.success('Saved!');
message.warning('Careful there', 3000); // content, duration (ms)

dialog.confirm({
  title: 'Delete item?',
  content: 'This action cannot be undone.',
  onOk: () => deleteItem(),
});
```

`dialog.confirm` shows OK + Cancel; `dialog.alert` shows a single OK button;
`dialog.clear()` closes everything. Every call returns a handle with
`destroy()`. See the [Modal docs](https://midi-zeng.github.io/sycee-ui/components/modal)
for the full config.

## Theming

Every visual value is a `--sy-*` CSS variable. Override them on `:root` to
re-brand the whole library — no rebuild, no Sass required:

```css
:root {
  --sy-color-primary: #0ea5e9;
  --sy-color-primary-hover: #38bdf8;
  --sy-radius-md: 10px;
}
```

Dark mode ships ready-made: set `data-theme="dark"` on the `<html>` element
(and back to `"light"`, or remove the attribute, to return).

```js
document.documentElement.dataset.theme = 'dark';
```

Prefer Sass? `@sycee-ui/styles` publishes the SCSS source (`@sycee-ui/styles/scss/*`),
so you can import individual token files or bake overrides in at compile time.

## Features

- **50 components** — one stylesheet, one design language, parallel APIs for
  React 18+ and Vue 3.4+
- **CSS-variable theming** — re-brand by overriding tokens; dark mode via
  `data-theme="dark"`
- **Imperative APIs** — `message` toasts and `dialog` confirm/alert dialogs
  callable from anywhere
- **Accessible** — WAI-ARIA roles, keyboard navigation, focus-visible rings,
  focus management in overlays
- **Tree-shakable ESM** — named exports, `sideEffects`-aware packaging
- **TypeScript-first** — strict types, bundled `.d.ts`
- **Oxc-powered toolchain** — Vite 8 (Rolldown engine) + oxlint

## Documentation

Full docs with live demos for **both frameworks** and an in-browser playground:

**[midi-zeng.github.io/sycee-ui](https://midi-zeng.github.io/sycee-ui/)**

## Development

```bash
pnpm install
pnpm dev        # docs site with live demos
pnpm build      # build all packages
pnpm test       # run tests (vitest)
pnpm lint       # oxlint
pnpm typecheck  # tsc / vue-tsc per package
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the component spec, release flow
(changesets), and docs conventions.

## Versioning

All three packages release together via [Changesets](https://github.com/changesets/changesets).
Run `pnpm changeset` to describe your change; the release workflow opens a
*Version Packages* PR and publishes to npm when it's merged.

## Sponsor

Sycee UI is MIT-licensed and free forever. If it saves you time, consider
[sponsoring the project ♥](https://github.com/sponsors/midi-zeng).

## License

[MIT](./LICENSE) © Sycee UI Contributors

Built-in icon path data is derived from [Lucide](https://lucide.dev) (ISC
License) — see [NOTICE.md](./NOTICE.md).

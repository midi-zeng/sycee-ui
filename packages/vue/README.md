<div align="center">

# @sycee-ui/vue

**Sycee UI for Vue 3** — one design system, two frameworks.

50 accessible, strictly-typed components as Vue 3 SFCs, driven by `--sy-*`
CSS variables. The same tokens, the same class names, the same visual output
as [`@sycee-ui/react`](../react).

[![npm](https://img.shields.io/npm/v/@sycee-ui/vue?logo=npm&color=cb3837)](https://www.npmjs.com/package/@sycee-ui/vue)
[![Docs](https://img.shields.io/badge/docs-github%20pages-blue)](https://midi-zeng.github.io/sycee-ui/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](../../LICENSE)

</div>

---

## Installation

```bash
npm install @sycee-ui/vue
```

Requires **Vue ≥ 3.4**. The compiled stylesheet ships inside the package,
so there is nothing else to install.

## Quick start

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input } from '@sycee-ui/vue';

const name = ref('');
</script>

<template>
  <Input v-model="name" placeholder="Your name" clearable />
  <Button variant="soft" @click="console.log(name)">Save</Button>
</template>
```

Don't forget the stylesheet — once, near your app entry:

```ts
import '@sycee-ui/vue/styles.css';
```

Idiomatic Vue throughout: `v-model` on form components, slots for content,
props with the same enterprise-friendly names as the React package
(`size`, `color`, `variant`, `loading`, `disabled`, `block`).

## Components

| Category | Components |
| --- | --- |
| General | [Button](https://midi-zeng.github.io/sycee-ui/components/button) · [Copy](https://midi-zeng.github.io/sycee-ui/components/copy) · [Watermark](https://midi-zeng.github.io/sycee-ui/components/watermark) · [Icon](https://midi-zeng.github.io/sycee-ui/components/icon) · [Card](https://midi-zeng.github.io/sycee-ui/components/card) · [Tag](https://midi-zeng.github.io/sycee-ui/components/tag) · [Avatar](https://midi-zeng.github.io/sycee-ui/components/avatar) · [Badge](https://midi-zeng.github.io/sycee-ui/components/badge) · [Divider](https://midi-zeng.github.io/sycee-ui/components/divider) · [Empty](https://midi-zeng.github.io/sycee-ui/components/empty) · [Space](https://midi-zeng.github.io/sycee-ui/components/space) · [Skeleton](https://midi-zeng.github.io/sycee-ui/components/skeleton) · [NinePatch](https://midi-zeng.github.io/sycee-ui/components/nine-patch) |
| Data entry | [Input](https://midi-zeng.github.io/sycee-ui/components/input) · [Textarea](https://midi-zeng.github.io/sycee-ui/components/textarea) · [InputNumber](https://midi-zeng.github.io/sycee-ui/components/input-number) · [Select](https://midi-zeng.github.io/sycee-ui/components/select) · [Checkbox](https://midi-zeng.github.io/sycee-ui/components/checkbox) · [Radio](https://midi-zeng.github.io/sycee-ui/components/radio) · [Switch](https://midi-zeng.github.io/sycee-ui/components/switch) · [Rate](https://midi-zeng.github.io/sycee-ui/components/rate) · [Slider](https://midi-zeng.github.io/sycee-ui/components/slider) · [DatePicker](https://midi-zeng.github.io/sycee-ui/components/date-picker) · [Cascader](https://midi-zeng.github.io/sycee-ui/components/cascader) · [Tree](https://midi-zeng.github.io/sycee-ui/components/tree) · [Upload](https://midi-zeng.github.io/sycee-ui/components/upload) · [Form](https://midi-zeng.github.io/sycee-ui/components/form) |
| Feedback | [Alert](https://midi-zeng.github.io/sycee-ui/components/alert) · [Message](https://midi-zeng.github.io/sycee-ui/components/message) · [Notification](https://midi-zeng.github.io/sycee-ui/components/notification) · [Modal](https://midi-zeng.github.io/sycee-ui/components/modal) · [Drawer](https://midi-zeng.github.io/sycee-ui/components/drawer) · [Tooltip](https://midi-zeng.github.io/sycee-ui/components/tooltip) · [Popconfirm](https://midi-zeng.github.io/sycee-ui/components/popconfirm) · [Spinner](https://midi-zeng.github.io/sycee-ui/components/spinner) · [Progress](https://midi-zeng.github.io/sycee-ui/components/progress) · [Result](https://midi-zeng.github.io/sycee-ui/components/result) · [Image](https://midi-zeng.github.io/sycee-ui/components/image) |
| Navigation | [Breadcrumb](https://midi-zeng.github.io/sycee-ui/components/breadcrumb) · [Tabs](https://midi-zeng.github.io/sycee-ui/components/tabs) · [Pagination](https://midi-zeng.github.io/sycee-ui/components/pagination) · [Steps](https://midi-zeng.github.io/sycee-ui/components/steps) · [Dropdown](https://midi-zeng.github.io/sycee-ui/components/dropdown) · [Collapse](https://midi-zeng.github.io/sycee-ui/components/collapse) |
| Data display | [Table](https://midi-zeng.github.io/sycee-ui/components/table) · [Timeline](https://midi-zeng.github.io/sycee-ui/components/timeline) · [InfiniteScroll](https://midi-zeng.github.io/sycee-ui/components/infinite-scroll) · [Carousel](https://midi-zeng.github.io/sycee-ui/components/carousel) · [Marquee](https://midi-zeng.github.io/sycee-ui/components/marquee) · [Danmaku](https://midi-zeng.github.io/sycee-ui/components/danmaku) |
| Animation & time | [Countdown](https://midi-zeng.github.io/sycee-ui/components/countdown) |

`LocaleProvider` defaults to English and accepts `zh` for built-in Chinese UI
copy. Date, number, and imperative `copy(text)` helpers are re-exported from
`@sycee-ui/utils`.

## Composables

Common browser-safe composables are exported from the package root:

- `useMounted()` — hydration-safe mount state.
- `useDebouncedValue(refOrGetter, delay?)` — debounced state.
- `useEventListener(name, handler, target?, options?)` — managed listeners.
- `useClickOutside(target, handler, options?)` — outside pointer interaction.
- `useMediaQuery(query, default?)` — reactive CSS media queries.
- `useLocalStorage(key, initialValue)` — JSON persistence across tabs.

```ts
const isWide = useMediaQuery('(min-width: 1024px)');
const panelRef = ref<HTMLElement>();
const stop = useClickOutside(panelRef, () => { open.value = false; });
const [theme, setTheme, resetTheme] = useLocalStorage('app-theme', 'light');
```

Every docs page shows a live demo for React and Vue side by side.
[NinePatch](https://midi-zeng.github.io/sycee-ui/components/nine-patch)
renders Android nine-patch images (raw `.9.png` or AAPT-compiled PNG) via
the bundled `ninepatch-core` dependency. `MessageContainer` is also
exported for advanced use — `message` creates and manages one
automatically.

## Imperative APIs

`message` and `dialog` work without any template state — call them from
event handlers, watchers or stores. The signatures are identical in
[`@sycee-ui/react`](../react).

```ts
import { message, dialog } from '@sycee-ui/vue';

message.success('Saved!');
message.warning('Careful there', 3000); // content, duration (ms)

const handle = dialog.confirm({
  title: 'Delete item?',
  content: 'This action cannot be undone.',
  onOk: () => deleteItem(),
});
handle.destroy(); // close without calling onOk/onCancel
```

`dialog.confirm` shows OK + Cancel; `dialog.alert` shows a single OK
button; `dialog.clear()` closes everything. See the
[Modal docs](https://midi-zeng.github.io/sycee-ui/components/modal) for
the full config.

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

Dark mode ships ready-made: set `data-theme="dark"` on the `<html>`
element (and back to `"light"`, or remove the attribute, to return). The
full token reference and the SCSS source live in
[`@sycee-ui/styles`](../styles).

## TypeScript

Prop interfaces use Vue 3.4+'s reactive-props destructure and are fully
typed; shared unions `ComponentSize`, `ColorType`, `BorderType` and
`InputStatus` are exported from the package root, along with
`SelectOption` and `TableColumn`. Bundled `.d.ts` files (generated with
`vue-tsc`) mean no extra `@types` package.

## Packaging notes

- **ESM only**, named exports — bundlers can tree-shake unused components
  (`sideEffects` is declared for CSS only).
- The stylesheet import `@sycee-ui/vue/styles.css` is the one expected
  side effect; import it once, near your app entry.
- Ships `NOTICE.md` (icon path data is derived from
  [Lucide](https://lucide.dev), ISC License).

## Documentation

Full docs with live demos for **both frameworks** and an in-browser
playground: **[midi-zeng.github.io/sycee-ui](https://midi-zeng.github.io/sycee-ui/)**

## License

[MIT](../../LICENSE) © Sycee UI Contributors

<div align="center">

# @sycee-ui/vue

**Sycee UI for Vue 3** — one design system, two frameworks.

25 accessible, strictly-typed components as Vue 3 SFCs, driven by `--sy-*`
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
| General | [Button](https://midi-zeng.github.io/sycee-ui/components/button) · [Icon](https://midi-zeng.github.io/sycee-ui/components/icon) · [Card](https://midi-zeng.github.io/sycee-ui/components/card) · [Tag](https://midi-zeng.github.io/sycee-ui/components/tag) · [Avatar](https://midi-zeng.github.io/sycee-ui/components/avatar) (with `AvatarGroup`) · [Badge](https://midi-zeng.github.io/sycee-ui/components/badge) · [Divider](https://midi-zeng.github.io/sycee-ui/components/divider) · [Empty](https://midi-zeng.github.io/sycee-ui/components/empty) · [Space](https://midi-zeng.github.io/sycee-ui/components/space) · [NinePatch](https://midi-zeng.github.io/sycee-ui/components/nine-patch) |
| Data entry | [Input](https://midi-zeng.github.io/sycee-ui/components/input) · [Textarea](https://midi-zeng.github.io/sycee-ui/components/textarea) · [Select](https://midi-zeng.github.io/sycee-ui/components/select) · [Checkbox](https://midi-zeng.github.io/sycee-ui/components/checkbox) (with `CheckboxGroup`) · [Radio](https://midi-zeng.github.io/sycee-ui/components/radio) (with `RadioGroup`) · [Switch](https://midi-zeng.github.io/sycee-ui/components/switch) |
| Feedback | [Alert](https://midi-zeng.github.io/sycee-ui/components/alert) · [Message](https://midi-zeng.github.io/sycee-ui/components/message) · [Modal](https://midi-zeng.github.io/sycee-ui/components/modal) · [Tooltip](https://midi-zeng.github.io/sycee-ui/components/tooltip) · [Spinner](https://midi-zeng.github.io/sycee-ui/components/spinner) · [Progress](https://midi-zeng.github.io/sycee-ui/components/progress) |
| Navigation & data display | [Tabs](https://midi-zeng.github.io/sycee-ui/components/tabs) · [Pagination](https://midi-zeng.github.io/sycee-ui/components/pagination) · [Table](https://midi-zeng.github.io/sycee-ui/components/table) |

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

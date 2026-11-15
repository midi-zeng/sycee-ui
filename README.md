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
| [`@sycee-ui/react`](./packages/react) | 24 React components (forwardRef, strict types) | [![npm](https://img.shields.io/npm/v/@sycee-ui/react)](https://www.npmjs.com/package/@sycee-ui/react) |
| [`@sycee-ui/vue`](./packages/vue) | The same 24 components as Vue 3 SFCs (`v-model`, slots) | [![npm](https://img.shields.io/npm/v/@sycee-ui/vue)](https://www.npmjs.com/package/@sycee-ui/vue) |
| [`@sycee-ui/styles`](./packages/styles) | SCSS design tokens + compiled stylesheet | [![npm](https://img.shields.io/npm/v/@sycee-ui/styles)](https://www.npmjs.com/package/@sycee-ui/styles) |

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

## Features

- **24 components** — Button, Input, Textarea, Select, Checkbox, Radio, Switch,
  Modal, Tooltip, Message (toasts), Card, Tag, Alert, Avatar, Badge, Spinner,
  Progress, Tabs, Pagination, Table, Icon, Space, Divider, Empty
- **CSS-variable theming** — re-brand the library by overriding tokens; dark
  mode via `data-theme="dark"`
- **Accessible** — WAI-ARIA roles, keyboard navigation, focus-visible rings
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

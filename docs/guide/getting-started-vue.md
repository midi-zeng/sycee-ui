---
title: Vue
---

# Getting started with Vue

## Installation

```bash
npm install @sycee-ui/vue
# or
pnpm add @sycee-ui/vue
```

Peer requirements: Vue 3.4+ (Composition API required).

## Usage

Import the stylesheet once at your app entry, then use components directly:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input } from '@sycee-ui/vue';

const name = ref('');
</script>

<template>
  <div>
    <Input v-model="name" placeholder="Your name" clearable />
    <Button @click="console.log(name)">Save</Button>
  </div>
</template>
```

Don't forget the stylesheet:

```ts
// main.ts
import '@sycee-ui/vue/styles.css';
```

## Form components support `v-model`

All form components use `v-model` out of the box:

```vue
<Switch v-model="enabled" />
<Select v-model="color" :options="options" />
<Checkbox v-model="agreed" label="I agree" />
```

They also emit framework-idiomatic events (`@change`, `@clear`, `@close`) and
support slots where a React prop would accept a `ReactNode`.

## Tree-shaking

Every component is a named export of the ESM bundle:

```ts
import { Button } from '@sycee-ui/vue'; // only Button ends up in your bundle
```

## Styling hooks

Vue components render the exact same `sy-*` classes as the React package, so the
compiled stylesheet is byte-for-byte compatible between frameworks — restyle with
plain CSS, no wrapper API.

## Dark mode

Add `data-theme="dark"` to your `<html>` element (or toggle it dynamically):

```html
<html data-theme="dark">
```

See [Theming & dark mode](./theming) for the full token reference.

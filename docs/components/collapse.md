---
title: Collapse
---

<script setup>
import BasicVue from '../demos/collapse/Basic.vue';
import basicVueCode from '../demos/collapse/Basic.vue?raw';
import BasicTsx from '../demos/collapse/Basic.tsx';
import basicTsxCode from '../demos/collapse/Basic.tsx?raw';
</script>

# Collapse

Expandable content panels with an animated open/close transition.

## Basic

Use `defaultOpenKeys` (or the `v-model` array in Vue / controlled `openKeys` in
React) to control which items are open; `accordion` allows only one at a time.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Collapse

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| openKeys *(React controlled)* | `Array<string \| number>` | — | Open item names |
| defaultOpenKeys | `Array<string \| number>` | `[]` | Uncontrolled initial open items |
| accordion | `boolean` | `false` | Only one item open at a time |

### CollapseItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string \| number` | — | Unique key referenced by the open keys |
| title | `string` *(Vue)* / `ReactNode` *(React)* | — | Header text |
| disabled | `boolean` | `false` | Prevents toggling |

Each header is a button with `aria-expanded`/`aria-controls`; the content is a
`role="region"` labelled by its header.

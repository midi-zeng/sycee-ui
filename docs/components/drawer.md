---
title: Drawer
---

<script setup>
import BasicVue from '../demos/drawer/Basic.vue';
import basicVueCode from '../demos/drawer/Basic.vue?raw';
import BasicTsx from '../demos/drawer/Basic.tsx';
import basicTsxCode from '../demos/drawer/Basic.tsx?raw';
</script>

# Drawer

A side panel that slides over the page from any edge, portal-rendered with a
mask, focus trap and scroll lock — the sibling of Modal.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open *(Vue `v-model:open`)* / `open` *(React)* | `boolean` | — | Whether the drawer is open |
| title | `string` *(Vue)* / `ReactNode` *(React)* | — | Header title; also a `title` slot *(Vue)* |
| placement | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'` | Side the panel slides in from |
| width | `number \| string` | `400` | Panel width for left/right drawers |
| height | `number \| string` | `320` | Panel height for top/bottom drawers |
| maskClosable | `boolean` | `true` | Closes when the mask is clicked |
| closeOnEsc | `boolean` | `true` | Closes when Escape is pressed |

### Events

| Event | Description |
| --- | --- |
| close *(Vue)* / `onClose` *(React)* | A dismissal was initiated (mask, Esc or close button) |
| open *(Vue)* / `onOpen` *(React)* | The drawer became visible |

The panel is `role="dialog"` with `aria-modal="true"`; focus moves into it on
open and returns to the trigger on close. Body scrolling is locked while open.

---
title: Skeleton
---

<script setup>
import BasicVue from '../demos/skeleton/Basic.vue';
import basicVueCode from '../demos/skeleton/Basic.vue?raw';
import BasicTsx from '../demos/skeleton/Basic.tsx';
import basicTsxCode from '../demos/skeleton/Basic.tsx?raw';
</script>

# Skeleton

A shimmering placeholder for content that is loading.

## Basic

Combine blocks, circles and text lines to sketch the layout that is coming.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| width | `number \| string` | — | Placeholder width |
| height | `number \| string` | — | Placeholder height |
| shape | `'rect' \| 'circle' \| 'text'` | `'rect'` | Shape of the placeholder |
| animated | `boolean` | `true` | Enables the pulse animation |

The skeleton is purely decorative and marked `aria-hidden` — announce loading
states through other means if the wait can be long.

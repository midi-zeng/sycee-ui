---
title: Breadcrumb
---

<script setup>
import BasicVue from '../demos/breadcrumb/Basic.vue';
import basicVueCode from '../demos/breadcrumb/Basic.vue?raw';
import BasicTsx from '../demos/breadcrumb/Basic.tsx';
import basicTsxCode from '../demos/breadcrumb/Basic.tsx?raw';
</script>

# Breadcrumb

Shows the trail to the current page.

## Basic

The last item is marked as the current page; items with an `href` render as
links. Separators are drawn in CSS between items.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `Array<{ label, href?, disabled? }>` | `[]` | Trail of items; the last one is current |

### Accessibility

The root is a `<nav aria-label="Breadcrumb">`; the current item carries
`aria-current="page"`.

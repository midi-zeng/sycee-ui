---
title: Space
---

<script setup>
import BasicVue from '../demos/space/Basic.vue';
import basicVueCode from '../demos/space/Basic.vue?raw';
import BasicTsx from '../demos/space/Basic.tsx';
import basicTsxCode from '../demos/space/Basic.tsx?raw';
import SizesVue from '../demos/space/Sizes.vue';
import sizesVueCode from '../demos/space/Sizes.vue?raw';
import SizesTsx from '../demos/space/Sizes.tsx';
import sizesTsxCode from '../demos/space/Sizes.tsx?raw';
import LayoutVue from '../demos/space/Layout.vue';
import layoutVueCode from '../demos/space/Layout.vue?raw';
import LayoutTsx from '../demos/space/Layout.tsx';
import layoutTsxCode from '../demos/space/Layout.tsx?raw';
</script>

# Space

A flex container that spaces its children evenly — a lightweight layout helper
for controls, tags and inline groups.

## Basic

Children are rendered directly into a `display: flex` container; the gap comes
from CSS, so no wrapper is added around each child.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Sizes and numeric gap

`size` accepts a named size (`sm`, `md` default, `lg`) or a pixel number for a
custom gap.

<DemoBlock :vue-demo="SizesVue" :vue-code="sizesVueCode" :react-demo="SizesTsx" :react-code="sizesTsxCode" />

## Vertical and wrap

`vertical` stacks the children; `wrap` lets them flow onto multiple lines.

<DemoBlock :vue-demo="LayoutVue" :vue-code="layoutVueCode" :react-demo="LayoutTsx" :react-code="layoutTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Gap between children: named size or pixels |
| vertical | `boolean` | `false` | Stacks children vertically |
| wrap | `boolean` | `false` | Allows children to wrap onto multiple lines |
| align | `'start' \| 'center' \| 'end' \| 'baseline'` | `'center'` horizontal / `'stretch'` vertical | Cross-axis alignment |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Children rendered directly into the flex container (React: children) |

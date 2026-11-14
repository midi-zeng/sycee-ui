---
title: Badge
---

<script setup>
import BasicVue from '../demos/badge/Basic.vue';
import basicVueCode from '../demos/badge/Basic.vue?raw';
import BasicTsx from '../demos/badge/Basic.tsx';
import basicTsxCode from '../demos/badge/Basic.tsx?raw';
import OverflowVue from '../demos/badge/Overflow.vue';
import overflowVueCode from '../demos/badge/Overflow.vue?raw';
import OverflowTsx from '../demos/badge/Overflow.tsx';
import overflowTsxCode from '../demos/badge/Overflow.tsx?raw';
import StandaloneVue from '../demos/badge/Standalone.vue';
import standaloneVueCode from '../demos/badge/Standalone.vue?raw';
import StandaloneTsx from '../demos/badge/Standalone.tsx';
import standaloneTsxCode from '../demos/badge/Standalone.tsx?raw';
</script>

# Badge

A small count or status marker attached to an element — counts, "new" labels
or presence dots.

## Basic

Wrap any element (here an Avatar) and the count is positioned over its corner.
`count` accepts a number or short text.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Max, dot and zero

Numeric counts above `max` (default 99) render as `99+`. `dot` replaces the
count with a small dot. A count of `0` is hidden unless `showZero` is set.

<DemoBlock :vue-demo="OverflowVue" :vue-code="overflowVueCode" :react-demo="OverflowTsx" :react-code="overflowTsxCode" />

## Standalone and colors

Without a wrapped element the badge renders inline on its own, in any of the
five colors (default `danger`).

<DemoBlock :vue-demo="StandaloneVue" :vue-code="standaloneVueCode" :react-demo="StandaloneTsx" :react-code="standaloneTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| count | `number \| string` | — | Number (or short text) shown in the badge |
| dot | `boolean` | `false` | Renders a small dot instead of the count |
| max | `number` | `99` | Upper bound; larger numeric counts render as `99+` |
| showZero | `boolean` | `false` | Whether a count of 0 is displayed |
| color | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'danger'` | Badge color |

### Slots / children

| Slot | Description |
| --- | --- |
| default | The wrapped element; the count is absolutely positioned over it. Without children the badge renders standalone (React: children) |

The count is real text; when `dot` is set with a count, the badge carries an
`aria-label` with the value.

---
title: Rate
---

<script setup>
import BasicVue from '../demos/rate/Basic.vue';
import basicVueCode from '../demos/rate/Basic.vue?raw';
import BasicTsx from '../demos/rate/Basic.tsx';
import basicTsxCode from '../demos/rate/Basic.tsx?raw';
</script>

# Rate

A star rating input with hover preview and keyboard support.

## Basic

Hovering previews the rating; clicking commits it. Arrow keys adjust the value
when the group is focused.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value *(Vue `v-model`)* / `value` *(React)* | `number` | `0` | Current rating |
| max | `number` | `5` | Number of stars |
| readonly | `boolean` | `false` | Shows the value without allowing changes |
| disabled | `boolean` | `false` | Disabled state |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Star size |

### Events

| Event | Description |
| --- | --- |
| change *(Vue)* / `onChange` *(React)* | The rating changed |

The group is `role="slider"` with `aria-valuemin/max/now`.

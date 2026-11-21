---
title: Slider
---

<script setup>
import BasicVue from '../demos/slider/Basic.vue';
import basicVueCode from '../demos/slider/Basic.vue?raw';
import BasicTsx from '../demos/slider/Basic.tsx';
import basicTsxCode from '../demos/slider/Basic.tsx?raw';
</script>

# Slider

A single-value range selector with pointer dragging and keyboard stepping.

## Basic

Drag the thumb or click anywhere on the track; Arrow/Page/Home/End keys step
from the thumb.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value *(Vue `v-model`)* / `value` *(React)* | `number` | `0` | Current value |
| min / max | `number` | `0` / `100` | Range bounds |
| step | `number` | `1` | Increment granularity |
| disabled | `boolean` | `false` | Disabled state |

### Events

| Event | Description |
| --- | --- |
| change *(Vue)* / `onChange` *(React)* | The value changed while dragging or via keyboard |

The thumb is `role="slider"` with `aria-valuemin/max/now`.

---
title: InputNumber
---

<script setup>
import BasicVue from '../demos/input-number/Basic.vue';
import basicVueCode from '../demos/input-number/Basic.vue?raw';
import BasicTsx from '../demos/input-number/Basic.tsx';
import basicTsxCode from '../demos/input-number/Basic.tsx?raw';
</script>

# InputNumber

A numeric input with +/- steppers, clamping and keyboard support.

## Basic

Arrow Up/Down steps the value; typed values commit on blur or Enter and are
clamped to `min`/`max`, honoring `precision`.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value *(Vue `v-model`)* / `value` *(React)* | `number \| null` | — | Current value; `null` is empty |
| min / max | `number` | `-Infinity` / `Infinity` | Value bounds |
| step | `number` | `1` | Increment/decrement amount |
| precision | `number` | — | Number of decimal places |
| controls | `boolean` | `true` | Shows the +/- buttons |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| status | `'default' \| 'error' \| 'warning'` | `'default'` | Validation color |
| disabled / readonly / placeholder | — | — | Native input behavior |

### Events

| Event | Description |
| --- | --- |
| change *(Vue)* / `onChange` *(React)* | The committed value changed |

The input is `role="spinbutton"` with `aria-valuemin/max/now`.

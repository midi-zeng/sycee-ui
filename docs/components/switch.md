---
title: Switch
---

<script setup>
import BasicVue from '../demos/switch/Basic.vue';
import basicVueCode from '../demos/switch/Basic.vue?raw';
import BasicTsx from '../demos/switch/Basic.tsx';
import basicTsxCode from '../demos/switch/Basic.tsx?raw';
import SizesVue from '../demos/switch/Sizes.vue';
import sizesVueCode from '../demos/switch/Sizes.vue?raw';
import SizesTsx from '../demos/switch/Sizes.tsx';
import sizesTsxCode from '../demos/switch/Sizes.tsx?raw';
import StatesVue from '../demos/switch/States.vue';
import statesVueCode from '../demos/switch/States.vue?raw';
import StatesTsx from '../demos/switch/States.tsx';
import statesTsxCode from '../demos/switch/States.tsx?raw';
</script>

# Switch

To toggle a single setting on or off. The Sycee Switch is a native button
with `role="switch"`, so Space/Enter toggling and the accessible name come
for free.

## Basic

Bind the checked state with `v-model` (Vue) or `checked` + `onChange`
(React).

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Sizes

`size` comes in two heights: `sm` and `md` (default).

<DemoBlock :vue-demo="SizesVue" :vue-code="sizesVueCode" :react-demo="SizesTsx" :react-code="sizesTsxCode" />

## Loading and disabled

`loading` draws a spinner on the thumb and blocks toggling — useful while an
async save is in flight; `disabled` mutes the switch entirely.

<DemoBlock :vue-demo="StatesVue" :vue-code="statesVueCode" :react-demo="StatesTsx" :react-code="statesTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `checked` *(React)* | `boolean` | `false` | Checked state |
| size | `'sm' \| 'md'` | `'md'` | Switch height |
| loading | `boolean` | `false` | Spinner on the thumb, blocks toggling (`aria-busy`) |
| disabled | `boolean` | `false` | Native disabled state |

### Slots / children

None — the Switch renders no label of its own; place one next to it.

### Events

| Event | Description |
| --- | --- |
| update:modelValue *(Vue)* / `onChange(checked, event)` *(React)* | The switch was toggled with the new checked state (suppressed while loading or disabled) |
| change *(Vue)* | Same payload as the model update |

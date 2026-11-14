---
title: Input
---

<script setup>
import BasicVue from '../demos/input/Basic.vue';
import basicVueCode from '../demos/input/Basic.vue?raw';
import BasicTsx from '../demos/input/Basic.tsx';
import basicTsxCode from '../demos/input/Basic.tsx?raw';
import ClearableVue from '../demos/input/Clearable.vue';
import clearableVueCode from '../demos/input/Clearable.vue?raw';
import ClearableTsx from '../demos/input/Clearable.tsx';
import clearableTsxCode from '../demos/input/Clearable.tsx?raw';
import StatesVue from '../demos/input/States.vue';
import statesVueCode from '../demos/input/States.vue?raw';
import StatesTsx from '../demos/input/States.tsx';
import statesTsxCode from '../demos/input/States.tsx?raw';
</script>

# Input

To collect short single-line text. The Sycee Input wraps the native input with
validation states, a clear button and prefix/suffix decorations, while native
attributes like `placeholder` and `maxlength` pass straight through.

## Basic

Bind the value with `v-model` (Vue) or `value` + `onChange` (React).

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Clearable, prefix and suffix

`clearable` shows a clear button while the field has a value (on hover or
focus); clearing resets the value and notifies through the `clear` event. The
`prefix` / `suffix` props render plain text decorations, and the matching
slots (Vue) accept any node such as an `<Icon />`.

<DemoBlock :vue-demo="ClearableVue" :vue-code="clearableVueCode" :react-demo="ClearableTsx" :react-code="clearableTsxCode" />

## Sizes, status and states

`size` controls the height (`sm`, `md`, `lg`). `status="error"` and
`status="warning"` tint the border and focus ring for validation feedback;
`disabled` and `readonly` map to the native attributes.

<DemoBlock :vue-demo="StatesVue" :vue-code="statesVueCode" :react-demo="StatesTsx" :react-code="statesTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `value` *(React)* | `string` | — | Bound input value |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height |
| status | `'default' \| 'error' \| 'warning'` | `'default'` | Validation state |
| clearable | `boolean` | `false` | Clear button on hover/focus while the value is non-empty |
| prefix | `string` *(Vue)* / `ReactNode` *(React)* | — | Content rendered before the input |
| suffix | `string` *(Vue)* / `ReactNode` *(React)* | — | Content rendered after the input |
| disabled | `boolean` | `false` | Native disabled state |
| readonly *(Vue)* / `readOnly` *(React)* | `boolean` | `false` | Native readonly state |

Any other native attribute (`placeholder`, `maxlength`, `type`, ...) falls
through to the native `<input>` element.

### Slots / children

| Slot | Description |
| --- | --- |
| prefix *(Vue)* / `prefix` prop *(React)* | Replaces the prefix prop — pass an `<Icon />` |
| suffix *(Vue)* / `suffix` prop *(React)* | Replaces the suffix prop |

### Events

| Event | Description |
| --- | --- |
| update:modelValue *(Vue)* / `onChange(value, event)` *(React)* | Fired on every keystroke with the current value |
| change *(Vue)* | Same payload as the model update; also fired when cleared |
| clear *(Vue)* | The clear button was pressed — React reports the reset through `onChange('')` |

---
title: Textarea
---

<script setup>
import BasicVue from '../demos/textarea/Basic.vue';
import basicVueCode from '../demos/textarea/Basic.vue?raw';
import BasicTsx from '../demos/textarea/Basic.tsx';
import basicTsxCode from '../demos/textarea/Basic.tsx?raw';
import ShowCountVue from '../demos/textarea/ShowCount.vue';
import showCountVueCode from '../demos/textarea/ShowCount.vue?raw';
import ShowCountTsx from '../demos/textarea/ShowCount.tsx';
import showCountTsxCode from '../demos/textarea/ShowCount.tsx?raw';
import StatesVue from '../demos/textarea/States.vue';
import statesVueCode from '../demos/textarea/States.vue?raw';
import StatesTsx from '../demos/textarea/States.tsx';
import statesTsxCode from '../demos/textarea/States.tsx?raw';
</script>

# Textarea

To collect multi-line text. The Sycee Textarea wraps the native element with
sizes, validation states and an optional character counter, while native
attributes like `name` and `spellcheck` pass straight through.

## Basic

Bind the value with `v-model` (Vue) or `value` + `onChange` (React). Three
rows are visible by default.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Show count

`showCount` renders a `{length}/{maxlength}` counter below the field; without
`maxlength` only the current length is shown. Combine it with `maxlength` to
cap the input.

<DemoBlock :vue-demo="ShowCountVue" :vue-code="showCountVueCode" :react-demo="ShowCountTsx" :react-code="showCountTsxCode" />

## Rows, status and states

`rows` sets the number of visible text lines. `status="error"` and
`status="warning"` tint the border and focus ring for validation feedback;
`disabled` and `readonly` map to the native attributes.

<DemoBlock :vue-demo="StatesVue" :vue-code="statesVueCode" :react-demo="StatesTsx" :react-code="statesTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `value` *(React)* | `string` | — | Bound textarea value |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height |
| status | `'default' \| 'error' \| 'warning'` | `'default'` | Validation state |
| rows | `number` | `3` | Number of visible text lines |
| maxlength *(Vue)* / `maxLength` *(React)* | `number` | — | Maximum number of characters allowed |
| showCount | `boolean` | `false` | Shows a `{length}/{maxlength}` counter below the field |
| placeholder | `string` | — | Native placeholder |
| disabled | `boolean` | `false` | Native disabled state (`aria-disabled` when disabled) |
| readonly *(Vue)* / `readOnly` *(React)* | `boolean` | `false` | Native readonly state |

Any other native attribute (`name`, `spellcheck`, ...) falls through to the
native `<textarea>` element.

### Slots / children

None — the Textarea is configured entirely through props.

### Events

| Event | Description |
| --- | --- |
| update:modelValue, input, change *(Vue)* / `onChange(value, event)` *(React)* | Fired on every keystroke with the current value |
| focus, blur *(Vue)* | Fired when the field gains or loses focus |

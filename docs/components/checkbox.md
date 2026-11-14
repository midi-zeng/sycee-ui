---
title: Checkbox
---

<script setup>
import BasicVue from '../demos/checkbox/Basic.vue';
import basicVueCode from '../demos/checkbox/Basic.vue?raw';
import BasicTsx from '../demos/checkbox/Basic.tsx';
import basicTsxCode from '../demos/checkbox/Basic.tsx?raw';
import IndeterminateVue from '../demos/checkbox/Indeterminate.vue';
import indeterminateVueCode from '../demos/checkbox/Indeterminate.vue?raw';
import IndeterminateTsx from '../demos/checkbox/Indeterminate.tsx';
import indeterminateTsxCode from '../demos/checkbox/Indeterminate.tsx?raw';
import GroupVue from '../demos/checkbox/Group.vue';
import groupVueCode from '../demos/checkbox/Group.vue?raw';
import GroupTsx from '../demos/checkbox/Group.tsx';
import groupTsxCode from '../demos/checkbox/Group.tsx?raw';
</script>

# Checkbox

To toggle one or more options on or off independently. Use CheckboxGroup for
a set of checkboxes bound to a single array of values.

## Basic

Bind the checked state with `v-model` (Vue) or `checked` + `onChange`
(React). The `label` prop renders the text; a default slot / children take
precedence for richer content.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Indeterminate

`indeterminate` shows a dash instead of the check icon — the classic "select
all" header over a list of items. It is a visual state only: manage the
items and compute it yourself.

<DemoBlock :vue-demo="IndeterminateVue" :vue-code="indeterminateVueCode" :react-demo="IndeterminateTsx" :react-code="indeterminateTsxCode" />

## CheckboxGroup

Give CheckboxGroup `options` and bind the checked values as an array with
`v-model` (Vue) or `value` + `onChange` (React). Individual options can be
`disabled`, and the group-level `disabled` mutes every checkbox.

<DemoBlock :vue-demo="GroupVue" :vue-code="groupVueCode" :react-demo="GroupTsx" :react-code="groupTsxCode" />

## API

### Props

**Checkbox**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `checked` *(React)* | `boolean` | `false` | Checked state |
| label | `string` | — | Label text — the default slot / children take precedence |
| indeterminate | `boolean` | `false` | Shows a dash instead of the check icon |
| size | `'sm' \| 'md'` | `'md'` | Box size |
| disabled | `boolean` | `false` | Native disabled state |

Other native attributes (`name`, `value`, ...) fall through to the native
`<input type="checkbox">`.

**CheckboxGroup**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `value` *(React)* | `Array<string \| number>` | `[]` | Checked values |
| options | `Array<{ label: string; value: string \| number; disabled?: boolean }>` | — | Renders a Checkbox per option (slot / children are rendered instead when omitted) |
| disabled | `boolean` | `false` | Disables every checkbox in the group |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Checkbox label (React: children) — takes precedence over the `label` prop |

### Events

| Event | Description |
| --- | --- |
| update:modelValue *(Vue)* / `onChange(checked, event)` *(React)* | The checkbox was toggled with the new checked state |
| change *(Vue)* | Same payload as the model update |
| update:modelValue *(Vue)* / `onChange(value)` *(React, group)* | The group's checked values changed |

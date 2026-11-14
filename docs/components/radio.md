---
title: Radio
---

<script setup>
import BasicVue from '../demos/radio/Basic.vue';
import basicVueCode from '../demos/radio/Basic.vue?raw';
import BasicTsx from '../demos/radio/Basic.tsx';
import basicTsxCode from '../demos/radio/Basic.tsx?raw';
import GroupVue from '../demos/radio/Group.vue';
import groupVueCode from '../demos/radio/Group.vue?raw';
import GroupTsx from '../demos/radio/Group.tsx';
import groupTsxCode from '../demos/radio/Group.tsx?raw';
</script>

# Radio

To pick exactly one option from a set. Use RadioGroup for a set of radios
bound to a single selected value.

## Basic

Bind the checked state with `v-model` (Vue) or `checked` + `onChange`
(React). The `label` prop renders the text; a default slot / children take
precedence for richer content.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## RadioGroup

Give RadioGroup `options` and bind the selected value with `v-model`
(Vue) or `value` + `onChange` (React). Individual options can be `disabled`,
and the group-level `disabled` mutes every radio. Radios inside a group share
a `name` (generated automatically unless you pass one) so the native radio
semantics apply.

<DemoBlock :vue-demo="GroupVue" :vue-code="groupVueCode" :react-demo="GroupTsx" :react-code="groupTsxCode" />

## API

### Props

**Radio**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `checked` *(React)* | `boolean` | `false` | Checked state (standalone usage) |
| label | `string` | — | Label text — the default slot / children take precedence |
| value | `string \| number` | — | Value used inside a RadioGroup |
| name | `string` | — | Native `name`; provided by RadioGroup when used inside one |
| disabled | `boolean` | `false` | Native disabled state |

Other native attributes (`aria-*`, form attrs, ...) fall through to the
native `<input type="radio">`.

**RadioGroup**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `value` *(React)* | `string \| number \| null` | `null` | Selected value |
| options | `Array<{ label: string; value: string \| number; disabled?: boolean }>` | — | Renders a Radio per option (slot / children are rendered instead when omitted) |
| name | `string` | — | Shared native `name`; generated via `useId` when omitted |
| disabled | `boolean` | `false` | Disables every radio in the group |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Radio label (React: children) — takes precedence over the `label` prop |

### Events

| Event | Description |
| --- | --- |
| update:modelValue *(Vue)* / `onChange(checked, event)` *(React)* | The radio was toggled with the new checked state |
| change *(Vue)* | Same payload as the model update |
| update:modelValue *(Vue)* / `onChange(value)` *(React, group)* | The group's selected value changed |

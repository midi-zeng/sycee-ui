---
title: Select
---

<script setup>
import BasicVue from '../demos/select/Basic.vue';
import basicVueCode from '../demos/select/Basic.vue?raw';
import BasicTsx from '../demos/select/Basic.tsx';
import basicTsxCode from '../demos/select/Basic.tsx?raw';
import ClearableVue from '../demos/select/Clearable.vue';
import clearableVueCode from '../demos/select/Clearable.vue?raw';
import ClearableTsx from '../demos/select/Clearable.tsx';
import clearableTsxCode from '../demos/select/Clearable.tsx?raw';
import StatesVue from '../demos/select/States.vue';
import statesVueCode from '../demos/select/States.vue?raw';
import StatesTsx from '../demos/select/States.tsx';
import statesTsxCode from '../demos/select/States.tsx?raw';
</script>

# Select

To pick a single value from a list of options. The Sycee Select implements the
combobox pattern with a keyboard-accessible listbox, a clear button and
viewport-aware dropdown flipping.

## Basic

Pass `options` (`{ label, value, disabled? }`) and bind the selected value
with `v-model` (Vue) or `value` + `onChange` (React). The selected label is
shown in the trigger.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Clearable

`clearable` shows a clear button in the trigger while a value is selected;
clearing sets the value to `null` and fires `clear`.

<DemoBlock :vue-demo="ClearableVue" :vue-code="clearableVueCode" :react-demo="ClearableTsx" :react-code="clearableTsxCode" />

## Sizes, status and disabled

`size` controls the trigger height (`sm`, `md`, `lg`); `status="error"` /
`status="warning"` tint the trigger for validation feedback. Options can carry
`disabled: true` to be unselectable, and the whole select can be `disabled`.

<DemoBlock :vue-demo="StatesVue" :vue-code="statesVueCode" :react-demo="StatesTsx" :react-code="statesTsxCode" />

## Keyboard support

The trigger is a `role="combobox"` button wired to a `role="listbox"` of
`role="option"` items: Enter, Space or ArrowDown opens the dropdown;
ArrowUp/ArrowDown move the active option (wrapping around), Home/End jump to
the ends, Enter selects the active option and Escape closes. Focus stays on
the trigger while the list is open, the dropdown flips above the trigger when
there is not enough room below, and it closes on outside click or `Tab`.

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model *(Vue)* / `value` *(React)* | `string \| number \| null` | `null` | Selected value |
| options | `Array<{ label: string; value: string \| number; disabled?: boolean }>` | `[]` | Dropdown options |
| placeholder | `string` | — | Shown in the trigger while no value is selected |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger height |
| status | `'default' \| 'error' \| 'warning'` | `'default'` | Validation state |
| clearable | `boolean` | `false` | Clear button in the trigger while a value is selected |
| disabled | `boolean` | `false` | Disables the trigger |

### Slots / children

None — the Select is configured entirely through props.

### Events

| Event | Description |
| --- | --- |
| update:modelValue *(Vue)* / `onChange(value)` *(React)* | An option was selected or the value was cleared (`null`) |
| change *(Vue)* / `onChange(value)` *(React)* | Fired together with the model update |
| clear *(Vue)* / `onClear` *(React)* | The clear button was pressed |

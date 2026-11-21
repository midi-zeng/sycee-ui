---
title: Cascader
---

<script setup>
import BasicVue from '../demos/cascader/Basic.vue';
import basicVueCode from '../demos/cascader/Basic.vue?raw';
import BasicTsx from '../demos/cascader/Basic.tsx';
import basicTsxCode from '../demos/cascader/Basic.tsx?raw';
</script>

# Cascader

Pick a leaf value from nested options across expanding columns.

## Basic

Clicking a branch expands the next column; clicking a leaf commits the full
path as an array of values (root → leaf).

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value *(Vue `v-model`)* / `value` *(React)* | `Array<string \| number> \| null` | — | Selected path of values |
| options | `Array<{ label, value, children?, disabled? }>` | — | Source options |
| clearable | `boolean` | `false` | Shows a clear button when a path is selected |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger field size |
| status | `'default' \| 'error' \| 'warning'` | `'default'` | Validation color |
| disabled / placeholder | — | — | Trigger behavior |

The trigger shows the joined labels of the selected path. Each column is a
`role="listbox"` and each option a `role="option"`.

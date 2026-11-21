---
title: Tree
---

<script setup>
import BasicVue from '../demos/tree/Basic.vue';
import basicVueCode from '../demos/tree/Basic.vue?raw';
import BasicTsx from '../demos/tree/Basic.tsx';
import basicTsxCode from '../demos/tree/Basic.tsx?raw';
</script>

# Tree

A hierarchical list with expand/collapse, single selection and cascading
checkboxes.

## Basic

Set `checkable` to add checkboxes; checking a node checks all descendants and
parents reflect the state of their children (mixed shows as indeterminate).

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| data | `Array<{ key, label, children?, disabled? }>` | — | Tree source data |
| checkable | `boolean` | `false` | Shows checkboxes with cascade semantics |
| selectable | `boolean` | `true` | Highlights the clicked node |
| expandedKeys *(React controlled)* / events *(Vue)* | `Array<key>` | — | Expanded node keys |
| checkedKeys *(React controlled)* / events *(Vue)* | `Array<key>` | — | Checked node keys |
| selectedKey *(React controlled)* / event *(Vue)* | `key \| null` | — | Selected node key |

### Events *(Vue)* / callbacks *(React)*

| Event | Description |
| --- | --- |
| expandedChange / `onExpandedChange` | Expanded keys changed |
| checkedChange / `onCheckedChange` | Checked keys changed (cascaded) |
| select / `onSelect` | Selected node changed |

Keyboard: Enter/Space selects, ArrowRight/Left expand or collapse. The tree is
`role="tree"` with `role="treeitem"` nodes carrying
`aria-expanded`/`aria-selected`/`aria-checked`.

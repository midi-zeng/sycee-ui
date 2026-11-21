---
title: Steps
---

<script setup>
import BasicVue from '../demos/steps/Basic.vue';
import basicVueCode from '../demos/steps/Basic.vue?raw';
import BasicTsx from '../demos/steps/Basic.tsx';
import basicTsxCode from '../demos/steps/Basic.tsx?raw';
</script>

# Steps

A horizontal progress indicator for multi-step flows.

## Basic

Completed steps show a check mark; the active step is highlighted. Providing a
`change` handler (React: `onChange`) makes steps clickable.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `Array<{ label, description?, disabled? }>` | — | Ordered steps |
| active | `number` | `0` | Index of the current step |

### Events

| Event | Description |
| --- | --- |
| change *(Vue)* / `onChange` *(React)* | A clickable step was selected (Enter/Space work too) |

The active item carries `aria-current="step"`.

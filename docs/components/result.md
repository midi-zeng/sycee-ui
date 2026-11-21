---
title: Result
---

<script setup>
import BasicVue from '../demos/result/Basic.vue';
import basicVueCode from '../demos/result/Basic.vue?raw';
import BasicTsx from '../demos/result/Basic.tsx';
import basicTsxCode from '../demos/result/Basic.tsx?raw';
</script>

# Result

A page-level outcome panel for finished processes.

## Basic

Pick a `status` for the icon and color; the default slot (React: children)
renders actions below the text.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| status | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Outcome kind; picks the icon and color |
| title | `string` *(Vue)* / `ReactNode` *(React)* | — | Result headline |
| description | `string` *(Vue)* / `ReactNode` *(React)* | — | Supporting text below the title |
| icon *(Vue slot / React prop)* | — | — | Custom icon replacing the default |

The result carries `role="status"` so state changes are announced.

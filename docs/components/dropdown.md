---
title: Dropdown
---

<script setup>
import BasicVue from '../demos/dropdown/Basic.vue';
import basicVueCode from '../demos/dropdown/Basic.vue?raw';
import BasicTsx from '../demos/dropdown/Basic.tsx';
import basicTsxCode from '../demos/dropdown/Basic.tsx?raw';
</script>

# Dropdown

A click-triggered menu portal-rendered below the trigger element.

## Basic

Items fire `select` (React: `onSelect`) and close the menu; dividers use the
`divider` flag. Esc and outside clicks close the menu.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `Array<{ label, value?, disabled?, divider? }>` | — | Menu items |
| open *(React controlled)* | `boolean` | — | Open state |
| defaultOpen | `boolean` | `false` | Uncontrolled initial state |
| disabled | `boolean` | `false` | Disables the dropdown |

### Events

| Event | Description |
| --- | --- |
| select *(Vue)* / `onSelect` *(React)* | An enabled item was picked |
| openChange *(Vue)* / `onOpenChange` *(React)* | The open state changed |

The menu is `role="menu"` and the trigger carries `aria-haspopup="menu"` /
`aria-expanded`.

---
title: Popconfirm
---

<script setup>
import BasicVue from '../demos/popconfirm/Basic.vue';
import basicVueCode from '../demos/popconfirm/Basic.vue?raw';
import BasicTsx from '../demos/popconfirm/Basic.tsx';
import basicTsxCode from '../demos/popconfirm/Basic.tsx?raw';
</script>

# Popconfirm

A lightweight confirmation bubble attached to any trigger — ideal for
destructive actions where a full modal is too heavy.

## Basic

Click the trigger to toggle the bubble; Esc, outside clicks, or either button
close it. Use `danger` to render the confirm button in the danger color.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | — | Headline shown as the question |
| content | `string` | — | Supporting text below the title |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Flips when it would overflow the viewport |
| okText / cancelText | `string` | `'OK'` / `'Cancel'` | Button labels |
| danger | `boolean` | `false` | Danger-colored confirm button |
| disabled | `boolean` | `false` | Disables the popconfirm |

### Events

| Event | Description |
| --- | --- |
| confirm / `onConfirm` | The confirm button was pressed; the bubble closes |
| cancel / `onCancel` | The cancel button (or Esc/outside click) dismissed it |

---
title: Alert
---

<script setup>
import BasicVue from '../demos/alert/Basic.vue';
import basicVueCode from '../demos/alert/Basic.vue?raw';
import BasicTsx from '../demos/alert/Basic.tsx';
import basicTsxCode from '../demos/alert/Basic.tsx?raw';
import DescriptionVue from '../demos/alert/Description.vue';
import descriptionVueCode from '../demos/alert/Description.vue?raw';
import DescriptionTsx from '../demos/alert/Description.tsx';
import descriptionTsxCode from '../demos/alert/Description.tsx?raw';
import ClosableVue from '../demos/alert/Closable.vue';
import closableVueCode from '../demos/alert/Closable.vue?raw';
import ClosableTsx from '../demos/alert/Closable.tsx';
import closableTsxCode from '../demos/alert/Closable.tsx?raw';
</script>

# Alert

A banner for contextual feedback — outcomes, warnings and state changes that
belong in the page flow.

## Basic

Four types, each with its own color and default icon.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Title and description

The default slot (React: children) is the description rendered below the
title. An alert without a title shows the description alone; `showIcon={false}`
hides the type icon.

<DemoBlock :vue-demo="DescriptionVue" :vue-code="descriptionVueCode" :react-demo="DescriptionTsx" :react-code="descriptionTsxCode" />

## Closable and custom icon

`closable` adds a close button; the alert removes itself after closing and
emits `close` (React: `onClose`). The `icon` slot (React: `icon` prop) replaces
the default type icon.

<DemoBlock :vue-demo="ClosableVue" :vue-code="closableVueCode" :react-demo="ClosableTsx" :react-code="closableTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Kind of alert; picks the color and default icon |
| title | `string` *(Vue)* / `ReactNode` *(React)* | — | Alert title |
| showIcon | `boolean` | `true` | Shows the type icon |
| closable | `boolean` | `false` | Shows a close button; the alert hides itself after closing |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Description below the title (React: children) |
| title *(Vue)* | Title, overrides the `title` prop (React: pass a node to the `title` prop) |
| icon *(Vue)* / `icon` prop *(React)* | Custom icon replacing the default type icon |

### Events

| Event | Description |
| --- | --- |
| close | The close button was pressed — fired right before the alert is removed |

The alert carries `role="alert"` so assistive technology announces it.

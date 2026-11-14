---
title: Empty
---

<script setup>
import BasicVue from '../demos/empty/Basic.vue';
import basicVueCode from '../demos/empty/Basic.vue?raw';
import BasicTsx from '../demos/empty/Basic.tsx';
import basicTsxCode from '../demos/empty/Basic.tsx?raw';
import CustomVue from '../demos/empty/Custom.vue';
import customVueCode from '../demos/empty/Custom.vue?raw';
import CustomTsx from '../demos/empty/Custom.tsx';
import customTsxCode from '../demos/empty/Custom.tsx?raw';
</script>

# Empty

A placeholder for empty states — a subtle illustration plus a description.

## Basic

`description` defaults to "No data".

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Custom description and image

The `image` slot (React: `image` prop) replaces the illustration, and the
default slot replaces the description — useful for rich content such as an
action button.

<DemoBlock :vue-demo="CustomVue" :vue-code="customVueCode" :react-demo="CustomTsx" :react-code="customTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `'No data'` | Description text below the illustration |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Replaces the description — can hold rich content like actions (React: children) |
| image *(Vue)* / `image` prop *(React)* | Custom illustration rendered instead of the default one |

The default illustration is decorative (`aria-hidden`).

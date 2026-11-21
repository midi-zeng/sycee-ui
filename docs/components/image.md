---
title: Image
---

<script setup>
import BasicVue from '../demos/image/Basic.vue';
import basicVueCode from '../demos/image/Basic.vue?raw';
import BasicTsx from '../demos/image/Basic.tsx';
import basicTsxCode from '../demos/image/Basic.tsx?raw';
</script>

# Image

An image with loading and error states plus an optional fullscreen preview.

## Basic

While loading a spinner overlays the box; a failed load replaces the image
with a centered fallback.
Clicking a successfully loaded image (with `preview`) opens a fullscreen
viewer — close it with the button, a mask click, or Escape.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | — | Image source |
| alt | `string` | — | Alternative text |
| width / height | `number \| string` | — | Inline box size |
| preview | `boolean` | `true` | Enables the fullscreen preview on click |
| errorText | `string` | `'Preview unavailable'` | Text shown on load failure |

The viewer is `role="dialog"` with `aria-modal="true"`; focus moves in on open
and returns to the trigger on close.

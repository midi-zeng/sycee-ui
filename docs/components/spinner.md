---
title: Spinner
---

<script setup>
import BasicVue from '../demos/spinner/Basic.vue';
import basicVueCode from '../demos/spinner/Basic.vue?raw';
import BasicTsx from '../demos/spinner/Basic.tsx';
import basicTsxCode from '../demos/spinner/Basic.tsx?raw';
import SizesVue from '../demos/spinner/Sizes.vue';
import sizesVueCode from '../demos/spinner/Sizes.vue?raw';
import SizesTsx from '../demos/spinner/Sizes.tsx';
import sizesTsxCode from '../demos/spinner/Sizes.tsx?raw';
import LabelVue from '../demos/spinner/Label.vue';
import labelVueCode from '../demos/spinner/Label.vue?raw';
import LabelTsx from '../demos/spinner/Label.tsx';
import labelTsxCode from '../demos/spinner/Label.tsx?raw';
</script>

# Spinner

An indeterminate loading indicator for waiting states where progress cannot be
quantified.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Sizes and colors

`size` accepts a named size (`sm`, `md` default, `lg`) or a pixel number.
`color` accepts any of the five theme colors (default `primary`).

<DemoBlock :vue-demo="SizesVue" :vue-code="sizesVueCode" :react-demo="SizesTsx" :react-code="sizesTsxCode" />

## Label

`label` renders a visible caption below the circle and doubles as the
accessible name; without it the spinner is announced as "Loading".

<DemoBlock :vue-demo="LabelVue" :vue-code="labelVueCode" :react-demo="LabelTsx" :react-code="labelTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `number \| 'sm' \| 'md' \| 'lg'` | `'md'` | Pixel size or named size |
| color | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Spinner color |
| label | `string` | — | Visible label below the circle; doubles as the accessible name |

The spinner carries `role="status"` with `aria-label` set to the `label` (or
"Loading" by default).

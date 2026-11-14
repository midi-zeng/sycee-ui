---
title: Divider
---

<script setup>
import BasicVue from '../demos/divider/Basic.vue';
import basicVueCode from '../demos/divider/Basic.vue?raw';
import BasicTsx from '../demos/divider/Basic.tsx';
import basicTsxCode from '../demos/divider/Basic.tsx?raw';
import VariantsVue from '../demos/divider/Variants.vue';
import variantsVueCode from '../demos/divider/Variants.vue?raw';
import VariantsTsx from '../demos/divider/Variants.tsx';
import variantsTsxCode from '../demos/divider/Variants.tsx?raw';
import VerticalVue from '../demos/divider/Vertical.vue';
import verticalVueCode from '../demos/divider/Vertical.vue?raw';
import VerticalTsx from '../demos/divider/Vertical.tsx';
import verticalTsxCode from '../demos/divider/Vertical.tsx?raw';
</script>

# Divider

A thin separator line between sections of content, optionally carrying a
label.

## Basic

The default slot renders a label centered on the line.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Label placement and dashed

`labelPlacement` aligns the label to `left`, `center` (default) or `right`;
`dashed` switches the line to a dashed stroke.

<DemoBlock :vue-demo="VariantsVue" :vue-code="variantsVueCode" :react-demo="VariantsTsx" :react-code="variantsTsxCode" />

## Vertical

With `vertical` the divider renders as a short inline line — no label —
suitable for separating inline items.

<DemoBlock :vue-demo="VerticalVue" :vue-code="verticalVueCode" :react-demo="VerticalTsx" :react-code="verticalTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| vertical | `boolean` | `false` | Renders as a vertical line (inline element, no label) |
| dashed | `boolean` | `false` | Dashed line style |
| labelPlacement | `'left' \| 'center' \| 'right'` | `'center'` | Horizontal label alignment |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Label text rendered on the line — horizontal dividers only (React: children) |

Horizontal dividers use `role="separator"`; vertical dividers are
`aria-hidden`.

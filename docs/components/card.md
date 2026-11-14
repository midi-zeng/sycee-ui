---
title: Card
---

<script setup>
import BasicVue from '../demos/card/Basic.vue';
import basicVueCode from '../demos/card/Basic.vue?raw';
import BasicTsx from '../demos/card/Basic.tsx';
import basicTsxCode from '../demos/card/Basic.tsx?raw';
import VariantsVue from '../demos/card/Variants.vue';
import variantsVueCode from '../demos/card/Variants.vue?raw';
import VariantsTsx from '../demos/card/Variants.tsx';
import variantsTsxCode from '../demos/card/Variants.tsx?raw';
import SlotsVue from '../demos/card/Slots.vue';
import slotsVueCode from '../demos/card/Slots.vue?raw';
import SlotsTsx from '../demos/card/Slots.tsx';
import slotsTsxCode from '../demos/card/Slots.tsx?raw';
</script>

# Card

A bordered surface that groups related content and actions, with an optional
header (title + extra) and footer.

## Basic

The header renders when a `title` (or `extra`) is present. The default slot is
the body.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Hoverable, borderless and padding

`hoverable` adds a shadow on hover, `borderless` removes the border, and
`padding` (on by default) controls whether the body keeps its padding —
turn it off for full-bleed content like images or tables.

<DemoBlock :vue-demo="VariantsVue" :vue-code="variantsVueCode" :react-demo="VariantsTsx" :react-code="variantsTsxCode" />

## Extra and footer

The header has an `extra` area on the opposite side of the title, and the
`footer` renders below the body, separated by the card border. In Vue they are
slots; in React they are props.

<DemoBlock :vue-demo="SlotsVue" :vue-code="slotsVueCode" :react-demo="SlotsTsx" :react-code="slotsTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` *(Vue)* / `ReactNode` *(React)* | — | Card title; renders a header when present |
| hoverable | `boolean` | `false` | Elevates the card with a shadow on hover |
| borderless | `boolean` | `false` | Hides the card border |
| padding | `boolean` | `true` | Whether the body keeps its padding |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Card body (React: children) |
| title *(Vue)* | Card title, overrides the `title` prop (React: pass a node to the `title` prop) |
| extra *(Vue)* / `extra` prop *(React)* | Header area on the opposite side of the title |
| footer *(Vue)* / `footer` prop *(React)* | Content rendered below the body, separated by the border |

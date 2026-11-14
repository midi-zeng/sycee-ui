---
title: Button
---

<script setup>
import BasicVue from '../demos/button/Basic.vue';
import basicVueCode from '../demos/button/Basic.vue?raw';
import BasicTsx from '../demos/button/Basic.tsx';
import basicTsxCode from '../demos/button/Basic.tsx?raw';
import VariantsVue from '../demos/button/Variants.vue';
import variantsVueCode from '../demos/button/Variants.vue?raw';
import VariantsTsx from '../demos/button/Variants.tsx';
import variantsTsxCode from '../demos/button/Variants.tsx?raw';
import StatesVue from '../demos/button/States.vue';
import statesVueCode from '../demos/button/States.vue?raw';
import StatesTsx from '../demos/button/States.tsx';
import statesTsxCode from '../demos/button/States.tsx?raw';
</script>

# Button

To trigger an operation. The Sycee Button offers five colors and five variants
on every size, all sharing the same accessible focus and loading behavior.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Variants

Five variants × five colors. `solid` for primary actions, `soft` for secondary,
`outline`/`ghost` for tertiary, `link` for inline actions.

<DemoBlock :vue-demo="VariantsVue" :vue-code="variantsVueCode" :react-demo="VariantsTsx" :react-code="variantsTsxCode" />

## Sizes and states

Use `size` for control height (`sm` 28px, `md` 36px, `lg` 42px). `loading`
replaces the content icon with a spinner and blocks clicks; `disabled` mutes
the button; `block` stretches it to the parent width.

<DemoBlock :vue-demo="StatesVue" :vue-code="statesVueCode" :react-demo="StatesTsx" :react-code="statesTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| color | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Visual color |
| variant | `'solid' \| 'soft' \| 'outline' \| 'ghost' \| 'link'` | `'solid'` | Visual variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| loading | `boolean` | `false` | Show spinner, block interaction |
| disabled | `boolean` | `false` | Native disabled state |
| block | `boolean` | `false` | Stretch to parent width |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Button label (React: children) |
| icon *(Vue)* / children *(React)* | Leading icon — pass an `<Icon />` |

### Events

| Event | Description |
| --- | --- |
| click | Native click (suppressed while loading) |

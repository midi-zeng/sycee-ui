---
title: Tag
---

<script setup>
import BasicVue from '../demos/tag/Basic.vue';
import basicVueCode from '../demos/tag/Basic.vue?raw';
import BasicTsx from '../demos/tag/Basic.tsx';
import basicTsxCode from '../demos/tag/Basic.tsx?raw';
import VariantsVue from '../demos/tag/Variants.vue';
import variantsVueCode from '../demos/tag/Variants.vue?raw';
import VariantsTsx from '../demos/tag/Variants.tsx';
import variantsTsxCode from '../demos/tag/Variants.tsx?raw';
import ClosableVue from '../demos/tag/Closable.vue';
import closableVueCode from '../demos/tag/Closable.vue?raw';
import ClosableTsx from '../demos/tag/Closable.tsx';
import closableTsxCode from '../demos/tag/Closable.tsx?raw';
</script>

# Tag

For statuses, labels and small categorizations. Tags come in five colors and
three variants, with an optional close button.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Colors and variants

Five colors x three variants. `soft` is the default; `solid` for emphasis,
`outline` for a lighter look.

<DemoBlock :vue-demo="VariantsVue" :vue-code="variantsVueCode" :react-demo="VariantsTsx" :react-code="variantsTsxCode" />

## Closable, sizes and icons

`closable` shows a close button (the tag does not remove itself — listen for
`close` and update your own state). `size="sm"` shrinks the tag, `disabled`
mutes the close button, and an icon can be placed before the content via the
`icon` slot (Vue) or `icon` prop (React).

<DemoBlock :vue-demo="ClosableVue" :vue-code="closableVueCode" :react-demo="ClosableTsx" :react-code="closableTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| color | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Visual color |
| variant | `'soft' \| 'solid' \| 'outline'` | `'soft'` | Visual variant |
| size | `'sm' \| 'md'` | `'md'` | Tag size |
| closable | `boolean` | `false` | Shows a close button |
| disabled | `boolean` | `false` | Disables the close button |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Tag content (React: children) |
| icon *(Vue)* / `icon` prop *(React)* | Leading icon — pass an `<Icon />` |

### Events

| Event | Description |
| --- | --- |
| close | The close button was pressed — the tag is not removed automatically |

The close button carries `aria-label="Remove"` for screen readers.

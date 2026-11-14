---
title: Tabs
---

<script setup>
import BasicVue from '../demos/tabs/Basic.vue';
import basicVueCode from '../demos/tabs/Basic.vue?raw';
import BasicTsx from '../demos/tabs/Basic.tsx';
import basicTsxCode from '../demos/tabs/Basic.tsx?raw';
import SizesVue from '../demos/tabs/Sizes.vue';
import sizesVueCode from '../demos/tabs/Sizes.vue?raw';
import SizesTsx from '../demos/tabs/Sizes.tsx';
import sizesTsxCode from '../demos/tabs/Sizes.tsx?raw';
import DisabledVue from '../demos/tabs/Disabled.vue';
import disabledVueCode from '../demos/tabs/Disabled.vue?raw';
import DisabledTsx from '../demos/tabs/Disabled.tsx';
import disabledTsxCode from '../demos/tabs/Disabled.tsx?raw';
import ControlledVue from '../demos/tabs/Controlled.vue';
import controlledVueCode from '../demos/tabs/Controlled.vue?raw';
import ControlledTsx from '../demos/tabs/Controlled.tsx';
import controlledTsxCode from '../demos/tabs/Controlled.tsx?raw';
</script>

# Tabs

To switch between related views in place. The nav is a `role="tablist"` of
buttons with an animated underline indicator; pane content is optional, so
tabs double as a nav-only segmented control.

## Basic

Define tabs with `items` (`{ label, value, content? }`). When any item has
`content`, the active item's pane renders below the nav.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Sizes

Use `size` for the tab height (`sm` 34px, `md` 40px, `lg` 46px). The
indicator adapts to the active tab automatically.

<DemoBlock :vue-demo="SizesVue" :vue-code="sizesVueCode" :react-demo="SizesTsx" :react-code="sizesTsxCode" />

## Disabled tabs

`disabled: true` mutes a tab; clicks are ignored and keyboard navigation
skips it.

<DemoBlock :vue-demo="DisabledVue" :vue-code="disabledVueCode" :react-demo="DisabledTsx" :react-code="disabledTsxCode" />

## Controlled active value

Pass `v-model:active` (Vue) or `active` + `onChange` (React) to own the
state. Without `content` the component renders nav only, like a segmented
control.

<DemoBlock :vue-demo="ControlledVue" :vue-code="controlledVueCode" :react-demo="ControlledTsx" :react-code="controlledTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| active | `string \| number` | first enabled tab | Value of the active tab — `v-model:active` in Vue |
| items | `TabItem[]` | — | Tab definitions: `{ label, value, disabled?, content? }` |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height |

### Slots / children

Tabs has no slots — pane content is provided through each item's `content`
field.

### Events

| Event | Description |
| --- | --- |
| change | The active tab changed — receives the new `value` (also fires alongside `v-model:active`) |

Accessibility: tabs carry `role="tab"` and `aria-selected`, panes are
`role="tabpanel"`. ArrowLeft/ArrowRight move focus among enabled tabs,
Home/End jump to the first/last one, and Enter/Space activate the focused
tab.

---
title: Table
---

<script setup>
import BasicVue from '../demos/table/Basic.vue';
import basicVueCode from '../demos/table/Basic.vue?raw';
import BasicTsx from '../demos/table/Basic.tsx';
import basicTsxCode from '../demos/table/Basic.tsx?raw';
import RenderVue from '../demos/table/Render.vue';
import renderVueCode from '../demos/table/Render.vue?raw';
import RenderTsx from '../demos/table/Render.tsx';
import renderTsxCode from '../demos/table/Render.tsx?raw';
import StripedVue from '../demos/table/Striped.vue';
import stripedVueCode from '../demos/table/Striped.vue?raw';
import StripedTsx from '../demos/table/Striped.tsx';
import stripedTsxCode from '../demos/table/Striped.tsx?raw';
import EmptyVue from '../demos/table/Empty.vue';
import emptyVueCode from '../demos/table/Empty.vue?raw';
import EmptyTsx from '../demos/table/Empty.tsx';
import emptyTsxCode from '../demos/table/Empty.tsx?raw';
import LoadingVue from '../demos/table/Loading.vue';
import loadingVueCode from '../demos/table/Loading.vue?raw';
import LoadingTsx from '../demos/table/Loading.tsx';
import loadingTsxCode from '../demos/table/Loading.tsx?raw';
</script>

# Table

To render structured rows of data. Each cell reads `row[column.key]` by
default; a per-column `render` function takes over wherever you need custom
content.

## Basic

Columns map a row field through `key` — `align` centers or right-aligns a
column, `width` fixes its size (numbers are pixels).

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Render functions

`render(row, index)` replaces the default stringified cell. The status
column renders a `Tag`, the salary column a formatted string. In Vue,
build the node with `h(Tag, props, () => text)`.

<DemoBlock :vue-demo="RenderVue" :vue-code="renderVueCode" :react-demo="RenderTsx" :react-code="renderTsxCode" />

## Striped and bordered

`striped` shades even rows, `bordered` draws borders between all cells —
they combine.

<DemoBlock :vue-demo="StripedVue" :vue-code="stripedVueCode" :react-demo="StripedTsx" :react-code="stripedTsxCode" />

## Empty state

With no rows the table shows "No data". Override it with the `empty` slot
(Vue) or the `empty` prop (React).

<DemoBlock :vue-demo="EmptyVue" :vue-code="emptyVueCode" :react-demo="EmptyTsx" :react-code="emptyTsxCode" />

## Loading

`loading` overlays the table with a spinner and sets `aria-busy`; the rows
stay visible underneath.

<DemoBlock :vue-demo="LoadingVue" :vue-code="loadingVueCode" :react-demo="LoadingTsx" :react-code="loadingTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| columns | `TableColumn[]` | — | Column definitions: `{ key, title, width?, align?, render? }` |
| data | `Array<Record<string, unknown>>` | — | Row data; each cell reads `row[column.key]` |
| striped | `boolean` | `false` | Alternating striped rows |
| bordered | `boolean` | `false` | Borders around all cells |
| loading | `boolean` | `false` | Loading overlay with a spinner |
| rowKey | `(row, index) => string \| number` | row index | Returns a stable key for each row |

### Slots / children

| Slot | Description |
| --- | --- |
| empty *(Vue)* / `empty` prop *(React)* | Content for the no-rows state — defaults to "No data" |

### Events

None — the table is fully driven by the `columns` and `data` props.

Headers carry `scope="col"`. Render output is used as-is when it is a valid
node (React: `ReactNode`, Vue: `VNodeChild`) and stringified via `String()`
otherwise.

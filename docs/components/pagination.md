---
title: Pagination
---

<script setup>
import BasicVue from '../demos/pagination/Basic.vue';
import basicVueCode from '../demos/pagination/Basic.vue?raw';
import BasicTsx from '../demos/pagination/Basic.tsx';
import basicTsxCode from '../demos/pagination/Basic.tsx?raw';
import PageSizeVue from '../demos/pagination/PageSize.vue';
import pageSizeVueCode from '../demos/pagination/PageSize.vue?raw';
import PageSizeTsx from '../demos/pagination/PageSize.tsx';
import pageSizeTsxCode from '../demos/pagination/PageSize.tsx?raw';
import SiblingCountVue from '../demos/pagination/SiblingCount.vue';
import siblingCountVueCode from '../demos/pagination/SiblingCount.vue?raw';
import SiblingCountTsx from '../demos/pagination/SiblingCount.tsx';
import siblingCountTsxCode from '../demos/pagination/SiblingCount.tsx?raw';
import DisabledVue from '../demos/pagination/Disabled.vue';
import disabledVueCode from '../demos/pagination/Disabled.vue?raw';
import DisabledTsx from '../demos/pagination/Disabled.tsx';
import disabledTsxCode from '../demos/pagination/Disabled.tsx?raw';
</script>

# Pagination

To split a long list into pages. Prev/next arrows sit next to the numeric
pages, with ellipsis markers collapsing out-of-range pages; the current page
is announced with `aria-current="page"`.

## Basic

`total` is the number of items — with the default `pageSize` of 10, 50 items
render 5 pages.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Page size

`pageSize` defaults to 10, so `total=100` renders 10 pages. Raising it to 25
collapses the range to 4.

<DemoBlock :vue-demo="PageSizeVue" :vue-code="pageSizeVueCode" :react-demo="PageSizeTsx" :react-code="pageSizeTsxCode" />

## Sibling count

`siblingCount` controls how many pages render on each side of the current
one. The three rows below share one `page` state with `siblingCount` 1, 2
and 3 — with 3 the full range fits and no ellipsis is needed.

<DemoBlock :vue-demo="SiblingCountVue" :vue-code="siblingCountVueCode" :react-demo="SiblingCountTsx" :react-code="siblingCountTsxCode" />

## Disabled

`disabled` blocks every control, including the arrows.

<DemoBlock :vue-demo="DisabledVue" :vue-code="disabledVueCode" :react-demo="DisabledTsx" :react-code="disabledTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| page | `number` | `1` | Current page — `v-model:page` in Vue |
| total | `number` | — | Total number of items |
| pageSize | `number` | `10` | Items per page |
| siblingCount | `number` | `1` | Pages rendered on each side of the current page |
| disabled | `boolean` | `false` | Disables every control |

### Slots / children

Pagination has no slots or children.

### Events

| Event | Description |
| --- | --- |
| change | A new page was selected — receives the page number (also fires alongside `v-model:page`) |

The root renders a `nav` with `aria-label="Pagination"`; the current page
carries `aria-current="page"`.

---
title: InfiniteScroll
---

<script setup>
import BasicVue from '../demos/infinite-scroll/Basic.vue';
import basicVueCode from '../demos/infinite-scroll/Basic.vue?raw';
import BasicTsx from '../demos/infinite-scroll/Basic.tsx';
import basicTsxCode from '../demos/infinite-scroll/Basic.tsx?raw';
import ErrorVue from '../demos/infinite-scroll/Error.vue';
import errorVueCode from '../demos/infinite-scroll/Error.vue?raw';
import ErrorTsx from '../demos/infinite-scroll/Error.tsx';
import errorTsxCode from '../demos/infinite-scroll/Error.tsx?raw';
</script>

# InfiniteScroll

A composable infinite-loading container for long lists. It watches a sentinel
near the end of the content and calls `loadMore` when another page should be
requested. Pass `height` to scroll inside a fixed container, or omit it to use
the page viewport.

## Basic

Keep `loading` true while the request is in flight and set `finished` when the
data source is exhausted. The observer reconnects after loading completes, so
a short first page continues loading until it fills the viewport.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Error and retry

When `error` is true, observation pauses and a retry button emits `loadMore`
again. Clear `error` when retrying and restore it if the request fails.

<DemoBlock :vue-demo="ErrorVue" :vue-code="errorVueCode" :react-demo="ErrorTsx" :react-code="errorTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `false` | Shows loading state and suspends observation |
| finished | `boolean` | `false` | Shows the end state and stops observing |
| error | `boolean` | `false` | Shows the error state and a retry button |
| disabled | `boolean` | `false` | Stops observing without changing the status UI |
| distance | `number` | `120` | Pixel distance before the sentinel that starts loading |
| height | `number \| string` | — | Fixed container height; makes the root scrollable |

### Slots / children

| Slot | Description |
| --- | --- |
| default | List content |
| loading | Custom loading text |
| finished | Custom finished text |
| error | Custom error text; the retry button remains available |

React uses `children` for content and `loadingContent`, `finishedContent` and
`errorContent` nodes for the status text.

### Events

| Event | Description |
| --- | --- |
| loadMore | More content should be requested; also emitted by the retry button |

Set `loading` synchronously when handling `loadMore` to prevent duplicate
requests. A built-in Spinner, localized status text and `aria-busy` communicate
progress; the error state uses `role="alert"`.

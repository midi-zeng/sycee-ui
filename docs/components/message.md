---
title: Message
---

<script setup>
import BasicVue from '../demos/message/Basic.vue';
import basicVueCode from '../demos/message/Basic.vue?raw';
import BasicTsx from '../demos/message/Basic.tsx';
import basicTsxCode from '../demos/message/Basic.tsx?raw';
import DurationVue from '../demos/message/Duration.vue';
import durationVueCode from '../demos/message/Duration.vue?raw';
import DurationTsx from '../demos/message/Duration.tsx';
import durationTsxCode from '../demos/message/Duration.tsx?raw';
</script>

# Message

Global feedback for operations — rendered imperatively, so there is no
component to place in your template or JSX. Call the `message` functions and
they render into a shared stack fixed at the top-center of the page.

## Basic

Import `message` from the package and call it from anywhere — event handlers,
effects, stores. The functions render globally; the demo buttons below just
call them.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Duration

`duration` overrides the default 3000 ms. Pass `0` to keep a message until
`message.clear()` is called.

<DemoBlock :vue-demo="DurationVue" :vue-code="durationVueCode" :react-demo="DurationTsx" :react-code="durationTsxCode" />

## API

The package exports a single `message` object per framework
(`@sycee-ui/vue` / `@sycee-ui/react`) with the same signature:

| Method | Signature | Description |
| --- | --- | --- |
| info | `message.info(content, duration?)` | Neutral informational message |
| success | `message.success(content, duration?)` | Positive outcome message |
| warning | `message.warning(content, duration?)` | Warning message |
| danger | `message.danger(content, duration?)` | Error message |
| clear | `message.clear()` | Dismisses all visible messages |

- `content` is a string (Vue also accepts a `VNode`, React any `ReactNode`).
- `duration` is in milliseconds, default `3000`; `0` keeps the message until cleared.
- The stack is capped at 8 messages — the oldest is dropped when the cap is exceeded.

### Accessibility

Messages render into a wrapper with `role="status"` and
`aria-live="polite"`, so screen readers announce them without interrupting the
current reading flow.

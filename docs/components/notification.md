---
title: Notification
---

<script setup>
import BasicVue from '../demos/notification/Basic.vue';
import basicVueCode from '../demos/notification/Basic.vue?raw';
import BasicTsx from '../demos/notification/Basic.tsx';
import basicTsxCode from '../demos/notification/Basic.tsx?raw';
</script>

# Notification

A toast window anchored at the top right of the viewport, driven by an
imperative API — no component import or rendering needed.

## Basic

Notifications stack top-down, stay until dismissed with their close button
(or the `duration` elapses), and are capped at 8 entries.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

```js
notification.info(title, content?, duration?)     // 4500ms default
notification.success(title, content?, duration?)
notification.warning(title, content?, duration?)
notification.danger(title, content?, duration?)
notification.clear()
```

Pass `duration: 0` to disable the auto-close timer. The wrapper carries
`role="status"` / `aria-live="polite"` so entries are announced.

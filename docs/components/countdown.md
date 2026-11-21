---
title: Countdown
---

<script setup>
import BasicVue from '../demos/countdown/Basic.vue';
import basicVueCode from '../demos/countdown/Basic.vue?raw';
import BasicTsx from '../demos/countdown/Basic.tsx';
import basicTsxCode from '../demos/countdown/Basic.tsx?raw';
</script>

# Countdown

Count live time down to a timestamp. The component updates once per second,
stops at zero, and calls `onFinish` / emits `finish` exactly once.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Format tokens

Use `format` to compose any countdown presentation. Supported tokens are
`DD`, `HH`, `mm`, `ss`, plus their single-digit variants `D`, `H`, `m`, `s`.
Separators such as `:` are rendered without accessible announcement noise.

```tsx
<Countdown target={launchAt} format="HH:mm:ss" boxed />
```

```vue
<Countdown :target="launchAt" format="HH:mm:ss" boxed />
```

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| target | `number \| string \| Date` | — | Target timestamp or parseable date |
| format | `string` | `'DD:HH:mm:ss'` | Token pattern |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Text size |
| boxed | `boolean` | `false` | Render digit tiles |
| label | `string` | — | Accessible timer label |

### Events

| Event | Description |
| --- | --- |
| finish / onFinish | Fires once when the remaining time reaches zero |

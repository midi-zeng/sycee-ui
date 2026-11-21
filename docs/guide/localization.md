---
title: Localization
---

# Localization

Sycee UI includes English and Chinese copy for built-in labels, placeholders,
and accessibility text. **English is the default** when no provider is present.

## React

```tsx
import { LocaleProvider, Button, Modal } from '@sycee-ui/react';

export function App() {
  return (
    <LocaleProvider locale="zh">
      <Button>继续</Button>
      <Modal open title="确认操作">内容</Modal>
    </LocaleProvider>
  );
}
```

## Vue

```vue
<script setup lang="ts">
import { LocaleProvider } from '@sycee-ui/vue';
</script>

<template>
  <LocaleProvider locale="zh">
    <slot />
  </LocaleProvider>
</template>
```

## Supported languages

| Locale | Value | Behavior |
| --- | --- | --- |
| English | `en` | Default; built-in English copy |
| Chinese | `zh` | Simplified Chinese copy |

Use `messages` to override individual strings without replacing the entire
dictionary. Date and number formatting can additionally use the locale-aware
helpers from `@sycee-ui/utils`.

---
title: 国际化
---

# 国际化

Sycee UI 为关闭、清空、分页、无数据、日期占位符等内置文案提供英文与简体中文。
不设置 Provider 时默认英文。

## React

```tsx
import { LocaleProvider } from '@sycee-ui/react';

<LocaleProvider locale="zh">{app}</LocaleProvider>;
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

## 语言值

| 语言 | 值 | 行为 |
| --- | --- | --- |
| 英文 | `en` | 默认语言 |
| 简体中文 | `zh` | 使用中文内置文案 |

可以通过 `messages` 覆盖个别文案，而不必替换整个词典。日期和数字格式化还可以
结合 `@sycee-ui/utils` 的 locale 参数使用。

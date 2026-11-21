---
title: Vue 快速开始
---

# Vue 快速开始

安装组件库和共享样式：

```bash
pnpm add @sycee-ui/vue @sycee-ui/styles
```

在应用入口注册全局样式：

```ts
import '@sycee-ui/styles';
```

将应用内容包裹在 `LocaleProvider` 中：

```vue
<script setup lang="ts">
import { Button, LocaleProvider } from '@sycee-ui/vue';
</script>

<template>
  <LocaleProvider locale="zh">
    <Button>保存更改</Button>
  </LocaleProvider>
</template>
```

表单组件使用标准 `v-model`，事件采用 Vue 命名。未设置语言时默认英文。

---
title: React 快速开始
---

# React 快速开始

安装组件库和共享样式：

```bash
pnpm add @sycee-ui/react @sycee-ui/styles
```

引入一次全局样式，然后在应用入口包裹语言上下文：

```tsx
import '@sycee-ui/styles';
import { LocaleProvider, Button } from '@sycee-ui/react';

export function App() {
  return (
    <LocaleProvider locale="zh">
      <Button>保存更改</Button>
    </LocaleProvider>
  );
}
```

组件使用命名导出，支持按需引入和摇树优化。默认语言为英文；只有需要中文时
才传入 `locale="zh"`。

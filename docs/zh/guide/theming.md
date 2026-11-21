---
title: 主题与暗色模式
---

# 主题与暗色模式

Sycee UI 的视觉值都由 CSS 自定义属性提供。在根元素覆盖令牌即可改变品牌色、
圆角、字体和动效：

```css
:root {
  --sy-color-primary: #0f766e;
  --sy-color-primary-hover: #0d9488;
  --sy-radius-md: 10px;
  --sy-ease: cubic-bezier(0.2, 0, 0, 1);
}
```

暗色主题通过 `data-theme="dark"` 启用：

```html
<html data-theme="dark">
```

文档站会跟随 VitePress 的暗色模式，并同步设置 `data-theme`，因此真实组件与
页面主题始终一致。

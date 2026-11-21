---
title: 介绍
---

# 介绍

Sycee UI 是面向 **React** 和 **Vue 3** 的统一组件库。两个框架包共享设计令牌、
类名、视觉输出与交互规范，让跨生态团队无需维护两套设计系统。

## 设计原则

- **一套设计语言，两个框架**：React 与 Vue 的 DOM 结构和类名一致。
- **CSS 变量主题**：颜色、间距、圆角、阴影和动效都可以通过令牌覆盖。
- **可访问性优先**：WAI-ARIA 语义、键盘操作和清晰焦点状态默认可用。
- **严格 TypeScript**：公开 API 提供完整类型和声明文件。
- **默认英文，内置中文**：组件文案可通过 `LocaleProvider` 切换。

## 包结构

| 包 | 说明 |
| --- | --- |
| `@sycee-ui/react` | React 组件、语言上下文和工具重导出 |
| `@sycee-ui/vue` | Vue 3 组件、语言上下文和工具重导出 |
| `@sycee-ui/styles` | SCSS 源码、设计令牌与编译后的 CSS |
| `@sycee-ui/utils` | 框架无关的日期、数字和通用工具 |

## 下一步

- [React 快速开始](./getting-started-react)
- [Vue 快速开始](./getting-started-vue)
- [国际化](./localization)
- [主题与暗色模式](./theming)

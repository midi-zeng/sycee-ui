---
title: Introduction
---

# Introduction

Sycee UI is a unified component library for **React** and **Vue 3**. It ships two
framework packages that share a single design system — the same tokens, the same
class names, the same visual output — so teams working across ecosystems get a
consistent product without maintaining two design systems.

<div class="vp-raw">

<SponsorCard />

</div>

## Why another UI library?

Mainstream libraries each solved part of the problem extremely well. Sycee UI
takes the best idea from each:

| Idea | Borrowed from |
| --- | --- |
| Enterprise-ready, familiar APIs (`size`, `disabled`, `loading`) | Ant Design · Element Plus |
| Theme everything with CSS variables, first-class dark mode | Naive UI · Arco Design |
| Strict TypeScript, inferred-safe public API | Naive UI · Mantine |
| Accessibility-first interaction patterns | Radix UI · Chakra UI |
| Composable, small primitives instead of monoliths | Radix UI · Headless UI |
| One design language across frameworks | (our contribution 🙂) |

## What it is

- **`@sycee-ui/react`** — 24 React components (function components, `forwardRef`, strict types)
- **`@sycee-ui/vue`** — the same 24 components as Vue 3 SFCs with `v-model` and slots
- **`@sycee-ui/styles`** — SCSS source + compiled CSS: design tokens, dark theme, component styles

## What it is not (yet)

- No runtime CSS-in-JS — styling is static SCSS compiled to CSS variables.
- No form framework — components are uncontrolled-friendly and controlled-friendly, but validation is up to you.
- The component set is intentionally compact and pragmatic. Complex components (DatePicker, Tree, virtualized Table) are on the roadmap.

## Browser support

Modern evergreen browsers (ES2020, `:has()`, `color-mix()`). No IE.

## Next steps

- [React quick start](./getting-started-react)
- [Vue quick start](./getting-started-vue)
- [Theming & dark mode](./theming)
- Try it live in the [Playground](/playground/)

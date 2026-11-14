---
title: Theming & Dark Mode
---

# Theming & dark mode

Sycee UI exposes every visual decision as a CSS custom property. Re-brand the
entire library — colors, radii, shadows, motion, control metrics — by overriding
tokens in one place, in either CSS or SCSS.

## Design tokens

The `:root` block in `@sycee-ui/styles` defines the light theme:

```css
:root {
  --sy-color-primary: #6e56cf;
  --sy-color-primary-hover: #7d68d9;
  --sy-color-primary-soft: #f1eefc;
  --sy-color-success: #2fa46c;
  --sy-color-danger: #e5484d;
  --sy-color-warning: #d98e0b;
  --sy-color-text: #1a1c25;
  --sy-color-border: #e4e5ec;
  --sy-radius-md: 8px;
  --sy-height-md: 36px;
  --sy-shadow-lg: 0 4px 8px -4px rgba(16, 17, 26, 0.08),
    0 16px 40px -12px rgba(16, 17, 26, 0.18);
  --sy-duration-base: 200ms;
  --sy-ease: cubic-bezier(0.2, 0, 0, 1);
  /* ...and ~80 more */
}
```

### Override a token

```css
:root {
  /* Make the brand teal, rounder, faster */
  --sy-color-primary: #0d9488;
  --sy-color-primary-hover: #0f9e91;
  --sy-color-primary-active: #0b7f75;
  --sy-color-primary-soft: #e6f5f3;
  --sy-radius-md: 12px;
}
```

All components pick up the change immediately — they never hardcode colors.

## Dark mode

Dark values live under `[data-theme='dark']`. Toggle it by setting the
attribute on `<html>`:

```html
<html data-theme="dark">
```

```ts
// Example toggle
document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
```

The docs site bridges VitePress's own dark toggle to this attribute — try the
toggle in the navbar and watch the demos re-theme.

## Using the SCSS source

The full SCSS source ships in the styles package, so design teams can build a
custom theme file instead of patching CSS:

```scss
// theme.scss
@use '@sycee-ui/styles/scss/index.scss';

:root {
  --sy-color-primary: #2563eb;
}
```

```ts
// main.ts — import your theme instead of the compiled css
import './theme.scss';
```

Files available under `@sycee-ui/styles/scss/`:

| File | Contents |
| --- | --- |
| `index.scss` | Entry: tokens + base + all components |
| `_tokens.scss` | `:root` and `[data-theme='dark']` variables |
| `_mixins.scss` | `sy-focus-ring`, `sy-ellipsis`, `sy-control-base`, `sy-field-base` |
| `_base.scss` | Scoped micro-reset for `sy-*` elements |
| `components/_*.scss` | One file per component (BEM classes) |

## Soft tints use `color-mix()`

Variant backgrounds (soft buttons, outline borders) derive from the base color
with `color-mix(in srgb, var(--sy-color-primary) 25%, transparent)`, so even
custom brand colors get correct tints in both themes automatically.

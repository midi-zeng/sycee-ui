<div align="center">

# @sycee-ui/styles

**Sycee UI design tokens & styles** — one design system, two frameworks.

Design tokens, theming variables and component styles shared by
[`@sycee-ui/react`](../react) and [`@sycee-ui/vue`](../vue), published as
SCSS source plus a compiled stylesheet.

[![npm](https://img.shields.io/npm/v/@sycee-ui/styles?logo=npm&color=cb3837)](https://www.npmjs.com/package/@sycee-ui/styles)
[![Docs](https://img.shields.io/badge/docs-github%20pages-blue)](https://midi-zeng.github.io/sycee-ui/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](../../LICENSE)

</div>

---

## Do you need this package?

Probably not — both component packages ship the compiled stylesheet
themselves:

```ts
import '@sycee-ui/react/styles.css'; // or '@sycee-ui/vue/styles.css'
```

Install `@sycee-ui/styles` when you want:

- **The SCSS source** — import individual token files or bake overrides in
  at compile time;
- **Tokens without components** — style your own UI with the same
  `--sy-*` variables;
- **The mixins** — focus rings, ellipsis and control-base helpers for
  building custom components in the same language.

## Installation

```bash
npm install @sycee-ui/styles
```

## Usage

### Compiled CSS

The package root resolves to the compiled stylesheet:

```ts
import '@sycee-ui/styles';
```

### SCSS source

Everything is importable under `@sycee-ui/styles/scss/*`:

```scss
// The whole library (tokens + base + all component styles)
@use '@sycee-ui/styles/scss/index.scss';

// Or just what you need
@use '@sycee-ui/styles/scss/tokens';
@use '@sycee-ui/styles/scss/base';
@use '@sycee-ui/styles/scss/mixins' as *;
@use '@sycee-ui/styles/scss/components/button';
```

Bundlers (Vite, webpack, esbuild) resolve these package imports out of the
box. If you drive Sass directly with the bare `sass` CLI, use the `pkg:`
importer instead:

```bash
sass --pkg-importer=node theme.scss theme.css
```

```scss
@use 'pkg:@sycee-ui/styles/scss/index.scss';
```

`mixins` only emits code when used — include it with `as *` and apply the
helpers to your own selectors: `sy-focus-ring`, `sy-focus-ring-danger`,
`sy-ellipsis`, `sy-ellipsis-lines($lines)`, `sy-control-base` and
`sy-field-base`.

## Token reference

Every token is a `--sy-*` CSS custom property on `:root`. The groups:

| Group | Examples |
| --- | --- |
| Brand | `--sy-color-primary`, `-hover`, `-active`, `-soft` variants |
| Semantic | `--sy-color-{success,warning,danger,neutral}` + hover/active/soft |
| Text | `--sy-color-text`, `-secondary`, `-tertiary`, `-disabled`, `-inverse` |
| Surfaces | `--sy-color-bg`, `-secondary`, `-tertiary`, `-inverse`, `--sy-color-border`, `-strong` |
| Overlay | `--sy-color-overlay` (modal/message backdrops) |
| Typography | `--sy-font-family`, `--sy-font-family-mono`, `--sy-font-size-xs`…`-2xl`, `--sy-font-weight-*`, `--sy-line-height` |
| Control metrics | `--sy-height-sm/md/lg` |
| Radii | `--sy-radius-xs`…`-xl`, `--sy-radius-full` |
| Spacing | `--sy-space-1`…`-8` (4 → 40px) |
| Elevation | `--sy-shadow-sm/md/lg` |
| Focus | `--sy-focus-ring`, `--sy-focus-ring-danger` |
| Motion | `--sy-duration-fast/base/slow`, `--sy-ease` |
| Z-index | `--sy-z-{dropdown,modal,message,tooltip}` |

Browse [`scss/_tokens.scss`](./scss/_tokens.scss) for the complete list
with default values.

## Theming

Override tokens on `:root` — components pick them up live, no rebuild:

```css
:root {
  --sy-color-primary: #0ea5e9;
  --sy-color-primary-hover: #38bdf8;
  --sy-color-primary-soft: #e0f2fe;
  --sy-radius-md: 10px;
}
```

Dark mode ships ready-made: all tokens have a `[data-theme='dark']`
override. Flip it on the `<html>` element:

```js
document.documentElement.dataset.theme = 'dark'; // and 'light' / remove to go back
```

When re-branding, override the `*-hover`, `*-active` and `*-soft`
companions too — components use them for hover/active states and subtle
backgrounds.

## File layout

```
scss/
  _tokens.scss       all --sy-* variables, light + dark
  _base.scss         light-touch reset scoped to sy- class names
  _mixins.scss       sy-focus-ring, sy-ellipsis, sy-control-base, sy-field-base, …
  index.scss         entry: tokens + base + every component style
  components/        one file per component (_button.scss, _input.scss, …)
dist/
  styles.css         compiled stylesheet (what the component packages embed)
```

The base reset only touches `[class^='sy-']` elements, so the library
drops into any host app without fighting its global styles.

## Documentation

Full docs with live demos and an in-browser playground:
**[midi-zeng.github.io/sycee-ui](https://midi-zeng.github.io/sycee-ui/)**

## License

[MIT](../../LICENSE) © Sycee UI Contributors

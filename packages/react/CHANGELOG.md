# @sycee-ui/react

## 0.3.0

### Minor Changes

- [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba) - Add framework-native hooks and composables for mount state, debounced values,
  managed event listeners, outside clicks, media queries, and JSON local storage.
  Document the parallel APIs in English and Chinese.

- [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba) - Add a Copy component plus imperative `copy()` and low-level `copyText()`
  utilities with localized feedback, icon-only usage, and Clipboard API fallback
  support.

- [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba) - Add a Watermark component for React and Vue with multi-line text and image
  marks, configurable tile spacing and rotation, opacity, viewport coverage, and
  non-interactive decorative output. Also add a shared SVG watermark-pattern
  generator.

- [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba) - Add English/Chinese localization, framework-agnostic formatting utilities,
  categorized bilingual documentation, refreshed component styling, and the
  Countdown, Carousel, Danmaku, and Marquee components.

- [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba) - Add the InfiniteScroll component with React and Vue APIs, localized loading,
  finished and retry states, fixed-height or page scrolling, and shared styles.

### Patch Changes

- [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba) - Fix countdown completion and target changes, uncontrolled input clearing,
  localized select placeholders, carousel focus isolation, avatar error
  fallbacks, explicit Vue InputNumber clearing, calendar-date parsing, and
  coordinate Modal/Drawer scroll locking and Escape handling.
  
  Upgrade vulnerable development Vite, glob, and minimatch dependency paths to
  patched releases.
- Updated dependencies [[`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba), [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba), [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba), [`0378906`](https://github.com/midi-zeng/sycee-ui/commit/037890655a135e8d499bf5b0ea73a62aec7e04ba)]:
  - @sycee-ui/utils@0.2.0

## 0.2.1

### Patch Changes

- [`34b7abe`](https://github.com/midi-zeng/sycee-ui/commit/34b7abe3a9a937749e82c959666e8daa8ac92bcd) - Add READMEs for all three packages: installation, quick starts, component tables, imperative API docs and the SCSS token reference.

## 0.2.0

### Minor Changes

- [`c92ffae`](https://github.com/midi-zeng/sycee-ui/commit/c92ffae7a52d06573cdc54854a22a47d8e15639c) - Add an imperative `dialog` API to both packages (`dialog.confirm`, `dialog.alert`, `dialog.clear`) so dialogs can be opened from event handlers, effects or stores without local template/JSX state. React's `Modal` now also plays its exit animation when closed through the `open` prop, matching the Vue behavior.

- [`c92ffae`](https://github.com/midi-zeng/sycee-ui/commit/c92ffae7a52d06573cdc54854a22a47d8e15639c) - Add the NinePatch component for rendering Android nine-patch images (raw `.9.png` sources and AAPT-compiled PNGs) as stretchable CSS border-image backgrounds. Parsing is delegated to the new `ninepatch-core` runtime dependency.

## 0.1.1

### Patch Changes

- [`ffee50c`](https://github.com/midi-zeng/sycee-ui/commit/ffee50ce7359bcbe9c50d297d910567f566e5688) - Ship the ISC attribution notice (NOTICE.md) for Lucide-derived icon path data inside the published npm packages.

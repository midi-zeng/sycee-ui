# @sycee-ui/react

## 0.2.0

### Minor Changes

- [`c92ffae`](https://github.com/midi-zeng/sycee-ui/commit/c92ffae7a52d06573cdc54854a22a47d8e15639c) - Add an imperative `dialog` API to both packages (`dialog.confirm`, `dialog.alert`, `dialog.clear`) so dialogs can be opened from event handlers, effects or stores without local template/JSX state. React's `Modal` now also plays its exit animation when closed through the `open` prop, matching the Vue behavior.

- [`c92ffae`](https://github.com/midi-zeng/sycee-ui/commit/c92ffae7a52d06573cdc54854a22a47d8e15639c) - Add the NinePatch component for rendering Android nine-patch images (raw `.9.png` sources and AAPT-compiled PNGs) as stretchable CSS border-image backgrounds. Parsing is delegated to the new `ninepatch-core` runtime dependency.

## 0.1.1

### Patch Changes

- [`ffee50c`](https://github.com/midi-zeng/sycee-ui/commit/ffee50ce7359bcbe9c50d297d910567f566e5688) - Ship the ISC attribution notice (NOTICE.md) for Lucide-derived icon path data inside the published npm packages.

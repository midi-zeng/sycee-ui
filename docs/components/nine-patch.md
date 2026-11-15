---
title: NinePatch
---

<script setup>
import BasicVue from '../demos/nine-patch/Basic.vue';
import basicVueCode from '../demos/nine-patch/Basic.vue?raw';
import BasicTsx from '../demos/nine-patch/Basic.tsx';
import basicTsxCode from '../demos/nine-patch/Basic.tsx?raw';
import CompiledVue from '../demos/nine-patch/Compiled.vue';
import compiledVueCode from '../demos/nine-patch/Compiled.vue?raw';
import CompiledTsx from '../demos/nine-patch/Compiled.tsx';
import compiledTsxCode from '../demos/nine-patch/Compiled.tsx?raw';
import ManualVue from '../demos/nine-patch/Manual.vue';
import manualVueCode from '../demos/nine-patch/Manual.vue?raw';
import ManualTsx from '../demos/nine-patch/Manual.tsx';
import manualTsxCode from '../demos/nine-patch/Manual.tsx?raw';
</script>

# NinePatch

Renders an [Android nine-patch image](https://developer.android.com/develop/ui/views/graphics/9-patch) as the
stretchable background of its content. The stretch regions and padding are
parsed from the image, then applied as CSS `border-image` — corners stay
sharp while the middle stretches to any size.

Two image flavors are supported:

- **Raw `.9.png` sources** — the classic PNG with 1px black guide borders; the
  1px border is clipped before rendering.
- **AAPT-compiled PNGs** — the resource-compiler output carrying an `npTc`
  chunk; metadata is read straight from the chunk.

Parsing is delegated to [`ninepatch-core`](https://www.npmjs.com/package/ninepatch-core).

## Basic

A raw nine-patch source. Drag the slider to see the bubble stretch: corners
keep their radius while the center and edges stretch. `NinePatch` fills its
container, so wrap it in a sized box.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## AAPT-compiled

The same API accepts images compiled by AAPT (`aapt2`-produced resources with
an `npTc` chunk) — no extra props needed, the flavor is detected automatically.

<DemoBlock :vue-demo="CompiledVue" :vue-code="compiledVueCode" :react-demo="CompiledTsx" :react-code="compiledTsxCode" />

## Manual slice and padding

Pass `customOptions` to skip parsing entirely and provide the slice and
padding yourself — any image can then act as a border-image source.

<DemoBlock :vue-demo="ManualVue" :vue-code="manualVueCode" :react-demo="ManualTsx" :react-code="manualTsxCode" />

## API

### NinePatch Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | — | Nine-patch image URL (raw `.9.png` source or AAPT-compiled PNG); parsed with `ninepatch-core` |
| customOptions | `NinePatchCustomOptions` | — | Manual overrides; when set the image is not parsed at all |

All other props (`class`, `style`, event handlers, …) are forwarded to the root
`div` (React: extends the native div attributes).

### NinePatchCustomOptions

| Prop | Type | Description |
| --- | --- | --- |
| padding | `NinePatchBoxEdges` | Content padding in px, applied as `padding-top/right/bottom/left` |
| borderImageSlice | `NinePatchBoxEdges` | `border-image-slice` insets in px (top/right/bottom/left) |
| borderInset | `number` | Border pixels to clip before rendering — `1` for raw sources |

### NinePatchBoxEdges

| Prop | Type | Description |
| --- | --- | --- |
| top / right / bottom / left | `number` | Edge value in px; unset edges default to `0` |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Content rendered on top of the stretched background |

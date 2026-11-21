---
title: Watermark
---

<script setup>
import BasicVue from '../demos/watermark/Basic.vue';
import basicVueCode from '../demos/watermark/Basic.vue?raw';
import BasicTsx from '../demos/watermark/Basic.tsx';
import basicTsxCode from '../demos/watermark/Basic.tsx?raw';
import ImageVue from '../demos/watermark/Image.vue';
import imageVueCode from '../demos/watermark/Image.vue?raw';
import ImageTsx from '../demos/watermark/Image.tsx';
import imageTsxCode from '../demos/watermark/Image.tsx?raw';
</script>

# Watermark

Add a repeating text or image watermark to a content area. Watermarks are
rendered as a crisp SVG tile, stay fixed above the wrapped content, and never
intercept pointer events.

## Basic

Wrap the content that needs protection. Pass a string or an array of strings
through `content`; `width`, `height`, and `gap` control the repeating tile.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Image mark

Set `image` to a URL or data URI to use a logo or custom mark. An image takes
precedence over text content.

<DemoBlock :vue-demo="ImageVue" :vue-code="imageVueCode" :react-demo="ImageTsx" :react-code="imageTsxCode" />

## Fullscreen

Set `fullscreen` when the watermark should cover the browser viewport instead
of the wrapped element. The overlay remains non-interactive.

```tsx
<Watermark fullscreen content={['ACME', 'CONFIDENTIAL']} />
```

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string \| string[]` | `'Sycee UI'` | One or more text lines in each tile |
| image | `string` | — | Image URL or data URI; takes precedence over text |
| width | `number` | `180` | Tile width in pixels |
| height | `number` | `120` | Tile height in pixels |
| gap | `number \| [number, number]` | `24` | Extra horizontal and vertical spacing between tiles |
| offset | `[number, number]` | `[0, 0]` | Horizontal and vertical pattern offset |
| rotate | `number` | `-22` | Mark rotation in degrees |
| fontSize | `number` | `14` | Text size in pixels |
| fontFamily | `string` | Theme font | Font family for text marks |
| fontWeight | `string \| number` | `500` | Font weight for text marks |
| color | `string` | `'#1a1c25'` | Text fill color |
| opacity | `number` | `0.12` | Watermark layer opacity, clamped to `0–1` |
| zIndex | `number` | `9` | Overlay stacking order inside the wrapper |
| fullscreen | `boolean` | `false` | Position the overlay over the viewport |

### Slots and children

- React: pass content as `children`.
- Vue: use the default slot.

If no wrapped content is supplied, the component renders a standalone
160-pixel-high area suitable for previews or empty containers.

## Accessibility and security

The watermark layer is decorative and hidden from assistive technology, so it
does not repeat the surrounding content or add noisy announcements. Because it
uses `pointer-events: none`, underlying controls remain fully interactive.

A visual watermark deters casual copying; it is not an access-control or
data-loss-prevention boundary. Sensitive data still needs server-side
authorization, redaction, and audit controls.

---
title: Carousel
---

<script setup>
import BasicVue from '../demos/carousel/Basic.vue';
import basicVueCode from '../demos/carousel/Basic.vue?raw';
import BasicTsx from '../demos/carousel/Basic.tsx';
import basicTsxCode from '../demos/carousel/Basic.tsx?raw';
</script>

# Carousel

A responsive slideshow with keyboard navigation, autoplay, indicator controls,
and pause-on-hover behavior. Motion is disabled when the user requests reduced
motion.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Controlled active slide

React uses `active` and `onChange`; Vue uses `v-model:active` and the `change`
event. The index always remains within the available slide range.

```tsx
<Carousel items={items} active={index} onChange={setIndex} />
```

```vue
<Carousel :items="items" v-model:active="index" />
```

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `CarouselItem[]` | — | `{ key?, content, ariaLabel? }` slides |
| active | `number` | — | Controlled active index |
| defaultActive | `number` | `0` | Uncontrolled initial index |
| autoplay | `boolean` | `true` | Advance automatically |
| interval | `number` | `4500` | Autoplay interval in ms |
| loop | `boolean` | `true` | Wrap at the ends |
| pauseOnHover | `boolean` | `true` | Pause while hovered |
| showArrows | `boolean` | `true` | Show previous/next controls |
| showIndicators | `boolean` | `true` | Show pagination dots |
| height | `number \| string` | auto | Viewport height |

### Keyboard

Use `ArrowLeft`, `ArrowRight`, `Home`, and `End` while the carousel is focused.

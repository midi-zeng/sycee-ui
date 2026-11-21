---
title: Marquee
---

<script setup>
import BasicVue from '../demos/marquee/Basic.vue';
import basicVueCode from '../demos/marquee/Basic.vue?raw';
import BasicTsx from '../demos/marquee/Basic.tsx';
import basicTsxCode from '../demos/marquee/Basic.tsx?raw';
</script>

# Marquee

Create a seamless ticker in four directions. Content is duplicated for a
continuous loop, while the second copy is hidden from assistive technology.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| direction | `'left' \| 'right' \| 'up' \| 'down'` | `'left'` | Travel direction |
| duration | `number` | `18` | Seconds per cycle |
| pauseOnHover | `boolean` | `true` | Pause while hovered |
| fade | `boolean` | `true` | Fade the leading and trailing edges |
| gap | `string` | `'48px'` | Space between repeated content |

### Slots / children

Pass any inline content. Keep repeated content compact; layout components such
as `Tag`, `Badge`, or text work best.

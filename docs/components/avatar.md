---
title: Avatar
---

<script setup>
import BasicVue from '../demos/avatar/Basic.vue';
import basicVueCode from '../demos/avatar/Basic.vue?raw';
import BasicTsx from '../demos/avatar/Basic.tsx';
import basicTsxCode from '../demos/avatar/Basic.tsx?raw';
import SizesVue from '../demos/avatar/Sizes.vue';
import sizesVueCode from '../demos/avatar/Sizes.vue?raw';
import SizesTsx from '../demos/avatar/Sizes.tsx';
import sizesTsxCode from '../demos/avatar/Sizes.tsx?raw';
import GroupVue from '../demos/avatar/Group.vue';
import groupVueCode from '../demos/avatar/Group.vue?raw';
import GroupTsx from '../demos/avatar/Group.tsx';
import groupTsxCode from '../demos/avatar/Group.tsx?raw';
</script>

# Avatar

Represents a person or entity — an image, or a text fallback (first character
of `alt`) when no image is available. `AvatarGroup` overlaps its children.

## Basic

The fallback chain is: default slot content first, then the first character of
`alt`. If an image fails to load, the same fallback takes over.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Sizes and shapes

`size` accepts a named size (`sm`/`md`/`lg`) or a pixel number — a numeric size
sets the width, height and font size inline. `shape` switches between
`circle` (default) and `square`.

<DemoBlock :vue-demo="SizesVue" :vue-code="sizesVueCode" :react-demo="SizesTsx" :react-code="sizesTsxCode" />

## AvatarGroup

`AvatarGroup` overlaps its children and passes its `size` down to every
`Avatar` that does not set one.

<DemoBlock :vue-demo="GroupVue" :vue-code="groupVueCode" :react-demo="GroupTsx" :react-code="groupTsxCode" />

## API

### Avatar Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | — | Image source; on load failure the fallback content is shown |
| alt | `string` | — | Accessible alt text; its first character is the text fallback |
| size | `number \| 'sm' \| 'md' \| 'lg'` | `'md'` | Pixel size or named size; inherited from `AvatarGroup` when unset |
| shape | `'circle' \| 'square'` | `'circle'` | Avatar shape |

### Avatar Slots / children

| Slot | Description |
| --- | --- |
| default | Custom content rendered instead of the alt-initial fallback (React: children) |

### AvatarGroup Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `number \| 'sm' \| 'md' \| 'lg'` | — | Default size applied to child avatars |
| max | `number` | — | Accepted for API parity; overflow truncation (+N) is not implemented yet — the group renders overlap only |

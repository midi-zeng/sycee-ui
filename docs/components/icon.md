---
title: Icon
---

<script setup>
import BasicVue from '../demos/icon/Basic.vue';
import basicVueCode from '../demos/icon/Basic.vue?raw';
import BasicTsx from '../demos/icon/Basic.tsx';
import basicTsxCode from '../demos/icon/Basic.tsx?raw';
import SizesVue from '../demos/icon/Sizes.vue';
import sizesVueCode from '../demos/icon/Sizes.vue?raw';
import SizesTsx from '../demos/icon/Sizes.tsx';
import sizesTsxCode from '../demos/icon/Sizes.tsx?raw';
import TitlesVue from '../demos/icon/Titles.vue';
import titlesVueCode from '../demos/icon/Titles.vue?raw';
import TitlesTsx from '../demos/icon/Titles.tsx';
import titlesTsxCode from '../demos/icon/Titles.tsx?raw';
</script>

# Icon

A small inline SVG icon set. Every glyph is stroked with `currentColor`, so
icons inherit the surrounding text color and scale with the surrounding font
size by default.

## Basic

The complete list of available `IconName` values:

`check`, `close`, `chevron-down`, `chevron-up`, `chevron-left`,
`chevron-right`, `info`, `success`, `warning`, `danger`, `search`, `eye`,
`eye-off`, `plus`, `minus`, `star`, `calendar`, `upload`, `file`, `folder`,
`copy`.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Size and color

`size` accepts a pixel number or any CSS size — `'1em'` by default, which makes
the icon follow the surrounding font size. There is no `color` prop: the SVG
uses `currentColor`, so setting `color` on any ancestor restyles the icon.

<DemoBlock :vue-demo="SizesVue" :vue-code="sizesVueCode" :react-demo="SizesTsx" :react-code="sizesTsxCode" />

## Accessibility

Icons are decorative by default and hidden from assistive technology with
`aria-hidden="true"`. Pass `title` to give the icon an accessible name — it
becomes `role="img"` with an `aria-label`.

<DemoBlock :vue-demo="TitlesVue" :vue-code="titlesVueCode" :react-demo="TitlesTsx" :react-code="titlesTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `IconName` | — | Icon to render — one of the names listed under Basic |
| size | `number \| string` | `'1em'` | Width and height of the SVG |
| title | `string` | — | Accessible label; when omitted the icon is `aria-hidden` |

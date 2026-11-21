---
title: Danmaku
---

<script setup>
import BasicVue from '../demos/danmaku/Basic.vue';
import basicVueCode from '../demos/danmaku/Basic.vue?raw';
import BasicTsx from '../demos/danmaku/Basic.tsx';
import basicTsxCode from '../demos/danmaku/Basic.tsx?raw';
</script>

# Danmaku

Display floating comments across configurable lanes. Each item can define its
own color, speed, delay, and track while the stage handles motion and pause
state.

## Basic

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Pausing

Click the pause control or use `v-model:paused` / the `paused` prop. Reduced
motion preferences freeze the comments in place so the content remains read.

## API

### DanmakuItem

| Field | Type | Description |
| --- | --- | --- |
| id | `string \| number` | Stable key |
| content | `ReactNode / VNodeChild` | Comment content |
| color | `string` | Text color |
| speed | `number` | Crossing time in seconds |
| delay | `number` | Animation delay in seconds |
| track | `number` | Explicit lane index |

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `DanmakuItem[]` | — | Comments to display |
| height | `number` | `180` | Stage height in pixels |
| tracks | `number` | `4` | Number of lanes |
| speed | `number` | `12` | Default crossing time |
| paused | `boolean` | — | Controlled paused state |
| defaultPaused | `boolean` | `false` | Initial uncontrolled state |
| loop | `boolean` | `true` | Animate continuously |
| showControls | `boolean` | `false` | Show the pause button |

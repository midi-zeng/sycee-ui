---
title: Progress
---

<script setup>
import BasicVue from '../demos/progress/Basic.vue';
import basicVueCode from '../demos/progress/Basic.vue?raw';
import BasicTsx from '../demos/progress/Basic.tsx';
import basicTsxCode from '../demos/progress/Basic.tsx?raw';
import StatusesVue from '../demos/progress/Statuses.vue';
import statusesVueCode from '../demos/progress/Statuses.vue?raw';
import StatusesTsx from '../demos/progress/Statuses.tsx';
import statusesTsxCode from '../demos/progress/Statuses.tsx?raw';
import FeaturesVue from '../demos/progress/Features.vue';
import featuresVueCode from '../demos/progress/Features.vue?raw';
import FeaturesTsx from '../demos/progress/Features.tsx';
import featuresTsxCode from '../demos/progress/Features.tsx?raw';
</script>

# Progress

A horizontal bar for determinate progress (0-100) or an indeterminate
animation when the duration is unknown.

## Basic

`value` is the percentage (0-100); the text on the right shows the same figure.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Statuses

`status` switches the bar color between the four status colors.

<DemoBlock :vue-demo="StatusesVue" :vue-code="statusesVueCode" :react-demo="StatusesTsx" :react-code="statusesTsxCode" />

## Indeterminate, height and text

`indeterminate` plays an animation and ignores `value`; `height` sets the
track thickness (default 8px); `showText={false}` hides the percentage.

<DemoBlock :vue-demo="FeaturesVue" :vue-code="featuresVueCode" :react-demo="FeaturesTsx" :react-code="featuresTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Progress percentage (0-100), clamped |
| status | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Visual status color |
| showText | `boolean` | `true` | Shows the percentage text |
| height | `number` | `8` | Track height in pixels |
| indeterminate | `boolean` | `false` | Plays an indeterminate animation; value is ignored and text hidden |

The root carries `role="progressbar"` with `aria-valuenow`, `aria-valuemin`
and `aria-valuemax`; indeterminate bars set `aria-busy` instead of
`aria-valuenow`.

---
title: Timeline
---

<script setup>
import BasicVue from '../demos/timeline/Basic.vue';
import basicVueCode from '../demos/timeline/Basic.vue?raw';
import BasicTsx from '../demos/timeline/Basic.tsx';
import basicTsxCode from '../demos/timeline/Basic.tsx?raw';
</script>

# Timeline

A vertical list of chronological events.

## Basic

Each entry renders a colored dot, a title and optional description text.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `Array<{ title, description?, color? }>` | — | Entries rendered top to bottom |
| items[].color | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Dot color |

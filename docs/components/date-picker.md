---
title: DatePicker
---

<script setup>
import BasicVue from '../demos/date-picker/Basic.vue';
import basicVueCode from '../demos/date-picker/Basic.vue?raw';
import BasicTsx from '../demos/date-picker/Basic.tsx';
import basicTsxCode from '../demos/date-picker/Basic.tsx?raw';
</script>

# DatePicker

A single-date picker with a month calendar panel portal-rendered below the
trigger field.

## Basic

Pick a day to commit an ISO `YYYY-MM-DD` string. Restrict the range with
`min`/`max`; pick the first weekday with `weekStartsOn`.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value *(Vue `v-model`)* / `value` *(React)* | `string \| null` | — | Selected ISO date (`YYYY-MM-DD`) |
| min / max | `string` | — | Allowed range (`YYYY-MM-DD`) |
| weekStartsOn | `0 \| 1` | `0` | First day of the week |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger field size |
| status | `'default' \| 'error' \| 'warning'` | `'default'` | Validation color |
| disabled / placeholder | — | — | Trigger behavior |

Days outside the current month are dimmed, today is outlined, and the selected
day is filled. The calendar is `role="grid"`; each day carries
`aria-selected` and an ISO `aria-label`.

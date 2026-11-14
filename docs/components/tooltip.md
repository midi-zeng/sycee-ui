---
title: Tooltip
---

<script setup>
import BasicVue from '../demos/tooltip/Basic.vue';
import basicVueCode from '../demos/tooltip/Basic.vue?raw';
import BasicTsx from '../demos/tooltip/Basic.tsx';
import basicTsxCode from '../demos/tooltip/Basic.tsx?raw';
import PlacementsVue from '../demos/tooltip/Placements.vue';
import placementsVueCode from '../demos/tooltip/Placements.vue?raw';
import PlacementsTsx from '../demos/tooltip/Placements.tsx';
import placementsTsxCode from '../demos/tooltip/Placements.tsx?raw';
import ThemesVue from '../demos/tooltip/Themes.vue';
import themesVueCode from '../demos/tooltip/Themes.vue?raw';
import ThemesTsx from '../demos/tooltip/Themes.tsx';
import themesTsxCode from '../demos/tooltip/Themes.tsx?raw';
import TriggersVue from '../demos/tooltip/Triggers.vue';
import triggersVueCode from '../demos/tooltip/Triggers.vue?raw';
import TriggersTsx from '../demos/tooltip/Triggers.tsx';
import triggersTsxCode from '../demos/tooltip/Triggers.tsx?raw';
</script>

# Tooltip

To show short contextual information on hover, click or focus. The bubble
portals to `document.body` and positions itself against the trigger, flipping
to the opposite side when it would overflow the viewport.

## Basic

Wrap any element as the trigger and pass the text through `content`. The
default placement is `top` and the default trigger is `hover`.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Placements

`placement` accepts `top`, `bottom`, `left` and `right`.

<DemoBlock :vue-demo="PlacementsVue" :vue-code="placementsVueCode" :react-demo="PlacementsTsx" :react-code="placementsTsxCode" />

## Themes and rich content

`theme="light"` flips the bubble to a light surface. Rich content goes in the
`content` slot (Vue) or the `content` prop (React) — the bubble is not
rendered while the content is empty.

<DemoBlock :vue-demo="ThemesVue" :vue-code="themesVueCode" :react-demo="ThemesTsx" :react-code="themesTsxCode" />

## Triggers

`trigger` accepts `hover` (default, with a 120ms open delay), `click` (the
component toggles its own open state — no extra wiring needed) and `focus`.
`disabled` suppresses the tooltip entirely.

<DemoBlock :vue-demo="TriggersVue" :vue-code="triggersVueCode" :react-demo="TriggersTsx" :react-code="triggersTsxCode" />

## Accessibility

The bubble has `role="tooltip"` and is linked to the trigger through
`aria-describedby`. It opens on hover/focus (per the `trigger` prop) and
closes on leave, blur or Escape. The wrapper is `display: inline-flex`, so it
never breaks surrounding block-level layout.

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` *(Vue)* / `ReactNode` *(React)* | — | Bubble content; not rendered when empty |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to the trigger; flips when it would overflow the viewport |
| trigger | `'hover' \| 'click' \| 'focus'` | `'hover'` | Interaction that opens the tooltip |
| theme | `'dark' \| 'light'` | `'dark'` | Bubble color scheme |
| disabled | `boolean` | `false` | Suppresses the tooltip |

### Slots / children

| Slot | Description |
| --- | --- |
| default | The trigger element (React: children) |
| content *(Vue)* / `content` prop *(React)* | Replaces the content prop — use for rich markup |

### Events

None — the Tooltip manages its own open state; it only exposes the `trigger`
prop to choose the interaction.

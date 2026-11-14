---
title: Modal
---

<script setup>
import BasicVue from '../demos/modal/Basic.vue';
import basicVueCode from '../demos/modal/Basic.vue?raw';
import BasicTsx from '../demos/modal/Basic.tsx';
import basicTsxCode from '../demos/modal/Basic.tsx?raw';
import FooterVue from '../demos/modal/Footer.vue';
import footerVueCode from '../demos/modal/Footer.vue?raw';
import FooterTsx from '../demos/modal/Footer.tsx';
import footerTsxCode from '../demos/modal/Footer.tsx?raw';
import WidthVue from '../demos/modal/Width.vue';
import widthVueCode from '../demos/modal/Width.vue?raw';
import WidthTsx from '../demos/modal/Width.tsx';
import widthTsxCode from '../demos/modal/Width.tsx?raw';
</script>

# Modal

To interrupt the flow with a focused task that must be acknowledged. The
dialog portals to `document.body`, renders over a fading mask and comes with
complete accessibility behavior built in.

## Basic

The dialog is controlled: bind `v-model:open` (Vue) or pass `open` +
`onOk`/`onCancel` (React). Pressing OK only notifies — close the dialog
yourself so you can validate first; cancel, the X button, the mask and
Escape all close it.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Custom footer

Replace the default OK/Cancel buttons with the `footer` slot (Vue) or the
`footer` prop (React). The footer is hidden entirely with `showFooter={false}`.

<DemoBlock :vue-demo="FooterVue" :vue-code="footerVueCode" :react-demo="FooterTsx" :react-code="footerTsxCode" />

## Width and mask behavior

`width` accepts a number (px) or any CSS width — the default is 460. Set
`maskClosable={false}` for destructive flows where a stray click should not
dismiss the dialog (Escape still works unless you also set `closeOnEsc={false}`).

<DemoBlock :vue-demo="WidthVue" :vue-code="widthVueCode" :react-demo="WidthTsx" :react-code="widthTsxCode" />

## Accessibility

The panel has `role="dialog"` and `aria-modal="true"` with the title wired
through `aria-labelledby`. Escape closes the topmost dialog only (nested
modals stack safely), body scroll is locked while one is open (shared by
nested dialogs), focus moves into the panel on open and returns to the
previously focused element on close, and Tab cycles within the panel.

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| v-model:open *(Vue)* / `open` *(React)* | `boolean` | `false` | Controls the dialog visibility |
| title | `string` *(Vue)* / `ReactNode` *(React)* | — | Header title — the `title` slot takes precedence (Vue) |
| width | `number \| string` | `460` | Panel width; numbers become px |
| okText | `string` | `'OK'` | Text of the confirm button |
| cancelText | `string` | `'Cancel'` | Text of the cancel button |
| showFooter | `boolean` | `true` | Renders the default footer with OK/Cancel buttons |
| maskClosable | `boolean` | `true` | Closes when the mask is clicked |
| closeOnEsc | `boolean` | `true` | Closes when Escape is pressed |

### Slots / children

| Slot | Description |
| --- | --- |
| default | Dialog body (React: children) |
| title *(Vue)* / `title` prop *(React)* | Replaces the title prop |
| footer *(Vue)* / `footer` prop *(React)* | Replaces the default OK/Cancel buttons |

### Events

| Event | Description |
| --- | --- |
| ok *(Vue)* / `onOk` *(React)* | The confirm button was pressed — the dialog does **not** close automatically |
| cancel *(Vue)* / `onCancel` *(React)* | Cancel/X was pressed — the dialog then starts closing (update your state too) |
| open *(Vue)* / `onOpen` *(React)* | The dialog became visible |
| close *(Vue)* / `onClose` *(React)* | A close was initiated (Esc, mask, close button or cancel) |

---
title: Upload
---

<script setup>
import BasicVue from '../demos/upload/Basic.vue';
import basicVueCode from '../demos/upload/Basic.vue?raw';
import BasicTsx from '../demos/upload/Basic.tsx';
import basicTsxCode from '../demos/upload/Basic.tsx?raw';
</script>

# Upload

File selection with a status list and optional drag-and-drop area.

## Basic

Each entry moves through `uploading` → `success`/`error`. Without a custom
`request`, files are marked as succeeded immediately (no network activity);
pass `request` to plug in your own transport.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| fileList *(Vue `v-model`)* / `fileList` *(React)* | `UploadFile[]` | `[]` | File list state |
| multiple | `boolean` | `false` | Multiple file selection |
| accept | `string` | — | Native `accept` attribute |
| maxCount | `number` | — | Extra files beyond the cap are ignored |
| drag | `boolean` | `false` | Drag-and-drop area instead of a button |
| disabled | `boolean` | `false` | Disables the trigger |
| beforeUpload | `(file: File) => boolean \| Promise<boolean>` | — | Return false to reject a file |
| request | `(options: { file, onSuccess, onError }) => void` | — | Custom upload transport |

```ts
interface UploadFile {
  uid: string;
  name: string;
  size?: number;
  status: 'uploading' | 'success' | 'error';
}
```

### Events

| Event | Description |
| --- | --- |
| change *(Vue)* / `onChange` *(React)* | The file list changed |
| remove *(Vue)* / `onRemove` *(React)* | An entry was removed |

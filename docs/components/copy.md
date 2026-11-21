---
title: Copy
---

<script setup>
import BasicVue from '../demos/copy/Basic.vue';
import basicVueCode from '../demos/copy/Basic.vue?raw';
import BasicTsx from '../demos/copy/Basic.tsx';
import basicTsxCode from '../demos/copy/Basic.tsx?raw';
import StatesVue from '../demos/copy/States.vue';
import statesVueCode from '../demos/copy/States.vue?raw';
import StatesTsx from '../demos/copy/States.tsx';
import statesTsxCode from '../demos/copy/States.tsx?raw';
import ImperativeVue from '../demos/copy/Imperative.vue';
import imperativeVueCode from '../demos/copy/Imperative.vue?raw';
import ImperativeTsx from '../demos/copy/Imperative.tsx';
import imperativeTsxCode from '../demos/copy/Imperative.tsx?raw';
</script>

# Copy

Copy a string to the clipboard with one click. The button uses the Clipboard
API when available and falls back to a hidden-textarea copy command for older
or permission-limited browser contexts.

## Basic

Pass the value through `text`. The label changes to **Copied** after a
successful copy and returns to its default after two seconds.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Icons, sizes, and variants

Set `icon-only` for compact toolbars. `size`, `color`, and `variant` match the
Button API. Use `duration="0"` to keep the success or error state visible
until the next attempt.

<DemoBlock :vue-demo="StatesVue" :vue-code="statesVueCode" :react-demo="StatesTsx" :react-code="statesTsxCode" />

## Imperative copy

Call `copy(text)` when no button is needed. It resolves to `true` on success
and `false` on failure, so event handlers can branch without a `try/catch`.
Pass `onSuccess` or `onError` to receive callbacks.

```ts
import { copy } from '@sycee-ui/react'; // or '@sycee-ui/vue'

const copied = await copy('npm install @sycee-ui/react', {
  onSuccess: (text) => console.log('Copied:', text),
  onError: (error) => console.warn('Copy failed:', error),
});
```

<DemoBlock :vue-demo="ImperativeVue" :vue-code="imperativeVueCode" :react-demo="ImperativeTsx" :react-code="imperativeTsxCode" />

## Low-level utility

Use `copyText` when you want copy failures to reject as exceptions:

```ts
import { copyText } from '@sycee-ui/utils';

await copyText('npm install @sycee-ui/react');
```

The helper returns a promise and rejects when both clipboard strategies fail.
Call it from a user gesture so browsers can grant clipboard permission.

## API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | — | Text written to the clipboard |
| label | `string` | `Copy` | Default visible label |
| copiedLabel | `string` | `Copied` | Successful-copy label |
| errorLabel | `string` | `Copy failed` | Failed-copy label |
| color | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Visual color |
| variant | `'solid' \| 'soft' \| 'outline' \| 'ghost' \| 'link'` | `'ghost'` | Visual variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Control size |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| iconOnly | `boolean` | `false` | Hide the label and render a square button |
| duration | `number` | `2000` | Feedback duration in milliseconds; `0` keeps it visible |
| disabled | `boolean` | `false` | Disable copying |

### Events

| Event | React prop | Description |
| --- | --- | --- |
| copied | `onCopied` | Fires with the copied text after success |
| copyError | `onCopyError` | Fires with the error when copying fails |
| click | `onClick` | Native button click |

### Accessibility

The control is a native button and participates in keyboard navigation with
Enter and Space. Its icon is decorative, while the changing label is exposed
as a polite status region. Icon-only buttons expose the current state through
their accessible name.

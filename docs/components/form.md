---
title: Form
---

<script setup>
import BasicVue from '../demos/form/Basic.vue';
import basicVueCode from '../demos/form/Basic.vue?raw';
import BasicTsx from '../demos/form/Basic.tsx';
import basicTsxCode from '../demos/form/Basic.tsx?raw';
</script>

# Form

Form layout with labels and rule-based validation. `FormItem` reads the model
from the surrounding `Form` and shows errors under its control.

## Basic

Rules run when `validate()` is called (React: `formRef.current.validate()`),
and re-run on changes after the field was touched.

<DemoBlock :vue-demo="BasicVue" :vue-code="basicVueCode" :react-demo="BasicTsx" :react-code="basicTsxCode" />

## Form API

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| model | `Record<string, unknown>` | — | Data the FormItems read from |
| rules | `Record<string, FormRule[]>` | — | Rules per model key |
| labelWidth | `number \| string` | — | Fixed label width |
| labelPosition | `'left' \| 'top'` | `'left'` | Label layout |

Call `validate()` on the form ref (Vue: `defineExpose`; React: `FormHandle`) to
validate every registered field — it resolves `true` only when all pass.

## FormItem API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| prop | `string` | — | Model key this item validates |
| label | `string` *(Vue)* / `ReactNode` *(React)* | — | Label text |
| required | `boolean` | `false` | Adds a required rule and shows an asterisk |
| rules | `FormRule[]` | — | Item rules; take precedence over form rules |

### Rule shape

```ts
interface FormRule {
  required?: boolean;                       // rejects null/undefined/''/[]
  message?: string;                         // 'Invalid value' default
  validator?: (value) => boolean | string | Promise<boolean | string>;
}
```

Failed validation renders `<div class="sy-form-item__error" role="alert">`
below the control and adds `is-error` to the item.

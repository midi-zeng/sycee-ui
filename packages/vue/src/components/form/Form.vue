<script setup lang="ts">
import { provide } from 'vue';
import { cx } from '../../utils/cx';
import { FORM_CONTEXT_KEY } from './context';
import type { FormContextValue, FormFieldHandle, FormRule } from './context';

defineOptions({ name: 'SyForm' });

interface Props {
  /** Data model the FormItems read from. */
  model?: Record<string, unknown>;
  /** Rules per model key, applied to matching FormItems. */
  rules?: Record<string, FormRule[]>;
  /** Fixed label width; any CSS width. */
  labelWidth?: number | string;
  /** Label position. @default 'left' */
  labelPosition?: 'left' | 'top';
}

const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'left',
});

const fields: FormFieldHandle[] = [];

provide<FormContextValue>(FORM_CONTEXT_KEY, {
  get model() {
    return props.model;
  },
  get rules() {
    return props.rules;
  },
  get labelWidth() {
    return props.labelWidth;
  },
  get labelPosition() {
    return props.labelPosition;
  },
  registerField: (field) => {
    fields.push(field);
    return () => {
      const index = fields.indexOf(field);
      if (index >= 0) fields.splice(index, 1);
    };
  },
});

/** Validates all registered fields; resolves true when every field passes. */
async function validate(): Promise<boolean> {
  const results = await Promise.all(fields.map((field) => field.validate()));
  return results.every(Boolean);
}

defineExpose({ validate });
</script>

<template>
  <form
    :class="cx('sy-form', labelPosition === 'top' && 'sy-form--top', $attrs.class as string)"
    @submit.prevent
  >
    <slot />
  </form>
</template>

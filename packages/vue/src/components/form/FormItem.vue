<script setup lang="ts">
import { computed, inject, onUnmounted, ref, watch } from 'vue';
import { cx } from '../../utils/cx';
import { FORM_CONTEXT_KEY } from './context';
import type { FormContextValue, FormRule } from './context';

defineOptions({ name: 'SyFormItem' });

interface Props {
  /** Key of the value inside the Form `model` this item validates. */
  prop?: string;
  /** Label text rendered before the control. */
  label?: string;
  /** Marks the label with a red asterisk. */
  required?: boolean;
  /** Rules for this item; take precedence over the Form's per-key rules. */
  rules?: FormRule[];
}

const {
  prop,
  label,
  required = false,
  rules,
} = defineProps<Props>();

const context = inject<FormContextValue | null>(FORM_CONTEXT_KEY, null);

const error = ref<string | null>(null);
const touched = ref(false);

function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

async function runRule(rule: FormRule, value: unknown): Promise<string | null> {
  const fallback = rule.message ?? 'Invalid value';
  if (rule.required && isEmptyValue(value)) {
    return label ? `${label} is required` : fallback;
  }
  if (rule.validator) {
    const outcome = await rule.validator(value);
    if (outcome === false) return fallback;
    if (typeof outcome === 'string') return outcome;
  }
  return null;
}

/** Item rules take precedence over the Form's per-key rules. */
const effectiveRules = computed<FormRule[]>(() => {
  const own = rules && rules.length > 0 ? rules : (prop ? context?.rules?.[prop] : undefined) ?? [];
  const list: FormRule[] = [...own];
  if (required && !list.some((rule) => rule.required)) {
    list.unshift({ required: true });
  }
  return list;
});

async function validate(): Promise<boolean> {
  if (effectiveRules.value.length === 0) {
    error.value = null;
    return true;
  }
  const value = context?.model?.[prop ?? ''];
  for (const rule of effectiveRules.value) {
    const message = await runRule(rule, value);
    if (message) {
      error.value = message;
      return false;
    }
  }
  error.value = null;
  return true;
}

// Register this field with the parent Form so `form.validate()` sees it.
const contextValue = context;
let unregister: (() => void) | null = null;
if (contextValue) {
  unregister = contextValue.registerField({ prop, validate });
}
onUnmounted(() => {
  unregister?.();
});

// Re-validate after external changes once the user has interacted.
watch(
  () => (prop ? context?.model?.[prop] : undefined),
  () => {
    if (touched.value) void validate();
  },
);

function markTouched() {
  touched.value = true;
}

const showAsterisk = computed(() =>
  required || effectiveRules.value.some((rule) => rule.required),
);

const labelStyle = computed(() => {
  const width = context?.labelWidth;
  if (width === undefined) return undefined;
  return { width: typeof width === 'number' ? `${width}px` : width };
});
</script>

<template>
  <div
    :class="cx('sy-form-item', error && 'is-error', $attrs.class as string)"
    @focusout="markTouched"
  >
    <label v-if="label" class="sy-form-item__label" :style="labelStyle">
      <span v-if="showAsterisk" class="sy-form-item__asterisk" aria-hidden="true">*</span>
      {{ label }}
    </label>
    <div class="sy-form-item__control">
      <slot />
      <div v-if="error" class="sy-form-item__error" role="alert">
        {{ error }}
      </div>
    </div>
  </div>
</template>

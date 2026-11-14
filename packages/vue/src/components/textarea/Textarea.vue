<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize, InputStatus } from '../../types';

defineOptions({ name: 'SyTextarea', inheritAttrs: false });

interface Props {
  size?: ComponentSize;
  /** Validation state of the field. @default 'default' */
  status?: InputStatus;
  disabled?: boolean;
  readonly?: boolean;
  /** Number of visible text lines. @default 3 */
  rows?: number;
  /** Maximum number of characters allowed. */
  maxlength?: number;
  /** Shows a `{length}/{maxlength}` counter below the field. */
  showCount?: boolean;
  placeholder?: string;
}

const {
  size = 'md',
  status = 'default',
  disabled = false,
  readonly = false,
  rows = 3,
  maxlength,
  showCount = false,
  placeholder,
} = defineProps<Props>();

const emit = defineEmits<{
  change: [value: string];
  input: [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const model = defineModel<string>();

// `inheritAttrs: false` — fallthrough attrs (name, spellcheck, ...) go to the
// native textarea; class/style go to the root wrapper element.
const attrs = useAttrs();
const nativeAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() => cx('sy-textarea-wrapper', attrs.class as string | undefined));
const rootStyle = computed(() => attrs.style);
const boxClass = computed(() =>
  cx(
    'sy-textarea',
    size !== 'md' && `sy-textarea--${size}`,
    status !== 'default' && `sy-textarea--${status}`,
    disabled && 'is-disabled',
  ),
);
const count = computed(() => {
  const length = (model.value ?? '').length;
  return maxlength != null ? `${length}/${maxlength}` : `${length}`;
});

function onInput(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value;
  model.value = value;
  emit('input', value);
  emit('change', value);
}

function onFocus(event: FocusEvent) {
  emit('focus', event);
}

function onBlur(event: FocusEvent) {
  emit('blur', event);
}
</script>

<template>
  <div :class="rootClass" :style="rootStyle">
    <div :class="boxClass">
      <textarea
        v-bind="nativeAttrs"
        class="sy-textarea__native"
        :value="model ?? ''"
        :placeholder="placeholder"
        :rows="rows"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
        :aria-disabled="disabled || undefined"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <span v-if="showCount" class="sy-textarea__count">{{ count }}</span>
  </div>
</template>

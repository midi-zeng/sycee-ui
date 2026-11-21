<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyInput', inheritAttrs: false });

interface Props {
  size?: ComponentSize;
  /** Validation state of the field. @default 'default' */
  status?: InputStatus;
  /** Shows a clear button when the field has a value. */
  clearable?: boolean;
  /** Element rendered before the input. */
  prefix?: string;
  /** Element rendered after the input. */
  suffix?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const {
  size = 'md',
  status = 'default',
  clearable = false,
  prefix,
  suffix,
  disabled = false,
  readonly = false,
} = defineProps<Props>();
const t = useLocale();

const emit = defineEmits<{
  change: [value: string];
  clear: [];
}>();

const model = defineModel<string>();

// `inheritAttrs: false` — fallthrough attrs (placeholder, maxlength, ...) go
// to the native input; class/style go to the root element.
const attrs = useAttrs();
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cx(
    'sy-input',
    size !== 'md' && `sy-input--${size}`,
    status !== 'default' && `sy-input--${status}`,
    disabled && 'is-disabled',
    attrs.class as string | undefined,
  ),
);
const rootStyle = computed(() => attrs.style);

const isHover = ref(false);
const isFocus = ref(false);
const showClear = computed(
  () => clearable && !disabled && !readonly && !!model.value && (isHover.value || isFocus.value),
);

function onInput(event: Event) {
  model.value = (event.target as HTMLInputElement).value;
  emit('change', model.value ?? '');
}

function onClear() {
  model.value = '';
  emit('change', '');
  emit('clear');
}
</script>

<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <span v-if="$slots.prefix || prefix" class="sy-input__prefix">
      <slot name="prefix">{{ prefix }}</slot>
    </span>
    <input
      v-bind="inputAttrs"
      class="sy-input__native"
      :value="model ?? ''"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
    <span
      v-if="showClear"
      class="sy-input__clear"
      role="button"
      :aria-label="t.clear"
      @mousedown.prevent
      @click="onClear"
    >
      <Icon name="close" />
    </span>
    <span v-if="$slots.suffix || suffix" class="sy-input__suffix">
      <slot name="suffix">{{ suffix }}</slot>
    </span>
  </div>
</template>

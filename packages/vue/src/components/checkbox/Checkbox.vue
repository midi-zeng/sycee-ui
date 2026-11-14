<script setup lang="ts">
import { computed, ref, useAttrs, watchEffect } from 'vue';
import { cx } from '../../utils/cx';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyCheckbox', inheritAttrs: false });

interface Props {
  /** Label text rendered next to the box; the default slot takes precedence. */
  label?: string;
  disabled?: boolean;
  /** Shows a dash instead of the check icon. */
  indeterminate?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md';
}

const {
  label,
  disabled = false,
  indeterminate = false,
  size = 'md',
} = defineProps<Props>();

const emit = defineEmits<{ change: [checked: boolean] }>();

const model = defineModel<boolean>();

// `inheritAttrs: false` — fallthrough attrs (name, value, ...) go to the native
// input; class/style go to the root element.
const attrs = useAttrs();
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cx(
    'sy-checkbox',
    size !== 'md' && 'sy-checkbox--sm',
    model.value && 'is-checked',
    indeterminate && 'is-indeterminate',
    disabled && 'is-disabled',
    attrs.class as string | undefined,
  ),
);
const rootStyle = computed(() => attrs.style);

const inputRef = ref<HTMLInputElement | null>(null);

// Vue does not map the native `indeterminate` property, so set it imperatively.
watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = indeterminate;
  }
});

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  model.value = checked;
  emit('change', checked);
}
</script>

<template>
  <label :class="rootClass" :style="rootStyle">
    <!-- The native input must stay first so SCSS can draw the focus ring on its sibling box. -->
    <input
      v-bind="inputAttrs"
      ref="inputRef"
      type="checkbox"
      class="sy-checkbox__native"
      :checked="model ?? false"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="sy-checkbox__box" aria-hidden="true">
      <Icon name="check" />
    </span>
    <span v-if="label != null || $slots.default" class="sy-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

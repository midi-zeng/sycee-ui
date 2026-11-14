<script setup lang="ts">
import { cx } from '../../utils/cx';
import type { SelectOption } from '../../types';
import Checkbox from './Checkbox.vue';

defineOptions({ name: 'SyCheckboxGroup' });

interface Props {
  /** Renders a Checkbox per option; the default slot is rendered after them. */
  options?: SelectOption[];
  /** Disables every checkbox in the group. */
  disabled?: boolean;
}

const { options = [], disabled = false } = defineProps<Props>();

const model = defineModel<Array<string | number>>();

function isChecked(option: SelectOption): boolean {
  return (model.value ?? []).includes(option.value);
}

function onOptionChange(option: SelectOption, checked: boolean) {
  const current = model.value ?? [];
  model.value = checked
    ? [...current, option.value]
    : current.filter((item) => item !== option.value);
}
</script>

<template>
  <div :class="cx('sy-checkbox-group', $attrs.class as string)">
    <Checkbox
      v-for="option in options"
      :key="option.value"
      :model-value="isChecked(option)"
      :label="option.label"
      :disabled="disabled || option.disabled"
      @change="(checked) => onOptionChange(option, checked)"
    />
    <slot />
  </div>
</template>

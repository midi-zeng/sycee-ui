<script setup lang="ts">
import { computed, provide, useId } from 'vue';
import { cx } from '../../utils/cx';
import type { SelectOption } from '../../types';
import Radio, { radioGroupKey } from './Radio.vue';

defineOptions({ name: 'SyRadioGroup' });

interface Props {
  /** Renders a Radio per option; the default slot is rendered after them. */
  options?: SelectOption[];
  /** Disables every radio in the group. */
  disabled?: boolean;
  /** `name` shared by the radios; generated via useId when omitted. */
  name?: string;
}

const { options = [], disabled = false, name } = defineProps<Props>();

const model = defineModel<string | number | null>();

const generatedName = useId();

provide(radioGroupKey, {
  value: model,
  disabled: computed(() => disabled),
  name: name ?? generatedName,
});
</script>

<template>
  <div :class="cx('sy-radio-group', $attrs.class as string)">
    <Radio
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :label="option.label"
      :disabled="option.disabled"
    />
    <slot />
  </div>
</template>

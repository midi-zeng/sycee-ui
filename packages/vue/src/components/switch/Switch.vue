<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SySwitch' });

interface Props {
  disabled?: boolean;
  /** Shows a spinner on the thumb and blocks toggling. */
  loading?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md';
}

const { size = 'md', disabled = false, loading = false } = defineProps<Props>();

const emit = defineEmits<{ change: [checked: boolean] }>();

const model = defineModel<boolean>();

const isChecked = computed(() => model.value ?? false);

function onClick() {
  if (disabled || loading) return;
  const nextChecked = !isChecked.value;
  model.value = nextChecked;
  emit('change', nextChecked);
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isChecked"
    :aria-busy="loading || undefined"
    :class="
      cx(
        'sy-switch',
        size !== 'md' && 'sy-switch--sm',
        isChecked && 'is-checked',
        loading && 'is-loading',
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
    :disabled="disabled"
    @click="onClick"
  >
    <span class="sy-switch__thumb" />
  </button>
</template>

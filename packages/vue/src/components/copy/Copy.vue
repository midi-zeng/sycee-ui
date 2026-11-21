<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue';
import { copyText } from '@sycee-ui/utils';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';
import type { IconName } from '../icon/Icon.vue';
import type { CopyProps, CopyStatus } from './types';

defineOptions({ name: 'SyCopy' });

const {
  text,
  label,
  copiedLabel,
  errorLabel,
  color = 'neutral',
  variant = 'ghost',
  size = 'md',
  type = 'button',
  iconOnly = false,
  duration = 2000,
  disabled = false,
} = defineProps<CopyProps>();

const emit = defineEmits<{
  copied: [text: string];
  copyError: [error: unknown];
}>();

const attrs = useAttrs();
const t = useLocale();
const status = ref<CopyStatus>('idle');
let resetTimer: ReturnType<typeof setTimeout> | null = null;
let disposed = false;

const displayLabel = computed(() => {
  if (status.value === 'copied') return copiedLabel ?? t.value.copied;
  if (status.value === 'error') return errorLabel ?? t.value.copyFailed;
  return label ?? t.value.copy;
});

const iconName = computed<IconName>(() =>
  status.value === 'copied' ? 'check' : status.value === 'error' ? 'danger' : 'copy',
);

const resolvedAriaLabel = computed(() =>
  iconOnly ? displayLabel.value : (attrs['aria-label'] as string | undefined),
);

function clearResetTimer() {
  if (resetTimer !== null) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
}

async function handleCopy() {
  clearResetTimer();
  try {
    await copyText(text);
    if (disposed) return;
    status.value = 'copied';
    emit('copied', text);
  } catch (error) {
    if (disposed) return;
    status.value = 'error';
    emit('copyError', error);
  }

  if (duration > 0) {
    resetTimer = setTimeout(() => {
      resetTimer = null;
      status.value = 'idle';
    }, duration);
  }
}

onBeforeUnmount(() => {
  disposed = true;
  clearResetTimer();
});
</script>

<template>
  <button
    :type="type"
    :class="
      cx(
        'sy-copy',
        'sy-button',
        `sy-button--${color}`,
        `sy-button--${variant}`,
        size !== 'md' && `sy-button--${size}`,
        iconOnly && 'sy-copy--icon-only',
        status === 'copied' && 'is-copied',
        status === 'error' && 'is-error',
        $attrs.class as string,
      )
    "
    :disabled="disabled"
    :aria-label="resolvedAriaLabel"
    @click="handleCopy"
  >
    <span class="sy-copy__icon" aria-hidden="true">
      <Icon :name="iconName" />
    </span>
    <span
      :class="cx('sy-copy__label', iconOnly && 'sy-copy__label--hidden')"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ displayLabel }}
    </span>
  </button>
</template>

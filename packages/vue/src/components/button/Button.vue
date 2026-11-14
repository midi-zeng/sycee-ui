<script setup lang="ts">
import { cx } from '../../utils/cx';
import type { BorderType, ColorType, ComponentSize } from '../../types';

defineOptions({ name: 'SyButton' });

interface Props {
  /** Visual color of the button. @default 'primary' */
  color?: ColorType;
  /** Visual variant. @default 'solid' */
  variant?: BorderType;
  /** Size of the button. @default 'md' */
  size?: ComponentSize;
  /** Native button type. @default 'button' */
  type?: 'button' | 'submit' | 'reset';
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to fill the parent width. */
  block?: boolean;
}

const {
  color = 'primary',
  variant = 'solid',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  block = false,
} = defineProps<Props>();
</script>

<template>
  <button
    :type="type"
    :class="
      cx(
        'sy-button',
        `sy-button--${color}`,
        `sy-button--${variant}`,
        size !== 'md' && `sy-button--${size}`,
        block && 'sy-button--block',
        loading && 'is-loading',
        $attrs.class as string,
      )
    "
    :disabled="disabled"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="sy-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../../utils/cx';
import type { ColorType, ComponentSize } from '../../types';

defineOptions({ name: 'SySpinner' });

interface Props {
  /** Pixel size (number) or named size. @default 'md' */
  size?: number | ComponentSize;
  /** Color of the spinner. @default 'primary' */
  color?: ColorType;
  /** Visible label below the circle; doubles as the accessible name. */
  label?: string;
}

const { size = 'md', color = 'primary', label } = defineProps<Props>();

const sizeMod = computed(() => (typeof size === 'string' && size !== 'md' ? size : undefined));
const sizeStyle = computed(() =>
  typeof size === 'number' ? { fontSize: `${size}px` } : undefined,
);
</script>

<template>
  <div
    :class="
      cx(
        'sy-spinner',
        `sy-spinner--${color}`,
        sizeMod && `sy-spinner--${sizeMod}`,
        $attrs.class as string,
      )
    "
    :style="sizeStyle"
    role="status"
    :aria-label="label ?? 'Loading'"
  >
    <span class="sy-spinner__circle" aria-hidden="true" />
    <span v-if="label" class="sy-spinner__label">{{ label }}</span>
  </div>
</template>

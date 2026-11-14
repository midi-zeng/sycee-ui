<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyProgress' });

type ProgressStatus = 'primary' | 'success' | 'warning' | 'danger';

interface Props {
  /** Progress percentage (0-100). @default 0 */
  value?: number;
  /** Visual status color. @default 'primary' */
  status?: ProgressStatus;
  /** Whether to show the percentage text. @default true */
  showText?: boolean;
  /** Track height in pixels. @default 8 */
  height?: number;
  /** Plays an indeterminate animation; the value is ignored and the text hidden. */
  indeterminate?: boolean;
}

const {
  value = 0,
  status = 'primary',
  showText = true,
  height = 8,
  indeterminate = false,
} = defineProps<Props>();

const percent = computed(() => Math.min(100, Math.max(0, value)));
const text = computed(() => `${Math.round(percent.value)}%`);
const ariaValueNow = computed(() => Math.round(percent.value));
const trackStyle = computed(() => ({ height: `${height}px` }));
const barStyle = computed(() =>
  indeterminate ? { width: '40%' } : { width: `${percent.value}%` },
);
</script>

<template>
  <div
    :class="
      cx(
        'sy-progress',
        `sy-progress--${status}`,
        indeterminate && 'sy-progress--indeterminate',
        $attrs.class as string,
      )
    "
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : ariaValueNow"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-busy="indeterminate || undefined"
  >
    <div class="sy-progress__track" :style="trackStyle">
      <div class="sy-progress__bar" :style="barStyle" />
    </div>
    <span v-if="showText && !indeterminate" class="sy-progress__text">{{ text }}</span>
  </div>
</template>

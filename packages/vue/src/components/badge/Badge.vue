<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { cx } from '../../utils/cx';
import type { ColorType } from '../../types';

defineOptions({ name: 'SyBadge' });

interface Props {
  /** Number (or short text) displayed in the badge. */
  count?: number | string;
  /** Renders a small dot instead of the count. @default false */
  dot?: boolean;
  /** Upper bound; larger numeric counts render as `${max}+`. @default 99 */
  max?: number;
  /** Whether a count of 0 is displayed. @default false */
  showZero?: boolean;
  /** Color of the badge. @default 'danger' */
  color?: ColorType;
}

const { count, dot = false, max = 99, showZero = false, color = 'danger' } = defineProps<Props>();

const slots = useSlots();

const countText = computed<string>(() => {
  if (typeof count === 'number') return count > max ? `${max}+` : String(count);
  return count ?? '';
});

const isEmpty = computed(() => {
  if (dot) return false;
  if (typeof count === 'number') return count === 0 && !showZero;
  return !count;
});

const countStyle = computed<CSSProperties | undefined>(() =>
  slots.default ? undefined : { position: 'static', transform: 'none' },
);

const ariaLabel = computed(() => (dot && countText.value ? countText.value : undefined));
</script>

<template>
  <span
    :class="
      cx('sy-badge', `sy-badge--${color}`, dot && 'sy-badge--dot', $attrs.class as string)
    "
  >
    <slot />
    <sup
      class="sy-badge__count"
      :class="{ 'is-empty': isEmpty, 'sy-badge__count--dot': dot }"
      :style="countStyle"
      :aria-label="ariaLabel"
    >{{ dot ? '' : countText }}</sup>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

defineOptions({ name: 'SySpace' });

interface Props {
  /** Gap between children: named size or pixels. @default 'md' */
  size?: ComponentSize | number;
  /** Stacks children vertically. @default false */
  vertical?: boolean;
  /** Allows children to wrap onto multiple lines. @default false */
  wrap?: boolean;
  /** Cross-axis alignment. Defaults to 'center' horizontally and 'stretch' vertically. */
  align?: 'start' | 'center' | 'end' | 'baseline';
}

const { size = 'md', vertical = false, wrap = false, align } = defineProps<Props>();

const sizeMod = computed(() => (typeof size === 'string' && size !== 'md' ? size : undefined));
const gapStyle = computed(() => (typeof size === 'number' ? { gap: `${size}px` } : undefined));
const alignStyle = computed(() => (align ? { alignItems: align } : undefined));
</script>

<template>
  <div
    :class="
      cx(
        'sy-space',
        sizeMod && `sy-space--${sizeMod}`,
        vertical && 'sy-space--vertical',
        wrap && 'sy-space--wrap',
        $attrs.class as string,
      )
    "
    :style="[gapStyle, alignStyle]"
  >
    <slot />
  </div>
</template>

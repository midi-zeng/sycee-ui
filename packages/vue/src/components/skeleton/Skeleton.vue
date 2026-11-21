<script setup lang="ts">
import { cx } from '../../utils/cx';

defineOptions({ name: 'SySkeleton' });

export type SkeletonShape = 'rect' | 'circle' | 'text';

interface Props {
  /** Width of the placeholder; any CSS width. */
  width?: number | string;
  /** Height of the placeholder; any CSS height. */
  height?: number | string;
  /** Shape of the placeholder. @default 'rect' */
  shape?: SkeletonShape;
  /** Enables the pulse animation. @default true */
  animated?: boolean;
}

const {
  width,
  height,
  shape = 'rect',
  animated = true,
} = defineProps<Props>();
</script>

<template>
  <!-- Decorative loading placeholder, hidden from assistive technology. -->
  <div
    :class="
      cx(
        'sy-skeleton',
        shape !== 'rect' && `sy-skeleton--${shape}`,
        animated && 'sy-skeleton--animated',
        $attrs.class as string,
      )
    "
    :style="{ width, height }"
    aria-hidden="true"
  />
</template>

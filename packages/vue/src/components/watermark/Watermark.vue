<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { createWatermarkPattern } from '@sycee-ui/utils';
import { cx } from '../../utils/cx';
import type { WatermarkProps } from './types';

defineOptions({ name: 'SyWatermark', inheritAttrs: false });

const {
  content,
  image,
  width = 180,
  height = 120,
  gap = 24,
  offset = [0, 0],
  rotate = -22,
  fontSize = 14,
  fontFamily,
  fontWeight = 500,
  color = '#1a1c25',
  opacity = 0.12,
  zIndex = 9,
  fullscreen = false,
} = defineProps<WatermarkProps>();

const attrs = useAttrs();
const slots = useSlots();

const rootAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
const rootStyle = computed(() => attrs.style as CSSProperties | undefined);
const pattern = computed(() =>
  createWatermarkPattern({
    content,
    image,
    width,
    height,
    gap,
    rotate,
    fontSize,
    fontFamily,
    fontWeight,
    color,
  }),
);
const overlayStyle = computed<CSSProperties>(() => ({
  backgroundImage: `url("${pattern.value.dataUrl}")`,
  backgroundPosition: `${offset[0] ?? 0}px ${offset[1] ?? 0}px`,
  backgroundSize: pattern.value.size,
  opacity: Number.isFinite(opacity) ? Math.min(1, Math.max(0, opacity)) : 0.12,
  zIndex,
}));
</script>

<template>
  <div
    :class="
      cx(
        'sy-watermark',
        !slots.default && 'sy-watermark--standalone',
        fullscreen && 'sy-watermark--fullscreen',
        attrs.class as string,
      )
    "
    :style="rootStyle"
    v-bind="rootAttrs"
  >
    <slot />
    <div class="sy-watermark__overlay" :style="overlayStyle" aria-hidden="true" />
  </div>
</template>

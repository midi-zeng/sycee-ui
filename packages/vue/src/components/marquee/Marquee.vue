<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { cx } from '../../utils/cx';
import type { MarqueeDirection } from './types';

defineOptions({ name: 'SyMarquee', inheritAttrs: false });

interface Props {
  direction?: MarqueeDirection;
  duration?: number;
  pauseOnHover?: boolean;
  fade?: boolean;
  gap?: string;
}

const {
  direction = 'left',
  duration = 18,
  pauseOnHover = true,
  fade = true,
  gap = '48px',
} = defineProps<Props>();

const attrs = useAttrs();
const rootStyle = computed(() => ({
  ...(attrs.style as object),
  '--sy-marquee-duration': `${Math.max(2, duration)}s`,
  '--sy-marquee-gap': gap,
}));
</script>

<template>
  <div
    :class="
      cx(
        'sy-marquee',
        `sy-marquee--${direction}`,
        pauseOnHover && 'sy-marquee--pause-on-hover',
        fade && 'sy-marquee--fade',
        attrs.class as string,
      )
    "
    :style="rootStyle"
  >
    <div class="sy-marquee__motion">
      <div class="sy-marquee__group"><slot /></div>
      <div class="sy-marquee__group" aria-hidden="true"><slot /></div>
    </div>
  </div>
</template>

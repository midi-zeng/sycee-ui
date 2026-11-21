<script setup lang="ts">
import { cx } from '../../utils/cx';
import type { ColorType } from '../../types';

defineOptions({ name: 'SyTimeline' });

export interface TimelineItem {
  /** Entry title. */
  title: string;
  /** Optional supporting text below the title. */
  description?: string;
  /** Dot color. @default 'neutral' */
  color?: ColorType;
}

interface Props {
  /** Entries rendered top to bottom. */
  items: TimelineItem[];
}

const { items } = defineProps<Props>();
</script>

<template>
  <div :class="cx('sy-timeline', $attrs.class as string)">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="cx('sy-timeline__item', `sy-timeline__item--${item.color ?? 'neutral'}`)"
    >
      <div class="sy-timeline__dot" />
      <div class="sy-timeline__content">
        <div class="sy-timeline__title">{{ item.title }}</div>
        <div v-if="item.description" class="sy-timeline__description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

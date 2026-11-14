<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyCard' });

interface Props {
  /** Card title; can also be provided via the #title slot. */
  title?: string;
  /** Elevates the card with a shadow on hover. */
  hoverable?: boolean;
  /** Hides the card border. */
  borderless?: boolean;
  /** Whether the body has padding; when false the body padding is removed. @default true */
  padding?: boolean;
}

const { title, hoverable = false, borderless = false, padding = true } = defineProps<Props>();

const slots = useSlots();

const hasHeader = computed(() => !!title || !!slots.title || !!slots.extra);
const bodyStyle = computed(() => (padding ? undefined : { padding: 0 }));
</script>

<template>
  <div
    :class="
      cx(
        'sy-card',
        hoverable && 'sy-card--hoverable',
        borderless && 'sy-card--borderless',
        $attrs.class as string,
      )
    "
  >
    <div v-if="hasHeader" class="sy-card__header">
      <div v-if="!!title || !!slots.title" class="sy-card__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="slots.extra" class="sy-card__extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="sy-card__body" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="slots.footer" class="sy-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

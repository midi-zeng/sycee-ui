<script setup lang="ts">
import { computed, provide } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

defineOptions({ name: 'SyAvatarGroup' });

interface Props {
  /** Default size applied to child avatars. */
  size?: number | ComponentSize;
  /**
   * Maximum number of visible avatars. Reserved for overflow truncation;
   * the +N indicator is not implemented yet (children are only overlapped).
   */
  max?: number;
}

const { size } = defineProps<Props>();

// Consumed by Avatar.vue (string key shared with Avatar.vue).
provide('sy-avatar-group', computed(() => size));
</script>

<template>
  <div :class="cx('sy-avatar-group', $attrs.class as string)">
    <slot />
  </div>
</template>

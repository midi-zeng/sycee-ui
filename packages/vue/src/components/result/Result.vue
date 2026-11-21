<script setup lang="ts">
import { cx } from '../../utils/cx';
import Icon from '../icon/Icon.vue';
import type { IconName } from '../icon/Icon.vue';

defineOptions({ name: 'SyResult' });

export type ResultStatus = 'info' | 'success' | 'warning' | 'danger';

const STATUS_ICONS: Record<ResultStatus, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

interface Props {
  /** Outcome kind; picks the color and default icon. @default 'info' */
  status?: ResultStatus;
  /** Result headline. */
  title?: string;
  /** Supporting text below the title. */
  description?: string;
}

const { status = 'info', title, description } = defineProps<Props>();
</script>

<template>
  <div :class="cx('sy-result', `sy-result--${status}`, $attrs.class as string)" role="status">
    <div class="sy-result__icon">
      <slot v-if="$slots.icon" name="icon" />
      <Icon v-else :name="STATUS_ICONS[status]" />
    </div>
    <div v-if="title || $slots.title" class="sy-result__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="description || $slots.description" class="sy-result__description">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.default" class="sy-result__extra">
      <slot />
    </div>
  </div>
</template>

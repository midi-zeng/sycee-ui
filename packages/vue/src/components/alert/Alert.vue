<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { cx } from '../../utils/cx';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyAlert' });

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

const TYPE_ICONS: Record<AlertType, 'info' | 'success' | 'warning' | 'danger'> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

interface Props {
  /** Kind of alert; picks the color and default icon. @default 'info' */
  type?: AlertType;
  /** Alert title; the `title` slot takes precedence. */
  title?: string;
  /** Shows the type icon. @default true */
  showIcon?: boolean;
  /** Shows a close button; the alert hides itself after closing. @default false */
  closable?: boolean;
}

const { type = 'info', title, showIcon = true, closable = false } = defineProps<Props>();

const emit = defineEmits<{ close: [event: MouseEvent] }>();

const slots = useSlots();
const hidden = ref(false);

const hasTitle = computed(
  () => !!slots.title || (title !== undefined && title !== null && title !== ''),
);
const hasDescription = computed(() => !!slots.default);

function handleClose(event: MouseEvent) {
  hidden.value = true;
  emit('close', event);
}
</script>

<template>
  <div
    v-if="!hidden"
    role="alert"
    :class="cx('sy-alert', `sy-alert--${type}`, $attrs.class as string)"
  >
    <div v-if="showIcon" class="sy-alert__icon">
      <slot name="icon">
        <Icon :name="TYPE_ICONS[type]" />
      </slot>
    </div>
    <div class="sy-alert__content">
      <div v-if="hasTitle" class="sy-alert__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasDescription" class="sy-alert__description">
        <slot />
      </div>
      <button
        v-if="closable"
        type="button"
        class="sy-alert__close"
        aria-label="Close"
        @click="handleClose"
      >
        <Icon name="close" />
      </button>
    </div>
  </div>
</template>

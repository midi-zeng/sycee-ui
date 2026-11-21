<script setup lang="ts">
import { defineComponent } from 'vue';
import type { PropType, VNode } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';
import type { IconName } from '../icon/Icon.vue';
import type { NotificationItem, NotificationType } from './notification';

defineOptions({ name: 'SyNotificationContainer' });

const TYPE_ICONS: Record<NotificationType, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

const { items, onClose } = defineProps<{
  items: NotificationItem[];
  onClose: (id: number) => void;
}>();
const t = useLocale();

// Renders notification content, which may be plain text or a VNode.
const ContentRenderer = defineComponent({
  props: {
    content: { type: [String, Object] as PropType<string | VNode | undefined>, default: undefined },
  },
  setup(props) {
    return () => props.content;
  },
});
</script>

<template>
  <div
    v-for="item in items"
    :key="item.id"
    :class="cx('sy-notification', `sy-notification--${item.type}`, item.closing && 'is-closing')"
  >
    <Icon class="sy-notification__icon" :name="TYPE_ICONS[item.type]" />
    <div class="sy-notification__body">
      <div class="sy-notification__title">
        <ContentRenderer v-if="typeof item.title === 'object'" :content="item.title" />
        <template v-else>{{ item.title }}</template>
      </div>
      <div v-if="item.content" class="sy-notification__content">
        <ContentRenderer :content="item.content" />
      </div>
    </div>
    <button
      type="button"
      class="sy-notification__close"
      :aria-label="t.close"
      @click="onClose(item.id)"
    >
      <Icon name="close" />
    </button>
  </div>
</template>

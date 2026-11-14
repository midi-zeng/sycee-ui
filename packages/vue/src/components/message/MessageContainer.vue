<script setup lang="ts">
import { defineComponent } from 'vue';
import type { PropType, VNode } from 'vue';
import { cx } from '../../utils/cx';
import Icon from '../icon/Icon.vue';
import type { MessageItem, MessageType } from './message';

defineOptions({ name: 'SyMessageContainer' });

const TYPE_ICONS: Record<MessageType, 'info' | 'success' | 'warning' | 'danger'> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

const { items } = defineProps<{ items: MessageItem[] }>();

// Renders message content, which may be plain text or a VNode.
const ContentRenderer = defineComponent({
  props: {
    content: { type: [String, Object] as PropType<string | VNode>, required: true },
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
    :class="cx('sy-message', `sy-message--${item.type}`, item.closing && 'is-closing')"
  >
    <Icon :name="TYPE_ICONS[item.type]" />
    <span class="sy-message__content">
      <ContentRenderer :content="item.content" />
    </span>
  </div>
</template>

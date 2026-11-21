<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { cx } from '../../utils/cx';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SySteps' });

export interface StepItem {
  /** Step label. */
  label: string;
  /** Optional supporting text below the label. */
  description?: string;
  /** Grays out the step and prevents selecting it. */
  disabled?: boolean;
}

interface Props {
  /** Ordered steps. */
  items: StepItem[];
  /** Index of the current step (0-based). @default 0 */
  active?: number;
}

const { items, active = 0 } = defineProps<Props>();

const emit = defineEmits<{ change: [index: number] }>();

// Steps are only clickable when the parent attached a change listener,
// mirroring the React `onChange` prop.
const instance = getCurrentInstance();
const clickable = instance?.vnode.props?.onChange !== undefined;

function isDone(index: number) {
  return index < active;
}

function isActive(index: number) {
  return index === active;
}

function select(index: number) {
  if (!items[index]?.disabled) emit('change', index);
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    select(index);
  }
}
</script>

<template>
  <div :class="cx('sy-steps', $attrs.class as string)">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="
        cx(
          'sy-steps__item',
          isDone(index) && 'is-done',
          isActive(index) && 'is-active',
          item.disabled && 'is-disabled',
          clickable && !item.disabled && 'is-clickable',
        )
      "
      :aria-current="isActive(index) ? 'step' : undefined"
      :role="clickable && !item.disabled ? 'button' : undefined"
      :tabindex="clickable && !item.disabled ? 0 : undefined"
      @click="clickable && !item.disabled && select(index)"
      @keydown="clickable && !item.disabled && onKeydown($event, index)"
    >
      <div class="sy-steps__marker">
        <Icon v-if="isDone(index)" name="check" />
        <template v-else>{{ index + 1 }}</template>
      </div>
      <div class="sy-steps__body">
        <span class="sy-steps__label">{{ item.label }}</span>
        <span v-if="item.description" class="sy-steps__description">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

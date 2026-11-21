<script setup lang="ts">
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ColorType } from '../../types';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyTag' });

export type TagVariant = 'soft' | 'solid' | 'outline';

interface Props {
  /** Color of the tag. @default 'neutral' */
  color?: ColorType;
  /** Visual variant. @default 'soft' */
  variant?: TagVariant;
  /** Size of the tag. @default 'md' */
  size?: 'sm' | 'md';
  /** Shows a close button. */
  closable?: boolean;
  disabled?: boolean;
}

const {
  color = 'neutral',
  variant = 'soft',
  size = 'md',
  closable = false,
  disabled = false,
} = defineProps<Props>();
const t = useLocale();

const emit = defineEmits<{ close: [event: MouseEvent] }>();

// The tag does not remove itself; the caller decides what `close` means.
function handleClose(event: MouseEvent) {
  if (disabled) return;
  emit('close', event);
}
</script>

<template>
  <span
    :class="
      cx(
        'sy-tag',
        `sy-tag--${color}`,
        `sy-tag--${variant}`,
        size !== 'md' && `sy-tag--${size}`,
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
    :aria-disabled="disabled || undefined"
  >
    <span v-if="$slots.icon" class="sy-tag__icon">
      <slot name="icon" />
    </span>
    <slot />
    <button
      v-if="closable"
      type="button"
      class="sy-tag__close"
      :aria-label="t.remove"
      :disabled="disabled"
      @click="handleClose"
    >
      <Icon name="close" />
    </button>
  </span>
</template>

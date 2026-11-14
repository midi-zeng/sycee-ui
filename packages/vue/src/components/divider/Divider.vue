<script setup lang="ts">
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyDivider' });

interface Props {
  /** Renders as a vertical line (inline element, no label). */
  vertical?: boolean;
  /** Dashed line style. */
  dashed?: boolean;
  /** Horizontal label alignment. @default 'center' */
  labelPlacement?: 'left' | 'center' | 'right';
}

const { vertical = false, dashed = false, labelPlacement = 'center' } = defineProps<Props>();
</script>

<template>
  <span
    v-if="vertical"
    :class="
      cx(
        'sy-divider',
        'sy-divider--vertical',
        dashed && 'sy-divider--dashed',
        dashed && 'sy-divider--vertical--dashed',
        $attrs.class as string,
      )
    "
    aria-hidden="true"
  />
  <div
    v-else
    :class="
      cx(
        'sy-divider',
        dashed && 'sy-divider--dashed',
        labelPlacement !== 'center' && `sy-divider--${labelPlacement}`,
        $attrs.class as string,
      )
    "
    role="separator"
  >
    <span v-if="$slots.default" class="sy-divider__label">
      <slot />
    </span>
  </div>
</template>

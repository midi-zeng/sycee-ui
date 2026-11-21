<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyRate' });

interface Props {
  /** Uncontrolled initial rating. @default 0 */
  defaultValue?: number;
  /** Number of stars. @default 5 */
  max?: number;
  /** Shows the current value without allowing changes. */
  readonly?: boolean;
  disabled?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
}

const {
  defaultValue = 0,
  max = 5,
  readonly = false,
  disabled = false,
  size = 'md',
} = defineProps<Props>();
const t = useLocale();

const model = defineModel<number>();

const emit = defineEmits<{ change: [value: number] }>();

const instance = getCurrentInstance();
const hasChangeListener = instance?.vnode.props?.onChange !== undefined;

// Hover previews the rating; otherwise the committed value is shown.
const hoverValue = ref<number | null>(null);

const current = computed(() => model.value ?? defaultValue);
const interactive = computed(() => !readonly && !disabled);
const display = computed(() =>
  interactive.value && hoverValue.value !== null ? hoverValue.value : current.value,
);

function select(next: number) {
  if (!interactive.value) return;
  model.value = next;
  if (hasChangeListener) emit('change', next);
}

function onKeyDown(event: KeyboardEvent) {
  if (!interactive.value) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault();
    select(Math.min(max, current.value + 1));
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault();
    select(Math.max(0, current.value - 1));
  }
}
</script>

<template>
  <div
    :class="
      cx(
        'sy-rate',
        size !== 'md' && `sy-rate--${size}`,
        readonly && 'is-readonly',
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
    role="slider"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="current"
    :aria-disabled="disabled || undefined"
    :aria-readonly="readonly || undefined"
    :tabindex="interactive ? 0 : undefined"
    @keydown="onKeyDown"
    @mouseleave="hoverValue = null"
  >
    <button
      v-for="star in max"
      :key="star"
      type="button"
      :class="cx('sy-rate__star', star <= display && 'is-active')"
      :aria-label="t.rate(star, max)"
      tabindex="-1"
      :disabled="disabled"
      @mouseenter="hoverValue = star"
      @click="select(star)"
    >
      <Icon name="star" />
    </button>
  </div>
</template>

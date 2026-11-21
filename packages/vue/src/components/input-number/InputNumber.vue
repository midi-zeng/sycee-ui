<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyInputNumber' });

interface Props {
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Lowest allowed value. @default -Infinity */
  min?: number;
  /** Highest allowed value. @default Infinity */
  max?: number;
  /** Increment/decrement amount. @default 1 */
  step?: number;
  /** Number of decimal places. */
  precision?: number;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default 'default' */
  status?: InputStatus;
  /** Shows the +/- buttons. @default true */
  controls?: boolean;
}

const {
  defaultValue = null,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  disabled = false,
  readonly = false,
  placeholder,
  size = 'md',
  status = 'default',
  controls = true,
} = defineProps<Props>();
const t = useLocale();

const model = defineModel<number | null>();

const emit = defineEmits<{ change: [value: number | null] }>();

// Raw text while the user is typing; committed on blur/Enter.
const draft = ref<string | null>(null);

const current = computed(() => (model.value === undefined ? defaultValue : model.value));

function clamp(next: number): number {
  let clamped = Math.min(max, Math.max(min, next));
  if (precision !== undefined) clamped = Number(clamped.toFixed(precision));
  return clamped;
}

function commit(next: number | null) {
  const clamped = next === null ? null : clamp(next);
  if (clamped !== model.value) {
    model.value = clamped;
    emit('change', clamped);
  }
  return clamped;
}

const display = computed(() => {
  if (draft.value !== null) return draft.value;
  const value = current.value;
  return value == null || Number.isNaN(value) ? '' : String(value);
});

function stepBy(direction: 1 | -1) {
  if (disabled || readonly) return;
  commit((current.value ?? 0) + direction * step);
  draft.value = null;
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    stepBy(1);
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    stepBy(-1);
  } else if (event.key === 'Enter') {
    (event.currentTarget as HTMLInputElement).blur();
  }
}

function onBlur() {
  if (draft.value === null) return;
  const parsed = draft.value.trim() === '' ? null : Number(draft.value);
  draft.value = null;
  if (parsed === null || Number.isNaN(parsed)) return;
  commit(parsed);
}

// Clear a pending draft when the value changes externally.
watch(
  () => model.value,
  () => {
    draft.value = null;
  },
);
</script>

<template>
  <div
    :class="
      cx(
        'sy-input-number',
        size !== 'md' && `sy-input-number--${size}`,
        status !== 'default' && `sy-input-number--${status}`,
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
  >
    <button
      v-if="controls"
      type="button"
      class="sy-input-number__decrease"
      :aria-label="t.decrease"
      :disabled="disabled || readonly"
      @click="stepBy(-1)"
    >
      <Icon name="minus" />
    </button>
    <input
      class="sy-input-number__native"
      type="text"
      inputmode="decimal"
      role="spinbutton"
      :aria-valuemin="min === -Infinity ? undefined : min"
      :aria-valuemax="max === Infinity ? undefined : max"
      :aria-valuenow="current ?? undefined"
      :aria-disabled="disabled || undefined"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :value="display"
      @input="draft = ($event.target as HTMLInputElement).value"
      @keydown="onKeyDown"
      @blur="onBlur"
    />
    <button
      v-if="controls"
      type="button"
      class="sy-input-number__increase"
      :aria-label="t.increase"
      :disabled="disabled || readonly"
      @click="stepBy(1)"
    >
      <Icon name="plus" />
    </button>
  </div>
</template>

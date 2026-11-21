<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SySlider' });

interface Props {
  /** Uncontrolled initial value. @default 0 */
  defaultValue?: number;
  /** Lowest allowed value. @default 0 */
  min?: number;
  /** Highest allowed value. @default 100 */
  max?: number;
  /** Increment granularity. @default 1 */
  step?: number;
  disabled?: boolean;
}

const {
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
} = defineProps<Props>();

const model = defineModel<number>();

const emit = defineEmits<{ change: [value: number] }>();

const instance = getCurrentInstance();
const hasChangeListener = instance?.vnode.props?.onChange !== undefined;

const trackRef = ref<HTMLDivElement | null>(null);
const dragging = ref(false);

const current = computed(() => model.value ?? defaultValue);
const range = computed(() => max - min);
const percent = computed(() =>
  range.value === 0 ? 0 : ((current.value - min) / range.value) * 100,
);

function snap(raw: number): number {
  const stepped = Math.round((raw - min) / step) * step + min;
  const clamped = Math.min(max, Math.max(min, stepped));
  // Avoid floating point drift, e.g. 0.30000000000000004.
  return Number(clamped.toFixed(10));
}

function setValue(next: number) {
  model.value = next;
  if (hasChangeListener) emit('change', next);
}

function valueFromPointer(clientX: number): number {
  const track = trackRef.value;
  if (!track) return current.value;
  const rect = track.getBoundingClientRect();
  const ratio = range.value === 0 ? 0 : (clientX - rect.left) / rect.width;
  return snap(min + Math.min(1, Math.max(0, ratio)) * range.value);
}

function onPointerDown(event: PointerEvent) {
  if (disabled) return;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  dragging.value = true;
  setValue(valueFromPointer(event.clientX));
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value || disabled) return;
  setValue(valueFromPointer(event.clientX));
}

function endDrag() {
  dragging.value = false;
}

function onKeyDown(event: KeyboardEvent) {
  if (disabled) return;
  const bigStep = Math.max(step, (max - min) / 10);
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault();
    setValue(snap(current.value + step));
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault();
    setValue(snap(current.value - step));
  } else if (event.key === 'PageUp') {
    event.preventDefault();
    setValue(snap(current.value + bigStep));
  } else if (event.key === 'PageDown') {
    event.preventDefault();
    setValue(snap(current.value - bigStep));
  } else if (event.key === 'Home') {
    event.preventDefault();
    setValue(min);
  } else if (event.key === 'End') {
    event.preventDefault();
    setValue(max);
  }
}
</script>

<template>
  <div
    :class="cx('sy-slider', disabled && 'is-disabled', $attrs.class as string)"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endDrag"
    @pointercancel="endDrag"
  >
    <div ref="trackRef" class="sy-slider__track">
      <div class="sy-slider__fill" :style="{ width: `${percent}%` }" />
      <div
        class="sy-slider__thumb"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="current"
        :aria-disabled="disabled || undefined"
        :aria-busy="dragging || undefined"
        :tabindex="disabled ? -1 : 0"
        :style="{ left: `${percent}%` }"
        @keydown="onKeyDown"
      />
    </div>
  </div>
</template>

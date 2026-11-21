<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyDatePicker', inheritAttrs: false });

interface Props {
  /** Uncontrolled initial date. */
  defaultValue?: string | null;
  /** Earliest selectable date (`YYYY-MM-DD`). */
  min?: string;
  /** Latest selectable date (`YYYY-MM-DD`). */
  max?: string;
  /** First day of the week; 0 = Sunday, 1 = Monday. @default 0 */
  weekStartsOn?: 0 | 1;
  disabled?: boolean;
  /** Placeholder; defaults to the active locale. */
  placeholder?: string;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default 'default' */
  status?: InputStatus;
}

const {
  defaultValue = null,
  min,
  max,
  weekStartsOn = 0,
  disabled = false,
  placeholder,
  size = 'md',
  status = 'default',
} = defineProps<Props>();
const t = useLocale();

const model = defineModel<string | null>();

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const PANEL_GAP = 6;
const PANEL_ESTIMATED_HEIGHT = 340;

// --- date helpers (local time, `YYYY-MM-DD` strings) -------------------------

function parseISO(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function formatISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

interface GridDay {
  date: Date;
  iso: string;
  outside: boolean;
}

/** Builds a 6×7 grid of days covering the displayed month. */
function buildGrid(year: number, month: number): GridDay[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(year, month, 1 - offset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    return {
      date,
      iso: formatISO(date),
      outside: date.getMonth() !== month,
    };
  });
}

// ----------------------------------------------------------------------------

const open = ref(false);
// Month shown in the panel; starts at the selected date (or today).
const view = ref<Date>(parseISO(model.value ?? defaultValue ?? formatISO(new Date())));

const rootRef = ref<HTMLDivElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);
const panelStyle = ref<{ top: number; left: number } | null>(null);

const todayIso = formatISO(new Date());

const grid = computed(() => buildGrid(view.value.getFullYear(), view.value.getMonth()));

const weekdays = computed(() => [
  ...WEEKDAY_LABELS.slice(weekStartsOn),
  ...WEEKDAY_LABELS.slice(0, weekStartsOn),
]);

const title = computed(
  () =>
    `${view.value.getFullYear()} – ${String(view.value.getMonth() + 1).padStart(2, '0')}`,
);

function isDisabledDay(iso: string): boolean {
  return (min !== undefined && iso < min) || (max !== undefined && iso > max);
}

function updatePosition() {
  const trigger = rootRef.value;
  if (!trigger) return;
  const rect = trigger.getBoundingClientRect();
  const panel = panelRef.value;
  const panelHeight = panel?.offsetHeight ?? PANEL_ESTIMATED_HEIGHT;
  const openUp =
    rect.bottom + PANEL_GAP + panelHeight > window.innerHeight &&
    rect.top - PANEL_GAP - panelHeight > 0;
  panelStyle.value = {
    top: openUp ? rect.top - PANEL_GAP - panelHeight : rect.bottom + PANEL_GAP,
    left: rect.left,
  };
}

// Measure the mounted panel after the DOM update.
watch(open, (isOpen) => {
  if (isOpen) nextTick(() => updatePosition());
});

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false;
}

function onDocumentMouseDown(event: MouseEvent) {
  const target = event.target as Node;
  if (panelRef.value?.contains(target)) return;
  if (rootRef.value?.contains(target)) return;
  open.value = false;
}

// Close on Escape or clicks outside the panel while it is shown.
watch(
  open,
  (isOpen, _previous, onCleanup) => {
    if (typeof document === 'undefined' || !isOpen) return;
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('mousedown', onDocumentMouseDown);
    onCleanup(() => {
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('mousedown', onDocumentMouseDown);
    });
  },
);

function toggleOpen() {
  if (disabled) return;
  if (!open.value && (model.value ?? defaultValue)) {
    // Re-open centered on the current selection.
    view.value = parseISO(model.value ?? defaultValue!);
  }
  open.value = !open.value;
}

function select(iso: string) {
  if (disabled || isDisabledDay(iso)) return;
  model.value = iso;
  open.value = false;
}

const attrs = useAttrs();
const rootStyle = computed(() => attrs.style);
const restAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

const panelPositionStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${panelStyle.value?.top ?? 0}px`,
  left: `${panelStyle.value?.left ?? 0}px`,
}));
</script>

<template>
  <div
    ref="rootRef"
    :class="
      cx(
        'sy-date-picker',
        size !== 'md' && `sy-date-picker--${size}`,
        status !== 'default' && `sy-date-picker--${status}`,
        disabled && 'is-disabled',
        open && 'is-open',
        $attrs.class as string,
      )
    "
    :style="rootStyle"
    v-bind="restAttrs"
    @click="toggleOpen"
  >
    <span
      :class="cx('sy-date-picker__value', !model && 'sy-date-picker__placeholder')"
    >
      {{ model ?? placeholder ?? t.selectDate }}
    </span>
    <Icon class="sy-date-picker__icon" name="calendar" />
    <Teleport to="body">
      <div v-if="open" ref="panelRef" class="sy-date-picker__panel" :style="panelPositionStyle">
        <div class="sy-date-picker__panel-header">
          <button
            type="button"
            class="sy-date-picker__panel-nav"
            :aria-label="t.previousMonth"
            @click.stop="view = addMonths(view, -1)"
          >
            <Icon name="chevron-left" />
          </button>
          <span class="sy-date-picker__panel-title">{{ title }}</span>
          <button
            type="button"
            class="sy-date-picker__panel-nav"
            :aria-label="t.nextMonth"
            @click.stop="view = addMonths(view, 1)"
          >
            <Icon name="chevron-right" />
          </button>
        </div>
        <div class="sy-date-picker__panel-weekdays" aria-hidden="true">
          <span v-for="label in weekdays" :key="label" class="sy-date-picker__panel-weekday">
            {{ label }}
          </span>
        </div>
        <div class="sy-date-picker__panel-grid" role="grid">
          <button
            v-for="day in grid"
            :key="day.iso"
            type="button"
            role="gridcell"
            :class="
              cx(
                'sy-date-picker__panel-day',
                day.outside && 'is-outside',
                day.iso === todayIso && 'is-today',
                day.iso === model && 'is-selected',
              )
            "
            :aria-selected="day.iso === model"
            :aria-disabled="isDisabledDay(day.iso) || undefined"
            :aria-label="day.iso"
            :disabled="disabled || isDisabledDay(day.iso)"
            @click.stop="select(day.iso)"
          >
            {{ day.date.getDate() }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

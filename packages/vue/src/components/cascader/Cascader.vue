<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyCascader', inheritAttrs: false });

export interface CascaderOption {
  /** Label shown for this level. */
  label: string;
  /** Value used in the selected path. */
  value: string | number;
  /** Child options; a leaf has none. */
  children?: CascaderOption[];
  /** Prevents selecting/expanding this option. */
  disabled?: boolean;
}

interface Props {
  /** Source options. */
  options: CascaderOption[];
  /** Shows a clear button when a path is selected. @default false */
  clearable?: boolean;
  disabled?: boolean;
  /** @default 'Select' */
  placeholder?: string;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default 'default' */
  status?: InputStatus;
}

const {
  options,
  clearable = false,
  disabled = false,
  placeholder,
  size = 'md',
  status = 'default',
} = defineProps<Props>();
const t = useLocale();

const model = defineModel<Array<string | number> | null>();

const PANEL_GAP = 6;
const PANEL_ESTIMATED_HEIGHT = 200;

interface Column {
  options: CascaderOption[];
  /** Index of the option currently highlighted in this column. */
  activeIndex: number | null;
}

const open = ref(false);
const columns = ref<Column[]>([{ options, activeIndex: null }]);

const rootRef = ref<HTMLDivElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);
const panelStyle = ref<{ top: number; left: number } | null>(null);

// Reset the columns to the top level whenever the panel opens.
watch(
  () => [open.value, options] as const,
  ([isOpen]) => {
    if (isOpen) columns.value = [{ options, activeIndex: null }];
  },
);

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

const selectedOptions = computed<CascaderOption[]>(() => {
  const path = model.value;
  if (!path) return [];
  let level = options;
  const picked: CascaderOption[] = [];
  for (const valueKey of path) {
    const match = level.find((option) => option.value === valueKey);
    if (!match) break;
    picked.push(match);
    level = match.children ?? [];
  }
  return picked;
});

const display = computed(() => selectedOptions.value.map((option) => option.label).join(' / '));

function toggleOpen() {
  if (disabled) return;
  open.value = !open.value;
}

function pick(columnIndex: number, option: CascaderOption) {
  if (option.disabled) return;
  const path = columns.value
    .slice(0, columnIndex)
    .map((column) => column.options[column.activeIndex ?? -1]?.value)
    .concat(option.value);
  if (option.children && option.children.length > 0) {
    // Branch: expand the next column and keep the panel open.
    const next = columns.value.slice(0, columnIndex + 1).map((column, index) =>
      index === columnIndex
        ? {
            ...column,
            activeIndex: column.options.findIndex((entry) => entry.value === option.value),
          }
        : column,
    );
    columns.value = [...next, { options: option.children, activeIndex: null }];
  } else {
    // Leaf: commit the path and close.
    const leafPath = path.filter((entry): entry is string | number => entry !== undefined);
    model.value = leafPath;
    open.value = false;
  }
}

function clear(event: MouseEvent) {
  event.stopPropagation();
  model.value = null;
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
        'sy-cascader',
        size !== 'md' && `sy-cascader--${size}`,
        status !== 'default' && `sy-cascader--${status}`,
        disabled && 'is-disabled',
        open && 'is-open',
        $attrs.class as string,
      )
    "
    :style="rootStyle"
    v-bind="restAttrs"
    @click="toggleOpen"
  >
    <span v-if="display" class="sy-cascader__value">{{ display }}</span>
      <span v-else class="sy-cascader__placeholder">{{ placeholder ?? t.select }}</span>
    <button
      v-if="clearable && model && model.length > 0 && !disabled"
      type="button"
      class="sy-cascader__clear"
      :aria-label="t.clear"
      @click="clear"
    >
      <Icon name="close" />
    </button>
    <Icon class="sy-cascader__icon" name="chevron-down" />
    <Teleport to="body">
      <div v-if="open" ref="panelRef" class="sy-cascader__panel" :style="panelPositionStyle">
        <ul
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="sy-cascader__panel-column"
          role="listbox"
        >
          <li v-for="option in column.options" :key="option.value">
            <button
              type="button"
              role="option"
              :aria-selected="column.activeIndex !== null && column.options[column.activeIndex]?.value === option.value"
              :class="
                cx(
                  'sy-cascader__panel-option',
                  column.activeIndex !== null &&
                    column.options[column.activeIndex]?.value === option.value &&
                    'is-active',
                  option.disabled && 'is-disabled',
                )
              "
              :aria-disabled="option.disabled || undefined"
              @click.stop="pick(columnIndex, option)"
            >
              <span>{{ option.label }}</span>
              <Icon v-if="option.children && option.children.length > 0" name="chevron-right" />
            </button>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

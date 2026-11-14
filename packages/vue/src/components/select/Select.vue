<script setup lang="ts">
import { computed, onUnmounted, ref, useId, watch } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize, InputStatus, SelectOption } from '../../types';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SySelect' });

interface Props {
  options?: SelectOption[];
  placeholder?: string;
  /** Size of the control. @default 'md' */
  size?: ComponentSize;
  disabled?: boolean;
  /** Shows a clear button when a value is selected. */
  clearable?: boolean;
  /** Validation state of the field. @default 'default' */
  status?: InputStatus;
}

const {
  options = [],
  placeholder,
  size = 'md',
  disabled = false,
  clearable = false,
  status = 'default',
} = defineProps<Props>();

const emit = defineEmits<{
  change: [value: string | number | null];
  clear: [];
}>();

const model = defineModel<string | number | null>();

// Approximate dropdown height used for the "not enough space below" flip check.
const DROPDOWN_ESTIMATED_HEIGHT = 240;

const isOpen = ref(false);
const activeIndex = ref(-1);
const dropUp = ref(false);
const rootRef = ref<HTMLDivElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const valueId = useId();
const listboxId = useId();

const hasValue = computed(() => model.value !== null && model.value !== undefined);
const selectedOption = computed(() => options.find((option) => option.value === model.value));
const selectedLabel = computed(() => {
  if (selectedOption.value) return selectedOption.value.label;
  return hasValue.value ? String(model.value) : null;
});
const showClear = computed(() => clearable && hasValue.value && !disabled);

function isSelected(option: SelectOption): boolean {
  return option.value === model.value;
}

function openDropdown() {
  if (disabled) return;
  const selectedIndex = options.findIndex((option) => option.value === model.value);
  activeIndex.value = selectedIndex >= 0 ? selectedIndex : 0;
  isOpen.value = true;
  // Flip the dropdown above the trigger when there is not enough room below.
  const root = rootRef.value;
  if (root) {
    const rect = root.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    dropUp.value = spaceBelow < DROPDOWN_ESTIMATED_HEIGHT && spaceAbove > spaceBelow;
  }
}

function selectOption(option: SelectOption) {
  if (option.disabled) return;
  model.value = option.value;
  emit('change', option.value);
  isOpen.value = false;
  triggerRef.value?.focus();
}

function handleClear() {
  model.value = null;
  emit('change', null);
  emit('clear');
}

function onTriggerClick() {
  if (isOpen.value) {
    isOpen.value = false;
  } else {
    openDropdown();
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (disabled) return;
  if (!isOpen.value) {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp'
    ) {
      event.preventDefault();
      openDropdown();
    }
    return;
  }
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      activeIndex.value = options.length === 0 ? -1 : (activeIndex.value + 1) % options.length;
      break;
    case 'ArrowUp':
      event.preventDefault();
      activeIndex.value =
        options.length === 0 ? -1 : (activeIndex.value - 1 + options.length) % options.length;
      break;
    case 'Home':
      event.preventDefault();
      activeIndex.value = 0;
      break;
    case 'End':
      event.preventDefault();
      activeIndex.value = options.length - 1;
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (activeIndex.value >= 0 && activeIndex.value < options.length) {
        selectOption(options[activeIndex.value]);
      }
      break;
    case 'Escape':
      // Do not let the event close parent overlays (e.g. a modal) as well.
      event.stopPropagation();
      isOpen.value = false;
      break;
    case 'Tab':
      isOpen.value = false;
      break;
  }
}

// Close on outside click; the listener lives only while open and is cleaned up
// on close/unmount.
function onDocMouseDown(event: MouseEvent) {
  const root = rootRef.value;
  if (root && event.target instanceof Node && !root.contains(event.target)) {
    isOpen.value = false;
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('mousedown', onDocMouseDown);
  } else {
    document.removeEventListener('mousedown', onDocMouseDown);
  }
});

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocMouseDown);
});
</script>

<template>
  <div
    ref="rootRef"
    :class="
      cx(
        'sy-select',
        size !== 'md' && `sy-select--${size}`,
        status !== 'default' && `sy-select--${status}`,
        disabled && 'is-disabled',
        isOpen && 'is-open',
        $attrs.class as string,
      )
    "
  >
    <button
      ref="triggerRef"
      type="button"
      role="combobox"
      class="sy-select__trigger"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-labelledby="valueId"
      :aria-controls="isOpen ? listboxId : undefined"
      :aria-activedescendant="
        isOpen && activeIndex >= 0 && activeIndex < options.length
          ? `${listboxId}-option-${activeIndex}`
          : undefined
      "
      :aria-disabled="disabled || undefined"
      :disabled="disabled"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <span :id="valueId" class="sy-select__value">
        <template v-if="hasValue">{{ selectedLabel }}</template>
        <span v-else class="sy-select__placeholder">{{ placeholder }}</span>
      </span>
      <span
        v-if="showClear"
        class="sy-select__clear"
        role="button"
        aria-label="Clear"
        @mousedown.prevent
        @click.stop="handleClear"
      >
        <Icon name="close" />
      </span>
      <span :class="cx('sy-select__arrow', isOpen && 'is-open')">
        <Icon name="chevron-down" />
      </span>
    </button>
    <div v-if="isOpen" :class="cx('sy-select__dropdown', dropUp && 'sy-select__dropdown--top')">
      <ul :id="listboxId" class="sy-select__list" role="listbox">
        <li
          v-for="(option, index) in options"
          :key="option.value"
          :id="`${listboxId}-option-${index}`"
          role="option"
          :class="
            cx(
              'sy-select__option',
              isSelected(option) && 'is-selected',
              index === activeIndex && 'is-active',
              option.disabled && 'is-disabled',
            )
          "
          :aria-selected="isSelected(option)"
          :aria-disabled="option.disabled || undefined"
          @mouseenter="activeIndex = index"
          @click="selectOption(option)"
        >
          {{ option.label }}
          <Icon v-if="isSelected(option)" name="check" />
        </li>
      </ul>
    </div>
  </div>
</template>

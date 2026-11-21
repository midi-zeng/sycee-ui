<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyDropdown', inheritAttrs: false });

export type DropdownPlacement = 'bottom' | 'top' | 'bottom-start' | 'bottom-end';

export interface DropdownOption {
  /** Label shown for the item. */
  label: string;
  /** Value reported by the `select` event; defaults to the label when omitted. */
  value?: string | number;
  /** Prevents selecting this item. */
  disabled?: boolean;
  /** Renders the item as a horizontal divider (`label` is ignored). */
  divider?: boolean;
}

interface Props {
  /** Menu items. */
  options?: DropdownOption[];
  /** Uncontrolled initial open state. @default false */
  defaultOpen?: boolean;
  /** Disables the dropdown. */
  disabled?: boolean;
}

const { options = [], defaultOpen = false, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  openChange: [open: boolean];
  select: [value: string | number];
}>();

const instance = getCurrentInstance();
const hasOpenChangeListener = instance?.vnode.props?.onOpenChange !== undefined;

const GAP = 6;
const MENU_ESTIMATED_HEIGHT = 200;

const isOpen = ref(defaultOpen);
const menuRef = ref<HTMLDivElement | null>(null);
const menuStyle = ref<{ top: number; left: number } | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

function setOpen(next: boolean) {
  isOpen.value = next;
  if (hasOpenChangeListener) emit('openChange', next);
}

function updatePosition() {
  const triggerElement = wrapperRef.value?.firstElementChild as HTMLElement | null;
  if (!triggerElement) return;
  const rect = triggerElement.getBoundingClientRect();
  const menu = menuRef.value;
  const menuHeight = menu?.offsetHeight ?? MENU_ESTIMATED_HEIGHT;
  const openUp =
    rect.bottom + GAP + menuHeight > window.innerHeight && rect.top - GAP - menuHeight > 0;
  menuStyle.value = {
    top: openUp ? rect.top - GAP - menuHeight : rect.bottom + GAP,
    left: rect.left,
  };
}

// Measure the mounted menu and refine the position after the DOM update.
watch(isOpen, (open) => {
  if (!open) return;
  nextTick(() => updatePosition());
});

function onTriggerClick() {
  if (disabled) return;
  setOpen(!isOpen.value);
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') setOpen(false);
}

function onDocumentMouseDown(event: MouseEvent) {
  const target = event.target as Node;
  if (menuRef.value?.contains(target)) return;
  if (wrapperRef.value?.contains(target)) return;
  setOpen(false);
}

// Close on Escape or outside clicks while the menu is shown.
watch(
  isOpen,
  (open, _previous, onCleanup) => {
    if (typeof document === 'undefined' || !open) return;
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('mousedown', onDocumentMouseDown);
    onCleanup(() => {
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('mousedown', onDocumentMouseDown);
    });
  },
);

function handleSelect(option: DropdownOption) {
  if (option.disabled) return;
  emit('select', option.value ?? option.label);
  setOpen(false);
}

const menuStyleComputed = computed(() => ({
  position: 'fixed' as const,
  top: `${menuStyle.value?.top ?? 0}px`,
  left: `${menuStyle.value?.left ?? 0}px`,
}));
</script>

<template>
  <span
    ref="wrapperRef"
    :class="cx('sy-dropdown', $attrs.class as string)"
    aria-haspopup="menu"
    :aria-expanded="isOpen || undefined"
    @click="onTriggerClick"
  >
    <slot />
    <Teleport to="body">
      <div v-if="isOpen" ref="menuRef" role="menu" class="sy-dropdown__menu" :style="menuStyleComputed">
        <template v-for="(option, index) in options" :key="index">
          <span
            v-if="option.divider"
            class="sy-dropdown__item sy-dropdown__item--divider"
          />
          <button
            v-else
            type="button"
            role="menuitem"
            :class="cx('sy-dropdown__item', option.disabled && 'is-disabled')"
            :disabled="option.disabled"
            @click="handleSelect(option)"
          >
            {{ option.label }}
          </button>
        </template>
      </div>
    </Teleport>
  </span>
</template>

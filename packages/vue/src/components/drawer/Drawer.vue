<script lang="ts">
export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
</script>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watch } from 'vue';
import { cx } from '../../utils/cx';
import { isTopOverlay, registerOverlay } from '../../utils/overlays';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyDrawer', inheritAttrs: false });

interface Props {
  /** Title rendered in the drawer header; the `title` slot takes precedence. */
  title?: string;
  /** Side the panel slides in from. @default 'right' */
  placement?: DrawerPlacement;
  /** Panel width for left/right drawers; numbers become px. @default 400 */
  width?: number | string;
  /** Panel height for top/bottom drawers; numbers become px. @default 320 */
  height?: number | string;
  /** Closes when the mask is clicked. @default true */
  maskClosable?: boolean;
  /** Closes when Escape is pressed. @default true */
  closeOnEsc?: boolean;
}

const {
  title,
  placement = 'right',
  width = 400,
  height = 320,
  maskClosable = true,
  closeOnEsc = true,
} = defineProps<Props>();
const t = useLocale();

const emit = defineEmits<{
  open: [];
  close: [];
}>();

const open = defineModel<boolean>('open', { default: false });

// `inheritAttrs: false` — fallthrough attrs go to the mask; class/style are
// bound explicitly below.
const attrs = useAttrs();
const maskStyle = computed(() => attrs.style);
const restAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

const titleId = useId();
const panelRef = ref<HTMLDivElement | null>(null);
let restoreFocus: HTMLElement | null = null;
let overlayId = 0;

const panelStyle = computed(() => {
  const value = (raw: number | string) => (typeof raw === 'number' ? `${raw}px` : raw);
  return placement === 'left' || placement === 'right'
    ? { width: value(width) }
    : { height: value(height) };
});

// Closes are caller-driven; every dismissal (close button, mask, Escape)
// emits `close` and updates the model.
function initiateClose() {
  emit('close');
  open.value = false;
}

function onMaskClick(event: MouseEvent) {
  if (!maskClosable) return;
  // Ignore clicks that originate inside the panel.
  const target = event.target;
  const panel = panelRef.value;
  if (target instanceof Node && panel && panel.contains(target)) return;
  initiateClose();
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    if (!closeOnEsc) return;
    // Only the topmost overlay responds to Escape.
    if (!isTopOverlay(overlayId)) return;
    event.stopPropagation();
    initiateClose();
    return;
  }
  if (event.key !== 'Tab') return;
  const panel = panelRef.value;
  if (!panel) return;
  const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const current = document.activeElement;
  const inside = current instanceof Node && panel.contains(current);
  if (event.shiftKey && (current === first || current === panel || !inside)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (current === last || !inside)) {
    event.preventDefault();
    first.focus();
  }
}

// Scroll lock, focus management and the `open` event while visible.
watch(
  () => open.value,
  (nowVisible, _previous, onCleanup) => {
    if (!nowVisible || typeof document === 'undefined') return;
    const registration = registerOverlay();
    overlayId = registration.id;
    restoreFocus = (document.activeElement as HTMLElement) ?? null;
    emit('open');
    nextTick(() => panelRef.value?.focus());
    onCleanup(() => {
      registration.release();
      const previous = restoreFocus;
      restoreFocus = null;
      previous?.focus();
    });
  },
);

// Escape closes the topmost overlay; Tab cycles within the panel.
watch(
  () => open.value,
  (nowVisible, _previous, onCleanup) => {
    if (!nowVisible || typeof document === 'undefined') return;
    document.addEventListener('keydown', onDocumentKeyDown);
    onCleanup(() => document.removeEventListener('keydown', onDocumentKeyDown));
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="sy-drawer">
      <div
        v-if="open"
        :class="cx('sy-drawer-mask', `sy-drawer-mask--${placement}`, $attrs.class as string)"
        :style="maskStyle"
        v-bind="restAttrs"
        @click="onMaskClick"
      >
        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          tabindex="-1"
          :class="cx('sy-drawer', `sy-drawer--${placement}`)"
          :style="panelStyle"
        >
          <div v-if="title || $slots.title" class="sy-drawer__header">
            <div :id="titleId" class="sy-drawer__title">
              <slot name="title">{{ title }}</slot>
            </div>
            <button
              type="button"
              class="sy-drawer__close"
              :aria-label="t.close"
              @click="initiateClose"
            >
              <Icon name="close" />
            </button>
          </div>
          <div class="sy-drawer__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

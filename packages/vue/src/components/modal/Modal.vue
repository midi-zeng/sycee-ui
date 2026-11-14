<script lang="ts">
// Module-level state shared by every Modal instance so nested dialogs behave
// correctly: one body scroll lock no matter how many are stacked, and a stack
// of open dialogs so Escape only closes the topmost one.
let scrollLockCount = 0;
let scrollLockPreviousOverflow = '';

let modalSeed = 0;
let modalStack: number[] = [];

function lockBodyScroll() {
  if (typeof document === 'undefined') return;
  if (scrollLockCount === 0) {
    scrollLockPreviousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return;
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = scrollLockPreviousOverflow;
  }
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watch } from 'vue';
import { cx } from '../../utils/cx';
import Button from '../button/Button.vue';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyModal', inheritAttrs: false });

interface Props {
  /** Title rendered in the dialog header; the `title` slot takes precedence. */
  title?: string;
  /** Width of the dialog panel; numbers become px. @default 460 */
  width?: number | string;
  /** Text of the confirm button. @default 'OK' */
  okText?: string;
  /** Text of the cancel button. @default 'Cancel' */
  cancelText?: string;
  /** Renders the default footer with OK/Cancel buttons. @default true */
  showFooter?: boolean;
  /** Closes when the mask is clicked. @default true */
  maskClosable?: boolean;
  /** Closes when Escape is pressed. @default true */
  closeOnEsc?: boolean;
}

const {
  title,
  width = 460,
  okText = 'OK',
  cancelText = 'Cancel',
  showFooter = true,
  maskClosable = true,
  closeOnEsc = true,
} = defineProps<Props>();

const emit = defineEmits<{
  ok: [];
  cancel: [];
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
let modalId = 0;

const visible = computed(() => open.value);

const panelStyle = computed(() => ({
  width: typeof width === 'number' ? `${width}px` : width,
}));

// Closes are caller-driven: `ok` only notifies, everything else (cancel,
// close button, mask, Escape) emits `close` and updates the model.
function initiateClose() {
  emit('close');
  open.value = false;
}

function handleOk() {
  emit('ok');
}

function handleCancel() {
  emit('cancel');
  initiateClose();
}

function handleCloseButton() {
  emit('cancel');
  initiateClose();
}

function onMaskClick(event: MouseEvent) {
  if (!maskClosable) return;
  // Ignore clicks that originate inside the dialog panel.
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
    // Only the topmost dialog responds to Escape.
    if (modalStack[modalStack.length - 1] !== modalId) return;
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
  visible,
  (nowVisible, _previous, onCleanup) => {
    if (!nowVisible || typeof document === 'undefined') return;
    modalId = (modalSeed += 1);
    modalStack.push(modalId);
    restoreFocus = (document.activeElement as HTMLElement) ?? null;
    lockBodyScroll();
    emit('open');
    nextTick(() => panelRef.value?.focus());
    onCleanup(() => {
      modalStack = modalStack.filter((entry) => entry !== modalId);
      unlockBodyScroll();
      const previous = restoreFocus;
      restoreFocus = null;
      previous?.focus();
    });
  },
  { immediate: true },
);

// Escape closes the topmost dialog; Tab cycles within the panel.
watch(
  visible,
  (nowVisible, _previous, onCleanup) => {
    if (!nowVisible || typeof document === 'undefined') return;
    document.addEventListener('keydown', onDocumentKeyDown);
    onCleanup(() => document.removeEventListener('keydown', onDocumentKeyDown));
  },
  { immediate: true },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="sy-modal">
      <div
        v-if="visible"
        :class="cx('sy-modal-mask', $attrs.class as string)"
        :style="maskStyle"
        v-bind="restAttrs"
        @click="onMaskClick"
      >
        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
          class="sy-modal"
          :style="panelStyle"
        >
          <div class="sy-modal__header">
            <div :id="titleId" class="sy-modal__title">
              <slot name="title">{{ title }}</slot>
            </div>
            <button
              type="button"
              class="sy-modal__close"
              aria-label="Close"
              @click="handleCloseButton"
            >
              <Icon name="close" />
            </button>
          </div>
          <div class="sy-modal__body">
            <slot />
          </div>
          <div v-if="showFooter" class="sy-modal__footer">
            <slot name="footer">
              <Button variant="ghost" @click="handleCancel">{{ cancelText }}</Button>
              <Button variant="solid" @click="handleOk">{{ okText }}</Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

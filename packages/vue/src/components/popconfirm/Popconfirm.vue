<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, useSlots, watch } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Button from '../button/Button.vue';

defineOptions({ name: 'SyPopconfirm', inheritAttrs: false });

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

interface Props {
  /** Confirmation question shown as the bubble headline. */
  title?: string;
  /** Optional supporting text below the title. */
  content?: string;
  /** Placement relative to the trigger; flips when it would overflow the viewport. @default 'top' */
  placement?: PopconfirmPlacement;
  /** Text of the confirm button. Defaults to the active locale. */
  okText?: string;
  /** Text of the cancel button. Defaults to the active locale. */
  cancelText?: string;
  /** Renders the confirm button in the danger color (destructive actions). */
  danger?: boolean;
  /** Disables the popconfirm. */
  disabled?: boolean;
}

const {
  title,
  content,
  placement = 'top',
  okText,
  cancelText,
  danger = false,
  disabled = false,
} = defineProps<Props>();
const t = useLocale();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

interface BubblePosition {
  top: number;
  left: number;
  transform: string;
  arrowTop: number;
  arrowLeft: number;
}

const GAP = 8;
const ARROW_SIZE = 8;
const BUBBLE_ESTIMATED_WIDTH = 220;
const BUBBLE_ESTIMATED_HEIGHT = 110;

const open = ref(false);
const pos = ref<BubblePosition | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);
const bubbleRef = ref<HTMLDivElement | null>(null);
const titleId = useId();

const slots = useSlots();
const hasContent = computed(() => Boolean(title || content) || !!slots.default);
const showBubble = computed(() => open.value && !disabled && hasContent.value);

function closeBubble() {
  open.value = false;
}

function onTriggerClick(event: MouseEvent) {
  event.stopPropagation();
  if (disabled) return;
  open.value = !open.value;
}

function handleConfirm() {
  emit('confirm');
  closeBubble();
}

function handleCancel() {
  emit('cancel');
  closeBubble();
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeBubble();
}

function onDocumentMouseDown(event: MouseEvent) {
  const target = event.target as Node;
  if (bubbleRef.value?.contains(target)) return;
  if (wrapperRef.value?.contains(target)) return;
  closeBubble();
}

function updatePosition() {
  const triggerElement = wrapperRef.value?.firstElementChild as HTMLElement | null;
  if (!triggerElement) return;
  const rect = triggerElement.getBoundingClientRect();
  const bubble = bubbleRef.value;
  const bubbleWidth = bubble?.offsetWidth ?? BUBBLE_ESTIMATED_WIDTH;
  const bubbleHeight = bubble?.offsetHeight ?? BUBBLE_ESTIMATED_HEIGHT;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let resolved = placement;
  if (placement === 'top' && rect.top - GAP - bubbleHeight < 0) resolved = 'bottom';
  else if (placement === 'bottom' && rect.bottom + GAP + bubbleHeight > window.innerHeight) resolved = 'top';
  else if (placement === 'left' && rect.left - GAP - bubbleWidth < 0) resolved = 'right';
  else if (placement === 'right' && rect.right + GAP + bubbleWidth > window.innerWidth) resolved = 'left';

  switch (resolved) {
    case 'bottom':
      pos.value = {
        top: rect.bottom + GAP,
        left: centerX,
        transform: 'translate(-50%, 0)',
        arrowTop: -ARROW_SIZE / 2,
        arrowLeft: bubbleWidth / 2 - ARROW_SIZE / 2,
      };
      break;
    case 'left':
      pos.value = {
        top: centerY,
        left: rect.left - GAP - bubbleWidth,
        transform: 'translate(0, -50%)',
        arrowTop: bubbleHeight / 2 - ARROW_SIZE / 2,
        arrowLeft: bubbleWidth - ARROW_SIZE / 2,
      };
      break;
    case 'right':
      pos.value = {
        top: centerY,
        left: rect.right + GAP,
        transform: 'translate(0, -50%)',
        arrowTop: bubbleHeight / 2 - ARROW_SIZE / 2,
        arrowLeft: -ARROW_SIZE / 2,
      };
      break;
    default: // 'top'
      pos.value = {
        top: rect.top - GAP - bubbleHeight,
        left: centerX,
        transform: 'translate(-50%, 0)',
        arrowTop: bubbleHeight - ARROW_SIZE / 2,
        arrowLeft: bubbleWidth / 2 - ARROW_SIZE / 2,
      };
  }
}

// Measure the mounted bubble and refine the position after the DOM update.
watch(showBubble, (shown) => {
  if (!shown) return;
  nextTick(() => updatePosition());
});

// Close on Escape or outside clicks while the bubble is shown.
watch(
  showBubble,
  (shown, _previous, onCleanup) => {
    if (typeof document === 'undefined' || !shown) return;
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('mousedown', onDocumentMouseDown);
    onCleanup(() => {
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('mousedown', onDocumentMouseDown);
    });
  },
);

// `inheritAttrs: false` — fallthrough attrs go to the wrapper span; class/style
// are bound explicitly below.
const attrs = useAttrs();
const rootStyle = computed(() => attrs.style);
const restAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

const bubbleStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${pos.value?.top ?? 0}px`,
  left: `${pos.value?.left ?? 0}px`,
  transform: pos.value?.transform,
}));

const arrowStyle = computed(() => ({
  top: `${pos.value?.arrowTop ?? 0}px`,
  left: `${pos.value?.arrowLeft ?? 0}px`,
  transform: 'rotate(45deg)',
}));
</script>

<template>
  <span
    ref="wrapperRef"
    :class="cx('sy-popconfirm', $attrs.class as string)"
    :style="rootStyle"
    v-bind="restAttrs"
    :aria-expanded="showBubble || undefined"
    @click="onTriggerClick"
  >
    <slot />
    <Teleport to="body">
      <div
        v-if="showBubble"
        ref="bubbleRef"
        class="sy-popconfirm__bubble"
        :style="bubbleStyle"
        :aria-labelledby="title ? titleId : undefined"
      >
        <div v-if="title" :id="titleId" class="sy-popconfirm__title">{{ title }}</div>
        <div v-if="content" class="sy-popconfirm__description">{{ content }}</div>
        <div class="sy-popconfirm__actions">
          <Button size="sm" variant="ghost" @click="handleCancel">
            {{ cancelText ?? t.cancel }}
          </Button>
          <Button size="sm" variant="solid" :color="danger ? 'danger' : 'primary'" @click="handleConfirm">
            {{ okText ?? t.ok }}
          </Button>
        </div>
        <span class="sy-popconfirm__arrow" :style="arrowStyle" />
      </div>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useAttrs, useId, useSlots, watch } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyTooltip', inheritAttrs: false });

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipTrigger = 'hover' | 'click' | 'focus';

interface Props {
  /** Tooltip content; the bubble is not rendered when empty. */
  content?: string;
  /** Placement relative to the trigger; flips when it would overflow the viewport. @default 'top' */
  placement?: TooltipPlacement;
  /** Interaction that opens the tooltip. @default 'hover' */
  trigger?: TooltipTrigger;
  /** Disables the tooltip. */
  disabled?: boolean;
  /** @default 'dark' */
  theme?: 'dark' | 'light';
}

const {
  content,
  placement = 'top',
  trigger = 'hover',
  disabled = false,
  theme = 'dark',
} = defineProps<Props>();

interface BubblePosition {
  top: number;
  left: number;
  transform: string;
  arrowTop: number;
  arrowLeft: number;
}

const OPEN_DELAY = 120;
const GAP = 8;
const ARROW_SIZE = 8;
const BUBBLE_ESTIMATED_WIDTH = 120;
const BUBBLE_ESTIMATED_HEIGHT = 32;

const open = ref(false);
const pos = ref<BubblePosition | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);
const bubbleRef = ref<HTMLDivElement | null>(null);
const bubbleId = useId();
let openTimer: number | null = null;

const slots = useSlots();
const hasContent = computed(() => (content !== undefined && content !== '') || !!slots.content);
const showBubble = computed(() => open.value && !disabled && hasContent.value);

function clearOpenTimer() {
  if (openTimer !== null) {
    window.clearTimeout(openTimer);
    openTimer = null;
  }
}

function openBubble() {
  clearOpenTimer();
  openTimer = window.setTimeout(() => {
    openTimer = null;
    open.value = true;
  }, OPEN_DELAY);
}

function openBubbleNow() {
  clearOpenTimer();
  open.value = true;
}

function closeBubble() {
  clearOpenTimer();
  open.value = false;
}

function toggleBubble() {
  if (open.value) closeBubble();
  else openBubbleNow();
}

// Event handlers sit on the inline-flex wrapper and are filtered by the
// `trigger` prop; `focusin`/`focusout` bubble from the slotted trigger.
function onTriggerEnter() {
  if (trigger !== 'hover' || disabled) return;
  openBubble();
}

function onTriggerLeave() {
  if (trigger !== 'hover' || disabled) return;
  closeBubble();
}

function onTriggerFocus() {
  if (trigger !== 'focus' || disabled) return;
  openBubble();
}

function onTriggerBlur() {
  if (trigger !== 'focus' || disabled) return;
  closeBubble();
}

function onTriggerClick() {
  if (trigger !== 'click' || disabled) return;
  toggleBubble();
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeBubble();
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

// Measure the mounted bubble and refine the position after the DOM update;
// re-run when the placement changes while the bubble is shown.
watch([showBubble, () => placement], ([shown]) => {
  if (!shown) return;
  nextTick(() => updatePosition());
});

// Close on Escape while the bubble is shown.
watch(
  showBubble,
  (shown, _previous, onCleanup) => {
    if (typeof document === 'undefined' || !shown) return;
    document.addEventListener('keydown', onDocumentKeyDown);
    onCleanup(() => document.removeEventListener('keydown', onDocumentKeyDown));
  },
);

// Never leave a pending open timer behind.
onUnmounted(clearOpenTimer);

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
    :class="cx('sy-tooltip', $attrs.class as string)"
    :style="rootStyle"
    v-bind="restAttrs"
    :aria-describedby="showBubble ? bubbleId : undefined"
    @mouseenter="onTriggerEnter"
    @mouseleave="onTriggerLeave"
    @focusin="onTriggerFocus"
    @focusout="onTriggerBlur"
    @click="onTriggerClick"
  >
    <slot />
    <Teleport to="body">
      <div
        v-if="showBubble"
        :id="bubbleId"
        ref="bubbleRef"
        role="tooltip"
        :class="cx('sy-tooltip__bubble', theme === 'light' && 'sy-tooltip__bubble--light')"
        :style="bubbleStyle"
      >
        <slot name="content">{{ content }}</slot>
        <span
          :class="cx('sy-tooltip__arrow', theme === 'light' && 'sy-tooltip__arrow--light')"
          :style="arrowStyle"
        />
      </div>
    </Teleport>
  </span>
</template>

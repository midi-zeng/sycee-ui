<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue';
import type { ComponentPublicInstance, FunctionalComponent, VNodeChild } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

defineOptions({ name: 'SyTabs' });

export interface TabItem {
  /** Visible label of the tab. */
  label: string;
  /** Unique value identifying the tab. */
  value: string | number;
  /** Disables the tab. */
  disabled?: boolean;
  /** Content rendered in the tab panel while the tab is active. */
  content?: string | VNodeChild;
}

interface Props {
  /** Tab definitions. */
  items?: TabItem[];
  /** Size of the tabs. @default 'md' */
  size?: ComponentSize;
}

const { items, size = 'md' } = defineProps<Props>();

const emit = defineEmits<{ change: [value: string | number] }>();

const model = defineModel<string | number>('active');

const navRef = ref<HTMLDivElement | null>(null);
const tabRefs = new Map<string | number, HTMLElement>();
const uid = useId();

// Uncontrolled fallback, seeded from the model or the first enabled tab.
const innerActive = ref<string | number | undefined>(
  model.value ?? items?.find((item) => !item.disabled)?.value,
);
const focusedValue = ref<string | number | undefined>();
const indicator = ref<{ width: number; x: number }>();

const activeValue = computed(() => model.value ?? innerActive.value);
const activeItem = computed(() => (items ?? []).find((item) => item.value === activeValue.value));
const enabledItems = computed(() => (items ?? []).filter((item) => !item.disabled));
const hasContent = computed(() => (items ?? []).some((item) => item.content != null));
const rovingValue = computed(() => {
  const focused = focusedValue.value;
  if (focused !== undefined && (items ?? []).some((item) => item.value === focused)) {
    return focused;
  }
  return activeValue.value;
});

const indicatorStyle = computed(() =>
  indicator.value
    ? { width: `${indicator.value.width}px`, transform: `translateX(${indicator.value.x}px)` }
    : undefined,
);

const tabId = (value: string | number) => `${uid}-tab-${value}`;
const paneId = (value: string | number) => `${uid}-pane-${value}`;

// Renders raw pane content (string or VNodeChild) without treating plain
// strings as tag names.
const PaneContent: FunctionalComponent<{ content: VNodeChild }> = (props) => props.content;
PaneContent.props = ['content'];

function select(value: string | number) {
  if (value === activeValue.value) return;
  model.value = value;
}

// Sync the uncontrolled fallback and announce the new active value whenever
// the model changes (from a user action or from the parent).
watch(model, (value) => {
  if (value === undefined) return;
  if (innerActive.value !== value) innerActive.value = value;
  emit('change', value);
});

function focusTab(item: TabItem) {
  focusedValue.value = item.value;
  tabRefs.get(item.value)?.focus();
}

function onTabClick(item: TabItem) {
  if (item.disabled) return;
  focusedValue.value = item.value;
  select(item.value);
}

function onNavKeydown(event: KeyboardEvent) {
  if (enabledItems.value.length === 0) return;
  const currentIndex = enabledItems.value.findIndex((item) => item.value === rovingValue.value);
  switch (event.key) {
    case 'ArrowRight': {
      const index = currentIndex < 0 ? 0 : (currentIndex + 1) % enabledItems.value.length;
      event.preventDefault();
      focusTab(enabledItems.value[index]);
      break;
    }
    case 'ArrowLeft': {
      const index =
        currentIndex < 0
          ? enabledItems.value.length - 1
          : (currentIndex - 1 + enabledItems.value.length) % enabledItems.value.length;
      event.preventDefault();
      focusTab(enabledItems.value[index]);
      break;
    }
    case 'Home': {
      event.preventDefault();
      focusTab(enabledItems.value[0]);
      break;
    }
    case 'End': {
      event.preventDefault();
      focusTab(enabledItems.value[enabledItems.value.length - 1]);
      break;
    }
    case 'Enter':
    case ' ': {
      const item = enabledItems.value.find((entry) => entry.value === rovingValue.value);
      if (!item) return;
      event.preventDefault();
      select(item.value);
      break;
    }
    default:
      break;
  }
}

function setActiveRef(el: Element | ComponentPublicInstance | null, value: string | number) {
  if (el instanceof HTMLElement) {
    tabRefs.set(value, el);
  } else {
    tabRefs.delete(value);
  }
}

function updateIndicator() {
  const nav = navRef.value;
  const tab = activeItem.value ? tabRefs.get(activeItem.value.value) : undefined;
  if (!nav || !tab) {
    indicator.value = undefined;
    return;
  }
  const navRect = nav.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  indicator.value = { width: tabRect.width, x: tabRect.left - navRect.left };
}

let observer: ResizeObserver | undefined;

onMounted(() => {
  observer = new ResizeObserver(updateIndicator);
  if (navRef.value) observer.observe(navRef.value);
  requestAnimationFrame(updateIndicator);
});

onUnmounted(() => observer?.disconnect());

watch(activeItem, () => {
  nextTick(updateIndicator);
});
</script>

<template>
  <div :class="cx('sy-tabs', size !== 'md' && `sy-tabs--${size}`, $attrs.class as string)">
    <div ref="navRef" role="tablist" class="sy-tabs__nav" @keydown="onNavKeydown">
      <button
        v-for="item in items ?? []"
        :key="item.value"
        :ref="(el) => setActiveRef(el, item.value)"
        type="button"
        role="tab"
        :id="tabId(item.value)"
        :aria-selected="item.value === activeValue"
        :disabled="item.disabled"
        :tabindex="item.value === rovingValue ? 0 : -1"
        :class="
          cx(
            'sy-tabs__tab',
            item.value === activeValue && 'is-active',
            item.disabled && 'is-disabled',
          )
        "
        @click="onTabClick(item)"
      >
        {{ item.label }}
      </button>
      <span
        v-if="activeItem"
        class="sy-tabs__indicator"
        aria-hidden="true"
        :style="indicatorStyle"
      />
    </div>
    <div v-if="hasContent" class="sy-tabs__panes">
      <div
        v-if="activeItem"
        :key="activeItem.value"
        :id="paneId(activeItem.value)"
        role="tabpanel"
        :aria-labelledby="tabId(activeItem.value)"
        tabindex="0"
        class="sy-tabs__pane is-active"
      >
        <component :is="PaneContent" :content="activeItem.content" />
      </div>
    </div>
  </div>
</template>

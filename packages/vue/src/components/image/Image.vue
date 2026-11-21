<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useAttrs, watch } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';
import Spinner from '../spinner/Spinner.vue';

defineOptions({ name: 'SyImage', inheritAttrs: false });

interface Props {
  /** Image source. */
  src: string;
  /** Alternative text. */
  alt?: string;
  /** Inline width of the image box. */
  width?: number | string;
  /** Inline height of the image box. */
  height?: number | string;
  /** Enables the fullscreen preview on click. @default true */
  preview?: boolean;
  /** Text shown when the image fails to load. Defaults to the active locale. */
  errorText?: string;
}

const {
  src,
  alt,
  width,
  height,
  preview = true,
  errorText,
} = defineProps<Props>();
const t = useLocale();

// `inheritAttrs: false` — fallthrough attrs go to the wrapper span; class/style
// are bound explicitly below.
const attrs = useAttrs();

const status = ref<'loading' | 'success' | 'error'>('loading');
const viewerOpen = ref(false);
const viewerRef = ref<HTMLDivElement | null>(null);
let restoreFocus: HTMLElement | null = null;

function openViewer() {
  if (!preview || status.value !== 'success') return;
  viewerOpen.value = true;
}

function closeViewer() {
  viewerOpen.value = false;
}

function onViewerClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closeViewer();
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeViewer();
}

// While the viewer is open: Escape closes it and focus moves in/out.
watch(viewerOpen, (nowVisible, _previous, onCleanup) => {
  if (!nowVisible || typeof document === 'undefined') return;
  restoreFocus = (document.activeElement as HTMLElement) ?? null;
  nextTick(() => viewerRef.value?.focus());
  document.addEventListener('keydown', onDocumentKeyDown);
  onCleanup(() => {
    document.removeEventListener('keydown', onDocumentKeyDown);
    const previous = restoreFocus;
    restoreFocus = null;
    previous?.focus();
  });
});

watch(
  () => src,
  () => {
    status.value = 'loading';
    viewerOpen.value = false;
  },
);

onUnmounted(() => {
  viewerOpen.value = false;
});

const rootStyle = computed(() => ({ width, height, ...(attrs.style as object) }));
const restAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <span
    :class="
      cx(
        'sy-image',
        status === 'loading' && 'is-loading',
        status === 'error' && 'is-error',
        preview && 'sy-image--preview',
        $attrs.class as string,
      )
    "
    :style="rootStyle"
    v-bind="restAttrs"
    @click="openViewer"
  >
    <img
      v-if="status !== 'error'"
      :key="src"
      class="sy-image__img"
      :src="src"
      :alt="alt"
      :width="typeof width === 'number' ? width : undefined"
      :height="typeof height === 'number' ? height : undefined"
      :style="{ width, height }"
      @load="status = 'success'"
      @error="status = 'error'"
    />
    <span v-if="status === 'loading'" class="sy-image__overlay" aria-hidden="true">
      <Spinner size="sm" />
    </span>
    <span
      v-else-if="status === 'error'"
      class="sy-image__error"
      :role="alt ? undefined : 'img'"
      :aria-label="alt"
    >
      <Icon name="eye-off" />
      {{ errorText ?? t.previewUnavailable }}
    </span>
    <Teleport to="body">
      <Transition name="sy-image-viewer">
        <div
          v-if="viewerOpen"
          ref="viewerRef"
          role="dialog"
          aria-modal="true"
          :aria-label="alt ?? t.imagePreview"
          tabindex="-1"
          class="sy-image-viewer"
          @click="onViewerClick"
        >
          <img class="sy-image-viewer__img" :src="src" :alt="alt" />
          <button
            type="button"
            class="sy-image-viewer__close"
            :aria-label="t.close"
            @click="closeViewer"
          >
            <Icon name="close" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

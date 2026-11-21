<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Spinner from '../spinner/Spinner.vue';

defineOptions({ name: 'SyInfiniteScroll' });

interface Props {
  /** Shows loading state and suspends observation. @default false */
  loading?: boolean;
  /** Shows the end state and suspends observation while true. @default false */
  finished?: boolean;
  /** Shows an error state and suspends observation until retry. @default false */
  error?: boolean;
  /** Suspends observation without changing the rendered content. @default false */
  disabled?: boolean;
  /** Distance in pixels before the sentinel at which loading starts. @default 120 */
  distance?: number;
  /** Makes the component a fixed-height scroll container. Omit to use page scrolling. */
  height?: number | string;
}

const {
  loading = false,
  finished = false,
  error = false,
  disabled = false,
  distance = 120,
  height,
} = defineProps<Props>();
const emit = defineEmits<{ loadMore: [] }>();
const t = useLocale();

const rootEl = ref<HTMLDivElement | null>(null);
const sentinelEl = ref<HTMLDivElement | null>(null);
const contained = computed(() => height !== undefined);
const heightStyle = computed(() =>
  height === undefined ? undefined : { height: typeof height === 'number' ? `${height}px` : height },
);

watchEffect((onCleanup) => {
  const sentinel = sentinelEl.value;
  if (!sentinel || loading || finished || error || disabled) return;

  const scrollRoot = contained.value ? rootEl.value : null;
  if (contained.value && !scrollRoot) return;

  let triggered = false;
  const trigger = () => {
    if (triggered) return;
    triggered = true;
    emit('loadMore');
  };

  if (typeof IntersectionObserver === 'undefined') {
    const target: HTMLElement | Window = scrollRoot ?? window;
    const check = () => {
      const sentinelRect = sentinel.getBoundingClientRect();
      const boundary = scrollRoot
        ? scrollRoot.getBoundingClientRect().bottom
        : window.innerHeight || document.documentElement.clientHeight;
      if (sentinelRect.top <= boundary + distance) trigger();
    };

    target.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const frame = window.requestAnimationFrame(check);
    onCleanup(() => {
      target.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.cancelAnimationFrame(frame);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) trigger();
    },
    {
      root: scrollRoot,
      rootMargin: `0px 0px ${Math.max(0, distance)}px 0px`,
    },
  );
  observer.observe(sentinel);
  onCleanup(() => observer.disconnect());
});
</script>

<template>
  <div
    ref="rootEl"
    :class="
      cx(
        'sy-infinite-scroll',
        contained && 'sy-infinite-scroll--contained',
        loading && 'is-loading',
        error && 'is-error',
        finished && 'is-finished',
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
    :style="heightStyle"
    :aria-busy="loading || undefined"
  >
    <div class="sy-infinite-scroll__content">
      <slot />
    </div>
    <div class="sy-infinite-scroll__footer">
      <div v-if="loading" class="sy-infinite-scroll__status" role="status" aria-live="polite">
        <Spinner size="sm" color="neutral" aria-hidden="true" />
        <span><slot name="loading">{{ t.loadingMore }}</slot></span>
      </div>
      <div v-else-if="error" class="sy-infinite-scroll__status" role="alert">
        <span><slot name="error">{{ t.loadError }}</slot></span>
        <button type="button" class="sy-infinite-scroll__retry" @click="emit('loadMore')">
          {{ t.retry }}
        </button>
      </div>
      <div
        v-else-if="finished"
        class="sy-infinite-scroll__status"
        role="status"
        aria-live="polite"
      >
        <span><slot name="finished">{{ t.noMore }}</slot></span>
      </div>
      <div ref="sentinelEl" class="sy-infinite-scroll__sentinel" aria-hidden="true" />
    </div>
  </div>
</template>

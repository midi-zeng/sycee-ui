<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';
import type { CarouselItem } from './types';

defineOptions({ name: 'SyCarousel', inheritAttrs: false });

interface Props {
  items: CarouselItem[];
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  height?: number | string;
}

const {
  items,
  autoplay = true,
  interval = 4500,
  loop = true,
  pauseOnHover = true,
  showArrows = true,
  showIndicators = true,
  height,
} = defineProps<Props>();

const emit = defineEmits<{ change: [index: number] }>();
const t = useLocale();
const attrs = useAttrs();
const active = defineModel<number>('active', { default: 0 });
const hovered = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;

const current = computed(() => Math.min(Math.max(active.value, 0), Math.max(items.length - 1, 0)));
const viewportStyle = computed(() => ({
  height: typeof height === 'number' ? `${height}px` : height,
}));

function go(next: number) {
  if (items.length === 0) return;
  const resolved = loop
    ? (next + items.length) % items.length
    : Math.min(Math.max(next, 0), items.length - 1);
  if (resolved === current.value) return;
  active.value = resolved;
  emit('change', resolved);
}

function restart() {
  if (timer) clearInterval(timer);
  timer = undefined;
  if (!autoplay || hovered.value || items.length < 2) return;
  timer = setInterval(() => {
    const next = loop ? (current.value + 1) % items.length : current.value + 1;
    if (!loop && next >= items.length) return;
    active.value = next;
    emit('change', next);
  }, Math.max(800, interval));
}

function onEnter() {
  if (pauseOnHover) hovered.value = true;
  restart();
}

function onLeave() {
  if (pauseOnHover) hovered.value = false;
  restart();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    go(current.value - 1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    go(current.value + 1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    go(0);
  } else if (event.key === 'End') {
    event.preventDefault();
    go(items.length - 1);
  }
  restart();
}

onMounted(restart);
watch([() => autoplay, () => interval, () => loop, () => items.length], restart);
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    :class="cx('sy-carousel', attrs.class as string)"
    @keydown="onKeydown"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="sy-carousel__viewport" :style="viewportStyle">
      <div
        class="sy-carousel__track"
        :style="{ transform: `translate3d(-${current * 100}%, 0, 0)` }"
        :aria-live="autoplay && !hovered ? 'off' : 'polite'"
      >
        <div
          v-for="(item, index) in items"
          :key="item.key ?? index"
          :class="cx('sy-carousel__slide', index === current && 'is-active')"
          role="group"
          aria-roledescription="slide"
          :aria-label="item.ariaLabel ?? `${index + 1} / ${items.length}`"
          :aria-hidden="index !== current"
          :inert="index !== current || undefined"
        >
          <component :is="() => item.content" />
        </div>
      </div>
    </div>
    <template v-if="showArrows && items.length > 1">
      <button
        type="button"
        class="sy-carousel__arrow sy-carousel__arrow--prev"
        :aria-label="t.previousSlide"
        @click="go(current - 1)"
      >
        <Icon name="chevron-left" />
      </button>
      <button
        type="button"
        class="sy-carousel__arrow sy-carousel__arrow--next"
        :aria-label="t.nextSlide"
        @click="go(current + 1)"
      >
        <Icon name="chevron-right" />
      </button>
    </template>
    <div v-if="showIndicators && items.length > 1" class="sy-carousel__indicators">
      <button
        v-for="(item, index) in items"
        :key="item.key ?? index"
        type="button"
        :class="cx('sy-carousel__indicator', index === current && 'is-active')"
        :aria-label="t.slide(index + 1)"
        :aria-current="index === current ? 'true' : undefined"
        @click="go(index)"
      />
    </div>
  </div>
</template>

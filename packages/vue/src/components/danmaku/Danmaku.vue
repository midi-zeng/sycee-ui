<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { DanmakuItem } from './types';

defineOptions({ name: 'SyDanmaku', inheritAttrs: false });

interface Props {
  items: DanmakuItem[];
  height?: number;
  tracks?: number;
  speed?: number;
  defaultPaused?: boolean;
  loop?: boolean;
  showControls?: boolean;
}

const {
  items,
  height = 180,
  tracks = 4,
  speed = 12,
  defaultPaused = false,
  loop = true,
  showControls = false,
} = defineProps<Props>();

const emit = defineEmits<{ itemClick: [item: DanmakuItem, index: number] }>();
const pausedModel = defineModel<boolean>('paused');
const paused = computed(() => pausedModel.value ?? defaultPaused);
const t = useLocale();
const attrs = useAttrs();
const pauseLabel = computed(() => (paused.value ? t.value.play : t.value.pause));

function togglePaused() {
  pausedModel.value = !paused.value;
}

function itemStyle(item: DanmakuItem, index: number) {
  const track = (item.track ?? index) % Math.max(1, tracks);
  return {
    '--sy-danmaku-top': `${(track + 0.5) * (100 / Math.max(1, tracks))}%`,
    '--sy-danmaku-duration': `${Math.max(4, item.speed ?? speed)}s`,
    '--sy-danmaku-delay': `${item.delay ?? -(index * 0.72)}s`,
    '--sy-danmaku-iterations': loop ? 'infinite' : '1',
    color: item.color,
  };
}
</script>

<template>
  <div
    role="log"
    :aria-live="paused ? 'polite' : 'off'"
    :class="cx('sy-danmaku', paused && 'is-paused', attrs.class as string)"
    :style="{ ...(attrs.style as object), height: `${height}px` }"
  >
    <div class="sy-danmaku__stage">
      <button
        v-for="(item, index) in items"
        :key="item.id ?? index"
        type="button"
        class="sy-danmaku__item"
        :style="itemStyle(item, index)"
        @click="emit('itemClick', item, index)"
      >
        <component :is="() => item.content" />
      </button>
    </div>
    <button
      v-if="showControls"
      type="button"
      class="sy-danmaku__control"
      :aria-label="pauseLabel"
      @click="togglePaused"
    >
      {{ paused ? '❯' : 'Ⅱ' }}
    </button>
  </div>
</template>

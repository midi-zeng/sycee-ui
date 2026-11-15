<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { NinePatchCore } from 'ninepatch-core';
import type { NinePatchData } from 'ninepatch-core';
import { cx } from '../../utils/cx';
import type { NinePatchBoxEdges, NinePatchCustomOptions } from './types';

defineOptions({ name: 'SyNinePatch' });

interface Props {
  /** Nine-patch image URL — a raw `.9.png` source or an AAPT-compiled PNG. */
  src?: string;
  /** Manual overrides; skips image parsing entirely. */
  customOptions?: NinePatchCustomOptions;
}

const { src, customOptions } = defineProps<Props>();

const renderData = ref<NinePatchData | null>(null);

const DEFAULT_EDGES: Required<NinePatchBoxEdges> = { top: 0, right: 0, bottom: 0, left: 0 };

function resolveEdges(edges: NinePatchBoxEdges | undefined): Required<NinePatchBoxEdges> {
  return { ...DEFAULT_EDGES, ...edges };
}

function edgesToCss(edges: Required<NinePatchBoxEdges>, unit: 'px' | ''): string {
  const suffix = unit === 'px' ? 'px' : '';
  return `${edges.top}${suffix} ${edges.right}${suffix} ${edges.bottom}${suffix} ${edges.left}${suffix}`;
}

/**
 * Derive border-image-slice values from parsed render data.
 *
 * Horizontal insets come from xDivs and vertical ones from yDivs, matching
 * the CSS border-image-slice (top right bottom left) order.
 */
function renderDataToSlice(data: NinePatchData): Required<NinePatchBoxEdges> {
  const width = data.width ?? 0;
  const height = data.height ?? 0;
  return {
    top: data.yDivs.start,
    right: width - data.xDivs.stop,
    bottom: height - data.yDivs.stop,
    left: data.xDivs.start,
  };
}

watch(
  () => [src, customOptions] as const,
  async ([nextSrc, nextCustomOptions], _previous, onCleanup) => {
    // Manual options win; drop any previously parsed data
    if (!nextSrc || nextCustomOptions) {
      renderData.value = null;
      return;
    }

    // Guard against races: only the latest src may update the state
    let cancelled = false;
    onCleanup(() => {
      cancelled = true;
    });

    try {
      const data = await new NinePatchCore(nextSrc).getRenderData();
      if (!cancelled) renderData.value = data;
    } catch {
      if (!cancelled) renderData.value = null;
    }
  },
  { immediate: true },
);

const padding = computed(() => resolveEdges(customOptions?.padding ?? renderData.value?.padding));
const slice = computed(() =>
  resolveEdges(customOptions?.borderImageSlice ?? (renderData.value ? renderDataToSlice(renderData.value) : undefined)),
);
const borderInset = computed(() => customOptions?.borderInset ?? renderData.value?.borderInset ?? 0);

const containerStyle = computed<CSSProperties>(() => ({
  height: '100%',
  borderImageSource: src ? `url(${src})` : undefined,
  borderImageSlice: `${edgesToCss(slice.value, '')} fill`,
  // Longhands avoid lossy shorthand normalization for partial values
  borderImageWidth: edgesToCss(slice.value, 'px'),
  paddingTop: `${padding.value.top}px`,
  paddingRight: `${padding.value.right}px`,
  paddingBottom: `${padding.value.bottom}px`,
  paddingLeft: `${padding.value.left}px`,
  clipPath: borderInset.value ? `inset(${borderInset.value}px)` : undefined,
}));
</script>

<template>
  <div :class="cx('sy-nine-patch', $attrs.class as string)" :style="containerStyle">
    <slot />
  </div>
</template>

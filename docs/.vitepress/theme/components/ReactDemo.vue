<script setup lang="ts">
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Mounts a pre-imported React component into the docs page. React components
 * render on the client only (docs pages are prerendered by VitePress).
 */
const props = defineProps<{ demo: unknown }>();

const host = ref<HTMLDivElement>();
let root: Root | null = null;

onMounted(() => {
  if (!host.value) return;
  root = createRoot(host.value);
  root.render(createElement(props.demo as () => unknown));
});

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>

<template>
  <div ref="host" style="display: contents" />
</template>

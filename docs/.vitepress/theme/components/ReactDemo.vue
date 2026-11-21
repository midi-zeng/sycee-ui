<script setup lang="ts">
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { LocaleProvider } from '@sycee-ui/react';
import type { Locale } from '@sycee-ui/react';

/**
 * Mounts a pre-imported React component into the docs page. React components
 * render on the client only (docs pages are prerendered by VitePress).
 */
const props = defineProps<{ demo: unknown; locale?: Locale }>();

const host = ref<HTMLDivElement>();
let root: Root | null = null;

function renderDemo() {
  if (!root) return;
  root.render(
    createElement(
      LocaleProvider,
      { locale: props.locale ?? 'en' },
      createElement(props.demo as () => unknown),
    ),
  );
}

onMounted(() => {
  if (!host.value) return;
  root = createRoot(host.value);
  renderDemo();
});

watch([() => props.demo, () => props.locale], renderDemo);

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>

<template>
  <div ref="host" style="display: contents" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { InfiniteScroll } from '@sycee-ui/vue';

const loading = ref(false);
const error = ref(true);
const finished = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function retry() {
  error.value = false;
  loading.value = true;
  timer = setTimeout(() => {
    loading.value = false;
    finished.value = true;
  }, 700);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <InfiniteScroll
    :height="180"
    :loading="loading"
    :error="error"
    :finished="finished"
    style="
      width: 100%;
      max-width: 520px;
      border: 1px solid var(--sy-color-border);
      border-radius: var(--sy-radius-md);
      background: var(--sy-color-bg);
    "
    @load-more="retry"
  >
    <div style="padding: 16px">The next page could not be requested.</div>
  </InfiniteScroll>
</template>

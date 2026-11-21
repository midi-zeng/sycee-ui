<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { InfiniteScroll } from '@sycee-ui/vue';

const PAGE_SIZE = 4;
const TOTAL = 24;

const makeRows = (start: number, count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: start + index,
    title: `Activity ${start + index + 1}`,
  }));

const rows = ref(makeRows(0, 8));
const loading = ref(false);
const finished = ref(false);
const loaded = ref(8);
let timer: ReturnType<typeof setTimeout> | undefined;

function loadMore() {
  if (loading.value || finished.value) return;
  loading.value = true;
  timer = setTimeout(() => {
    const next = makeRows(loaded.value, Math.min(PAGE_SIZE, TOTAL - loaded.value));
    loaded.value += next.length;
    rows.value = [...rows.value, ...next];
    finished.value = loaded.value >= TOTAL;
    loading.value = false;
  }, 700);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <InfiniteScroll
    :height="300"
    :loading="loading"
    :finished="finished"
    style="
      width: 100%;
      max-width: 520px;
      border: 1px solid var(--sy-color-border);
      border-radius: var(--sy-radius-md);
      background: var(--sy-color-bg);
    "
    @load-more="loadMore"
  >
    <div style="display: grid; gap: 8px; padding: 10px">
      <div
        v-for="row in rows"
        :key="row.id"
        style="
          padding: 10px 12px;
          border: 1px solid var(--sy-color-border);
          border-radius: var(--sy-radius-sm);
          background: var(--sy-color-bg-secondary);
        "
      >
        {{ row.title }}
      </div>
    </div>
  </InfiniteScroll>
</template>

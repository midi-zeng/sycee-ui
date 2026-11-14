<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@sycee-ui/vue';

const lastChange = ref('Click a page or use the arrows');

function onChange(page: number) {
  lastChange.value = `change fired with page ${page}`;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Pagination :total="50" @change="onChange" />
    <p style="margin: 0; color: var(--sy-color-text-tertiary)">{{ lastChange }}</p>
  </div>
</template>

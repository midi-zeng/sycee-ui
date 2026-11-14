<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@sycee-ui/vue';

const page = ref(5);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <Pagination v-model:page="page" :total="100" :sibling-count="1" />
    <Pagination v-model:page="page" :total="100" :sibling-count="2" />
    <Pagination v-model:page="page" :total="100" :sibling-count="3" />
  </div>
</template>

<script setup lang="ts">
import { Pagination } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <Pagination :total="100" />
    <Pagination :total="100" :page-size="25" />
  </div>
</template>

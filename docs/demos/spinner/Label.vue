<script setup lang="ts">
import { Spinner } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center">
    <Spinner label="Loading data" />
    <Spinner label="Uploading files" size="lg" />
  </div>
</template>

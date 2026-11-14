<script setup lang="ts">
import { Divider } from '@sycee-ui/vue';
</script>

<template>
  <div
    style="
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--sy-color-text-secondary);
    "
  >
    <span>Overview</span>
    <Divider vertical />
    <span>Components</span>
    <Divider vertical dashed />
    <span>API</span>
  </div>
</template>

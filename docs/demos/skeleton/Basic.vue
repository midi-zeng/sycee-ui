<script setup lang="ts">
import { Skeleton } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 360px">
    <div style="display: flex; gap: 12px; align-items: center">
      <Skeleton width="48px" height="48px" shape="circle" />
      <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
        <Skeleton height="16px" width="60%" />
        <Skeleton height="12px" shape="text" />
      </div>
    </div>
    <Skeleton height="120px" />
  </div>
</template>

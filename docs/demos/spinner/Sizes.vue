<script setup lang="ts">
import { Spinner } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner :size="44" />
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
      <Spinner color="primary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="danger" />
      <Spinner color="neutral" />
    </div>
  </div>
</template>

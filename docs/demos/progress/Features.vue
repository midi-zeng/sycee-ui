<script setup lang="ts">
import { Progress } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
    <Progress indeterminate />
    <Progress :value="70" :height="14" />
    <Progress :value="40" :show-text="false" />
    <Progress :value="80" :height="4" status="success" />
  </div>
</template>

<script setup lang="ts">
import { Progress } from '@sycee-ui/vue';

const bars = [
  { status: 'primary', value: 70 },
  { status: 'success', value: 100 },
  { status: 'warning', value: 45 },
  { status: 'danger', value: 20 },
] as const;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
    <Progress v-for="bar in bars" :key="bar.status" :value="bar.value" :status="bar.status" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from '@sycee-ui/vue';

const value = ref<string | null>(null);
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <DatePicker v-model="value" placeholder="Pick a date" />
    <DatePicker placeholder="Week starts on Monday" :week-starts-on="1" />
    <DatePicker
      placeholder="Restricted range"
      min="2026-11-01"
      max="2026-11-30"
      disabled
    />
  </div>
</template>

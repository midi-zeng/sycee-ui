<script setup lang="ts">
import { ref } from 'vue';
import { InputNumber } from '@sycee-ui/vue';

const value = ref<number | null>(2);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 220px">
    <InputNumber v-model="value" :min="0" :max="10" :step="0.5" :precision="1" />
    <InputNumber placeholder="Disabled" disabled />
  </div>
</template>

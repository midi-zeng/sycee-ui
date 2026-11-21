<script setup lang="ts">
import { ref } from 'vue';
import { Rate } from '@sycee-ui/vue';

const value = ref(3);
const readonlyValue = ref(4);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Rate v-model="value" />
    <Rate :model-value="readonlyValue" readonly />
    <Rate :model-value="2" disabled />
  </div>
</template>

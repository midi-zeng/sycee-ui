<script setup lang="ts">
import { ref } from 'vue';
import { Slider } from '@sycee-ui/vue';

const value = ref(40);
const disabledValue = ref(70);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px">
    <Slider v-model="value" :min="0" :max="100" :step="1" />
    <p style="margin: 0; font-size: 13px">Value: {{ value }}</p>
    <Slider :model-value="disabledValue" disabled />
  </div>
</template>

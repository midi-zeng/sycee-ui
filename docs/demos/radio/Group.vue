<script setup lang="ts">
import { ref } from 'vue';
import { RadioGroup } from '@sycee-ui/vue';

const options = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large (out of stock)', value: 'lg', disabled: true },
];

const size = ref<string | number | null>('md');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <RadioGroup v-model="size" :options="options" />
    <RadioGroup v-model="size" :options="options" disabled />
    <p style="margin: 0; color: var(--sy-color-text-tertiary)">Selected: {{ size }}</p>
  </div>
</template>

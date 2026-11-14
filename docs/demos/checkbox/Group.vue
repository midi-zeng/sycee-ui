<script setup lang="ts">
import { ref } from 'vue';
import { CheckboxGroup } from '@sycee-ui/vue';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
];

const picked = ref<string[]>(['react']);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <CheckboxGroup v-model="picked" :options="options" />
    <CheckboxGroup v-model="picked" :options="options" disabled />
    <p style="margin: 0; color: var(--sy-color-text-tertiary)">
      Selected: {{ picked.join(', ') || 'none' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Select } from '@sycee-ui/vue';

const frameworks = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
];

const picked = ref<string | number | null>('vue');
</script>

<template>
  <div style="max-width: 280px">
    <Select v-model="picked" :options="frameworks" clearable placeholder="Clearable" />
    <p style="margin: 8px 0 0; color: var(--sy-color-text-tertiary)">
      Value: {{ picked ?? 'none' }}
    </p>
  </div>
</template>

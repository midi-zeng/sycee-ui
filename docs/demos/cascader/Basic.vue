<script setup lang="ts">
import { ref } from 'vue';
import { Cascader } from '@sycee-ui/vue';

const value = ref<Array<string | number> | null>(null);

const options = [
  {
    label: 'Engineering',
    value: 'eng',
    children: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      {
        label: 'Platform',
        value: 'platform',
        children: [
          { label: 'Infra', value: 'infra' },
          { label: 'Tooling', value: 'tooling' },
        ],
      },
    ],
  },
  {
    label: 'Design',
    value: 'design',
    children: [
      { label: 'Product', value: 'product' },
      { label: 'Brand', value: 'brand' },
    ],
  },
  { label: 'Disabled branch', value: 'off', disabled: true },
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px">
    <Cascader v-model="value" :options="options" placeholder="Pick a team" clearable />
    <p style="margin: 0; font-size: 13px">Path: {{ value?.join(' / ') ?? '—' }}</p>
  </div>
</template>

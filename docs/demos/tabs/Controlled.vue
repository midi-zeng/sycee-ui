<script setup lang="ts">
import { ref } from 'vue';
import { Tabs } from '@sycee-ui/vue';

const items = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

const active = ref<string | number>('week');
const lastChange = ref('Pick a range');

function onChange(value: string | number) {
  lastChange.value = `change fired with "${String(value)}"`;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <Tabs v-model:active="active" :items="items" @change="onChange" />
    <p style="margin: 0; color: var(--sy-color-text-tertiary)">
      Active: <strong>{{ active }}</strong> — {{ lastChange }}
    </p>
  </div>
</template>

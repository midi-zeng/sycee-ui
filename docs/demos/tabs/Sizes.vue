<script setup lang="ts">
import { Tabs } from '@sycee-ui/vue';

const items = [
  { label: 'Coffee', value: 'coffee', content: 'Espresso, filter and cold brew.' },
  { label: 'Tea', value: 'tea', content: 'Green, black and oolong.' },
  { label: 'Pastry', value: 'pastry', content: 'Croissants and cinnamon buns.' },
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <Tabs size="sm" :items="items" />
    <Tabs :items="items" />
    <Tabs size="lg" :items="items" />
  </div>
</template>

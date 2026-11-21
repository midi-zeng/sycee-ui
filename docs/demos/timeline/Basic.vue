<script setup lang="ts">
import { Timeline } from '@sycee-ui/vue';

const items = [
  { title: 'Order placed', description: 'Today, 09:12', color: 'primary' },
  { title: 'Shipped', description: 'Today, 14:30' },
  { title: 'Delivered', description: 'Tomorrow, before 18:00', color: 'warning' },
  { title: 'Cancelled entry', description: 'Disabled state marker', color: 'danger' },
];
</script>

<template>
  <Timeline :items="items" style="max-width: 360px" />
</template>

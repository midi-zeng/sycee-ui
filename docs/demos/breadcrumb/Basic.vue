<script setup lang="ts">
import { Breadcrumb } from '@sycee-ui/vue';

const items = [
  { label: 'Home', href: '#' },
  { label: 'Library', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb' },
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Breadcrumb :items="items" />
    <Breadcrumb :items="[{ label: 'Settings' }, { label: 'Billing', disabled: true }, { label: 'Invoices' }]" />
  </div>
</template>

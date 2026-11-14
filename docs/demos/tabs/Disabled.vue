<script setup lang="ts">
import { Tabs } from '@sycee-ui/vue';

const items = [
  {
    label: 'Overview',
    value: 'overview',
    content: 'A summary of the last 30 days.',
  },
  {
    label: 'Reports',
    value: 'reports',
    content: 'Detailed reports are available on the Pro plan.',
  },
  {
    label: 'Audit log',
    value: 'audit',
    content: 'Every sign-in, export and permission change.',
  },
  { label: 'Billing', value: 'billing', disabled: true },
];
</script>

<template>
  <Tabs :items="items" />
</template>

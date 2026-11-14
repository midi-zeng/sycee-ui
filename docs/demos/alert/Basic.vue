<script setup lang="ts">
import { Alert } from '@sycee-ui/vue';

const alerts = [
  { type: 'info', title: 'New version available' },
  { type: 'success', title: 'Your changes have been saved' },
  { type: 'warning', title: 'Your session expires in 5 minutes' },
  { type: 'danger', title: 'Payment failed — update your card' },
] as const;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Alert v-for="alert in alerts" :key="alert.type" :type="alert.type" :title="alert.title" />
  </div>
</template>

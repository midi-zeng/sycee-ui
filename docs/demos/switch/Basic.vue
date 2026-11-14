<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@sycee-ui/vue';

const enabled = ref(true);
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <Switch v-model="enabled" />
    <span style="color: var(--sy-color-text-tertiary)">{{ enabled ? 'On' : 'Off' }}</span>
  </div>
</template>

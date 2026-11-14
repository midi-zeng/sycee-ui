<script setup lang="ts">
import { Icon } from '@sycee-ui/vue';

const names = [
  'check',
  'close',
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'info',
  'success',
  'warning',
  'danger',
  'search',
  'eye',
  'eye-off',
] as const;
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px 24px">
    <span
      v-for="name in names"
      :key="name"
      style="display: inline-flex; align-items: center; gap: 8px"
    >
      <Icon :name="name" />
      <code style="font-size: 12px">{{ name }}</code>
    </span>
  </div>
</template>

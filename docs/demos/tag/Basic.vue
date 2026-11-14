<script setup lang="ts">
import { Tag } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
    <Tag>Neutral</Tag>
    <Tag color="primary">Primary</Tag>
    <Tag color="success" variant="solid">Solid</Tag>
    <Tag color="danger" variant="outline">Outline</Tag>
    <Tag size="sm">Small</Tag>
  </div>
</template>

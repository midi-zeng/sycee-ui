<script setup lang="ts">
import { Copy, Space } from '@sycee-ui/vue';

const command = 'npm install @sycee-ui/vue';
</script>

<template>
  <Space vertical size="md" align="start">
    <code
      style="
        padding: 10px 14px;
        border: 1px solid var(--sy-color-border);
        border-radius: 8px;
        background: var(--sy-color-bg-secondary);
        font-family: var(--sy-font-family-mono);
      "
    >
      {{ command }}
    </code>
    <Space wrap>
      <Copy :text="command" />
      <Copy :text="command" variant="outline" color="primary" />
    </Space>
  </Space>
</template>

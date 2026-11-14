<script setup lang="ts">
import { Space, Tag } from '@sycee-ui/vue';

const topics = ['design', 'vue', 'react', 'accessibility', 'tokens', 'docs', 'a11y', 'css'];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <Space vertical>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Space>
    <Space wrap style="max-width: 360px">
      <Tag v-for="topic in topics" :key="topic" color="primary">{{ topic }}</Tag>
    </Space>
  </div>
</template>

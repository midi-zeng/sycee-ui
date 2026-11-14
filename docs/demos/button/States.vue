<script setup lang="ts">
import { ref } from 'vue';
import { Button, Icon, Space } from '@sycee-ui/vue';

const loading = ref(false);
</script>

<template>
  <Space vertical>
    <Space>
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
    </Space>
    <Space>
      <Button :loading="loading" @click="loading = !loading">Click to toggle loading</Button>
      <Button disabled>Disabled</Button>
    </Space>
    <Space>
      <Button>
        <template #icon><Icon name="search" /></template>
        With icon
      </Button>
      <Button block>Block button</Button>
    </Space>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Space, copy, useLocale } from '@sycee-ui/vue';

const t = useLocale();
const status = ref('');
const command = 'npm install @sycee-ui/vue';

async function handleCopy() {
  const copied = await copy(command);
  status.value = copied ? t.value.copied : t.value.copyFailed;
}
</script>

<template>
  <Space align="center">
    <Button variant="soft" @click="handleCopy">{{ t.copy }}</Button>
    <span role="status" aria-live="polite">{{ status }}</span>
  </Space>
</template>

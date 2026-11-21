<script setup lang="ts">
import { Dropdown, Button, message } from '@sycee-ui/vue';

const options = [
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Rename', value: 'rename' },
  { divider: true, label: '' },
  { label: 'Archive', value: 'archive' },
  { label: 'Delete', value: 'delete', disabled: true },
];
</script>

<template>
  <Dropdown :options="options" @select="(value) => message.info(String(value))">
    <Button variant="outline">Actions ▾</Button>
  </Dropdown>
</template>

<script setup lang="ts">
import { Popconfirm, Button, message } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <Popconfirm
      title="Delete this file?"
      content="This action cannot be undone."
      @confirm="message.success('Deleted')"
      @cancel="message.info('Cancelled')"
    >
      <Button variant="danger">Delete</Button>
    </Popconfirm>
    <Popconfirm title="Publish changes?" ok-text="Publish">
      <Button>Publish</Button>
    </Popconfirm>
  </div>
</template>

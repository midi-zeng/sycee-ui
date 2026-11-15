<script setup lang="ts">
import { Button, dialog, message } from '@sycee-ui/vue';

function confirmDelete() {
  dialog.confirm({
    title: 'Delete account',
    content: 'This permanently removes your account and all of its data.',
    okText: 'Delete',
    onOk: () => message.success('Account deleted'),
  });
}

function showAlert() {
  dialog.alert({
    title: 'Session expired',
    content: 'Please sign in again to continue.',
    okText: 'Sign in',
    onOk: () => message.info('Redirecting to sign in…'),
  });
}
</script>

<template>
  <div style="display: flex; gap: 12px">
    <Button @click="confirmDelete">Confirm</Button>
    <Button @click="showAlert">Alert</Button>
  </div>
</template>

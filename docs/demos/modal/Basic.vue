<script setup lang="ts">
import { ref } from 'vue';
import { Button, Modal } from '@sycee-ui/vue';

const open = ref(false);
</script>

<template>
  <div>
    <Button @click="open = true">Open modal</Button>
    <Modal v-model:open="open" title="Delete account" @ok="open = false">
      <p style="margin: 0">
        This permanently removes your account and all of its data. This action
        cannot be undone.
      </p>
    </Modal>
  </div>
</template>

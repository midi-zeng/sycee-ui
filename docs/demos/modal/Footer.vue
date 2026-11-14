<script setup lang="ts">
import { ref } from 'vue';
import { Button, Modal } from '@sycee-ui/vue';

const open = ref(false);
</script>

<template>
  <div>
    <Button @click="open = true">Open modal</Button>
    <Modal v-model:open="open" title="Draft settings">
      <p style="margin: 0">Choose what happens when you publish this draft.</p>
      <template #footer>
        <Button variant="ghost" @click="open = false">Discard</Button>
        <Button variant="outline" @click="open = false">Save draft</Button>
        <Button variant="solid" @click="open = false">Publish</Button>
      </template>
    </Modal>
  </div>
</template>

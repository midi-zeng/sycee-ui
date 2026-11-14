<script setup lang="ts">
import { ref } from 'vue';
import { Button, Modal } from '@sycee-ui/vue';

const wide = ref(false);
const strict = ref(false);
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <Button variant="outline" @click="wide = true">640px modal</Button>
    <Button variant="outline" @click="strict = true">Mask click disabled</Button>
    <Modal v-model:open="wide" :width="640" title="Wide dialog" @ok="wide = false">
      <p style="margin: 0">
        The <code>width</code> prop accepts a number (px) or any CSS width, so
        long-form content can breathe.
      </p>
    </Modal>
    <Modal
      v-model:open="strict"
      :width="360"
      :mask-closable="false"
      title="Confirm payment"
      @ok="strict = false"
    >
      <p style="margin: 0">
        Clicking the mask does nothing. Close with the buttons, the X or
        Escape.
      </p>
    </Modal>
  </div>
</template>

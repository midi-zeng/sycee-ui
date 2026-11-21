<script setup lang="ts">
import { ref } from 'vue';
import { Drawer, Button } from '@sycee-ui/vue';

const open = ref(false);
</script>

<template>
  <Button @click="open = true">Open drawer</Button>
  <Drawer v-model:open="open" title="Settings" placement="right" :width="360">
    <p>Drawer content slides in from the right edge of the viewport.</p>
  </Drawer>
</template>

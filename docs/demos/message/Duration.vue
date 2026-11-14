<script setup lang="ts">
import { Button, message } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <Button @click="message.info('Shown for one second', 1000)">Duration 1s</Button>
    <Button @click="message.success('Shown for five seconds', 5000)">Duration 5s</Button>
    <Button @click="message.info('Stays until cleared', 0)">Sticky (duration 0)</Button>
    <Button variant="ghost" @click="message.clear()">Clear all</Button>
  </div>
</template>

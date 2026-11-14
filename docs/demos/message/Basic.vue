<script setup lang="ts">
import { Button, message } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <Button @click="message.info('This is an info message')">Info</Button>
    <Button color="success" @click="message.success('Your changes have been saved')">
      Success
    </Button>
    <Button color="warning" @click="message.warning('Your session is about to expire')">
      Warning
    </Button>
    <Button color="danger" @click="message.danger('Something went wrong')">Danger</Button>
    <Button variant="ghost" @click="message.clear()">Clear</Button>
  </div>
</template>

<script setup lang="ts">
import { notification } from '@sycee-ui/vue';
import { Button } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <Button variant="outline" @click="notification.info('Heads up', 'Deployment started.')">
      Info
    </Button>
    <Button variant="outline" @click="notification.success('Saved', 'Your changes are live.')">
      Success
    </Button>
    <Button variant="outline" @click="notification.warning('Almost there', 'Storage is at 90%.')">
      Warning
    </Button>
    <Button variant="outline" @click="notification.danger('Failed', 'The build did not pass.')">
      Danger
    </Button>
    <Button variant="ghost" @click="notification.clear()">Clear</Button>
  </div>
</template>

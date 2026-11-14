<script setup lang="ts">
import { Alert } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Alert type="success" title="Deployment complete">
      Version 2.4.0 is live at app.example.com. The description renders below
      the title and can hold any content.
    </Alert>
    <Alert type="danger">
      Without a title the description stands alone — still with its type icon.
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { Alert, Icon } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Alert type="warning" title="Closable" closable>
      Click the close button — the alert removes itself from the page and emits
      a close event.
    </Alert>
    <Alert type="info" title="Custom icon">
      <template #icon>
        <Icon name="search" />
      </template>
      Any icon can replace the default type icon via the icon slot.
    </Alert>
  </div>
</template>

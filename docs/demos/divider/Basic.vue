<script setup lang="ts">
import { Divider } from '@sycee-ui/vue';
</script>

<template>
  <div style="max-width: 420px; display: flex; flex-direction: column; gap: 4px">
    <p style="margin: 0; color: var(--sy-color-text-secondary)">
      Content above the divider.
    </p>
    <Divider>Sycee UI</Divider>
    <p style="margin: 0; color: var(--sy-color-text-secondary)">
      The label sits centered on the line by default.
    </p>
  </div>
</template>

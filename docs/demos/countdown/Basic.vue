<script setup lang="ts">
import { Countdown } from '@sycee-ui/vue';

const target = Date.now() + 1000 * 60 * 60 * 26 + 1000 * 42;
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 18px">
    <Countdown :target="target" boxed size="lg" label="Product launch countdown" />
    <Countdown
      :target="target"
      format="HH:mm:ss"
      size="sm"
      style="color: var(--sy-color-text-secondary)"
    />
  </div>
</template>

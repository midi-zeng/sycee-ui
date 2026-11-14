<script setup lang="ts">
import { Progress } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
    <Progress :value="30" />
    <Progress :value="60" />
    <Progress :value="100" />
  </div>
</template>

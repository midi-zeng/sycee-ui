<script setup lang="ts">
import { Button } from '@sycee-ui/vue';

const colors = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
const variants = ['solid', 'soft', 'outline', 'ghost', 'link'] as const;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div v-for="variant in variants" :key="variant" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center">
      <Button v-for="color in colors" :key="color" :color="color" :variant="variant">
        {{ variant }}
      </Button>
    </div>
  </div>
</template>

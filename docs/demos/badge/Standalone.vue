<script setup lang="ts">
import { Badge } from '@sycee-ui/vue';
import type { ColorType } from '@sycee-ui/vue';

const colors: ColorType[] = ['danger', 'primary', 'success', 'warning', 'neutral'];
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center">
    <Badge v-for="color in colors" :key="color" :color="color" :count="8" />
    <Badge count="new" color="warning" />
  </div>
</template>

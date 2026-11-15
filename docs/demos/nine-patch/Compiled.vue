<script setup lang="ts">
import { NinePatch } from '@sycee-ui/vue';

// AAPT-compiled nine-patch (180x120, npTc chunk) served from docs/public.
const COMPILED_SRC = `${import.meta.env.BASE_URL}btn.compiled.9.png`;

const sizes = [
  { width: 240, label: '240px' },
  { width: 420, label: '420px' },
];
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">
    <div v-for="size in sizes" :key="size.label" :style="{ width: `${size.width}px`, height: `${Math.round((size.width * 120) / 180)}px` }">
      <NinePatch :src="COMPILED_SRC">
        <div
          style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 14px"
        >
          {{ size.label }}
        </div>
      </NinePatch>
    </div>
  </div>
</template>

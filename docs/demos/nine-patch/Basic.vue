<script setup lang="ts">
import { ref } from 'vue';
import { NinePatch } from '@sycee-ui/vue';

// Raw nine-patch source (182x122, with 1px guide borders) served from docs/public.
const RAW_SRC = `${import.meta.env.BASE_URL}btn.9.png`;

const width = ref(360);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <label style="display: flex; align-items: center; gap: 12px; font-size: 14px">
      Width: {{ width }}px
      <input v-model.number="width" type="range" min="182" max="720" style="width: 240px" />
    </label>
    <div :style="{ width: `${width}px`, height: `${Math.round((width * 122) / 182)}px` }">
      <NinePatch :src="RAW_SRC">
        <div
          style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 14px"
        >
          Raw nine-patch
        </div>
      </NinePatch>
    </div>
  </div>
</template>

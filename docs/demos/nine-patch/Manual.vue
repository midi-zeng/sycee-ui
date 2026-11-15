<script setup lang="ts">
import { NinePatch } from '@sycee-ui/vue';

// A plain image (no guide borders, no npTc chunk) as a data URI so the demo is
// self-contained. With customOptions, NinePatch skips parsing entirely and
// treats any image as a border-image source.
const PLAIN_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='48'%3E%3Crect x='1' y='1' width='118' height='46' rx='10' fill='%23eef1f6' stroke='%235b6472' stroke-width='2'/%3E%3C/svg%3E";

const customOptions = {
  borderImageSlice: { top: 12, right: 12, bottom: 12, left: 12 },
  padding: { top: 10, right: 18, bottom: 10, left: 18 },
};
</script>

<template>
  <div style="width: 360px; height: 72px">
    <NinePatch :src="PLAIN_SRC" :custom-options="customOptions">
      <div
        style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 14px"
      >
        Manual slice and padding
      </div>
    </NinePatch>
  </div>
</template>

<script setup lang="ts">
import { Watermark } from '@sycee-ui/vue';

const mark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='48' viewBox='0 0 120 48'%3E%3Crect x='1' y='1' width='118' height='46' rx='10' fill='none' stroke='%236e56cf' stroke-width='2'/%3E%3Ctext x='60' y='30' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='700' fill='%236e56cf'%3ESYCE%3C/text%3E%3C/svg%3E";
</script>

<template>
  <Watermark
    :image="mark"
    :width="160"
    :height="100"
    :gap="20"
    :rotate="-18"
    :opacity="0.22"
    style="
      min-height: 200px;
      display: grid;
      place-items: center;
      border: 1px dashed var(--sy-color-border-strong);
      border-radius: 12px;
      background: var(--sy-color-bg-secondary);
    "
  >
    <span style="color: var(--sy-color-text-secondary)">
      A custom image mark repeats behind this content.
    </span>
  </Watermark>
</template>

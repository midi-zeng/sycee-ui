<script setup lang="ts">
import { Watermark } from '@sycee-ui/vue';

const stats = [
  ['Revenue', '$128,400'],
  ['Growth', '+18.2%'],
  ['Accounts', '2,846'],
];
</script>

<template>
  <Watermark
    :content="['SYCE E UI', 'INTERNAL USE']"
    :width="200"
    :height="140"
    :gap="[16, 16]"
    color="#6e56cf"
    :opacity="0.18"
    style="
      min-height: 260px;
      overflow: hidden;
      border: 1px solid var(--sy-color-border);
      border-radius: 12px;
      background: var(--sy-color-bg);
    "
  >
    <div style="display: grid; gap: 18px; padding: 28px">
      <div>
        <div style="color: var(--sy-color-text-tertiary); font-size: 12px; font-weight: 600">
          QUARTERLY REPORT
        </div>
        <h3 style="margin: 6px 0 0; color: var(--sy-color-text)">Revenue overview</h3>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px">
        <div
          v-for="[label, value] in stats"
          :key="label"
          style="
            min-width: 130px;
            padding: 14px;
            border: 1px solid var(--sy-color-border);
            border-radius: 10px;
            background: var(--sy-color-bg-secondary);
          "
        >
          <div style="color: var(--sy-color-text-tertiary); font-size: 12px">{{ label }}</div>
          <strong style="color: var(--sy-color-text); font-size: 18px">{{ value }}</strong>
        </div>
      </div>
    </div>
  </Watermark>
</template>

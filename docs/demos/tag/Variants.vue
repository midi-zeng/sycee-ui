<script setup lang="ts">
import { Tag } from '@sycee-ui/vue';
import type { ColorType } from '@sycee-ui/vue';

const colors: ColorType[] = ['primary', 'neutral', 'success', 'warning', 'danger'];
const variants = ['soft', 'solid', 'outline'] as const;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div
      v-for="variant in variants"
      :key="variant"
      style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center"
    >
      <Tag v-for="color in colors" :key="color" :color="color" :variant="variant">
        {{ variant }}
      </Tag>
    </div>
  </div>
</template>

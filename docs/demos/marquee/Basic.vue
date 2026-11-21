<script setup lang="ts">
import { Marquee, Tag } from '@sycee-ui/vue';

const labels = ['Build faster', 'Theme everything', 'React & Vue', 'Accessible', 'Tree-shakable'];
const colors = ['primary', 'success', 'warning'] as const;
</script>

<template>
  <div style="display: grid; gap: 18px; width: 100%; max-width: 680px">
    <Marquee>
      <Tag v-for="(label, index) in labels" :key="label" :color="colors[index % 3]">
        {{ label }}
      </Tag>
    </Marquee>
    <Marquee direction="right" :duration="22" gap="24px">
      <span v-for="label in labels" :key="label" style="color: var(--sy-color-text-secondary)">
        {{ label }} <span style="opacity: 0.35">·</span>
      </span>
    </Marquee>
  </div>
</template>

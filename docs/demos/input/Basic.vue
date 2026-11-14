<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@sycee-ui/vue';

const value = ref('');
</script>

<template>
  <div style="max-width: 320px">
    <Input v-model="value" placeholder="Enter your name" />
    <p style="margin: 8px 0 0; color: var(--sy-color-text-tertiary)">
      Value: {{ value || '(empty)' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@sycee-ui/vue';

const bio = ref('');
</script>

<template>
  <div style="max-width: 360px">
    <Textarea v-model="bio" placeholder="Tell us about yourself" />
    <p style="margin: 8px 0 0; color: var(--sy-color-text-tertiary)">
      Value: {{ bio || '(empty)' }}
    </p>
  </div>
</template>

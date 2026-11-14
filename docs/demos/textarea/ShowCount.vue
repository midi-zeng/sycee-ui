<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@sycee-ui/vue';

const free = ref('Sycee UI works with Vue and React.');
const limited = ref('');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px">
    <Textarea v-model="free" show-count :rows="2" placeholder="Count without a limit" />
    <Textarea
      v-model="limited"
      show-count
      :maxlength="100"
      :rows="4"
      placeholder="Count with maxlength=100"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Radio } from '@sycee-ui/vue';

const first = ref(true);
const second = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Radio v-model="first" label="Standalone radio" />
    <Radio v-model="second">Slot label</Radio>
    <Radio label="Locked by your administrator" disabled />
  </div>
</template>

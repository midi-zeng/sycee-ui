<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@sycee-ui/vue';

const smOn = ref(false);
const mdOn = ref(true);
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <Switch v-model="smOn" size="sm" />
    <Switch v-model="mdOn" />
  </div>
</template>

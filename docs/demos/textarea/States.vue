<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@sycee-ui/vue';

const tall = ref('');
const withError = ref('');
const withWarning = ref('');
const locked = ref('Can be selected but not edited');
const off = ref('');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px">
    <Textarea v-model="tall" :rows="6" placeholder="Six rows tall" />
    <Textarea v-model="withError" status="error" placeholder="Error state" />
    <Textarea v-model="withWarning" status="warning" placeholder="Warning state" />
    <Textarea v-model="locked" readonly />
    <Textarea v-model="off" disabled placeholder="Disabled" />
  </div>
</template>

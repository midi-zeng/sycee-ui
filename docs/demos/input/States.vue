<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@sycee-ui/vue';

const small = ref('');
const medium = ref('');
const large = ref('');
const withError = ref('');
const withWarning = ref('');
const locked = ref('Can be selected but not edited');
const off = ref('');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px">
    <Input v-model="small" size="sm" placeholder="Small" />
    <Input v-model="medium" placeholder="Medium (default)" />
    <Input v-model="large" size="lg" placeholder="Large" />
    <Input v-model="withError" status="error" placeholder="Error state" />
    <Input v-model="withWarning" status="warning" placeholder="Warning state" />
    <Input v-model="locked" readonly />
    <Input v-model="off" disabled placeholder="Disabled" />
  </div>
</template>

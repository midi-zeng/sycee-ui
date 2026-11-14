<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox } from '@sycee-ui/vue';

const email = ref(true);
const sms = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Checkbox v-model="email" label="Email notifications" />
    <Checkbox v-model="sms">SMS notifications</Checkbox>
    <Checkbox label="Locked by your administrator" disabled />
  </div>
</template>

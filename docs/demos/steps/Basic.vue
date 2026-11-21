<script setup lang="ts">
import { ref } from 'vue';
import { Steps } from '@sycee-ui/vue';

const active = ref(1);

const items = [
  { label: 'Account', description: 'Sign up' },
  { label: 'Profile', description: 'Add your details' },
  { label: 'Confirm', description: 'Review and submit' },
];
</script>

<template>
  <Steps :items="items" :active="active" @change="(index: number) => (active = index)" />
</template>

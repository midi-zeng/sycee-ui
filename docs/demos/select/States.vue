<script setup lang="ts">
import { ref } from 'vue';
import { Select } from '@sycee-ui/vue';

const plans = [
  { label: 'Hobby', value: 'hobby' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise (contact us)', value: 'enterprise', disabled: true },
];

const small = ref<string | number | null>(null);
const medium = ref<string | number | null>(null);
const large = ref<string | number | null>(null);
const withError = ref<string | number | null>(null);
const withWarning = ref<string | number | null>(null);
const plan = ref<string | number | null>('pro');
const locked = ref<string | number | null>('hobby');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 280px">
    <Select v-model="small" size="sm" :options="plans" placeholder="Small" />
    <Select v-model="medium" :options="plans" placeholder="Medium (default)" />
    <Select v-model="large" size="lg" :options="plans" placeholder="Large" />
    <Select v-model="withError" status="error" :options="plans" placeholder="Error state" />
    <Select v-model="withWarning" status="warning" :options="plans" placeholder="Warning state" />
    <Select v-model="plan" :options="plans" placeholder="With a disabled option" />
    <Select v-model="locked" :options="plans" disabled />
  </div>
</template>

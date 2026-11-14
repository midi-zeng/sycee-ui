<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@sycee-ui/vue';

const loadingOn = ref(true);
const loadingOff = ref(false);
const disabledOn = ref(true);
const disabledOff = ref(false);
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
    <Switch v-model="loadingOn" loading />
    <Switch v-model="loadingOff" loading />
    <Switch v-model="disabledOn" disabled />
    <Switch v-model="disabledOff" disabled />
  </div>
</template>

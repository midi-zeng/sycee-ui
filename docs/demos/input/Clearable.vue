<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Input } from '@sycee-ui/vue';

const keyword = ref('sycee');
const amount = ref('0.00');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px">
    <Input v-model="keyword" clearable placeholder="Search anything" />
    <Input v-model="amount" prefix="¥" suffix="CNY" />
    <Input placeholder="With icons">
      <template #prefix>
        <Icon name="search" />
      </template>
      <template #suffix>
        <Icon name="eye" />
      </template>
    </Input>
  </div>
</template>

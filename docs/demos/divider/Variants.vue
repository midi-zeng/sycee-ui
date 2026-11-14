<script setup lang="ts">
import { Divider } from '@sycee-ui/vue';
</script>

<template>
  <div style="max-width: 420px; display: flex; flex-direction: column; gap: 8px">
    <Divider label-placement="left">Left</Divider>
    <Divider>Center</Divider>
    <Divider label-placement="right">Right</Divider>
    <Divider dashed>Dashed</Divider>
    <Divider dashed label-placement="left">Dashed, left</Divider>
  </div>
</template>

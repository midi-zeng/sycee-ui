<script setup lang="ts">
import { Avatar, Badge } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <Badge :count="5">
      <Avatar alt="Jane" />
    </Badge>
    <Badge :count="12">
      <Avatar alt="Sam" shape="square" />
    </Badge>
    <Badge count="new" color="primary">
      <Avatar alt="Ann" size="lg" />
    </Badge>
  </div>
</template>

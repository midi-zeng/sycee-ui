<script setup lang="ts">
import { Avatar, Badge } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <Badge :count="200">
      <Avatar alt="Capped" />
    </Badge>
    <Badge :count="0">
      <Avatar alt="Hidden" />
    </Badge>
    <Badge :count="0" show-zero>
      <Avatar alt="Zero" />
    </Badge>
    <Badge dot>
      <Avatar alt="Dot" />
    </Badge>
    <Badge dot :count="9">
      <Avatar alt="Dot count" />
    </Badge>
  </div>
</template>

<script setup lang="ts">
import { Button, Tooltip } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <Tooltip content="Opens on hover (default)">
      <Button variant="outline">Hover</Button>
    </Tooltip>
    <Tooltip content="Toggles on click" trigger="click">
      <Button variant="outline">Click</Button>
    </Tooltip>
    <Tooltip content="Opens on focus" trigger="focus">
      <Button variant="outline">Focus</Button>
    </Tooltip>
    <Tooltip content="You will never see me" disabled>
      <Button variant="outline">Disabled</Button>
    </Tooltip>
  </div>
</template>

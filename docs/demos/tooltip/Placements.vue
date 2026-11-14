<script setup lang="ts">
import { Button, Tooltip } from '@sycee-ui/vue';
</script>

<template>
  <div
    style="display: grid; grid-template-columns: repeat(3, 110px); grid-auto-rows: 40px; place-items: center; justify-content: center; gap: 8px"
  >
    <span />
    <Tooltip content="Tooltip on top" placement="top">
      <Button variant="outline">Top</Button>
    </Tooltip>
    <span />
    <Tooltip content="Tooltip on the left" placement="left">
      <Button variant="outline">Left</Button>
    </Tooltip>
    <span style="color: var(--sy-color-text-tertiary)">placement</span>
    <Tooltip content="Tooltip on the right" placement="right">
      <Button variant="outline">Right</Button>
    </Tooltip>
    <span />
    <Tooltip content="Tooltip on the bottom" placement="bottom">
      <Button variant="outline">Bottom</Button>
    </Tooltip>
    <span />
  </div>
</template>

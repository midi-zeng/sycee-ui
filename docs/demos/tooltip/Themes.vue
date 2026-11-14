<script setup lang="ts">
import { Button, Tooltip } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <Tooltip content="Dark theme (default)" placement="bottom">
      <Button variant="outline">Dark</Button>
    </Tooltip>
    <Tooltip theme="light" content="Light theme" placement="bottom">
      <Button variant="outline">Light</Button>
    </Tooltip>
    <Tooltip theme="light" placement="bottom">
      <Button variant="outline">Light + rich content</Button>
      <template #content>
        <div style="max-width: 220px">
          <strong>Sycee UI</strong>
          <p style="margin: 4px 0 0">
            Rich content goes in the <code>content</code> slot.
          </p>
        </div>
      </template>
    </Tooltip>
  </div>
</template>

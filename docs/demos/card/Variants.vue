<script setup lang="ts">
import { Card } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <Card title="Hoverable" hoverable style="flex: 1; min-width: 200px">
      Adds a shadow on hover — use it for cards that are clickable or
      interactive.
    </Card>
    <Card title="Borderless" borderless style="flex: 1; min-width: 200px">
      Removes the border; pair it with a tinted background or nest it inside
      another surface.
    </Card>
    <Card title="No padding" :padding="false" style="flex: 1; min-width: 200px">
      <div style="background: var(--sy-color-bg-tertiary); padding: 16px">
        With <code>padding</code> set to false the body loses its padding —
        content reaches the card edges, ideal for images or tables.
      </div>
    </Card>
  </div>
</template>

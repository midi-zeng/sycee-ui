<script setup lang="ts">
import { Button, Empty, Icon } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px">
    <Empty description="No search results" style="flex: 1; min-width: 240px">
      <template #image>
        <span
          style="
            display: inline-flex;
            width: 96px;
            height: 96px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: var(--sy-color-bg-tertiary);
            color: var(--sy-color-text-tertiary);
          "
        >
          <Icon name="search" size="44" />
        </span>
      </template>
    </Empty>
    <Empty style="flex: 1; min-width: 240px">
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
        <span>Nothing shared with you yet</span>
        <Button size="sm">Create a document</Button>
      </div>
    </Empty>
  </div>
</template>

<script setup lang="ts">
import { Button, Card } from '@sycee-ui/vue';
</script>

<template>
  <Card style="max-width: 420px">
    <template #title>Team members</template>
    <template #extra>
      <a href="#">Manage</a>
    </template>
    <p style="margin: 0; color: var(--sy-color-text-secondary)">
      12 people have access to this workspace.
    </p>
    <template #footer>
      <div style="display: flex; gap: 12px; justify-content: flex-end">
        <Button>Invite later</Button>
        <Button color="primary">Invite people</Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Icon } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px">
    <span style="display: inline-flex; align-items: center; gap: 8px">
      <Icon name="warning" title="Warning" />
      <span>With a <code>title</code> — exposed as <code>role="img"</code></span>
    </span>
    <span style="display: inline-flex; align-items: center; gap: 8px">
      <Icon name="warning" />
      <span>Without — decorative, <code>aria-hidden</code></span>
    </span>
  </div>
</template>

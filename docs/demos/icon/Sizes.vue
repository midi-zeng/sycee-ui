<script setup lang="ts">
import { Icon } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div style="display: flex; align-items: center; gap: 20px">
      <Icon name="check" :size="14" />
      <Icon name="check" :size="20" />
      <Icon name="check" :size="28" />
      <Icon name="check" size="2em" />
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 24px;
        color: var(--sy-color-text-secondary);
      "
    >
      <Icon name="info" />
      <span style="font-size: 14px">Defaults to 1em — it follows the surrounding font size</span>
    </div>
    <div style="display: flex; align-items: center; gap: 20px">
      <span
        style="display: inline-flex; align-items: center; gap: 6px; color: var(--sy-color-primary)"
      >
        <Icon name="success" />
        primary
      </span>
      <span
        style="display: inline-flex; align-items: center; gap: 6px; color: var(--sy-color-success)"
      >
        <Icon name="success" />
        success
      </span>
      <span
        style="display: inline-flex; align-items: center; gap: 6px; color: var(--sy-color-warning)"
      >
        <Icon name="warning" />
        warning
      </span>
      <span
        style="display: inline-flex; align-items: center; gap: 6px; color: var(--sy-color-danger)"
      >
        <Icon name="danger" />
        danger
      </span>
    </div>
  </div>
</template>

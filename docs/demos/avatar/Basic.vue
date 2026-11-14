<script setup lang="ts">
import { Avatar } from '@sycee-ui/vue';

// Inline SVG data URI so the demo is self-contained.
function avatarUrl(letter: string, bg: string): string {
  const fill = bg.replace('#', '%23');
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='${fill}'/%3E%3Ctext x='48' y='61' font-family='sans-serif' font-size='38' fill='%23ffffff' text-anchor='middle'%3E${letter}%3C/text%3E%3C/svg%3E`;
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <Avatar :src="avatarUrl('A', '#6e56cf')" alt="Amy Lee" />
    <Avatar :src="avatarUrl('B', '#2fa46c')" alt="Ben Ortiz" />
    <Avatar alt="Carol" />
    <Avatar>
      <span style="font-weight: 600">SY</span>
    </Avatar>
  </div>
</template>

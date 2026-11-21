<script setup lang="ts">
import { Danmaku } from '@sycee-ui/vue';

const messages = [
  'Beautiful motion.',
  'Shipping this today 🚀',
  'Dark mode looks great',
  'The carousel is so smooth',
  'React + Vue = ❤️',
  'Accessible by default',
  'New component drop!',
  'Love the typography',
].map((content, index) => ({ id: index, content, track: index % 4 }));
</script>

<template>
  <Danmaku
    :items="messages"
    :height="180"
    :tracks="4"
    :speed="14"
    show-controls
    style="max-width: 720px; width: 100%"
  />
</template>

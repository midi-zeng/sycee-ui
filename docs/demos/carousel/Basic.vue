<script setup lang="ts">
import { h } from 'vue';
import { Carousel } from '@sycee-ui/vue';

const slides = [
  {
    key: 0,
    ariaLabel: 'One component language',
    title: 'One component language',
    description: 'A calm, consistent foundation for every product surface.',
    background: 'linear-gradient(135deg, #6e56cf, #9f8cf4)',
  },
  {
    key: 1,
    ariaLabel: 'React and Vue together',
    title: 'React. Vue. Together.',
    description: 'Parallel APIs and identical visual output across frameworks.',
    background: 'linear-gradient(135deg, #16856c, #4dc7a3)',
  },
  {
    key: 2,
    ariaLabel: 'Built for real products',
    title: 'Built for real products',
    description: 'Accessible interactions, thoughtful states, and themeable tokens.',
    background: 'linear-gradient(135deg, #b96817, #f0b35b)',
  },
].map((slide) => ({
  key: slide.key,
  ariaLabel: slide.ariaLabel,
  content: h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: '260px',
        padding: '32px',
        color: '#fff',
        background: slide.background,
      },
    },
    [
      h('strong', { style: { fontSize: '28px', letterSpacing: '-0.03em' } }, slide.title),
      h('span', { style: { marginTop: '8px', maxWidth: '480px', opacity: '0.82' } }, slide.description),
    ],
  ),
}));
</script>

<template>
  <Carousel :items="slides" style="max-width: 720px; width: 100%" />
</template>

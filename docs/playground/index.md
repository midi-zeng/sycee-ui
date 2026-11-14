---
title: Playground
layout: page
sidebar: false
pageClass: playground-page
---

<script setup>
import PlaygroundClient from '../.vitepress/theme/components/PlaygroundClient.vue';
</script>

# Playground

Edit the code on the left — the preview compiles **in your browser**. React
demos are transpiled with Sucrase; Vue demos are compiled with
`@vue/compiler-sfc`. Both use the real `@sycee-ui/react` and `@sycee-ui/vue`
packages.

<ClientOnly>
  <PlaygroundClient />
</ClientOnly>

All components, events and slots work here exactly as they do in your app. The
preview follows the site's dark mode.

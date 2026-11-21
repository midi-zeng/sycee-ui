<script setup lang="ts">
import { Tree } from '@sycee-ui/vue';

const data = [
  {
    key: 'src',
    label: 'src',
    children: [
      {
        key: 'components',
        label: 'components',
        children: [
          { key: 'button', label: 'Button' },
          { key: 'input', label: 'Input' },
        ],
      },
      { key: 'utils', label: 'utils' },
    ],
  },
  { key: 'tests', label: 'tests' },
  { key: 'docs', label: 'docs', disabled: true },
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px; max-width: 320px">
    <Tree :data="data" :default-expanded-keys="['src']" />
    <Tree :data="data" checkable :default-expanded-keys="['src']" />
  </div>
</template>

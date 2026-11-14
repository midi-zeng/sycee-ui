import { ref } from 'vue';

/**
 * Shared framework selector for demo blocks and the playground so the choice
 * persists across the whole docs site.
 */
export type DemoFramework = 'vue' | 'react';

export const demoFramework = ref<DemoFramework>('vue');

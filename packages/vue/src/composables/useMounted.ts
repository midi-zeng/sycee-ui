import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

/**
 * Returns `false` for the first render and `true` after the component mounts.
 * Useful for deferring browser-only output until hydration is complete.
 */
export function useMounted(): Readonly<Ref<boolean>> {
  const mounted = ref(false);

  onMounted(() => {
    mounted.value = true;
  });
  onUnmounted(() => {
    mounted.value = false;
  });

  return mounted;
}

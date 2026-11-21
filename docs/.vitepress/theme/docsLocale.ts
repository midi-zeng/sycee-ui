import { computed } from 'vue';
import { useData } from 'vitepress';
import type { Locale } from '@sycee-ui/vue';

/** Mirrors the docs locale route onto live demos from both frameworks. */
export function useDocsLocale() {
  const { lang } = useData();
  return computed<Locale>(() => (lang.value.toLowerCase().startsWith('zh') ? 'zh' : 'en'));
}

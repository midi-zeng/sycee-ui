import {
  getCurrentScope,
  onScopeDispose,
  ref,
  toValue,
  watch,
} from 'vue';
import type { MaybeRefOrGetter, Ref } from 'vue';

/**
 * Subscribes to a CSS media query. Environments without `matchMedia` use
 * `defaultValue`.
 */
export function useMediaQuery(
  query: MaybeRefOrGetter<string>,
  defaultValue = false,
): Readonly<Ref<boolean>> {
  const matches = ref(defaultValue);
  let stopListener: (() => void) | undefined;

  const setup = () => {
    stopListener?.();
    stopListener = undefined;

    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      matches.value = defaultValue;
      return;
    }

    const mediaQuery = window.matchMedia(toValue(query));
    const update = () => {
      matches.value = mediaQuery.matches;
    };
    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      stopListener = () => mediaQuery.removeEventListener('change', update);
    } else {
      mediaQuery.addListener(update);
      stopListener = () => mediaQuery.removeListener(update);
    }
  };

  if (getCurrentScope()) {
    watch(() => toValue(query), setup, { immediate: true });
    onScopeDispose(() => stopListener?.());
  } else {
    setup();
  }

  return matches;
}

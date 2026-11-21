import {
  getCurrentScope,
  onScopeDispose,
  shallowRef,
  toValue,
  watch,
} from 'vue';
import type { MaybeRefOrGetter, Ref } from 'vue';

/**
 * Returns a ref that only updates after `delay` milliseconds without changes.
 * The previous value remains available while waiting.
 */
export function useDebouncedValue<T>(
  value: MaybeRefOrGetter<T>,
  delay = 300,
): Readonly<Ref<T>> {
  const debouncedValue = shallowRef(toValue(value));
  let timer: ReturnType<typeof setTimeout> | undefined;

  watch(
    () => toValue(value),
    (nextValue) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        debouncedValue.value = nextValue;
      }, Math.max(0, delay));
    },
    { flush: 'sync' },
  );

  if (getCurrentScope()) {
    onScopeDispose(() => {
      if (timer) clearTimeout(timer);
    });
  }

  return debouncedValue;
}

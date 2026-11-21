import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

export type SetLocalStorageValue<T> = (value: T | ((previous: T) => T)) => void;

export type UseLocalStorageReturn<T> = readonly [
  value: Readonly<Ref<T>>,
  setValue: SetLocalStorageValue<T>,
  removeValue: () => void,
];

/**
 * Persists a JSON-serializable value in `localStorage` and keeps it in sync
 * across tabs. Storage failures fall back to in-memory state.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> {
  const value = ref(initialValue) as Ref<T>;

  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : (JSON.parse(stored) as T);
    } catch {
      return initialValue;
    }
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) value.value = readValue();
  };

  const setValue: SetLocalStorageValue<T> = (nextValue) => {
    const resolvedValue =
      typeof nextValue === 'function'
        ? (nextValue as (previous: T) => T)(value.value)
        : nextValue;
    value.value = resolvedValue;

    if (typeof window === 'undefined') return;
    try {
      const serialized = JSON.stringify(resolvedValue);
      if (serialized === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, serialized);
      }
    } catch {
      // Keep the in-memory value when storage is disabled or full.
    }
  };

  const removeValue = () => {
    value.value = initialValue;
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Removing persisted data is best-effort.
    }
  };

  if (typeof window !== 'undefined') {
    const start = () => {
      value.value = readValue();
      window.addEventListener('storage', handleStorage);
    };
    if (getCurrentInstance()) {
      onMounted(start);
      onUnmounted(() => window.removeEventListener('storage', handleStorage));
    } else {
      start();
    }
  } else if (getCurrentInstance()) {
    onMounted(() => {
      value.value = readValue();
    });
  }

  return [value, setValue, removeValue];
}

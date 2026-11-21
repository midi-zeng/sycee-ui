import { useCallback, useState, useSyncExternalStore } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface StoredEntry {
  raw: string;
  value: unknown;
}

const parsedCache = new Map<string, StoredEntry>();
const memoryValues = new Map<string, unknown>();
const listeners = new Map<string, Set<() => void>>();

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  if (memoryValues.has(key)) return memoryValues.get(key) as T;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }

  if (raw === null) return fallback;

  const cached = parsedCache.get(key);
  if (cached?.raw === raw) return cached.value as T;

  try {
    const value = JSON.parse(raw) as T;
    parsedCache.set(key, { raw, value });
    return value;
  } catch {
    parsedCache.delete(key);
    return fallback;
  }
}

function notify(key: string): void {
  for (const listener of listeners.get(key) ?? []) listener();
}

export type UseLocalStorageReturn<T> = readonly [
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
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
  const [fallback] = useState(initialValue);

  const subscribe = useCallback(
    (notifyChange: () => void) => {
      if (typeof window === 'undefined') return () => {};

      let keyListeners = listeners.get(key);
      if (!keyListeners) {
        keyListeners = new Set();
        listeners.set(key, keyListeners);
      }
      keyListeners.add(notifyChange);

      const handleStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) notifyChange();
      };
      window.addEventListener('storage', handleStorage);

      return () => {
        keyListeners?.delete(notifyChange);
        window.removeEventListener('storage', handleStorage);
        if (keyListeners?.size === 0) listeners.delete(key);
      };
    },
    [key],
  );

  const value = useSyncExternalStore(
    subscribe,
    () => readStoredValue(key, fallback),
    () => fallback,
  );

  const setStoredValue = useCallback<Dispatch<SetStateAction<T>>>(
    (nextValue) => {
      const currentValue = readStoredValue(key, fallback);
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (value: T) => T)(currentValue)
          : nextValue;

      parsedCache.delete(key);
      if (typeof window !== 'undefined') {
        try {
          const serialized = JSON.stringify(resolvedValue);
          if (serialized === undefined) {
            window.localStorage.removeItem(key);
            memoryValues.delete(key);
          } else {
            window.localStorage.setItem(key, serialized);
            memoryValues.delete(key);
          }
        } catch {
          memoryValues.set(key, resolvedValue);
        }
      } else {
        memoryValues.set(key, resolvedValue);
      }
      notify(key);
    },
    [key, fallback],
  );

  const removeValue = useCallback(() => {
    parsedCache.delete(key);
    memoryValues.delete(key);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Removing persisted data is best-effort.
      }
    }
    notify(key);
  }, [key]);

  return [value, setStoredValue, removeValue];
}

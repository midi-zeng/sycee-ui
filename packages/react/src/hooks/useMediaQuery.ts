import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a CSS media query. The server snapshot and environments
 * without `matchMedia` use `defaultValue`.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  }, [query, defaultValue]);

  const subscribe = useCallback(
    (notify: () => void) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {};
      }
      const mediaQuery = window.matchMedia(query);
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', notify);
        return () => mediaQuery.removeEventListener('change', notify);
      }
      mediaQuery.addListener(notify);
      return () => mediaQuery.removeListener(notify);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => defaultValue);
}

import { useEffect, useState } from 'react';

/**
 * Returns a value that only updates after `delay` milliseconds without
 * changes. The previous value remains available while waiting.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), Math.max(0, delay));
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

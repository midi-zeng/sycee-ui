import { useEffect, useState } from 'react';

/**
 * Returns `false` for the first render and `true` after the component mounts.
 * Useful for deferring browser-only output until hydration is complete.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The post-commit state change is what distinguishes hydration from the
    // server render, so an effect is required here.
    // oxlint-disable-next-line react/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}

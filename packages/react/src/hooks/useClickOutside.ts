import { useRef } from 'react';
import type { RefObject } from 'react';
import { useEventListener } from './useEventListener';

export interface UseClickOutsideOptions {
  /** Suspend listening without unmounting the target. @default true */
  enabled?: boolean;
  /** Pointer event used to detect outside interaction. @default 'pointerdown' */
  eventName?: 'pointerdown' | 'mousedown' | 'click';
}

/**
 * Calls `handler` when a pointer interaction happens outside the returned ref.
 */
export function useClickOutside<E extends Element = HTMLElement>(
  handler: (event: Event) => void,
  options: UseClickOutsideOptions = {},
): RefObject<E | null> {
  const ref = useRef<E | null>(null);

  useEventListener(
    options.eventName ?? 'pointerdown',
    (event) => {
      const element = ref.current;
      const target = event.target;
      if (
        !element ||
        event.defaultPrevented ||
        typeof Node === 'undefined' ||
        !(target instanceof Node) ||
        element.contains(target)
      ) {
        return;
      }
      handler(event);
    },
    typeof document !== 'undefined' ? document : null,
    { enabled: options.enabled },
  );

  return ref;
}

import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useEventListener } from './useEventListener';

export interface UseClickOutsideOptions {
  /** Suspend listening without unmounting the target. @default true */
  enabled?: MaybeRefOrGetter<boolean>;
  /** Pointer event used to detect outside interaction. @default 'pointerdown' */
  eventName?: 'pointerdown' | 'mousedown' | 'click';
}

/**
 * Calls `handler` when a pointer interaction happens outside the target.
 * Accepts either a template ref or a getter returning an element.
 */
export function useClickOutside(
  target: MaybeRefOrGetter<Element | null | undefined>,
  handler: (event: Event) => void,
  options: UseClickOutsideOptions = {},
): () => void {
  return useEventListener(
    options.eventName ?? 'pointerdown',
    (event) => {
      const element = toValue(target);
      const eventTarget = event.target;
      if (
        !element ||
        event.defaultPrevented ||
        typeof Node === 'undefined' ||
        !(eventTarget instanceof Node) ||
        element.contains(eventTarget)
      ) {
        return;
      }
      handler(event);
    },
    () => (typeof document !== 'undefined' ? document : undefined),
    { enabled: options.enabled },
  );
}

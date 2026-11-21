import { useEffect, useRef } from 'react';

export interface UseEventListenerOptions extends AddEventListenerOptions {
  /** Suspend the listener without changing the target. @default true */
  enabled?: boolean;
}

/**
 * Attaches an event listener and removes it automatically. The latest listener
 * is always called, so inline event handlers do not need to be memoized.
 */
export function useEventListener<E extends Event = Event>(
  eventName: string,
  listener: (event: E) => void,
  target?: EventTarget | null,
  options: UseEventListenerOptions = {},
): void {
  const listenerRef = useRef(listener);

  const { enabled = true, capture, once, passive, signal } = options;

  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    if (!enabled) return;
    const eventTarget =
      target ?? (typeof window !== 'undefined' ? window : null);
    if (!eventTarget) return;

    const eventListener = (event: Event) => listenerRef.current(event as E);
    eventTarget.addEventListener(eventName, eventListener, {
      capture,
      once,
      passive,
      signal,
    });
    return () => {
      eventTarget.removeEventListener(eventName, eventListener, { capture });
    };
  }, [eventName, target, enabled, capture, once, passive, signal]);
}

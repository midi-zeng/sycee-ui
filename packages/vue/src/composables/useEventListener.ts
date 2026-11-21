import {
  getCurrentScope,
  onScopeDispose,
  toValue,
  watchEffect,
} from 'vue';
import type { MaybeRefOrGetter } from 'vue';

export interface UseEventListenerOptions extends AddEventListenerOptions {
  /** Suspend the listener without changing the target. @default true */
  enabled?: MaybeRefOrGetter<boolean>;
}

/**
 * Attaches an event listener and removes it automatically. Returns a manual
 * stop function for cases where the listener must end before unmounting.
 */
export function useEventListener<E extends Event = Event>(
  eventName: string,
  listener: (event: E) => void,
  target: MaybeRefOrGetter<EventTarget | null | undefined> = () =>
    typeof window !== 'undefined' ? window : undefined,
  options: UseEventListenerOptions = {},
): () => void {
  const stop = watchEffect((onCleanup) => {
    if (!toValue(options.enabled ?? true)) return;
    const eventTarget = toValue(target);
    if (!eventTarget) return;

    const eventListener = (event: Event) => listener(event as E);
    eventTarget.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive,
      signal: options.signal,
    });
    onCleanup(() => {
      eventTarget.removeEventListener(eventName, eventListener, {
        capture: options.capture,
      });
    });
  });

  if (getCurrentScope()) onScopeDispose(stop);
  return stop;
}

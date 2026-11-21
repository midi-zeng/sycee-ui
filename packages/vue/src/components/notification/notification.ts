import { createVNode, render } from 'vue';
import type { VNode } from 'vue';
import { LocaleProvider, detectLocale } from '../../locale';
import NotificationContainer from './NotificationContainer.vue';

export type NotificationType = 'info' | 'success' | 'warning' | 'danger';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string | VNode;
  content?: string | VNode;
  duration: number;
  closing: boolean;
}

export interface NotificationApi {
  info: (title: string | VNode, content?: string | VNode, duration?: number) => void;
  success: (title: string | VNode, content?: string | VNode, duration?: number) => void;
  warning: (title: string | VNode, content?: string | VNode, duration?: number) => void;
  danger: (title: string | VNode, content?: string | VNode, duration?: number) => void;
  clear: () => void;
}

const DEFAULT_DURATION = 4500;
const MAX_STACK = 8;
// Matches var(--sy-duration-base), the length of the `.is-closing` exit animation.
const EXIT_DURATION = 200;

let seed = 0;
let items: NotificationItem[] = [];
let container: HTMLDivElement | null = null;

function ensureContainer(): boolean {
  if (container) return true;
  if (typeof document === 'undefined') return false;
  container = document.createElement('div');
  container.className = 'sy-notification-wrapper';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  document.body.appendChild(container);
  return true;
}

function renderItems() {
  if (!container) return;
  // Pass a fresh array copy so the container always re-renders.
  render(
    createVNode(
      LocaleProvider,
      { locale: detectLocale() },
      {
        default: () =>
          createVNode(NotificationContainer, { items: [...items], onClose: closeItem }),
      },
    ),
    container,
  );
}

function closeItem(id: number) {
  const target = items.find((item) => item.id === id);
  if (!target || target.closing) return;
  items = items.map((item) => (item.id === id ? { ...item, closing: true } : item));
  renderItems();
  window.setTimeout(() => {
    items = items.filter((item) => item.id !== id);
    renderItems();
  }, EXIT_DURATION);
}

function show(
  type: NotificationType,
  title: string | VNode,
  content?: string | VNode,
  duration: number = DEFAULT_DURATION,
) {
  if (!ensureContainer()) return;
  seed += 1;
  const id = seed;
  if (items.length >= MAX_STACK) {
    // Drop the oldest notification to keep the stack within the cap.
    items = items.slice(items.length - MAX_STACK + 1);
  }
  items = [...items, { id, type, title, content, duration, closing: false }];
  renderItems();
  if (duration > 0) {
    window.setTimeout(() => closeItem(id), duration);
  }
}

function clear() {
  if (!container) return;
  // Snapshot first: closeItem reassigns `items` while we iterate.
  const snapshot = items.slice();
  for (const item of snapshot) {
    closeItem(item.id);
  }
}

/**
 * Imperative notification API; renders into a shared `.sy-notification-wrapper`
 * fixed at the top right of the viewport. Notifications stay until dismissed
 * via their close button (or `duration` elapses; pass `0` to disable the timer).
 */
export const notification: NotificationApi = {
  info: (title, content, duration) => show('info', title, content, duration),
  success: (title, content, duration) => show('success', title, content, duration),
  warning: (title, content, duration) => show('warning', title, content, duration),
  danger: (title, content, duration) => show('danger', title, content, duration),
  clear,
};

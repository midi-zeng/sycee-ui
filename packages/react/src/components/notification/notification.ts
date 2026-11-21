import { createElement } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocaleProvider, detectLocale } from '../../locale';
import { NotificationContainer } from './NotificationContainer';

export type NotificationType = 'info' | 'success' | 'warning' | 'danger';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: ReactNode;
  content?: ReactNode;
  duration: number;
  closing: boolean;
}

export interface NotificationApi {
  info: (title: ReactNode, content?: ReactNode, duration?: number) => void;
  success: (title: ReactNode, content?: ReactNode, duration?: number) => void;
  warning: (title: ReactNode, content?: ReactNode, duration?: number) => void;
  danger: (title: ReactNode, content?: ReactNode, duration?: number) => void;
  clear: () => void;
}

const DEFAULT_DURATION = 4500;
const MAX_STACK = 8;
// Matches var(--sy-duration-base), the length of the `.is-closing` exit animation.
const EXIT_DURATION = 200;

let seed = 0;
let items: NotificationItem[] = [];
let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

function ensureContainer(): boolean {
  if (container) return true;
  if (typeof document === 'undefined') return false;
  container = document.createElement('div');
  container.className = 'sy-notification-wrapper';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  document.body.appendChild(container);
  root = createRoot(container);
  return true;
}

function render() {
  if (!root) return;
  root.render(
    createElement(
      LocaleProvider,
      { locale: detectLocale() },
      createElement(NotificationContainer, { items, onClose: closeItem }),
    ),
  );
}

function closeItem(id: number) {
  const target = items.find((item) => item.id === id);
  if (!target || target.closing) return;
  items = items.map((item) => (item.id === id ? { ...item, closing: true } : item));
  render();
  window.setTimeout(() => {
    items = items.filter((item) => item.id !== id);
    render();
  }, EXIT_DURATION);
}

function show(
  type: NotificationType,
  title: ReactNode,
  content?: ReactNode,
  duration: number = DEFAULT_DURATION,
) {
  if (!ensureContainer() || !root) return;
  seed += 1;
  const id = seed;
  if (items.length >= MAX_STACK) {
    // Drop the oldest notification to keep the stack within the cap.
    items = items.slice(items.length - MAX_STACK + 1);
  }
  items = [...items, { id, type, title, content, duration, closing: false }];
  render();
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

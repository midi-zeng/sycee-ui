import { createElement } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { MessageContainer } from './MessageContainer';

export type MessageType = 'info' | 'success' | 'warning' | 'danger';

export interface MessageItem {
  id: number;
  type: MessageType;
  content: ReactNode;
  duration: number;
  closing: boolean;
}

export interface MessageApi {
  info: (content: ReactNode, duration?: number) => void;
  success: (content: ReactNode, duration?: number) => void;
  warning: (content: ReactNode, duration?: number) => void;
  danger: (content: ReactNode, duration?: number) => void;
  clear: () => void;
}

const DEFAULT_DURATION = 3000;
const MAX_STACK = 8;
// Matches var(--sy-duration-base), the length of the `.is-closing` exit animation.
const EXIT_DURATION = 200;

let seed = 0;
let items: MessageItem[] = [];
let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

function ensureContainer(): boolean {
  if (container) return true;
  if (typeof document === 'undefined') return false;
  container = document.createElement('div');
  container.className = 'sy-message-wrapper';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  document.body.appendChild(container);
  root = createRoot(container);
  return true;
}

function render() {
  if (!root) return;
  root.render(createElement(MessageContainer, { items }));
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

function show(type: MessageType, content: ReactNode, duration = DEFAULT_DURATION) {
  if (!ensureContainer() || !root) return;
  seed += 1;
  const id = seed;
  if (items.length >= MAX_STACK) {
    // Drop the oldest message to keep the stack within the cap.
    items = items.slice(items.length - MAX_STACK + 1);
  }
  items = [...items, { id, type, content, duration, closing: false }];
  render();
  if (duration > 0) {
    window.setTimeout(() => closeItem(id), duration);
  }
}

function clear() {
  if (!container) return;
  for (const item of items) {
    closeItem(item.id);
  }
}

/** Imperative message API; renders into a shared `.sy-message-wrapper` on document.body. */
export const message: MessageApi = {
  info: (content, duration) => show('info', content, duration),
  success: (content, duration) => show('success', content, duration),
  warning: (content, duration) => show('warning', content, duration),
  danger: (content, duration) => show('danger', content, duration),
  clear,
};

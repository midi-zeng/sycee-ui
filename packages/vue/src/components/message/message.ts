import { createVNode, render } from 'vue';
import type { VNode } from 'vue';
import MessageContainer from './MessageContainer.vue';

export type MessageType = 'info' | 'success' | 'warning' | 'danger';

export interface MessageItem {
  id: number;
  type: MessageType;
  content: string | VNode;
  duration: number;
  closing: boolean;
}

export interface MessageApi {
  info: (content: string | VNode, duration?: number) => void;
  success: (content: string | VNode, duration?: number) => void;
  warning: (content: string | VNode, duration?: number) => void;
  danger: (content: string | VNode, duration?: number) => void;
  clear: () => void;
}

const DEFAULT_DURATION = 3000;
const MAX_STACK = 8;
// Matches var(--sy-duration-base), the length of the `.is-closing` exit animation.
const EXIT_DURATION = 200;

let seed = 0;
let items: MessageItem[] = [];
let container: HTMLDivElement | null = null;

function ensureContainer(): boolean {
  if (container) return true;
  if (typeof document === 'undefined') return false;
  container = document.createElement('div');
  container.className = 'sy-message-wrapper';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  document.body.appendChild(container);
  return true;
}

function renderItems() {
  if (!container) return;
  // Pass a fresh array copy so the container always re-renders.
  render(createVNode(MessageContainer, { items: [...items] }), container);
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

function show(type: MessageType, content: string | VNode, duration = DEFAULT_DURATION) {
  if (!ensureContainer()) return;
  seed += 1;
  const id = seed;
  if (items.length >= MAX_STACK) {
    // Drop the oldest message to keep the stack within the cap.
    items = items.slice(items.length - MAX_STACK + 1);
  }
  items = [...items, { id, type, content, duration, closing: false }];
  renderItems();
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

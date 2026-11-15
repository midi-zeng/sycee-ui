import { createVNode, render } from 'vue';
import type { VNode } from 'vue';
import Button from '../button/Button.vue';
import Modal from './Modal.vue';

export interface DialogConfig {
  /** Title rendered in the dialog header. */
  title?: string;
  /** Body content; accepts a string or a VNode. */
  content?: string | VNode;
  /** Text of the confirm button. @default 'OK' */
  okText?: string;
  /** Text of the cancel button; confirm only. @default 'Cancel' */
  cancelText?: string;
  /** Width of the dialog panel; numbers become px. @default 460 */
  width?: number | string;
  /** Closes when the mask is clicked. @default true */
  maskClosable?: boolean;
  /** Closes when Escape is pressed. @default true */
  closeOnEsc?: boolean;
  /** Called when the confirm button is pressed; the dialog closes afterwards. */
  onOk?: () => void;
  /** Called when the dialog is dismissed without confirming (cancel button, close button, mask or Escape). */
  onCancel?: () => void;
}

export interface DialogHandle {
  /** Closes the dialog without calling `onOk`/`onCancel`. */
  destroy: () => void;
}

export interface DialogApi {
  /** Opens a dialog with OK and Cancel buttons. */
  confirm: (config: DialogConfig) => DialogHandle;
  /** Opens a dialog with a single OK button. */
  alert: (config: DialogConfig) => DialogHandle;
  /** Closes every open dialog without calling their callbacks. */
  clear: () => void;
}

interface DialogRecord {
  id: number;
  container: HTMLDivElement;
  config: DialogConfig;
  mode: 'confirm' | 'alert';
  open: boolean;
  removeTimer: number | null;
}

// Matches var(--sy-duration-base), the length of the modal exit animation.
const CLOSE_DURATION = 220;

let seed = 0;
const records = new Map<number, DialogRecord>();

function startRemove(record: DialogRecord) {
  if (record.removeTimer !== null) return;
  record.removeTimer = window.setTimeout(() => {
    record.removeTimer = null;
    records.delete(record.id);
    render(null, record.container);
    record.container.remove();
  }, CLOSE_DURATION);
}

function closeRecord(record: DialogRecord) {
  record.open = false;
  renderRecord(record);
  startRemove(record);
}

function handleOk(record: DialogRecord) {
  record.config.onOk?.();
  closeRecord(record);
}

function renderRecord(record: DialogRecord) {
  const { config, mode } = record;
  const children: Record<string, () => VNode | string | undefined> = {
    default: () => config.content,
  };
  if (mode === 'alert') {
    // `alert` replaces the default OK/Cancel footer with a single button.
    children.footer = () =>
      createVNode(
        Button,
        { variant: 'solid', onClick: () => handleOk(record) },
        () => config.okText ?? 'OK',
      );
  }
  render(
    createVNode(
      Modal,
      {
        open: record.open,
        title: config.title,
        width: config.width,
        okText: config.okText,
        cancelText: config.cancelText,
        maskClosable: config.maskClosable,
        closeOnEsc: config.closeOnEsc,
        onOk: () => handleOk(record),
        // Covers every dismissal (cancel button, close button, mask, Escape);
        // the OK path closes through the prop and never emits `close`. Late
        // dismissal events can still arrive while the exit transition runs
        // (e.g. another mask click) — the dialog is already closing, so the
        // cancel callback must not fire again.
        onClose: () => {
          if (!record.open) return;
          config.onCancel?.();
          startRemove(record);
        },
        // `defineModel` syncs from the prop, so every flip must re-render.
        'onUpdate:open': (value: boolean) => {
          record.open = value;
          renderRecord(record);
          if (!value) startRemove(record);
        },
      },
      children,
    ),
    record.container,
  );
}

function show(mode: DialogRecord['mode'], config: DialogConfig): DialogHandle {
  if (typeof document === 'undefined') {
    return { destroy: () => undefined };
  }
  seed += 1;
  const record: DialogRecord = {
    id: seed,
    container: document.createElement('div'),
    config,
    mode,
    open: true,
    removeTimer: null,
  };
  records.set(record.id, record);
  document.body.appendChild(record.container);
  renderRecord(record);
  return { destroy: () => closeRecord(record) };
}

function clear() {
  // Removal happens on timers, so the map is not mutated during iteration.
  for (const record of records.values()) {
    closeRecord(record);
  }
}

/** Imperative dialog API; mounts a Modal into a per-instance container on document.body. */
export const dialog: DialogApi = {
  confirm: (config) => show('confirm', config),
  alert: (config) => show('alert', config),
  clear,
};

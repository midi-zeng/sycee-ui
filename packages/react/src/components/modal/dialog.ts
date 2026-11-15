import { createElement } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../button/Button';
import { Modal } from './Modal';

export interface DialogConfig {
  /** Title rendered in the dialog header. */
  title?: ReactNode;
  /** Body content. */
  content?: ReactNode;
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
  root: ReturnType<typeof createRoot>;
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
    record.root.unmount();
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
  record.root.render(
    createElement(
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
        // the OK path closes through the prop and never fires `onClose`.
        onClose: () => {
          config.onCancel?.();
          startRemove(record);
        },
        // `alert` replaces the default OK/Cancel footer with a single button.
        footer:
          mode === 'alert'
            ? createElement(
                Button,
                { variant: 'solid', onClick: () => handleOk(record) },
                config.okText ?? 'OK',
              )
            : undefined,
      },
      config.content,
    ),
  );
}

function show(mode: DialogRecord['mode'], config: DialogConfig): DialogHandle {
  if (typeof document === 'undefined') {
    return { destroy: () => undefined };
  }
  seed += 1;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const record: DialogRecord = {
    id: seed,
    container,
    root: createRoot(container),
    config,
    mode,
    open: true,
    removeTimer: null,
  };
  records.set(record.id, record);
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

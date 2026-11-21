import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { isTopOverlay, registerOverlay } from '../../utils/overlays';
import { useLocale } from '../../locale';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the dialog is open. */
  open: boolean;
  /** Title rendered in the dialog header. */
  title?: ReactNode;
  /** Width of the dialog panel. @default 460 */
  width?: number | string;
  /** Text of the confirm button. Defaults to the active locale. */
  okText?: string;
  /** Text of the cancel button. Defaults to the active locale. */
  cancelText?: string;
  /** Renders the default footer with OK/Cancel buttons. @default true */
  showFooter?: boolean;
  /** Closes when the mask is clicked. @default true */
  maskClosable?: boolean;
  /** Closes when Escape is pressed. @default true */
  closeOnEsc?: boolean;
  /** Custom footer content; replaces the default OK/Cancel buttons. */
  footer?: ReactNode;
  /** Called when the confirm button is pressed. The caller decides when to close. */
  onOk?: () => void;
  /** Called when the cancel button is pressed; the dialog then starts closing. */
  onCancel?: () => void;
  /** Called after the dialog becomes visible. */
  onOpen?: () => void;
  /** Called when a close is initiated (Esc, mask, close button or cancel). */
  onClose?: () => void;
}

// The exit animation runs for var(--sy-duration-base); unmount shortly after.
const CLOSE_DURATION = 220;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    title,
    width = 460,
    okText,
    cancelText,
    showFooter = true,
    maskClosable = true,
    closeOnEsc = true,
    footer,
    className,
    style,
    children,
    onClick,
    onOk,
    onCancel,
    onOpen,
    onClose,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Mirrors the `open` prop with a one-frame lag so closing through the prop
  // can animate out instead of vanishing on the same render.
  const [shown, setShown] = useState(open);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const modalIdRef = useRef(0);
  const titleId = useId();
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  const visible = (shown || closing) && !hidden;

  const setPanelRef = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const initiateClose = useCallback(() => {
    if (closing) return;
    onClose?.();
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setHidden(true);
      setClosing(false);
    }, CLOSE_DURATION);
  }, [closing, onClose]);

  // Sync with the `open` prop. Reopening cancels any pending close and resets
  // local state; closing through the prop runs the same exit animation as
  // internal closes (Esc, mask, X) instead of vanishing, matching the Vue
  // implementation's `<Transition>` leave. A prop-driven close emits no
  // `onClose` — it is not a user-initiated dismissal.
  const openPropRef = useRef(open);
  useEffect(() => {
    const wasOpen = openPropRef.current;
    openPropRef.current = open;
    if (open === wasOpen) return;
    if (open) {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setShown(true);
      setHidden(false);
      setClosing(false);
      return;
    }
    if (!shown || closing || hidden) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setShown(false);
      setHidden(true);
      setClosing(false);
    }, CLOSE_DURATION);
  }, [open, shown, closing, hidden]);

  // Scroll lock, focus management and the `open` event while visible.
  useEffect(() => {
    if (!visible) return undefined;
    const registration = registerOverlay();
    modalIdRef.current = registration.id;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    onOpenRef.current?.();
    panelRef.current?.focus();
    return () => {
      registration.release();
      const previous = restoreFocusRef.current;
      restoreFocusRef.current = null;
      previous?.focus();
    };
  }, [visible]);

  // Escape closes the topmost dialog; Tab cycles within the panel.
  useEffect(() => {
    if (!visible || closing) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        if (!isTopOverlay(modalIdRef.current)) return;
        event.stopPropagation();
        initiateClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;
      const inside = current instanceof Node && panel.contains(current);
      if (event.shiftKey && (current === first || current === panel || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, closing, closeOnEsc, initiateClose]);

  // Clear a pending close timer when the component unmounts.
  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  if (!visible || typeof document === 'undefined') return null;

  const handleMaskClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!maskClosable) return;
    if (event.target === event.currentTarget) initiateClose();
  };

  const handleOk = () => {
    onOk?.();
  };

  const handleCancel = () => {
    onCancel?.();
    initiateClose();
  };

  return createPortal(
    <div
      className={cx('sy-modal-mask', closing && 'is-closing', className)}
      style={style}
      onClick={handleMaskClick}
      {...rest}
    >
      <div
        ref={setPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="sy-modal"
        style={{ width }}
      >
        <div className="sy-modal__header">
          <div id={titleId} className="sy-modal__title">
            {title}
          </div>
          <button
            type="button"
            className="sy-modal__close"
            aria-label={t.close}
            onClick={initiateClose}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="sy-modal__body">{children}</div>
        {showFooter ? (
          <div className="sy-modal__footer">
            {footer ?? (
              <>
                <Button variant="ghost" onClick={handleCancel}>
                  {cancelText ?? t.cancel}
                </Button>
                <Button onClick={handleOk}>{okText ?? t.ok}</Button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
});

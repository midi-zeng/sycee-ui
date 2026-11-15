import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the dialog is open. */
  open: boolean;
  /** Title rendered in the dialog header. */
  title?: ReactNode;
  /** Width of the dialog panel. @default 460 */
  width?: number | string;
  /** Text of the confirm button. @default 'OK' */
  okText?: string;
  /** Text of the cancel button. @default 'Cancel' */
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

// Module-level scroll lock so nested modals share one `overflow: hidden`.
let scrollLockCount = 0;
let scrollLockPreviousOverflow = '';

function lockBodyScroll() {
  if (typeof document === 'undefined') return;
  if (scrollLockCount === 0) {
    scrollLockPreviousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return;
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = scrollLockPreviousOverflow;
  }
}

// Stack of open modal ids so Escape only closes the topmost dialog.
let modalSeed = 0;
let modalStack: number[] = [];

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    title,
    width = 460,
    okText = 'OK',
    cancelText = 'Cancel',
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
    const modalId = (modalSeed += 1);
    modalIdRef.current = modalId;
    modalStack.push(modalId);
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    lockBodyScroll();
    onOpenRef.current?.();
    panelRef.current?.focus();
    return () => {
      modalStack = modalStack.filter((entry) => entry !== modalId);
      unlockBodyScroll();
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
        if (modalStack[modalStack.length - 1] !== modalIdRef.current) return;
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
            aria-label="Close"
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
                  {cancelText}
                </Button>
                <Button onClick={handleOk}>{okText}</Button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
});

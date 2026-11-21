import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { isTopOverlay, registerOverlay } from '../../utils/overlays';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the drawer is open. */
  open: boolean;
  /** Title rendered in the drawer header. */
  title?: ReactNode;
  /** Side the panel slides in from. @default 'right' */
  placement?: DrawerPlacement;
  /** Panel width for left/right drawers. @default 400 */
  width?: number | string;
  /** Panel height for top/bottom drawers. @default 320 */
  height?: number | string;
  /** Closes when the mask is clicked. @default true */
  maskClosable?: boolean;
  /** Closes when Escape is pressed. @default true */
  closeOnEsc?: boolean;
  /** Called when a close is initiated (Esc, mask or close button). */
  onClose?: () => void;
  /** Called after the drawer becomes visible. */
  onOpen?: () => void;
}

// The exit animation runs for var(--sy-duration-base); unmount shortly after.
const CLOSE_DURATION = 220;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    title,
    placement = 'right',
    width = 400,
    height = 320,
    maskClosable = true,
    closeOnEsc = true,
    className,
    style,
    children,
    onClick,
    onClose,
    onOpen,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [shown, setShown] = useState(open);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const overlayIdRef = useRef(0);
  const titleId = useId();
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  const visible = (shown || closing) && !hidden;

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

  // Sync with the `open` prop; prop-driven closes run the same exit animation.
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
    overlayIdRef.current = registration.id;
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

  // Escape closes the topmost overlay; Tab cycles within the panel.
  useEffect(() => {
    if (!visible || closing) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        if (!isTopOverlay(overlayIdRef.current)) return;
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

  const handleMaskClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!maskClosable) return;
    if (event.target === event.currentTarget) initiateClose();
  };

  const panelStyle =
    placement === 'left' || placement === 'right'
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : { height: typeof height === 'number' ? `${height}px` : height };

  return createPortal(
    <div
      className={cx(
        'sy-drawer-mask',
        `sy-drawer-mask--${placement}`,
        closing && 'is-closing',
        className,
      )}
      style={style}
      onClick={handleMaskClick}
      {...rest}
    >
      <div
        ref={(node) => {
          panelRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cx('sy-drawer', `sy-drawer--${placement}`)}
        style={panelStyle}
      >
        {title ? (
          <div className="sy-drawer__header">
            <div id={titleId} className="sy-drawer__title">
              {title}
            </div>
            <button
              type="button"
              className="sy-drawer__close"
              aria-label={t.close}
              onClick={initiateClose}
            >
              <Icon name="close" />
            </button>
          </div>
        ) : null}
        <div className="sy-drawer__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
});

import { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { HTMLAttributes, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Button } from '../button/Button';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'title' | 'content'> {
  /** Confirmation question shown as the bubble headline. */
  title?: string;
  /** Optional supporting text below the title. */
  content?: string;
  /** Placement relative to the trigger; flips when it would overflow the viewport. @default 'top' */
  placement?: PopconfirmPlacement;
  /** Text of the confirm button. Defaults to the active locale. */
  okText?: string;
  /** Text of the cancel button. Defaults to the active locale. */
  cancelText?: string;
  /** Renders the confirm button in the danger color (destructive actions). */
  danger?: boolean;
  /** Disables the popconfirm. */
  disabled?: boolean;
  /** Called when the confirm button is pressed; the bubble then closes. */
  onConfirm?: () => void;
  /** Called when the cancel button is pressed (or Esc/outside click); the bubble then closes. */
  onCancel?: () => void;
  /** The trigger element the popconfirm is attached to. */
  children?: React.ReactNode;
}

interface BubblePosition {
  top: number;
  left: number;
  transform: string;
  arrowTop: number;
  arrowLeft: number;
}

const GAP = 8;
const ARROW_SIZE = 8;
const BUBBLE_ESTIMATED_WIDTH = 220;
const BUBBLE_ESTIMATED_HEIGHT = 110;

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

export const Popconfirm = forwardRef<HTMLSpanElement, PopconfirmProps>(function Popconfirm(
  {
    title,
    content,
    placement = 'top',
    okText,
    cancelText,
    danger = false,
    disabled = false,
    onConfirm,
    onCancel,
    className,
    children,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<BubblePosition | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  const closeBubble = useCallback(() => setOpen(false), []);

  const hasContent = Boolean(title || content);

  const updatePosition = useCallback(() => {
    const triggerElement = wrapperRef.current?.firstElementChild as HTMLElement | null;
    if (!triggerElement) return;
    const rect = triggerElement.getBoundingClientRect();
    const bubble = bubbleRef.current;
    const bubbleWidth = bubble?.offsetWidth ?? BUBBLE_ESTIMATED_WIDTH;
    const bubbleHeight = bubble?.offsetHeight ?? BUBBLE_ESTIMATED_HEIGHT;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let resolved = placement;
    if (placement === 'top' && rect.top - GAP - bubbleHeight < 0) resolved = 'bottom';
    else if (placement === 'bottom' && rect.bottom + GAP + bubbleHeight > window.innerHeight) resolved = 'top';
    else if (placement === 'left' && rect.left - GAP - bubbleWidth < 0) resolved = 'right';
    else if (placement === 'right' && rect.right + GAP + bubbleWidth > window.innerWidth) resolved = 'left';

    switch (resolved) {
      case 'bottom':
        setPos({
          top: rect.bottom + GAP,
          left: centerX,
          transform: 'translate(-50%, 0)',
          arrowTop: -ARROW_SIZE / 2,
          arrowLeft: bubbleWidth / 2 - ARROW_SIZE / 2,
        });
        break;
      case 'left':
        setPos({
          top: centerY,
          left: rect.left - GAP - bubbleWidth,
          transform: 'translate(0, -50%)',
          arrowTop: bubbleHeight / 2 - ARROW_SIZE / 2,
          arrowLeft: bubbleWidth - ARROW_SIZE / 2,
        });
        break;
      case 'right':
        setPos({
          top: centerY,
          left: rect.right + GAP,
          transform: 'translate(0, -50%)',
          arrowTop: bubbleHeight / 2 - ARROW_SIZE / 2,
          arrowLeft: -ARROW_SIZE / 2,
        });
        break;
      default: // 'top'
        setPos({
          top: rect.top - GAP - bubbleHeight,
          left: centerX,
          transform: 'translate(-50%, 0)',
          arrowTop: bubbleHeight - ARROW_SIZE / 2,
          arrowLeft: bubbleWidth / 2 - ARROW_SIZE / 2,
        });
    }
  }, [placement]);

  // Measure the mounted bubble and refine the position before first paint.
  useIsomorphicLayoutEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  const showBubble = open && !disabled && hasContent;

  // Close on Escape or clicks outside the bubble while it is shown.
  useEffect(() => {
    if (!showBubble) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeBubble();
    };
    const handleMouseDown = (event: MouseEvent) => {
      const bubble = bubbleRef.current;
      const wrapper = wrapperRef.current;
      if (bubble?.contains(event.target as Node)) return;
      if (wrapper?.contains(event.target as Node)) return;
      closeBubble();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [showBubble, closeBubble]);

  const handleTriggerClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (disabled) return;
    setOpen((value) => !value);
  };

  const handleConfirm = () => {
    onConfirm?.();
    closeBubble();
  };

  const handleCancel = () => {
    onCancel?.();
    closeBubble();
  };

  return (
    <span
      ref={(node) => {
        wrapperRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cx('sy-popconfirm', className)}
      aria-expanded={showBubble || undefined}
      onClick={handleTriggerClick}
      {...rest}
    >
      {/* Click handlers live on the inline-flex wrapper; child clicks bubble up to it. */}
      {children}
      {showBubble && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={bubbleRef}
              className="sy-popconfirm__bubble"
              style={{
                position: 'fixed',
                top: pos?.top ?? 0,
                left: pos?.left ?? 0,
                transform: pos?.transform,
              }}
              aria-labelledby={title ? titleId : undefined}
            >
              {title ? (
                <div id={titleId} className="sy-popconfirm__title">
                  {title}
                </div>
              ) : null}
              {content ? <div className="sy-popconfirm__description">{content}</div> : null}
              <div className="sy-popconfirm__actions">
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  {cancelText ?? t.cancel}
                </Button>
                <Button size="sm" color={danger ? 'danger' : 'primary'} onClick={handleConfirm}>
                  {okText ?? t.ok}
                </Button>
              </div>
              <span
                className="sy-popconfirm__arrow"
                style={{
                  top: pos?.arrowTop ?? 0,
                  left: pos?.arrowLeft ?? 0,
                  transform: 'rotate(45deg)',
                }}
              />
            </div>,
            document.body,
          )
        : null}
    </span>
  );
});

// The cloneElement handler-chaining below is intentional: refs are only read
// inside event handlers / layout effects. The `react/refs` heuristic flags the
// transitive ref usage and cannot see the actual call sites.
// oxlint-disable react/refs
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type {
  FocusEventHandler,
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipTrigger = 'hover' | 'click' | 'focus';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Tooltip content; the bubble is not rendered when empty. */
  content?: ReactNode;
  /** Placement relative to the trigger; flips when it would overflow the viewport. @default 'top' */
  placement?: TooltipPlacement;
  /** Interaction that opens the tooltip. @default 'hover' */
  trigger?: TooltipTrigger;
  /** Disables the tooltip. */
  disabled?: boolean;
  /** @default 'dark' */
  theme?: 'dark' | 'light';
  /** The trigger element the tooltip is attached to. */
  children?: ReactNode;
}

type TooltipEventHandler<E extends SyntheticEvent> = (event: E) => void;

interface TriggerElementProps {
  'aria-describedby'?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  tabIndex?: number;
}

interface BubblePosition {
  top: number;
  left: number;
  transform: string;
  arrowTop: number;
  arrowLeft: number;
}

const OPEN_DELAY = 120;
const GAP = 8;
const ARROW_SIZE = 8;
const BUBBLE_ESTIMATED_WIDTH = 120;
const BUBBLE_ESTIMATED_HEIGHT = 32;

// Measurement must happen before paint in the browser; on the server it is a no-op.
const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

function chainHandler<E extends SyntheticEvent>(
  theirs: TooltipEventHandler<E> | undefined,
  ours: TooltipEventHandler<E>,
): TooltipEventHandler<E> {
  return (event) => {
    theirs?.(event);
    ours(event);
  };
}

export function Tooltip({
  content,
  placement = 'top',
  trigger = 'hover',
  disabled = false,
  theme = 'dark',
  className,
  children,
  ...rest
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<BubblePosition | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const bubbleId = useId();

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const openBubble = useCallback(() => {
    clearOpenTimer();
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      setOpen(true);
    }, OPEN_DELAY);
  }, [clearOpenTimer]);

  const openBubbleNow = useCallback(() => {
    clearOpenTimer();
    setOpen(true);
  }, [clearOpenTimer]);

  const closeBubble = useCallback(() => {
    clearOpenTimer();
    setOpen(false);
  }, [clearOpenTimer]);

  const toggleBubble = useCallback(() => {
    if (open) closeBubble();
    else openBubbleNow();
  }, [open, closeBubble, openBubbleNow]);

  const hasContent = content !== undefined && content !== null && content !== '' && content !== false;
  const showBubble = open && !disabled && hasContent;

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
        break;
    }
  }, [placement]);

  // Measure the mounted bubble and refine the position before first paint.
  useIsomorphicLayoutEffect(() => {
    if (showBubble) updatePosition();
  }, [showBubble, updatePosition]);

  // Close on Escape while the bubble is shown.
  useEffect(() => {
    if (!showBubble) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeBubble();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showBubble, closeBubble]);

  // Never leave a pending open timer behind.
  useEffect(() => clearOpenTimer, [clearOpenTimer]);

  const attachHandlers: TriggerElementProps = {};
  if (trigger === 'hover') {
    attachHandlers.onMouseEnter = openBubble;
    attachHandlers.onMouseLeave = closeBubble;
  } else if (trigger === 'focus') {
    attachHandlers.onFocus = openBubble;
    attachHandlers.onBlur = closeBubble;
  } else {
    attachHandlers.onClick = toggleBubble;
  }
  if (showBubble) attachHandlers['aria-describedby'] = bubbleId;

  let triggerNode: ReactNode;
  if (isValidElement(children)) {
    const childProps = children.props as TriggerElementProps;
    const overrides: TriggerElementProps = { ...attachHandlers };
    if (trigger === 'hover') {
      overrides.onMouseEnter = chainHandler(childProps.onMouseEnter, openBubble);
      overrides.onMouseLeave = chainHandler(childProps.onMouseLeave, closeBubble);
    } else if (trigger === 'focus') {
      overrides.onFocus = chainHandler(childProps.onFocus, openBubble);
      overrides.onBlur = chainHandler(childProps.onBlur, closeBubble);
    } else {
      overrides.onClick = chainHandler(childProps.onClick, toggleBubble);
    }
    if (showBubble) overrides['aria-describedby'] = bubbleId;
    triggerNode = cloneElement(children as ReactElement<TriggerElementProps>, overrides);
  } else {
    triggerNode = (
      <span tabIndex={0} {...attachHandlers}>
        {children}
      </span>
    );
  }

  return (
    <span ref={wrapperRef} className={cx('sy-tooltip', className)} {...rest}>
      {triggerNode}
      {showBubble && typeof document !== 'undefined'
        ? createPortal(
            <div
              id={bubbleId}
              ref={bubbleRef}
              role="tooltip"
              className={cx('sy-tooltip__bubble', theme === 'light' && 'sy-tooltip__bubble--light')}
              style={{
                position: 'fixed',
                top: pos?.top ?? 0,
                left: pos?.left ?? 0,
                transform: pos?.transform,
              }}
            >
              {content}
              <span
                className={cx('sy-tooltip__arrow', theme === 'light' && 'sy-tooltip__arrow--light')}
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
}

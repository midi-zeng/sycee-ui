import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';

export type DropdownPlacement = 'bottom' | 'top' | 'bottom-start' | 'bottom-end';

export interface DropdownOption {
  /** Label shown for the item. */
  label: ReactNode;
  /** Value reported by `onSelect`; defaults to the label when omitted. */
  value?: string | number;
  /** Prevents selecting this item. */
  disabled?: boolean;
  /** Renders the item as a horizontal divider (`label` is ignored). */
  divider?: boolean;
}

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'onSelect'> {
  /** Menu items. */
  options?: DropdownOption[];
  /** Uncontrolled initial open state. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Called when an enabled item is picked. */
  onSelect?: (value: string | number) => void;
  /** Disables the dropdown. */
  disabled?: boolean;
  /** The trigger element the menu is attached to. */
  children?: ReactNode;
}

const GAP = 6;
const MENU_ESTIMATED_HEIGHT = 200;

export const Dropdown = forwardRef<HTMLSpanElement, DropdownProps>(function Dropdown(
  { options = [], defaultOpen = false, open, onOpenChange, onSelect, disabled = false, className, children, ...rest },
  ref,
) {
  const isControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isOpen = (isControlled ? open : innerOpen) && !disabled;
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number } | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const updatePosition = useCallback(() => {
    const triggerElement = wrapperRef.current?.firstElementChild as HTMLElement | null;
    if (!triggerElement) return;
    const rect = triggerElement.getBoundingClientRect();
    const menu = menuRef.current;
    const menuHeight = menu?.offsetHeight ?? MENU_ESTIMATED_HEIGHT;
    const openUp = rect.bottom + GAP + menuHeight > window.innerHeight && rect.top - GAP - menuHeight > 0;
    setMenuStyle({
      top: openUp ? rect.top - GAP - menuHeight : rect.bottom + GAP,
      left: rect.left,
    });
  }, []);

  // Measure the mounted menu and refine the position before first paint.
  useEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  // Close on Escape or clicks outside the menu.
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (wrapperRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, setOpen]);

  const handleTriggerClick = () => {
    if (disabled) return;
    setOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onSelect?.(option.value ?? (typeof option.label === 'string' ? option.label : ''));
    setOpen(false);
  };

  return (
    <span
      ref={(node) => {
        wrapperRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cx('sy-dropdown', className)}
      aria-haspopup="menu"
      aria-expanded={isOpen || undefined}
      onClick={handleTriggerClick}
      {...rest}
    >
      {children}
      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className="sy-dropdown__menu"
              style={{
                position: 'fixed',
                top: menuStyle?.top ?? 0,
                left: menuStyle?.left ?? 0,
              }}
            >
              {options.map((option, index) =>
                option.divider ? (
                  <span key={index} className="sy-dropdown__item sy-dropdown__item--divider" />
                ) : (
                  <button
                    key={index}
                    type="button"
                    role="menuitem"
                    className={cx('sy-dropdown__item', option.disabled && 'is-disabled')}
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </button>
                ),
              )}
            </div>,
            document.body,
          )
        : null}
    </span>
  );
});

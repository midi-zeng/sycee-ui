import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

export interface TabItem {
  /** Visible label of the tab. */
  label: string;
  /** Unique value identifying the tab. */
  value: string | number;
  /** Disables the tab. */
  disabled?: boolean;
  /** Content rendered in the tab panel while the tab is active. */
  content?: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Value of the currently active tab. Omit for uncontrolled usage. */
  active?: string | number;
  /** Tab definitions. */
  items?: TabItem[];
  /** Size of the tabs. @default 'md' */
  size?: ComponentSize;
  /** Called with the value of the newly selected tab. */
  onChange?: (value: string | number) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    active,
    items,
    size = 'md',
    onChange,
    className,
    ...rest
  },
  ref,
) {
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string | number, HTMLButtonElement>());
  const uid = useId();
  const [innerActive, setInnerActive] = useState<string | number | undefined>(
    () => active ?? items?.find((item) => !item.disabled)?.value,
  );
  const [focusedValue, setFocusedValue] = useState<string | number | undefined>();
  const [indicator, setIndicator] = useState<{ width: number; x: number }>();

  const activeValue = active ?? innerActive;
  const activeItem = items?.find((item) => item.value === activeValue);
  const enabledItems = (items ?? []).filter((item) => !item.disabled);
  const hasContent = (items ?? []).some((item) => item.content != null);
  const rovingValue =
    focusedValue !== undefined && (items ?? []).some((item) => item.value === focusedValue)
      ? focusedValue
      : activeValue;

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => {
      const tab = activeItem ? tabRefs.current.get(activeItem.value) : undefined;
      if (!tab) {
        setIndicator(undefined);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      setIndicator({ width: tabRect.width, x: tabRect.left - navRect.left });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeItem]);

  const tabId = (value: string | number) => `${uid}-tab-${value}`;
  const paneId = (value: string | number) => `${uid}-pane-${value}`;

  const select = (value: string | number) => {
    if (value === activeValue) return;
    if (active === undefined) setInnerActive(value);
    onChange?.(value);
  };

  const focusTab = (item: TabItem) => {
    setFocusedValue(item.value);
    tabRefs.current.get(item.value)?.focus();
  };

  const handleNavKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (enabledItems.length === 0) return;
    const currentIndex = enabledItems.findIndex((item) => item.value === rovingValue);
    switch (event.key) {
      case 'ArrowRight': {
        const index = currentIndex < 0 ? 0 : (currentIndex + 1) % enabledItems.length;
        event.preventDefault();
        focusTab(enabledItems[index]);
        break;
      }
      case 'ArrowLeft': {
        const index =
          currentIndex < 0
            ? enabledItems.length - 1
            : (currentIndex - 1 + enabledItems.length) % enabledItems.length;
        event.preventDefault();
        focusTab(enabledItems[index]);
        break;
      }
      case 'Home': {
        event.preventDefault();
        focusTab(enabledItems[0]);
        break;
      }
      case 'End': {
        event.preventDefault();
        focusTab(enabledItems[enabledItems.length - 1]);
        break;
      }
      case 'Enter':
      case ' ': {
        const item = enabledItems.find((entry) => entry.value === rovingValue);
        if (!item) return;
        event.preventDefault();
        select(item.value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      ref={ref}
      className={cx('sy-tabs', size !== 'md' && `sy-tabs--${size}`, className)}
      {...rest}
    >
      <div
        ref={navRef}
        role="tablist"
        className="sy-tabs__nav"
        onKeyDown={handleNavKeyDown}
      >
        {(items ?? []).map((item) => (
          <button
            key={item.value}
            ref={(node) => {
              if (node) tabRefs.current.set(item.value, node);
              else tabRefs.current.delete(item.value);
            }}
            type="button"
            role="tab"
            id={tabId(item.value)}
            aria-selected={item.value === activeValue}
            disabled={item.disabled}
            tabIndex={item.value === rovingValue ? 0 : -1}
            className={cx(
              'sy-tabs__tab',
              item.value === activeValue && 'is-active',
              item.disabled && 'is-disabled',
            )}
            onClick={() => {
              if (item.disabled) return;
              setFocusedValue(item.value);
              select(item.value);
            }}
          >
            {item.label}
          </button>
        ))}
        {activeItem ? (
          <span
            className="sy-tabs__indicator"
            aria-hidden="true"
            style={
              indicator
                ? { width: indicator.width, transform: `translateX(${indicator.x}px)` }
                : undefined
            }
          />
        ) : null}
      </div>
      {hasContent ? (
        <div className="sy-tabs__panes">
          {activeItem ? (
            <div
              key={activeItem.value}
              id={paneId(activeItem.value)}
              role="tabpanel"
              aria-labelledby={tabId(activeItem.value)}
              tabIndex={0}
              className="sy-tabs__pane is-active"
            >
              {activeItem.content}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

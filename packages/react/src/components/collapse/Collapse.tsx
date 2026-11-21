import { forwardRef, createContext, useContext, useCallback, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon/Icon';

export interface CollapseContextValue {
  openKeys: Set<string | number>;
  accordion: boolean;
  toggle: (name: string | number) => void;
  headerBaseId: string;
}

export const CollapseContext = createContext<CollapseContextValue | null>(null);

export function useCollapseContext(): CollapseContextValue | null {
  return useContext(CollapseContext);
}

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  /** Names of the open items (controlled). */
  openKeys?: Array<string | number>;
  /** Uncontrolled initial open items. @default [] */
  defaultOpenKeys?: Array<string | number>;
  /** Only one item can be open at a time. @default false */
  accordion?: boolean;
  /** Called when the set of open items changes. */
  onOpenChange?: (openKeys: Array<string | number>) => void;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  {
    openKeys,
    defaultOpenKeys = [],
    accordion = false,
    onOpenChange,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isControlled = openKeys !== undefined;
  const [innerKeys, setInnerKeys] = useState<Array<string | number>>(defaultOpenKeys);
  const keys = isControlled ? openKeys : innerKeys;
  const headerBaseId = useId();

  const toggle = useCallback(
    (name: string | number) => {
      let next: Array<string | number>;
      if (accordion) {
        next = keys.includes(name) ? [] : [name];
      } else {
        next = keys.includes(name) ? keys.filter((key) => key !== name) : [...keys, name];
      }
      if (!isControlled) setInnerKeys(next);
      onOpenChange?.(next);
    },
    [keys, accordion, isControlled, onOpenChange],
  );

  const contextValue = useMemo<CollapseContextValue>(
    () => ({ openKeys: new Set(keys), accordion, toggle, headerBaseId }),
    [keys, accordion, toggle, headerBaseId],
  );

  return (
    <CollapseContext.Provider value={contextValue}>
      <div ref={ref} className={cx('sy-collapse', className)} {...rest}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
});

export interface CollapseItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Unique key of this item; referenced by the collapse `openKeys`. */
  name: string | number;
  /** Title shown in the clickable header. */
  title?: ReactNode;
  /** Prevents the item from being toggled. */
  disabled?: boolean;
}

export const CollapseItem = forwardRef<HTMLDivElement, CollapseItemProps>(function CollapseItem(
  { name, title, disabled = false, className, children, ...rest },
  ref,
) {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error('CollapseItem must be rendered inside a Collapse component.');
  }
  const isOpen = context.openKeys.has(name);
  const headerId = `${context.headerBaseId}-header-${name}`;
  const contentId = `${context.headerBaseId}-content-${name}`;

  return (
    <div
      ref={ref}
      className={cx('sy-collapse__item', isOpen && 'is-open', disabled && 'is-disabled', className)}
      {...rest}
    >
      <button
        type="button"
        id={headerId}
        className="sy-collapse__header"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => context.toggle(name)}
      >
        {title}
        <Icon name="chevron-down" />
      </button>
      <div id={contentId} className="sy-collapse__content" role="region" aria-labelledby={headerId}>
        <div className="sy-collapse__body">{children}</div>
      </div>
    </div>
  );
});

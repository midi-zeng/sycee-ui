import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import { Icon } from '../icon/Icon';

export interface CascaderOption {
  /** Label shown for this level. */
  label: string;
  /** Value used in the selected path. */
  value: string | number;
  /** Child options; a leaf has none. */
  children?: CascaderOption[];
  /** Prevents selecting/expanding this option. */
  disabled?: boolean;
}

export interface CascaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange'> {
  /** Selected path of values (root → leaf); `null` clears it. */
  value?: Array<string | number> | null;
  /** Uncontrolled initial path. */
  defaultValue?: Array<string | number> | null;
  /** Called when a leaf is picked. */
  onChange?: (value: Array<string | number> | null) => void;
  /** Source options. */
  options: CascaderOption[];
  /** Shows a clear button when a path is selected. @default false */
  clearable?: boolean;
  disabled?: boolean;
  /** Placeholder; defaults to the active locale. */
  placeholder?: string;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default 'default' */
  status?: InputStatus;
}

interface Column {
  options: CascaderOption[];
  /** Index of the option currently highlighted in this column. */
  activeIndex: number | null;
}

const PANEL_GAP = 6;
const PANEL_ESTIMATED_HEIGHT = 200;

export const Cascader = forwardRef<HTMLDivElement, CascaderProps>(function Cascader(
  {
    value,
    defaultValue = null,
    onChange,
    options,
    clearable = false,
    disabled = false,
    placeholder,
    size = 'md',
    status = 'default',
    className,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Array<string | number> | null>(defaultValue);
  const current = isControlled ? value : inner;

  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([
    { options, activeIndex: null },
  ]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number } | null>(null);

  // Reset the columns to the top level whenever the panel opens.
  useEffect(() => {
    if (open) setColumns([{ options, activeIndex: null }]);
  }, [open, options]);

  const updatePosition = useCallback(() => {
    const trigger = rootRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const panel = panelRef.current;
    const panelHeight = panel?.offsetHeight ?? PANEL_ESTIMATED_HEIGHT;
    const openUp =
      rect.bottom + PANEL_GAP + panelHeight > window.innerHeight &&
      rect.top - PANEL_GAP - panelHeight > 0;
    setPanelStyle({
      top: openUp ? rect.top - PANEL_GAP - panelHeight : rect.bottom + PANEL_GAP,
      left: rect.left,
    });
  }, []);

  // Measure the mounted panel after the DOM update.
  useEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition]);

  // Close on Escape or clicks outside the panel.
  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [open]);

  const selectedOptions = useMemo(() => {
    if (!current) return [];
    let level = options;
    const picked: CascaderOption[] = [];
    for (const valueKey of current) {
      const match = level.find((option) => option.value === valueKey);
      if (!match) break;
      picked.push(match);
      level = match.children ?? [];
    }
    return picked;
  }, [current, options]);

  const display = selectedOptions.map((option) => option.label).join(' / ');

  const toggleOpen = () => {
    if (disabled) return;
    setOpen(!open);
  };

  const pick = (columnIndex: number, option: CascaderOption) => {
    if (option.disabled) return;
    const path = columns
      .slice(0, columnIndex)
      .map((column) => column.options[column.activeIndex ?? -1]?.value)
      .concat(option.value);
    if (option.children && option.children.length > 0) {
      // Branch: expand the next column and keep the panel open.
      setColumns((previous) => [
        ...previous.slice(0, columnIndex + 1).map((column, index) =>
          index === columnIndex ? { ...column, activeIndex: findIndex(column.options, option) } : column,
        ),
        { options: option.children!, activeIndex: null },
      ]);
    } else {
      // Leaf: commit the path and close.
      const leafPath: Array<string | number> = path.filter(
        (entry): entry is string | number => entry !== undefined,
      );
      if (!isControlled) setInner(leafPath);
      onChange?.(leafPath);
      setOpen(false);
    }
  };

  const clear = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isControlled) setInner(null);
    onChange?.(null);
  };

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cx(
        'sy-cascader',
        size !== 'md' && `sy-cascader--${size}`,
        status !== 'default' && `sy-cascader--${status}`,
        disabled && 'is-disabled',
        open && 'is-open',
        className,
      )}
      onClick={toggleOpen}
      {...rest}
    >
      {display ? (
        <span className="sy-cascader__value">{display}</span>
      ) : (
        <span className="sy-cascader__placeholder">{placeholder ?? t.select}</span>
      )}
      {clearable && current && current.length > 0 && !disabled ? (
        <button
          type="button"
          className="sy-cascader__clear"
          aria-label={t.clear}
          onClick={clear}
        >
          <Icon name="close" />
        </button>
      ) : null}
      <Icon className="sy-cascader__icon" name="chevron-down" />
      {open && typeof document !== 'undefined'
        ? createPortal(
            <div ref={panelRef} className="sy-cascader__panel" style={{ position: 'fixed', top: panelStyle?.top ?? 0, left: panelStyle?.left ?? 0 }}>
              {columns.map((column, columnIndex) => (
                <ul key={columnIndex} className="sy-cascader__panel-column" role="listbox">
                  {column.options.map((option, optionIndex) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={column.activeIndex === optionIndex}
                        className={cx(
                          'sy-cascader__panel-option',
                          column.activeIndex === optionIndex && 'is-active',
                          option.disabled && 'is-disabled',
                        )}
                        aria-disabled={option.disabled || undefined}
                        onClick={(event) => {
                          event.stopPropagation();
                          pick(columnIndex, option);
                        }}
                      >
                        <span>{option.label}</span>
                        {option.children && option.children.length > 0 ? (
                          <Icon name="chevron-right" />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
});

function findIndex(options: CascaderOption[], option: CascaderOption): number {
  return options.findIndex((entry) => entry.value === option.value);
}

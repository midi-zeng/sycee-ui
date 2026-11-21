import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import { Icon } from '../icon/Icon';

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange'> {
  /** Selected date as an ISO string (`YYYY-MM-DD`); `null` clears it. */
  value?: string | null;
  /** Uncontrolled initial date. */
  defaultValue?: string | null;
  /** Called when a day is picked. */
  onChange?: (value: string | null) => void;
  /** Earliest selectable date (`YYYY-MM-DD`). */
  min?: string;
  /** Latest selectable date (`YYYY-MM-DD`). */
  max?: string;
  /** First day of the week; 0 = Sunday, 1 = Monday. @default 0 */
  weekStartsOn?: 0 | 1;
  disabled?: boolean;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default 'default' */
  status?: InputStatus;
  /** Placeholder; defaults to the active locale. */
  placeholder?: string;
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// --- date helpers (local time, `YYYY-MM-DD` strings) -------------------------

function parseISO(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function formatISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

interface GridDay {
  date: Date;
  iso: string;
  outside: boolean;
}

/** Builds a 6×7 grid of days covering the displayed month. */
function buildGrid(year: number, month: number, weekStartsOn: 0 | 1): GridDay[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(year, month, 1 - offset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    return {
      date,
      iso: formatISO(date),
      outside: date.getMonth() !== month,
    };
  });
}

// ----------------------------------------------------------------------------

const PANEL_GAP = 6;
const PANEL_ESTIMATED_HEIGHT = 340;

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue = null,
    onChange,
    min,
    max,
    weekStartsOn = 0,
    disabled = false,
    size = 'md',
    status = 'default',
    placeholder,
    className,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string | null>(defaultValue);
  const current = isControlled ? value : inner;

  const [open, setOpen] = useState(false);
  // Month shown in the panel; starts at the selected date (or today).
  const [view, setView] = useState(() => parseISO(current ?? formatISO(new Date())));

  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number } | null>(null);

  const todayIso = formatISO(new Date());

  const grid = useMemo(
    () => buildGrid(view.getFullYear(), view.getMonth(), weekStartsOn),
    [view, weekStartsOn],
  );

  const weekdays = useMemo(() => {
    const labels = WEEKDAY_LABELS.slice(weekStartsOn).concat(WEEKDAY_LABELS.slice(0, weekStartsOn));
    return labels;
  }, [weekStartsOn]);

  const isDisabledDay = useCallback(
    (iso: string) => (min !== undefined && iso < min) || (max !== undefined && iso > max),
    [min, max],
  );

  const updatePosition = useCallback(() => {
    const trigger = rootRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const panel = panelRef.current;
    const panelHeight = panel?.offsetHeight ?? PANEL_ESTIMATED_HEIGHT;
    const openUp = rect.bottom + PANEL_GAP + panelHeight > window.innerHeight && rect.top - PANEL_GAP - panelHeight > 0;
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

  const toggleOpen = () => {
    if (disabled) return;
    if (!open && current) {
      // Re-open centered on the current selection.
      setView(parseISO(current));
    }
    setOpen(!open);
  };

  const select = (iso: string) => {
    if (isDisabledDay(iso)) return;
    if (!isControlled) setInner(iso);
    onChange?.(iso);
    setOpen(false);
  };

  const title = `${view.getFullYear()} – ${String(view.getMonth() + 1).padStart(2, '0')}`;

  const panelPositionStyle = {
    position: 'fixed' as const,
    top: panelStyle?.top ?? 0,
    left: panelStyle?.left ?? 0,
  };

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cx(
        'sy-date-picker',
        size !== 'md' && `sy-date-picker--${size}`,
        status !== 'default' && `sy-date-picker--${status}`,
        disabled && 'is-disabled',
        open && 'is-open',
        className,
      )}
      onClick={toggleOpen}
      {...rest}
    >
      <span className={cx('sy-date-picker__value', !current && 'sy-date-picker__placeholder')}>
        {current ?? placeholder ?? t.selectDate}
      </span>
      <Icon className="sy-date-picker__icon" name="calendar" />
      {open && typeof document !== 'undefined'
        ? createPortal(
            <div ref={panelRef} className="sy-date-picker__panel" style={panelPositionStyle}>
              <div className="sy-date-picker__panel-header">
                <button
                  type="button"
                  className="sy-date-picker__panel-nav"
                  aria-label={t.previousMonth}
                  onClick={(event) => {
                    event.stopPropagation();
                    setView(addMonths(view, -1));
                  }}
                >
                  <Icon name="chevron-left" />
                </button>
                <span className="sy-date-picker__panel-title">{title}</span>
                <button
                  type="button"
                  className="sy-date-picker__panel-nav"
                  aria-label={t.nextMonth}
                  onClick={(event) => {
                    event.stopPropagation();
                    setView(addMonths(view, 1));
                  }}
                >
                  <Icon name="chevron-right" />
                </button>
              </div>
              <div className="sy-date-picker__panel-weekdays" aria-hidden="true">
                {weekdays.map((label) => (
                  <span key={label} className="sy-date-picker__panel-weekday">
                    {label}
                  </span>
                ))}
              </div>
              <div className="sy-date-picker__panel-grid" role="grid">
                {grid.map(({ date, iso, outside }) => {
                  const disabledDay = disabled || isDisabledDay(iso);
                  return (
                    <button
                      key={iso}
                      type="button"
                      role="gridcell"
                      className={cx(
                        'sy-date-picker__panel-day',
                        outside && 'is-outside',
                        iso === todayIso && 'is-today',
                        iso === current && 'is-selected',
                      )}
                      aria-selected={iso === current}
                      aria-disabled={disabledDay || undefined}
                      aria-label={iso}
                      disabled={disabledDay}
                      onClick={(event) => {
                        event.stopPropagation();
                        select(iso);
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
});

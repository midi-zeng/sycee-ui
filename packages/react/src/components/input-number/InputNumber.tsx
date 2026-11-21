import { forwardRef, useEffect, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { ComponentSize, InputStatus } from '../../types';
import { Icon } from '../icon/Icon';

export interface InputNumberProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Current value; `null` means empty. */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Called with the committed value (on blur, Enter or step buttons). */
  onChange?: (value: number | null) => void;
  /** Lowest allowed value. @default -Infinity */
  min?: number;
  /** Highest allowed value. @default Infinity */
  max?: number;
  /** Increment/decrement amount. @default 1 */
  step?: number;
  /** Number of decimal places. */
  precision?: number;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default 'default' */
  status?: InputStatus;
  /** Shows the +/- buttons. @default true */
  controls?: boolean;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    value,
    defaultValue = null,
    onChange,
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision,
    disabled = false,
    readonly = false,
    placeholder,
    size = 'md',
    status = 'default',
    controls = true,
    className,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<number | null>(defaultValue);
  // Raw text while the user is typing; committed on blur/Enter.
  const [draft, setDraft] = useState<string | null>(null);

  const current = isControlled ? value : inner;

  const clamp = (next: number) => {
    let clamped = Math.min(max, Math.max(min, next));
    if (precision !== undefined) clamped = Number(clamped.toFixed(precision));
    return clamped;
  };

  const commit = (next: number | null) => {
    const clamped = next === null ? null : clamp(next);
    if (!isControlled) setInner(clamped);
    if (clamped !== current) onChange?.(clamped);
    return clamped;
  };

  const display =
    draft ??
    (current === null || Number.isNaN(current) ? '' : String(current));

  const stepBy = (direction: 1 | -1) => {
    if (disabled || readonly) return;
    const base = current ?? 0;
    const committed = commit(base + direction * step);
    setDraft(null);
    return committed;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      stepBy(1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      stepBy(-1);
    } else if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const handleBlur = () => {
    if (draft !== null) {
      const parsed = draft.trim() === '' ? null : Number(draft);
      if (parsed === null || Number.isNaN(parsed)) {
        setDraft(null);
      } else {
        commit(parsed);
        setDraft(null);
      }
    }
  };

  // Sync the displayed draft when the value prop changes externally.
  useEffect(() => {
    if (isControlled) setDraft(null);
  }, [value, isControlled]);

  return (
    <div
      className={cx(
        'sy-input-number',
        size !== 'md' && `sy-input-number--${size}`,
        status !== 'default' && `sy-input-number--${status}`,
        disabled && 'is-disabled',
        className,
      )}
      {...rest}
    >
      {controls ? (
        <button
          type="button"
          className="sy-input-number__decrease"
          aria-label={t.decrease}
          disabled={disabled || readonly}
          onClick={() => stepBy(-1)}
        >
          <Icon name="minus" />
        </button>
      ) : null}
      <input
        ref={ref}
        className="sy-input-number__native"
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-valuemin={min === -Infinity ? undefined : min}
        aria-valuemax={max === Infinity ? undefined : max}
        aria-valuenow={current ?? undefined}
        aria-disabled={disabled || undefined}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        value={display}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      {controls ? (
        <button
          type="button"
          className="sy-input-number__increase"
          aria-label={t.increase}
          disabled={disabled || readonly}
          onClick={() => stepBy(1)}
        >
          <Icon name="plus" />
        </button>
      ) : null}
    </div>
  );
});

import { forwardRef, useState } from 'react';
import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { cx } from '../../utils/cx';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  /** Checked state (controlled). @default false via defaultChecked */
  checked?: boolean;
  /** Initial checked state when uncontrolled. @default false */
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Shows a spinner on the thumb and blocks toggling. */
  loading?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md';
  onChange?: (checked: boolean, event: MouseEvent<HTMLButtonElement>) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked = false,
    disabled = false,
    loading = false,
    size = 'md',
    className,
    onClick,
    onChange,
    ...rest
  },
  ref,
) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (disabled || loading || event.defaultPrevented) return;
    const nextChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked, event);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-busy={loading || undefined}
      className={cx(
        'sy-switch',
        size !== 'md' && 'sy-switch--sm',
        isChecked && 'is-checked',
        loading && 'is-loading',
        disabled && 'is-disabled',
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      <span className="sy-switch__thumb" />
    </button>
  );
});

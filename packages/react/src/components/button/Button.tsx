import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { BorderType, ColorType, ComponentSize } from '../../types';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Visual color of the button. @default 'primary' */
  color?: ColorType;
  /** Visual variant. @default 'solid' */
  variant?: BorderType;
  /** Size of the button. @default 'md' */
  size?: ComponentSize;
  /** Native button type. @default 'button' */
  type?: 'button' | 'submit' | 'reset';
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to fill the parent width. */
  block?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color = 'primary',
    variant = 'solid',
    size = 'md',
    type = 'button',
    loading = false,
    disabled = false,
    block = false,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'sy-button',
        `sy-button--${color}`,
        `sy-button--${variant}`,
        size !== 'md' && `sy-button--${size}`,
        block && 'sy-button--block',
        loading && 'is-loading',
        className,
      )}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) return;
        onClick?.(event);
      }}
      {...rest}
    >
      {loading ? <span className="sy-button__spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
});

import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ColorType, ComponentSize } from '../../types';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Pixel size (number) or named size. @default 'md' */
  size?: number | ComponentSize;
  /** Color of the spinner. @default 'primary' */
  color?: ColorType;
  /** Visible label below the circle; doubles as the accessible name. */
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { size = 'md', color = 'primary', label, className, style, ...rest },
  ref,
) {
  const sizeMod = typeof size === 'string' && size !== 'md' ? size : undefined;
  const sizeStyle: CSSProperties | undefined =
    typeof size === 'number' ? { fontSize: `${size}px` } : undefined;

  return (
    <div
      ref={ref}
      className={cx(
        'sy-spinner',
        `sy-spinner--${color}`,
        sizeMod && `sy-spinner--${sizeMod}`,
        className,
      )}
      style={{ ...sizeStyle, ...style }}
      role="status"
      aria-label={label ?? 'Loading'}
      {...rest}
    >
      <span className="sy-spinner__circle" aria-hidden="true" />
      {label ? <span className="sy-spinner__label">{label}</span> : null}
    </div>
  );
});

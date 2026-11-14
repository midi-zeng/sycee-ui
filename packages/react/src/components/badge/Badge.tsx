import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ColorType } from '../../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Number (or short text) displayed in the badge. */
  count?: number | string;
  /** Renders a small dot instead of the count. @default false */
  dot?: boolean;
  /** Upper bound; larger numeric counts render as `${max}+`. @default 99 */
  max?: number;
  /** Whether a count of 0 is displayed. @default false */
  showZero?: boolean;
  /** Color of the badge. @default 'danger' */
  color?: ColorType;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { count, dot = false, max = 99, showZero = false, color = 'danger', className, children, ...rest },
  ref,
) {
  const countText = typeof count === 'number' ? (count > max ? `${max}+` : String(count)) : (count ?? '');

  const isEmpty = dot
    ? false
    : typeof count === 'number'
      ? count === 0 && !showZero
      : !count;

  const countStyle: CSSProperties | undefined =
    children != null ? undefined : { position: 'static', transform: 'none' };
  const ariaLabel = dot && countText ? countText : undefined;

  return (
    <span
      ref={ref}
      className={cx('sy-badge', `sy-badge--${color}`, dot && 'sy-badge--dot', className)}
      {...rest}
    >
      {children}
      <sup
        className={cx('sy-badge__count', { 'is-empty': isEmpty, 'sy-badge__count--dot': dot })}
        style={countStyle}
        aria-label={ariaLabel}
      >
        {dot ? '' : countText}
      </sup>
    </span>
  );
});

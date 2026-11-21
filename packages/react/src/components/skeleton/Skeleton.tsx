import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type SkeletonShape = 'rect' | 'circle' | 'text';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the placeholder; any CSS width. */
  width?: number | string;
  /** Height of the placeholder; any CSS height. */
  height?: number | string;
  /** Shape of the placeholder. @default 'rect' */
  shape?: SkeletonShape;
  /** Enables the pulse animation. @default true */
  animated?: boolean;
}

/**
 * Decorative loading placeholder. Hidden from assistive technology — pair it
 * with a visible "Loading" status elsewhere if the wait can be long.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { width, height, shape = 'rect', animated = true, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'sy-skeleton',
        shape !== 'rect' && `sy-skeleton--${shape}`,
        animated && 'sy-skeleton--animated',
        className,
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
});

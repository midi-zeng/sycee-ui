import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

const EMPTY_IMAGE = (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    focusable="false"
  >
    {/* floating document */}
    <g opacity="0.45">
      <path d="M47 12h17l8 8v13H47V12Z" />
      <path d="M64 12v8h8" />
      <path d="M54 22h12" />
      <path d="M54 27h12" />
    </g>
    {/* open flaps */}
    <g opacity="0.5">
      <path d="M36 57L22 48l25-10 13 10" />
      <path d="M84 57l14-9-25-10-13 10" />
    </g>
    {/* open box */}
    <path d="M36 57v26l24 10 24-10V57" />
    <path d="M36 57l24 10 24-10" opacity="0.7" />
    <path d="M36 57l24-9 24 9" opacity="0.45" />
    <path d="M60 67v26" opacity="0.4" />
  </svg>
);

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** Description text; can be replaced by children. @default 'No data' */
  description?: string;
  /** Custom illustration rendered instead of the default one. */
  image?: ReactNode;
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { description = 'No data', image, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('sy-empty', className)} {...rest}>
      <div className="sy-empty__image" aria-hidden="true">
        {image ?? EMPTY_IMAGE}
      </div>
      <div className="sy-empty__description">{children ?? description}</div>
    </div>
  );
});

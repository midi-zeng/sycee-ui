import { forwardRef } from 'react';
import type { HTMLAttributes, Ref } from 'react';
import { cx } from '../../utils/cx';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Renders as a vertical line (inline element, no label). */
  vertical?: boolean;
  /** Dashed line style. */
  dashed?: boolean;
  /** Horizontal label alignment. @default 'center' */
  labelPlacement?: 'left' | 'center' | 'right';
}

export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  { vertical = false, dashed = false, labelPlacement = 'center', className, children, ...rest },
  ref,
) {
  if (vertical) {
    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        className={cx(
          'sy-divider',
          'sy-divider--vertical',
          dashed && 'sy-divider--dashed',
          dashed && 'sy-divider--vertical--dashed',
          className,
        )}
        aria-hidden="true"
        {...rest}
      />
    );
  }
  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={cx(
        'sy-divider',
        dashed && 'sy-divider--dashed',
        labelPlacement !== 'center' && `sy-divider--${labelPlacement}`,
        className,
      )}
      role="separator"
      {...rest}
    >
      {children != null ? <span className="sy-divider__label">{children}</span> : null}
    </div>
  );
});

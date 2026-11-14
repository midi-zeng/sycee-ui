import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between children: named size or pixels. @default 'md' */
  size?: ComponentSize | number;
  /** Stacks children vertically. @default false */
  vertical?: boolean;
  /** Allows children to wrap onto multiple lines. @default false */
  wrap?: boolean;
  /** Cross-axis alignment. Defaults to 'center' horizontally and 'stretch' vertically. */
  align?: 'start' | 'center' | 'end' | 'baseline';
}

export const Space = forwardRef<HTMLDivElement, SpaceProps>(function Space(
  { size = 'md', vertical = false, wrap = false, align, className, style, children, ...rest },
  ref,
) {
  const sizeMod = typeof size === 'string' && size !== 'md' ? size : undefined;
  const gapStyle: CSSProperties | undefined =
    typeof size === 'number' ? { gap: `${size}px` } : undefined;
  const alignStyle: CSSProperties | undefined = align ? { alignItems: align } : undefined;

  return (
    <div
      ref={ref}
      className={cx(
        'sy-space',
        sizeMod && `sy-space--${sizeMod}`,
        vertical && 'sy-space--vertical',
        wrap && 'sy-space--wrap',
        className,
      )}
      style={{ ...gapStyle, ...alignStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

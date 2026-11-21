import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Direction of travel. @default 'left' */
  direction?: MarqueeDirection;
  /** Seconds required for one full cycle. @default 18 */
  duration?: number;
  /** Pauses the animation while hovered. @default true */
  pauseOnHover?: boolean;
  /** Softens both edges with a mask. @default true */
  fade?: boolean;
  /** Gap between repeated copies, as any CSS length. @default '48px' */
  gap?: string;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(function Marquee(
  {
    children,
    direction = 'left',
    duration = 18,
    pauseOnHover = true,
    fade = true,
    gap = '48px',
    className,
    style,
    ...rest
  },
  ref,
) {
  const animationStyle = {
    ...style,
    '--sy-marquee-duration': `${Math.max(2, duration)}s`,
    '--sy-marquee-gap': gap,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cx(
        'sy-marquee',
        `sy-marquee--${direction}`,
        pauseOnHover && 'sy-marquee--pause-on-hover',
        fade && 'sy-marquee--fade',
        className,
      )}
      style={animationStyle}
      {...rest}
    >
      <div className="sy-marquee__motion">
        <div className="sy-marquee__group">{children}</div>
        <div className="sy-marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
});

import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ColorType } from '../../types';

export interface TimelineItem {
  /** Entry title. */
  title: ReactNode;
  /** Optional supporting text below the title. */
  description?: ReactNode;
  /** Dot color. @default 'neutral' */
  color?: ColorType;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Entries rendered top to bottom. */
  items: TimelineItem[];
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(function Timeline(
  { items, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('sy-timeline', className)} {...rest}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cx('sy-timeline__item', `sy-timeline__item--${item.color ?? 'neutral'}`)}
        >
          <div className="sy-timeline__dot" />
          <div className="sy-timeline__content">
            <div className="sy-timeline__title">{item.title}</div>
            {item.description ? (
              <div className="sy-timeline__description">{item.description}</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
});

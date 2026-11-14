import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title; renders a header together with `extra`. */
  title?: ReactNode;
  /** Content rendered on the opposite side of the header from the title. */
  extra?: ReactNode;
  /** Content rendered below the body, separated by the card border. */
  footer?: ReactNode;
  /** Elevates the card with a shadow on hover. */
  hoverable?: boolean;
  /** Hides the card border. */
  borderless?: boolean;
  /** Whether the body has padding; when false the body padding is removed. @default true */
  padding?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    title,
    extra,
    footer,
    hoverable = false,
    borderless = false,
    padding = true,
    className,
    children,
    ...rest
  },
  ref,
) {
  const hasHeader = !!title || !!extra;

  return (
    <div
      ref={ref}
      className={cx(
        'sy-card',
        hoverable && 'sy-card--hoverable',
        borderless && 'sy-card--borderless',
        className,
      )}
      {...rest}
    >
      {hasHeader ? (
        <div className="sy-card__header">
          {title ? <div className="sy-card__title">{title}</div> : null}
          {extra ? <div className="sy-card__extra">{extra}</div> : null}
        </div>
      ) : null}
      <div className="sy-card__body" style={padding ? undefined : { padding: 0 }}>
        {children}
      </div>
      {footer ? <div className="sy-card__footer">{footer}</div> : null}
    </div>
  );
});

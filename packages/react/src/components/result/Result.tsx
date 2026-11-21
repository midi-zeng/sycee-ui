import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon/Icon';
import type { IconName } from '../icon/Icon';

export type ResultStatus = 'info' | 'success' | 'warning' | 'danger';

const STATUS_ICONS: Record<ResultStatus, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Outcome kind; picks the color and default icon. @default 'info' */
  status?: ResultStatus;
  /** Result headline. */
  title?: ReactNode;
  /** Supporting text below the title. */
  description?: ReactNode;
  /** Custom icon node replacing the default status icon. */
  icon?: ReactNode;
}

export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  { status = 'info', title, description, icon, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('sy-result', `sy-result--${status}`, className)}
      role="status"
      {...rest}
    >
      <div className="sy-result__icon">{icon ?? <Icon name={STATUS_ICONS[status]} />}</div>
      {title ? <div className="sy-result__title">{title}</div> : null}
      {description ? <div className="sy-result__description">{description}</div> : null}
      {children ? <div className="sy-result__extra">{children}</div> : null}
    </div>
  );
});

import { forwardRef, useState } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';
import type { IconName } from '../icon/Icon';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

const TYPE_ICONS: Record<AlertType, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Kind of alert; picks the color and default icon. @default 'info' */
  type?: AlertType;
  /** Alert title. */
  title?: ReactNode;
  /** Shows the type icon. @default true */
  showIcon?: boolean;
  /** Shows a close button; the alert hides itself after closing. @default false */
  closable?: boolean;
  /** Custom icon; replaces the default type icon. */
  icon?: ReactNode;
  /** Called when the close button is pressed. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    type = 'info',
    title,
    showIcon = true,
    closable = false,
    icon,
    onClose,
    className,
    children,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const hasTitle = title !== undefined && title !== null && title !== false && title !== '';
  const hasDescription =
    children !== undefined && children !== null && children !== false && children !== '';

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    setHidden(true);
    onClose?.(event);
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cx('sy-alert', `sy-alert--${type}`, className)}
      {...rest}
    >
      {showIcon ? (
        <div className="sy-alert__icon">{icon ?? <Icon name={TYPE_ICONS[type]} />}</div>
      ) : null}
      <div className="sy-alert__content">
        {hasTitle ? <div className="sy-alert__title">{title}</div> : null}
        {hasDescription ? <div className="sy-alert__description">{children}</div> : null}
        {closable ? (
          <button
            type="button"
            className="sy-alert__close"
            aria-label={t.close}
            onClick={handleClose}
          >
            <Icon name="close" />
          </button>
        ) : null}
      </div>
    </div>
  );
});

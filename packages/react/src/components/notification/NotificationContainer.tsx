import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';
import type { IconName } from '../icon/Icon';
import type { NotificationItem, NotificationType } from './notification';

const TYPE_ICONS: Record<NotificationType, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

interface NotificationContainerProps {
  items: NotificationItem[];
  onClose: (id: number) => void;
}

/** Internal renderer used by the imperative `notification` API. */
export function NotificationContainer({ items, onClose }: NotificationContainerProps) {
  const t = useLocale();
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={cx(
            'sy-notification',
            `sy-notification--${item.type}`,
            item.closing && 'is-closing',
          )}
        >
          <Icon className="sy-notification__icon" name={TYPE_ICONS[item.type]} />
          <div className="sy-notification__body">
            <div className="sy-notification__title">{item.title}</div>
            {item.content ? (
              <div className="sy-notification__content">{item.content}</div>
            ) : null}
          </div>
          <button
            type="button"
            className="sy-notification__close"
            aria-label={t.close}
            onClick={() => onClose(item.id)}
          >
            <Icon name="close" />
          </button>
        </div>
      ))}
    </>
  );
}

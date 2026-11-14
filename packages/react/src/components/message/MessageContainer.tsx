import { cx } from '../../utils/cx';
import { Icon } from '../icon/Icon';
import type { IconName } from '../icon/Icon';
import type { MessageItem, MessageType } from './message';

const TYPE_ICONS: Record<MessageType, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

interface MessageContainerProps {
  items: MessageItem[];
}

/** Internal renderer used by the imperative `message` API. */
export function MessageContainer({ items }: MessageContainerProps) {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={cx('sy-message', `sy-message--${item.type}`, item.closing && 'is-closing')}
        >
          <Icon name={TYPE_ICONS[item.type]} />
          <span className="sy-message__content">{item.content}</span>
        </div>
      ))}
    </>
  );
}

import { forwardRef } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ColorType } from '../../types';
import { Icon } from '../icon/Icon';

export type TagVariant = 'soft' | 'solid' | 'outline';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Color of the tag. @default 'neutral' */
  color?: ColorType;
  /** Visual variant. @default 'soft' */
  variant?: TagVariant;
  /** Size of the tag. @default 'md' */
  size?: 'sm' | 'md';
  /** Shows a close button. */
  closable?: boolean;
  disabled?: boolean;
  /** Custom icon rendered before the content. */
  icon?: ReactNode;
  /** Called when the close button is pressed. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    color = 'neutral',
    variant = 'soft',
    size = 'md',
    closable = false,
    disabled = false,
    icon,
    onClose,
    className,
    children,
    ...rest
  },
  ref,
) {
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClose?.(event);
  };

  return (
    <span
      ref={ref}
      className={cx(
        'sy-tag',
        `sy-tag--${color}`,
        `sy-tag--${variant}`,
        size !== 'md' && `sy-tag--${size}`,
        disabled && 'is-disabled',
        className,
      )}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {icon ? <span className="sy-tag__icon">{icon}</span> : null}
      {children}
      {closable ? (
        <button
          type="button"
          className="sy-tag__close"
          aria-label="Remove"
          disabled={disabled}
          onClick={handleClose}
        >
          <Icon name="close" />
        </button>
      ) : null}
    </span>
  );
});

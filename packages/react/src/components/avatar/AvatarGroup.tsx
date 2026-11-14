import { forwardRef } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import type { HTMLAttributes, ReactElement } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';
import { Avatar } from './Avatar';
import type { AvatarProps } from './Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Default size applied to child avatars. */
  size?: number | ComponentSize;
  /**
   * Maximum number of visible avatars. Reserved for overflow truncation;
   * the +N indicator is not implemented yet (children are only overlapped).
   */
  /**
   * Accepted for API parity; overflow truncation (+N) is not implemented yet —
   * the group renders overlap only.
   */
  max?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { size, max: _max, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('sy-avatar-group', className)} {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === Avatar) {
          const avatar = child as ReactElement<AvatarProps>;
          return cloneElement(avatar, { size: avatar.props.size ?? size });
        }
        return child;
      })}
    </div>
  );
});

import { forwardRef, useEffect, useState } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

export type AvatarSize = number | ComponentSize;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source; when loading fails the fallback content is shown instead. */
  src?: string;
  /** Accessible alt text; its first character is used as the text fallback. */
  alt?: string;
  /** Pixel size (number) or named size. Defaults to 'md' or the AvatarGroup size. @default 'md' */
  size?: AvatarSize;
  /** Shape of the avatar. @default 'circle' */
  shape?: 'circle' | 'square';
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, size = 'md', shape = 'circle', className, style, children, ...rest },
  ref,
) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  const sizeMod = typeof size === 'string' && size !== 'md' ? size : undefined;
  const sizeStyle: CSSProperties | undefined =
    typeof size === 'number'
      ? {
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${Math.round(size * 0.44)}px`,
        }
      : undefined;
  const showImg = src !== undefined && !errored;
  const altInitial = (alt ?? '').charAt(0).toUpperCase();

  return (
    <span
      ref={ref}
      className={cx(
        'sy-avatar',
        sizeMod && `sy-avatar--${sizeMod}`,
        shape === 'square' && 'sy-avatar--square',
        className,
      )}
      style={{ ...sizeStyle, ...style }}
      {...rest}
    >
      {showImg ? (
        <img
          className="sy-avatar__img"
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="sy-avatar__text" aria-hidden={src !== undefined ? true : undefined}>
          {children ?? altInitial}
        </span>
      )}
    </span>
  );
});

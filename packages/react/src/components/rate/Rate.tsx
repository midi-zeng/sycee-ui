import { forwardRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';

export interface RateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating (stars filled). */
  value?: number;
  /** Uncontrolled initial rating. @default 0 */
  defaultValue?: number;
  /** Number of stars. @default 5 */
  max?: number;
  /** Called when the rating changes. */
  onChange?: (value: number) => void;
  /** Shows the current value without allowing changes. */
  readonly?: boolean;
  disabled?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
}

export const Rate = forwardRef<HTMLDivElement, RateProps>(function Rate(
  {
    value,
    defaultValue = 0,
    max = 5,
    onChange,
    readonly = false,
    disabled = false,
    size = 'md',
    className,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const current = isControlled ? value : inner;
  const interactive = !readonly && !disabled;
  // Hover previews the rating; otherwise the committed value is shown.
  const display = interactive && hoverValue !== null ? hoverValue : (current ?? 0);

  const select = (next: number) => {
    if (!interactive) return;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      select(Math.min(max, (current ?? 0) + 1));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      select(Math.max(0, (current ?? 0) - 1));
    }
  };

  return (
    <div
      ref={ref}
      className={cx(
        'sy-rate',
        size !== 'md' && `sy-rate--${size}`,
        readonly && 'is-readonly',
        disabled && 'is-disabled',
        className,
      )}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={current ?? 0}
      aria-disabled={disabled || undefined}
      aria-readonly={readonly || undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHoverValue(null)}
      {...rest}
    >
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;
        return (
          <button
            key={star}
            type="button"
            className={cx('sy-rate__star', star <= display && 'is-active')}
            aria-label={t.rate(star, max)}
            tabIndex={-1}
            disabled={disabled}
            onMouseEnter={() => setHoverValue(star)}
            onClick={() => select(star)}
          >
            <Icon name="star" />
          </button>
        );
      })}
    </div>
  );
});

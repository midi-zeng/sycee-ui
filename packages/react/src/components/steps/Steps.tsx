import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon/Icon';

export interface StepItem {
  /** Step label. */
  label: ReactNode;
  /** Optional supporting text below the label. */
  description?: ReactNode;
  /** Grays out the step and prevents selecting it. */
  disabled?: boolean;
}

export interface StepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Ordered steps. */
  items: StepItem[];
  /** Index of the current step (0-based). @default 0 */
  active?: number;
  /** Called when a clickable step is selected. */
  onChange?: (index: number) => void;
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>(function Steps(
  { items, active = 0, onChange, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('sy-steps', className)} {...rest}>
      {items.map((item, index) => {
        const isDone = index < active;
        const isActive = index === active;
        const clickable = Boolean(onChange) && !item.disabled;
        return (
          <div
            key={index}
            className={cx(
              'sy-steps__item',
              isDone && 'is-done',
              isActive && 'is-active',
              item.disabled && 'is-disabled',
              clickable && 'is-clickable',
            )}
            aria-current={isActive ? 'step' : undefined}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onClick={clickable ? () => onChange?.(index) : undefined}
            onKeyDown={
              clickable
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onChange?.(index);
                    }
                  }
                : undefined
            }
          >
            <div className="sy-steps__marker">
              {isDone ? <Icon name="check" /> : index + 1}
            </div>
            <div className="sy-steps__body">
              <span className="sy-steps__label">{item.label}</span>
              {item.description ? (
                <span className="sy-steps__description">{item.description}</span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
});

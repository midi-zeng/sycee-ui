import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type ProgressStatus = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress percentage (0-100). @default 0 */
  value?: number;
  /** Visual status color. @default 'primary' */
  status?: ProgressStatus;
  /** Whether to show the percentage text. @default true */
  showText?: boolean;
  /** Track height in pixels. @default 8 */
  height?: number;
  /** Plays an indeterminate animation; the value is ignored and the text hidden. */
  indeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value = 0,
    status = 'primary',
    showText = true,
    height = 8,
    indeterminate = false,
    className,
    ...rest
  },
  ref,
) {
  const percent = Math.min(100, Math.max(0, value));
  const text = `${Math.round(percent)}%`;

  return (
    <div
      ref={ref}
      className={cx(
        'sy-progress',
        `sy-progress--${status}`,
        indeterminate && 'sy-progress--indeterminate',
        className,
      )}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-busy={indeterminate || undefined}
      {...rest}
    >
      <div className="sy-progress__track" style={{ height: `${height}px` }}>
        <div
          className="sy-progress__bar"
          style={indeterminate ? { width: '40%' } : { width: `${percent}%` }}
        />
      </div>
      {showText && !indeterminate ? <span className="sy-progress__text">{text}</span> : null}
    </div>
  );
});

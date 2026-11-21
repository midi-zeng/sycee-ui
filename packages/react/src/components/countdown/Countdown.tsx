import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

export interface CountdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Target timestamp, date string, or `Date` instance. */
  target: number | string | Date;
  /** Token pattern; supports DD, HH, mm, ss and single-digit variants. @default 'DD:HH:mm:ss' */
  format?: string;
  /** Visual size. @default 'md' */
  size?: ComponentSize;
  /** Renders each unit in a raised tile. */
  boxed?: boolean;
  /** Optional accessible label; the visual copy is hidden from live announcements. */
  label?: string;
  /** Called once when the countdown reaches zero. */
  onFinish?: () => void;
}

function targetTime(target: CountdownProps['target']): number {
  const value = target instanceof Date ? target.getTime() : typeof target === 'number' ? target : Date.parse(target);
  return Number.isFinite(value) ? value : 0;
}

function getRemaining(target: CountdownProps['target'], now: number) {
  const total = Math.max(0, Math.floor((targetTime(target) - now) / 1000));
  return {
    total,
    DD: Math.floor(total / 86400),
    HH: Math.floor((total % 86400) / 3600),
    mm: Math.floor((total % 3600) / 60),
    ss: total % 60,
  };
}

const TOKEN_PATTERN = /(DD|HH|mm|ss|D|H|m|s)/g;

export const Countdown = forwardRef<HTMLDivElement, CountdownProps>(function Countdown(
  {
    target,
    format = 'DD:HH:mm:ss',
    size = 'md',
    boxed = false,
    label,
    onFinish,
    className,
    ...rest
  },
  ref,
) {
  const [now, setNow] = useState(() => Date.now());
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const remaining = useMemo(() => getRemaining(target, now), [target, now]);

  useEffect(() => {
    finishedRef.current = false;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  useEffect(() => {
    if (remaining.total > 0 || finishedRef.current) return;
    finishedRef.current = true;
    onFinishRef.current?.();
  }, [remaining.total, target]);

  const segments = format.split(TOKEN_PATTERN);
  const values: Record<string, string> = {
    DD: String(remaining.DD).padStart(2, '0'),
    HH: String(remaining.HH).padStart(2, '0'),
    mm: String(remaining.mm).padStart(2, '0'),
    ss: String(remaining.ss).padStart(2, '0'),
    D: String(remaining.DD),
    H: String(remaining.HH),
    m: String(remaining.mm),
    s: String(remaining.ss),
  };

  return (
    <div
      ref={ref}
      role="timer"
      aria-label={label}
      className={cx(
        'sy-countdown',
        `sy-countdown--${size}`,
        boxed && 'sy-countdown--boxed',
        remaining.total === 0 && 'is-finished',
        className,
      )}
      {...rest}
    >
      {segments.map((segment, index) =>
        values[segment] ? (
          <span key={`${segment}-${index}`} className="sy-countdown__segment">
            {values[segment]}
          </span>
        ) : (
          <span key={`separator-${index}`} className="sy-countdown__separator" aria-hidden="true">
            {segment}
          </span>
        ),
      )}
    </div>
  );
});

import { forwardRef, useCallback, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, PointerEvent } from 'react';
import { cx } from '../../utils/cx';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Current value. */
  value?: number;
  /** Uncontrolled initial value. @default 0 */
  defaultValue?: number;
  /** Lowest allowed value. @default 0 */
  min?: number;
  /** Highest allowed value. @default 100 */
  max?: number;
  /** Increment granularity. @default 1 */
  step?: number;
  disabled?: boolean;
  /** Called while the value changes (drag or keyboard). */
  onChange?: (value: number) => void;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onChange,
    className,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const current = isControlled ? value : inner;
  const range = max - min;
  const percent = range === 0 ? 0 : ((current - min) / range) * 100;

  const snap = useCallback(
    (raw: number) => {
      const stepped = Math.round((raw - min) / step) * step + min;
      const clamped = Math.min(max, Math.max(min, stepped));
      // Avoid floating point drift, e.g. 0.30000000000000004.
      return Number(clamped.toFixed(10));
    },
    [min, max, step],
  );

  const setValue = (next: number) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const valueFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return current;
    const rect = track.getBoundingClientRect();
    const ratio = range === 0 ? 0 : (clientX - rect.left) / rect.width;
    return snap(min + Math.min(1, Math.max(0, ratio)) * range);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setValue(valueFromPointer(event.clientX));
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || disabled) return;
    setValue(valueFromPointer(event.clientX));
  };

  const endDrag = () => setDragging(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const bigStep = Math.max(step, (max - min) / 10);
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      setValue(snap(current + step));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      setValue(snap(current - step));
    } else if (event.key === 'PageUp') {
      event.preventDefault();
      setValue(snap(current + bigStep));
    } else if (event.key === 'PageDown') {
      event.preventDefault();
      setValue(snap(current - bigStep));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setValue(min);
    } else if (event.key === 'End') {
      event.preventDefault();
      setValue(max);
    }
  };

  return (
    <div
      ref={ref}
      className={cx('sy-slider', disabled && 'is-disabled', className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      {...rest}
    >
      <div ref={trackRef} className="sy-slider__track">
        <div className="sy-slider__fill" style={{ width: `${percent}%` }} />
        <div
          className="sy-slider__thumb"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-disabled={disabled || undefined}
          aria-busy={dragging || undefined}
          tabIndex={disabled ? -1 : 0}
          style={{ left: `${percent}%` }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
});

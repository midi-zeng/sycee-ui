import { forwardRef, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';

export interface CarouselItem {
  key?: string | number;
  content: ReactNode;
  ariaLabel?: string;
}

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: CarouselItem[];
  /** Controlled active index. */
  active?: number;
  /** Initial index for uncontrolled usage. @default 0 */
  defaultActive?: number;
  /** Advances slides automatically. @default true */
  autoplay?: boolean;
  /** Auto-play interval in milliseconds. @default 4500 */
  interval?: number;
  /** Wraps from the last slide to the first. @default true */
  loop?: boolean;
  /** Stops while the pointer is over the carousel. @default true */
  pauseOnHover?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  height?: number | string;
  onChange?: (index: number) => void;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    items,
    active,
    defaultActive = 0,
    autoplay = true,
    interval = 4500,
    loop = true,
    pauseOnHover = true,
    showArrows = true,
    showIndicators = true,
    height,
    onChange,
    className,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [innerActive, setInnerActive] = useState(defaultActive);
  const [hovered, setHovered] = useState(false);
  const current = Math.min(Math.max(active ?? innerActive, 0), Math.max(items.length - 1, 0));
  const timerRef = useRef<number | null>(null);

  const go = (next: number) => {
    if (items.length === 0) return;
    const resolved = loop
      ? (next + items.length) % items.length
      : Math.min(Math.max(next, 0), items.length - 1);
    if (resolved === current) return;
    if (active === undefined) setInnerActive(resolved);
    onChange?.(resolved);
  };

  useEffect(() => {
    if (!autoplay || hovered || items.length < 2) return;
    timerRef.current = window.setInterval(() => {
      const next = loop ? (current + 1) % items.length : current + 1;
      if (!loop && next >= items.length) return;
      if (active === undefined) setInnerActive(next);
      onChange?.(next);
    }, Math.max(800, interval));
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [active, autoplay, current, hovered, interval, items.length, loop, onChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(current + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      go(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      go(items.length - 1);
    }
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      className={cx('sy-carousel', className)}
      onKeyDown={handleKeyDown}
      onMouseEnter={(event) => {
        if (pauseOnHover) setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (pauseOnHover) setHovered(false);
        onMouseLeave?.(event);
      }}
      {...rest}
    >
      <div className="sy-carousel__viewport" style={{ height }}>
        <div
          className="sy-carousel__track"
          style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
          aria-live={autoplay && !hovered ? 'off' : 'polite'}
        >
          {items.map((item, index) => (
            <div
              key={item.key ?? index}
              className={cx('sy-carousel__slide', index === current && 'is-active')}
              role="group"
              aria-roledescription="slide"
              aria-label={item.ariaLabel ?? `${index + 1} / ${items.length}`}
              aria-hidden={index !== current}
              inert={index !== current}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
      {showArrows && items.length > 1 ? (
        <>
          <button
            type="button"
            className="sy-carousel__arrow sy-carousel__arrow--prev"
            aria-label={t.previousSlide}
            onClick={() => go(current - 1)}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            className="sy-carousel__arrow sy-carousel__arrow--next"
            aria-label={t.nextSlide}
            onClick={() => go(current + 1)}
          >
            <Icon name="chevron-right" />
          </button>
        </>
      ) : null}
      {showIndicators && items.length > 1 ? (
        <div className="sy-carousel__indicators">
          {items.map((item, index) => (
            <button
              key={item.key ?? index}
              type="button"
              className={cx('sy-carousel__indicator', index === current && 'is-active')}
              aria-label={t.slide(index + 1)}
              aria-current={index === current ? 'true' : undefined}
              onClick={() => go(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
});

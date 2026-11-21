import { forwardRef, useEffect, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';

export interface DanmakuItem {
  id?: string | number;
  content: ReactNode;
  color?: string;
  /** Seconds needed to cross the stage. */
  speed?: number;
  /** Animation delay in seconds. */
  delay?: number;
  /** Explicit lane, from zero. */
  track?: number;
}

export interface DanmakuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  items: DanmakuItem[];
  /** Height of the stage in pixels. @default 180 */
  height?: number;
  /** Number of horizontal lanes. @default 4 */
  tracks?: number;
  /** Default crossing duration in seconds. @default 12 */
  speed?: number;
  /** Controlled pause state. */
  paused?: boolean;
  defaultPaused?: boolean;
  /** Replays each item indefinitely. @default true */
  loop?: boolean;
  showControls?: boolean;
  onItemClick?: (item: DanmakuItem, index: number) => void;
}

export const Danmaku = forwardRef<HTMLDivElement, DanmakuProps>(function Danmaku(
  {
    items,
    height = 180,
    tracks = 4,
    speed = 12,
    paused,
    defaultPaused = false,
    loop = true,
    showControls = false,
    onItemClick,
    className,
    style,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [innerPaused, setInnerPaused] = useState(defaultPaused);
  const isPaused = paused ?? innerPaused;

  useEffect(() => {
    if (paused === undefined) setInnerPaused(defaultPaused);
  }, [defaultPaused, paused]);

  return (
    <div
      ref={ref}
      role="log"
      aria-live={isPaused ? 'polite' : 'off'}
      className={cx('sy-danmaku', isPaused && 'is-paused', className)}
      style={{ ...style, height }}
      {...rest}
    >
      <div className="sy-danmaku__stage">
        {items.map((item, index) => {
          const track = (item.track ?? index) % Math.max(1, tracks);
          const itemStyle = {
            '--sy-danmaku-top': `${(track + 0.5) * (100 / Math.max(1, tracks))}%`,
            '--sy-danmaku-duration': `${Math.max(4, item.speed ?? speed)}s`,
            '--sy-danmaku-delay': `${item.delay ?? -(index * 0.72)}s`,
            '--sy-danmaku-iterations': loop ? 'infinite' : '1',
            color: item.color,
          } as CSSProperties;
          return (
            <button
              key={item.id ?? index}
              type="button"
              className="sy-danmaku__item"
              style={itemStyle}
              onClick={() => onItemClick?.(item, index)}
            >
              {item.content}
            </button>
          );
        })}
      </div>
      {showControls ? (
        <button
          type="button"
          className="sy-danmaku__control"
          aria-label={isPaused ? t.play : t.pause}
          onClick={() => {
            if (paused === undefined) setInnerPaused(!isPaused);
          }}
        >
          {isPaused ? '❯' : 'Ⅱ'}
        </button>
      ) : null}
    </div>
  );
});

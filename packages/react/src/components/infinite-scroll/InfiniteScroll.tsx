import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Spinner } from '../spinner/Spinner';

export interface InfiniteScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** Shows loading state and suspends observation. @default false */
  loading?: boolean;
  /** Shows the end state and suspends observation while true. @default false */
  finished?: boolean;
  /** Shows an error state and suspends observation until retry. @default false */
  error?: boolean;
  /** Suspends observation without changing the rendered content. @default false */
  disabled?: boolean;
  /** Distance in pixels before the sentinel at which loading starts. @default 120 */
  distance?: number;
  /** Makes the component a fixed-height scroll container. Omit to use page scrolling. */
  height?: number | string;
  /** Custom loading text. Defaults to the active locale. */
  loadingContent?: ReactNode;
  /** Custom finished text. Defaults to the active locale. */
  finishedContent?: ReactNode;
  /** Custom error text. Defaults to the active locale. */
  errorContent?: ReactNode;
  /** Called when more content should be requested. */
  onLoadMore?: () => void;
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  function InfiniteScroll(
    {
      loading = false,
      finished = false,
      error = false,
      disabled = false,
      distance = 120,
      height,
      loadingContent,
      finishedContent,
      errorContent,
      onLoadMore,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const t = useLocale();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const contained = height !== undefined;
    const rootStyle: CSSProperties = {
      ...(contained ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
      ...style,
    };
    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || loading || finished || error || disabled) return;

      const scrollRoot = contained ? rootRef.current : null;
      if (contained && !scrollRoot) return;

      let triggered = false;
      const trigger = () => {
        if (triggered) return;
        triggered = true;
        onLoadMore?.();
      };

      if (typeof IntersectionObserver === 'undefined') {
        const target: HTMLElement | Window = scrollRoot ?? window;
        const check = () => {
          const sentinelRect = sentinel.getBoundingClientRect();
          const boundary = scrollRoot
            ? scrollRoot.getBoundingClientRect().bottom
            : window.innerHeight || document.documentElement.clientHeight;
          if (sentinelRect.top <= boundary + distance) trigger();
        };

        target.addEventListener('scroll', check, { passive: true });
        window.addEventListener('resize', check);
        const frame = window.requestAnimationFrame(check);
        return () => {
          target.removeEventListener('scroll', check);
          window.removeEventListener('resize', check);
          window.cancelAnimationFrame(frame);
        };
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) trigger();
        },
        {
          root: scrollRoot,
          rootMargin: `0px 0px ${Math.max(0, distance)}px 0px`,
        },
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [contained, disabled, distance, error, finished, loading, onLoadMore]);

    return (
      <div
        ref={setRootRef}
        className={cx(
          'sy-infinite-scroll',
          contained && 'sy-infinite-scroll--contained',
          loading && 'is-loading',
          error && 'is-error',
          finished && 'is-finished',
          disabled && 'is-disabled',
          className,
        )}
        style={rootStyle}
        aria-busy={loading || undefined}
        {...rest}
      >
        <div className="sy-infinite-scroll__content">{children}</div>
        <div className="sy-infinite-scroll__footer">
          {loading ? (
            <div className="sy-infinite-scroll__status" role="status" aria-live="polite">
              <Spinner size="sm" color="neutral" aria-hidden="true" />
              <span>{loadingContent ?? t.loadingMore}</span>
            </div>
          ) : error ? (
            <div className="sy-infinite-scroll__status" role="alert">
              <span>{errorContent ?? t.loadError}</span>
              <button
                type="button"
                className="sy-infinite-scroll__retry"
                onClick={() => onLoadMore?.()}
              >
                {t.retry}
              </button>
            </div>
          ) : finished ? (
            <div className="sy-infinite-scroll__status" role="status" aria-live="polite">
              <span>{finishedContent ?? t.noMore}</span>
            </div>
          ) : null}
          <div ref={sentinelRef} className="sy-infinite-scroll__sentinel" aria-hidden="true" />
        </div>
      </div>
    );
  },
);

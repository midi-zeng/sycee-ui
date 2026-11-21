import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';
import { Spinner } from '../spinner/Spinner';

export interface ImageProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source. */
  src: string;
  /** Alternative text. */
  alt?: string;
  /** Inline width of the image box. */
  width?: number | string;
  /** Inline height of the image box. */
  height?: number | string;
  /** Enables the fullscreen preview on click. @default true */
  preview?: boolean;
  /** Text shown when the image fails to load. @default 'Preview unavailable' */
  errorText?: string;
}

const CLOSE_DURATION = 200;
type ImageStatus = 'loading' | 'success' | 'error';

export const Image = forwardRef<HTMLSpanElement, ImageProps>(function Image(
  { src, alt, width, height, preview = true, errorText, className, style, ...rest },
  ref,
) {
  const t = useLocale();
  const [imageState, setImageState] = useState<{ src: string; status: ImageStatus }>({
    src,
    status: 'loading',
  });
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerClosing, setViewerClosing] = useState(false);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const viewerId = useId();
  // A new src starts in the loading state without relying on an effect after
  // paint, so cached images cannot finish before the state reset runs.
  const status = imageState.src === src ? imageState.status : 'loading';

  const closeViewer = useCallback(() => {
    if (viewerClosing) return;
    setViewerClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setViewerOpen(false);
      setViewerClosing(false);
    }, CLOSE_DURATION);
  }, [viewerClosing]);

  // While the viewer is open: Escape closes it and focus moves in/out.
  useEffect(() => {
    if (!viewerOpen || typeof document === 'undefined') return undefined;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    viewerRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const previous = restoreFocusRef.current;
      restoreFocusRef.current = null;
      previous?.focus();
    };
  }, [viewerOpen, closeViewer]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  const openViewer = () => {
    if (!preview || status !== 'success') return;
    setViewerOpen(true);
  };

  const showViewer = (viewerOpen || viewerClosing) && typeof document !== 'undefined';

  return (
    <span
      ref={ref}
      className={cx(
        'sy-image',
        status === 'loading' && 'is-loading',
        status === 'error' && 'is-error',
        preview && 'sy-image--preview',
        className,
      )}
      style={{ width, height, ...style }}
      onClick={openViewer}
      {...rest}
    >
      {status !== 'error' ? (
        <img
          key={src}
          className="sy-image__img"
          src={src}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          style={{ width, height }}
          onLoad={() => setImageState({ src, status: 'success' })}
          onError={() => setImageState({ src, status: 'error' })}
        />
      ) : null}
      {status === 'loading' ? (
        <span className="sy-image__overlay" aria-hidden="true">
          <Spinner size="sm" label={undefined} />
        </span>
      ) : null}
      {status === 'error' ? (
        <span className="sy-image__error" role={alt ? undefined : 'img'} aria-label={alt}>
          <Icon name="eye-off" />
          {errorText ?? t.previewUnavailable}
        </span>
      ) : null}
      {showViewer
        ? createPortal(
            <div
              id={viewerId}
              ref={viewerRef}
              role="dialog"
              aria-modal="true"
              aria-label={alt ?? t.imagePreview}
              tabIndex={-1}
              className={cx('sy-image-viewer', viewerClosing && 'is-closing')}
              onClick={(event) => {
                if (event.target === event.currentTarget) closeViewer();
              }}
            >
              <img className="sy-image-viewer__img" src={src} alt={alt} />
              <button
                type="button"
                className="sy-image-viewer__close"
                aria-label={t.close}
                onClick={closeViewer}
              >
                <Icon name="close" />
              </button>
            </div>,
            document.body,
          )
        : null}
    </span>
  );
});

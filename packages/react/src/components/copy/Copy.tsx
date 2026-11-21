import { forwardRef, useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { copyText } from '@sycee-ui/utils';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { BorderType, ColorType, ComponentSize } from '../../types';
import { Icon } from '../icon/Icon';

export type CopyStatus = 'idle' | 'copied' | 'error';

export interface CopyProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> {
  /** Text written to the clipboard. */
  text: string;
  /** Visible label; defaults to the localized "Copy". */
  label?: string;
  /** Label shown after a successful copy. */
  copiedLabel?: string;
  /** Label shown after a failed copy. */
  errorLabel?: string;
  /** @default 'neutral' */
  color?: ColorType;
  /** @default 'ghost' */
  variant?: BorderType;
  /** @default 'md' */
  size?: ComponentSize;
  /** Hides the label and renders a square icon button. */
  iconOnly?: boolean;
  /** Time in milliseconds before feedback returns to idle; 0 keeps it visible. @default 2000 */
  duration?: number;
  disabled?: boolean;
  /** Called after the text is copied successfully. */
  onCopied?: (text: string) => void;
  /** Called when the browser cannot write to the clipboard. */
  onCopyError?: (error: unknown) => void;
}

export const Copy = forwardRef<HTMLButtonElement, CopyProps>(function Copy(
  {
    text,
    label,
    copiedLabel,
    errorLabel,
    color = 'neutral',
    variant = 'ghost',
    size = 'md',
    type = 'button',
    iconOnly = false,
    duration = 2000,
    disabled = false,
    onCopied,
    onCopyError,
    className,
    onClick,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [status, setStatus] = useState<CopyStatus>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  const displayLabel =
    status === 'copied'
      ? (copiedLabel ?? t.copied)
      : status === 'error'
        ? (errorLabel ?? t.copyFailed)
        : (label ?? t.copy);
  const iconName = status === 'copied' ? 'check' : status === 'error' ? 'danger' : 'copy';

  const clearResetTimer = () => {
    if (resetTimer.current !== null) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearResetTimer();
    };
  }, []);

  const handleCopy = async () => {
    clearResetTimer();
    try {
      await copyText(text);
      if (!mountedRef.current) return;
      setStatus('copied');
      onCopied?.(text);
    } catch (error) {
      if (!mountedRef.current) return;
      setStatus('error');
      onCopyError?.(error);
    }

    if (duration > 0) {
      resetTimer.current = setTimeout(() => {
        resetTimer.current = null;
        setStatus('idle');
      }, duration);
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'sy-copy',
        'sy-button',
        `sy-button--${color}`,
        `sy-button--${variant}`,
        size !== 'md' && `sy-button--${size}`,
        iconOnly && 'sy-copy--icon-only',
        status === 'copied' && 'is-copied',
        status === 'error' && 'is-error',
        className,
      )}
      disabled={disabled}
      aria-label={iconOnly ? displayLabel : ariaLabel}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) void handleCopy();
      }}
      {...rest}
    >
      <span className="sy-copy__icon" aria-hidden="true">
        <Icon name={iconName} />
      </span>
      <span
        className={cx('sy-copy__label', iconOnly && 'sy-copy__label--hidden')}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {displayLabel}
      </span>
    </button>
  );
});

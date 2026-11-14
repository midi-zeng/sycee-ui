import { forwardRef, useState } from 'react';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize, InputStatus } from '../../types';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** Controlled value of the textarea. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** @default 'md' */
  size?: ComponentSize;
  /** Validation state of the field. @default 'default' */
  status?: InputStatus;
  /** Number of visible text lines. @default 3 */
  rows?: number;
  /** Maximum number of characters allowed. */
  maxLength?: number;
  /** Shows a `{length}/{maxLength}` counter below the field. */
  showCount?: boolean;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    size = 'md',
    status = 'default',
    rows = 3,
    showCount = false,
    disabled = false,
    readOnly = false,
    className,
    value,
    defaultValue,
    maxLength,
    onChange,
    ...rest
  },
  ref,
) {
  // Length of the uncontrolled value, kept in sync through onChange events.
  const [internalLength, setInternalLength] = useState(
    typeof defaultValue === 'string' ? defaultValue.length : 0,
  );
  const count = typeof value === 'string' ? value.length : internalLength;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalLength(event.target.value.length);
    onChange?.(event.target.value, event);
  };

  return (
    <div className="sy-textarea-wrapper">
      <div
        className={cx(
          'sy-textarea',
          size !== 'md' && `sy-textarea--${size}`,
          status !== 'default' && `sy-textarea--${status}`,
          disabled && 'is-disabled',
          className,
        )}
      >
        <textarea
          ref={ref}
          className="sy-textarea__native"
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          aria-disabled={disabled || undefined}
          onChange={handleChange}
          {...rest}
        />
      </div>
      {showCount ? (
        <span className="sy-textarea__count">{maxLength != null ? `${count}/${maxLength}` : count}</span>
      ) : null}
    </div>
  );
});

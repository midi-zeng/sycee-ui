import { forwardRef, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize, InputStatus } from '../../types';
import { Icon } from '../icon/Icon';

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange' | 'onMouseEnter' | 'onMouseLeave' | 'prefix' | 'suffix'
  > {
  size?: ComponentSize;
  /** Validation state of the field. @default 'default' */
  status?: InputStatus;
  /** Shows a clear button when the field has a value. */
  clearable?: boolean;
  /** Element rendered before the input. */
  prefix?: ReactNode;
  /** Element rendered after the input. */
  suffix?: ReactNode;
  onChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    status = 'default',
    clearable = false,
    prefix,
    suffix,
    className,
    value,
    defaultValue,
    disabled = false,
    readOnly = false,
    onChange,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...rest
  },
  ref,
) {
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const isEmpty = value === undefined ? defaultValue === undefined || defaultValue === '' : value === '' || value === undefined;
  const showClear = clearable && !disabled && !readOnly && !isEmpty && (isHover || isFocus);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value, event);
  };

  const handleClear = () => {
    const input = ref && typeof ref !== 'function' ? ref.current : null;
    if (onChange) {
      // Reuse the native input event so consumers receive a realistic event.
      const synthetic = input
        ? ({ target: input, currentTarget: input, type: 'change' } as unknown as ChangeEvent<HTMLInputElement>)
        : undefined;
      onChange('', synthetic);
    }
    if (input) {
      input.value = '';
      input.focus();
    }
  };

  return (
    <div
      className={cx(
        'sy-input',
        size !== 'md' && `sy-input--${size}`,
        status !== 'default' && `sy-input--${status}`,
        disabled && 'is-disabled',
        className,
      )}
      onMouseEnter={(event) => {
        setIsHover(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHover(false);
        onMouseLeave?.(event);
      }}
    >
      {prefix ? <span className="sy-input__prefix">{prefix}</span> : null}
      <input
        ref={ref}
        className="sy-input__native"
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onFocus={(event) => {
          setIsFocus(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocus(false);
          onBlur?.(event);
        }}
        {...rest}
      />
      {showClear ? (
        <span
          className="sy-input__clear"
          role="button"
          aria-label="Clear"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleClear}
        >
          <Icon name="close" />
        </span>
      ) : null}
      {suffix ? <span className="sy-input__suffix">{suffix}</span> : null}
    </div>
  );
});

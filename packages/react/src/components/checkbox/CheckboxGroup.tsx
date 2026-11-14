import { forwardRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Checkbox, CheckboxGroupContext } from './Checkbox';

export interface CheckboxGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** Checked values (controlled). */
  value?: Array<string | number>;
  /** Initial checked values when uncontrolled. @default [] */
  defaultValue?: Array<string | number>;
  /** Renders a Checkbox per option; `children` are used instead when omitted. */
  options?: CheckboxGroupOption[];
  disabled?: boolean;
  onChange?: (value: Array<string | number>) => void;
  /** Custom checkboxes rendered when `options` is not provided. */
  children?: ReactNode;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  {
    value,
    defaultValue = [],
    options,
    disabled = false,
    className,
    children,
    onChange,
    ...rest
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState<Array<string | number>>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const toggle = (checked: boolean, optionValue: string | number) => {
    const next = checked
      ? [...currentValue, optionValue]
      : currentValue.filter((item) => item !== optionValue);
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('sy-checkbox-group', className)} {...rest}>
      <CheckboxGroupContext.Provider value={{ value: currentValue, disabled, toggle }}>
        {options
          ? options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            ))
          : children}
      </CheckboxGroupContext.Provider>
    </div>
  );
});

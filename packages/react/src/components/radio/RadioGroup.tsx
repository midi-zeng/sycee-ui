import { forwardRef, useId, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Radio, RadioGroupContext } from './Radio';

export interface RadioGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'> {
  /** Selected value (controlled). @default null via defaultValue */
  value?: string | number | null;
  /** Initial selected value when uncontrolled. @default null */
  defaultValue?: string | number | null;
  /** Renders a Radio per option; `children` are used instead when omitted. */
  options?: RadioGroupOption[];
  disabled?: boolean;
  /** `name` shared by the radios; generated via useId when omitted. */
  name?: string;
  onChange?: (value: string | number) => void;
  /** Custom radios rendered when `options` is not provided. */
  children?: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    value,
    defaultValue = null,
    options,
    disabled = false,
    name,
    className,
    children,
    onChange,
    ...rest
  },
  ref,
) {
  const generatedName = useId();
  const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const select = (optionValue: string | number) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  return (
    <div ref={ref} className={cx('sy-radio-group', className)} {...rest}>
      <RadioGroupContext.Provider
        value={{ value: currentValue, disabled, name: name ?? generatedName, select }}
      >
        {options
          ? options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            ))
          : children}
      </RadioGroupContext.Provider>
    </div>
  );
});

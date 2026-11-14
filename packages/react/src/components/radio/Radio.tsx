import { createContext, forwardRef, useContext, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface RadioGroupContextValue {
  /** Currently selected value in the group. */
  value: string | number | null;
  /** `name` shared by every radio input in the group. */
  name?: string;
  /** Disables every radio in the group. */
  disabled?: boolean;
  /** Selects a value inside the group. */
  select: (value: string | number) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Checked state (controlled). @default false via defaultChecked */
  checked?: boolean;
  /** Initial checked state when uncontrolled. @default false */
  defaultChecked?: boolean;
  /** Label text rendered next to the dot; `children` takes precedence. */
  label?: string;
  disabled?: boolean;
  /** Value used inside a RadioGroup to identify this radio. */
  value?: string | number;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    checked,
    defaultChecked = false,
    label,
    disabled = false,
    value,
    name,
    className,
    style,
    children,
    onChange,
    ...rest
  },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked =
    group !== null && value !== undefined
      ? group.value === value
      : isControlled
        ? checked
        : internalChecked;
  const hasControlledChecked = isControlled || (group !== null && value !== undefined);
  const isDisabled = disabled || (group?.disabled ?? false);
  const resolvedName = name ?? group?.name;
  const labelContent = children ?? label;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextChecked = event.target.checked;
    if (group !== null && value !== undefined) {
      if (nextChecked) {
        group.select(value);
      }
    } else if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked, event);
  };

  return (
    <label
      className={cx(
        'sy-radio',
        isChecked && 'is-checked',
        isDisabled && 'is-disabled',
        className,
      )}
      style={style}
    >
      {/* The native input must stay first so SCSS can draw the focus ring on its sibling dot. */}
      <input
        ref={ref}
        type="radio"
        className="sy-radio__native"
        name={resolvedName}
        value={value}
        checked={hasControlledChecked ? isChecked : undefined}
        defaultChecked={hasControlledChecked ? undefined : defaultChecked}
        disabled={isDisabled}
        onChange={handleChange}
        {...rest}
      />
      <span className="sy-radio__dot" aria-hidden="true" />
      {labelContent != null ? <span className="sy-radio__label">{labelContent}</span> : null}
    </label>
  );
});

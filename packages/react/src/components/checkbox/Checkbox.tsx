import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon/Icon';

export interface CheckboxGroupContextValue {
  /** Currently checked values in the group. */
  value: Array<string | number>;
  /** Disables every checkbox in the group. */
  disabled?: boolean;
  /** Toggles a value inside the group. */
  toggle: (checked: boolean, value: string | number) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'type'> {
  /** Checked state (controlled). @default false via defaultChecked */
  checked?: boolean;
  /** Initial checked state when uncontrolled. @default false */
  defaultChecked?: boolean;
  /** Label text rendered next to the box; `children` takes precedence. */
  label?: string;
  disabled?: boolean;
  /** Shows a dash instead of the check icon. */
  indeterminate?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md';
  /** Value used inside a CheckboxGroup to identify this checkbox. */
  value?: string | number;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked = false,
    label,
    disabled = false,
    indeterminate = false,
    size = 'md',
    value,
    className,
    style,
    children,
    onChange,
    ...rest
  },
  ref,
) {
  const group = useContext(CheckboxGroupContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked =
    group !== null && value !== undefined
      ? group.value.includes(value)
      : isControlled
        ? checked
        : internalChecked;
  const hasControlledChecked = isControlled || (group !== null && value !== undefined);
  const isDisabled = disabled || (group?.disabled ?? false);
  const labelContent = children ?? label;

  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  // React does not map the native `indeterminate` property, so set it imperatively.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextChecked = event.target.checked;
    if (group !== null && value !== undefined) {
      group.toggle(nextChecked, value);
    } else if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked, event);
  };

  return (
    <label
      className={cx(
        'sy-checkbox',
        size !== 'md' && 'sy-checkbox--sm',
        isChecked && 'is-checked',
        indeterminate && 'is-indeterminate',
        isDisabled && 'is-disabled',
        className,
      )}
      style={style}
    >
      {/* The native input must stay first so SCSS can draw the focus ring on its sibling box. */}
      <input
        ref={setRefs}
        type="checkbox"
        className="sy-checkbox__native"
        value={value}
        checked={hasControlledChecked ? isChecked : undefined}
        defaultChecked={hasControlledChecked ? undefined : defaultChecked}
        disabled={isDisabled}
        onChange={handleChange}
        {...rest}
      />
      <span className="sy-checkbox__box" aria-hidden="true">
        <Icon name="check" />
      </span>
      {labelContent != null ? <span className="sy-checkbox__label">{labelContent}</span> : null}
    </label>
  );
});

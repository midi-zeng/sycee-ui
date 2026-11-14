import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import type { ComponentSize, InputStatus } from '../../types';
import { Icon } from '../icon/Icon';

export interface SelectOption {
  /** Text shown in the dropdown and the trigger. */
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'> {
  /** Selected value (controlled). @default null via defaultValue */
  value?: string | number | null;
  /** Initial value when uncontrolled. @default null */
  defaultValue?: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  /** @default 'md' */
  size?: ComponentSize;
  disabled?: boolean;
  /** Shows a clear button when a value is selected. */
  clearable?: boolean;
  /** Validation state of the field. @default 'default' */
  status?: InputStatus;
  onChange?: (value: string | number | null) => void;
  onClear?: () => void;
}

// Approximate dropdown height used for the "not enough space below" flip check.
const DROPDOWN_ESTIMATED_HEIGHT = 240;

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    options,
    placeholder,
    size = 'md',
    status = 'default',
    disabled = false,
    clearable = false,
    className,
    value,
    defaultValue = null,
    onChange,
    onClear,
    ...rest
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dropUp, setDropUp] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const valueId = useId();
  const listboxId = useId();

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue !== null && currentValue !== undefined;
  const selectedOption = options.find((option) => option.value === currentValue);
  const selectedLabel = selectedOption ? selectedOption.label : hasValue ? String(currentValue) : null;

  const setRootRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const openDropdown = () => {
    if (disabled) return;
    const selectedIndex = options.findIndex((option) => option.value === currentValue);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const selectOption = (option: SelectOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue(null);
    onChange?.(null);
    onClear?.();
  };

  // Close on outside click; the listener lives only while open and is cleaned up on close/unmount.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && event.target instanceof Node && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  // Flip the dropdown above the trigger when there is not enough room below.
  useEffect(() => {
    if (!isOpen) return;
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setDropUp(spaceBelow < DROPDOWN_ESTIMATED_HEIGHT && spaceAbove > spaceBelow);
  }, [isOpen]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => (options.length === 0 ? -1 : (index + 1) % options.length));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => (options.length === 0 ? -1 : (index - 1 + options.length) % options.length));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < options.length) {
          selectOption(options[activeIndex]);
        }
        break;
      case 'Escape':
        // Do not let the event close parent overlays (e.g. a modal) as well.
        event.stopPropagation();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={setRootRef}
      className={cx(
        'sy-select',
        size !== 'md' && `sy-select--${size}`,
        status !== 'default' && `sy-select--${status}`,
        disabled && 'is-disabled',
        isOpen && 'is-open',
        className,
      )}
      {...rest}
    >
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        className="sy-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={valueId}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={
          isOpen && activeIndex >= 0 && activeIndex < options.length
            ? `${listboxId}-option-${activeIndex}`
            : undefined
        }
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="sy-select__value" id={valueId}>
          {hasValue ? selectedLabel : <span className="sy-select__placeholder">{placeholder}</span>}
        </span>
        {clearable && hasValue && !disabled ? (
          <span
            className="sy-select__clear"
            role="button"
            aria-label="Clear"
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
            }}
          >
            <Icon name="close" />
          </span>
        ) : null}
        <span className={cx('sy-select__arrow', isOpen && 'is-open')}>
          <Icon name="chevron-down" />
        </span>
      </button>
      {isOpen ? (
        <div className={cx('sy-select__dropdown', dropUp && 'sy-select__dropdown--top')}>
          <ul className="sy-select__list" role="listbox" id={listboxId}>
            {options.map((option, index) => {
              const isSelected = option.value === currentValue;
              return (
                <li
                  key={option.value}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  className={cx(
                    'sy-select__option',
                    isSelected && 'is-selected',
                    index === activeIndex && 'is-active',
                    option.disabled && 'is-disabled',
                  )}
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                  {isSelected ? <Icon name="check" /> : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
});

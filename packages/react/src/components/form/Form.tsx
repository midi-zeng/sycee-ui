import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { cx } from '../../utils/cx';

export interface FormRule {
  /** Rejects empty values (null, undefined, '', []), with `message`. */
  required?: boolean;
  /** Error message for this rule. @default 'Invalid value' */
  message?: string;
  /** Custom check; return false/string (string = message) or a Promise of either. */
  validator?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

export interface FormFieldHandle {
  /** Model key this field validates. */
  prop?: string;
  /** Runs the field's rules; resolves false and shows the message on failure. */
  validate: () => Promise<boolean>;
}

export interface FormContextValue {
  model?: Record<string, unknown>;
  rules?: Record<string, FormRule[]>;
  labelWidth?: number | string;
  labelPosition?: 'left' | 'top';
  registerField: (field: FormFieldHandle) => () => void;
}

export const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext(): FormContextValue | null {
  return useContext(FormContext);
}

export interface FormHandle {
  /** Validates all registered fields; resolves true when every field passes. */
  validate: () => Promise<boolean>;
}

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  /** Data model the FormItems read from. */
  model?: Record<string, unknown>;
  /** Rules per model key, applied to matching FormItems. */
  rules?: Record<string, FormRule[]>;
  /** Fixed label width; any CSS width. */
  labelWidth?: number | string;
  /** Label position. @default 'left' */
  labelPosition?: 'left' | 'top';
}

export const Form = forwardRef<FormHandle, FormProps>(function Form(
  { model, rules, labelWidth, labelPosition = 'left', className, children, ...rest },
  ref,
) {
  const fieldsRef = useRef<FormFieldHandle[]>([]);

  const contextValue = useMemo<FormContextValue>(
    () => ({
      model,
      rules,
      labelWidth,
      labelPosition,
      registerField: (field) => {
        fieldsRef.current.push(field);
        return () => {
          fieldsRef.current = fieldsRef.current.filter((entry) => entry !== field);
        };
      },
    }),
    [model, rules, labelWidth, labelPosition],
  );

  useImperativeHandle(
    ref,
    () => ({
      validate: async () => {
        const results = await Promise.all(fieldsRef.current.map((field) => field.validate()));
        return results.every(Boolean);
      },
    }),
    [],
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={cx('sy-form', labelPosition === 'top' && 'sy-form--top', className)}
        onSubmit={(event) => event.preventDefault()}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});

/** Resolves the rules for a field: item rules take precedence over form rules. */
export function resolveRules(
  prop: string | undefined,
  itemRules: FormRule[] | undefined,
  formRules: Record<string, FormRule[]> | undefined,
): FormRule[] {
  if (itemRules && itemRules.length > 0) return itemRules;
  if (prop && formRules?.[prop]) return formRules[prop];
  return [];
}

/** True for values that count as "empty" for `required` rules. */
export function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

/** Runs one rule against a value; returns the failure message or null. */
export async function runRule(
  rule: FormRule,
  value: unknown,
  label: ReactNode | undefined,
): Promise<string | null> {
  const fallback = rule.message ?? 'Invalid value';
  if (rule.required && isEmptyValue(value)) {
    return typeof label === 'string' ? `${label} is required` : fallback;
  }
  if (rule.validator) {
    const outcome = await rule.validator(value);
    if (outcome === false) return fallback;
    if (typeof outcome === 'string') return outcome;
  }
  return null;
}

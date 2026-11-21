import { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import {
  FormContext,
  isEmptyValue,
  resolveRules,
  runRule,
} from './Form';
import type { FormFieldHandle, FormRule } from './Form';

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Key of the value inside the Form `model` this item validates. */
  prop?: string;
  /** Label text rendered before the control. */
  label?: ReactNode;
  /** Marks the label with a red asterisk. */
  required?: boolean;
  /** Rules for this item; take precedence over the Form's per-key rules. */
  rules?: FormRule[];
}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  { prop, label, required = false, rules, className, children, ...rest },
  ref,
) {
  const context = useContext(FormContext);
  const [error, setError] = useState<string | null>(null);
  const touchedRef = useRef(false);
  const rulesRef = useRef(rules);
  rulesRef.current = rules;

  const labelRef = useRef(label);
  labelRef.current = label;

  const validate = useCallback(async (): Promise<boolean> => {
    const effectiveRules: FormRule[] = [];
    for (const rule of rulesRef.current ?? []) {
      effectiveRules.push(rule);
    }
    // An explicit `required` prop adds a required rule when none exists.
    if (required && !effectiveRules.some((rule) => rule.required)) {
      effectiveRules.unshift({ required: true });
    }
    if (effectiveRules.length === 0) {
      setError(null);
      return true;
    }
    const value = context?.model?.[prop ?? ''];
    for (const rule of effectiveRules) {
      const message = await runRule(rule, value, labelRef.current);
      if (message) {
        setError(message);
        return false;
      }
    }
    setError(null);
    return true;
  }, [context, prop, required]);

  // Register this field with the parent Form so `form.validate()` sees it.
  useEffect(() => {
    if (!context) return undefined;
    const field: FormFieldHandle = { prop, validate };
    const unregister = context.registerField(field);
    return unregister;
  }, [context, prop, validate]);

  // Re-validate after external changes once the user has interacted.
  const modelValue = context?.model?.[prop ?? ''];
  useEffect(() => {
    if (touchedRef.current) void validate();
  }, [modelValue, validate]);

  const markTouched = () => {
    touchedRef.current = true;
  };

  const resolved = context ? resolveRules(prop, rules, context.rules) : (rules ?? []);
  const showAsterisk = required || resolved.some((rule) => rule.required);

  const labelStyle =
    context?.labelWidth !== undefined
      ? { width: typeof context.labelWidth === 'number' ? `${context.labelWidth}px` : context.labelWidth }
      : undefined;

  return (
    <div
      ref={ref}
      className={cx('sy-form-item', error && 'is-error', className)}
      onBlur={markTouched}
      {...rest}
    >
      {label ? (
        <label className="sy-form-item__label" style={labelStyle}>
          {showAsterisk ? (
            <span className="sy-form-item__asterisk" aria-hidden="true">
              *
            </span>
          ) : null}
          {label}
        </label>
      ) : null}
      <div className="sy-form-item__control">
        {children}
        {error ? (
          <div className="sy-form-item__error" role="alert">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
});

// Re-exported for convenience so consumers can build custom controls.
export { isEmptyValue, resolveRules, runRule };

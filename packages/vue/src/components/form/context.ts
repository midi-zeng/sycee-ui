import type { InjectionKey } from 'vue';

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
  model: Record<string, unknown> | undefined;
  rules: Record<string, FormRule[]> | undefined;
  labelWidth?: number | string;
  labelPosition: 'left' | 'top';
  registerField: (field: FormFieldHandle) => () => void;
}

export const FORM_CONTEXT_KEY: InjectionKey<FormContextValue> = Symbol('sy-form-context');

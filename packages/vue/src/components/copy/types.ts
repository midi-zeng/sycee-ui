import type { BorderType, ColorType, ComponentSize } from '../../types';

export type CopyStatus = 'idle' | 'copied' | 'error';

export interface CopyProps {
  /** Text written to the clipboard. */
  text: string;
  /** Visible label; defaults to the localized "Copy". */
  label?: string;
  /** Label shown after a successful copy. */
  copiedLabel?: string;
  /** Label shown after a failed copy. */
  errorLabel?: string;
  /** @default 'neutral' */
  color?: ColorType;
  /** @default 'ghost' */
  variant?: BorderType;
  /** @default 'md' */
  size?: ComponentSize;
  /** Hides the label and renders a square icon button. */
  iconOnly?: boolean;
  /** Native button type. @default 'button' */
  type?: 'button' | 'submit' | 'reset';
  /** Time in milliseconds before feedback returns to idle; 0 keeps it visible. @default 2000 */
  duration?: number;
  disabled?: boolean;
}

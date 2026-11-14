// Shared public types used across all Sycee UI components.

export type ComponentSize = 'sm' | 'md' | 'lg';

export type ColorType = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';

export type BorderType = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';

export type InputStatus = 'default' | 'error' | 'warning';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface TableColumn {
  key: string;
  title: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

// ---------------------------------------------------------------------------
// Sycee UI — React package entry
// Every component is a named export so bundlers can tree-shake.
// ---------------------------------------------------------------------------

// General
export { Button } from './components/button/Button';
export type { ButtonProps } from './components/button/Button';
export { Icon } from './components/icon/Icon';
export type { IconProps, IconName } from './components/icon/Icon';
export { Card } from './components/card/Card';
export type { CardProps } from './components/card/Card';
export { Tag } from './components/tag/Tag';
export type { TagProps, TagVariant } from './components/tag/Tag';
export { Avatar } from './components/avatar/Avatar';
export type { AvatarProps, AvatarSize } from './components/avatar/Avatar';
export { AvatarGroup } from './components/avatar/AvatarGroup';
export type { AvatarGroupProps } from './components/avatar/AvatarGroup';
export { Badge } from './components/badge/Badge';
export type { BadgeProps } from './components/badge/Badge';
export { Divider } from './components/divider/Divider';
export type { DividerProps } from './components/divider/Divider';
export { Empty } from './components/empty/Empty';
export type { EmptyProps } from './components/empty/Empty';
export { Space } from './components/space/Space';
export type { SpaceProps } from './components/space/Space';

// Data entry
export { Input } from './components/input/Input';
export type { InputProps } from './components/input/Input';
export { Textarea } from './components/textarea/Textarea';
export type { TextareaProps } from './components/textarea/Textarea';
export { Select } from './components/select/Select';
export type { SelectProps, SelectOption } from './components/select/Select';
export { Checkbox } from './components/checkbox/Checkbox';
export type { CheckboxProps } from './components/checkbox/Checkbox';
export { CheckboxGroup } from './components/checkbox/CheckboxGroup';
export type { CheckboxGroupProps, CheckboxGroupOption } from './components/checkbox/CheckboxGroup';
export { Radio } from './components/radio/Radio';
export type { RadioProps } from './components/radio/Radio';
export { RadioGroup } from './components/radio/RadioGroup';
export type { RadioGroupProps, RadioGroupOption } from './components/radio/RadioGroup';
export { Switch } from './components/switch/Switch';
export type { SwitchProps } from './components/switch/Switch';

// Feedback
export { Alert } from './components/alert/Alert';
export type { AlertProps, AlertType } from './components/alert/Alert';
export { message } from './components/message/message';
export type { MessageApi, MessageType } from './components/message/message';
export { Modal } from './components/modal/Modal';
export type { ModalProps } from './components/modal/Modal';
export { Tooltip } from './components/tooltip/Tooltip';
export type {
  TooltipProps,
  TooltipPlacement,
  TooltipTrigger,
} from './components/tooltip/Tooltip';
export { Spinner } from './components/spinner/Spinner';
export type { SpinnerProps } from './components/spinner/Spinner';
export { Progress } from './components/progress/Progress';
export type { ProgressProps, ProgressStatus } from './components/progress/Progress';

// Navigation & data display
export { Tabs } from './components/tabs/Tabs';
export type { TabsProps, TabItem } from './components/tabs/Tabs';
export { Pagination } from './components/pagination/Pagination';
export type { PaginationProps } from './components/pagination/Pagination';
export { Table } from './components/table/Table';
export type { TableProps, TableColumn } from './components/table/Table';

// Shared types
export type { ComponentSize, ColorType, BorderType, InputStatus } from './types';

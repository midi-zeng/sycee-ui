// ---------------------------------------------------------------------------
// Sycee UI — React package entry
// Every component is a named export so bundlers can tree-shake.
// ---------------------------------------------------------------------------

// General
export { Button } from './components/button/Button';
export type { ButtonProps } from './components/button/Button';
export { Copy } from './components/copy/Copy';
export type { CopyProps, CopyStatus } from './components/copy/Copy';
export { Watermark } from './components/watermark/Watermark';
export type {
  WatermarkProps,
  WatermarkContent,
  WatermarkGap,
  WatermarkOffset,
} from './components/watermark/Watermark';
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
export { NinePatch } from './components/nine-patch/NinePatch';
export type {
  NinePatchProps,
  NinePatchCustomOptions,
  NinePatchBoxEdges,
} from './components/nine-patch/NinePatch';

export { Skeleton } from './components/skeleton/Skeleton';
export type { SkeletonProps, SkeletonShape } from './components/skeleton/Skeleton';
export { InfiniteScroll } from './components/infinite-scroll/InfiniteScroll';
export type { InfiniteScrollProps } from './components/infinite-scroll/InfiniteScroll';

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
export { InputNumber } from './components/input-number/InputNumber';
export type { InputNumberProps } from './components/input-number/InputNumber';
export { Rate } from './components/rate/Rate';
export type { RateProps } from './components/rate/Rate';
export { Slider } from './components/slider/Slider';
export type { SliderProps } from './components/slider/Slider';
export { Form } from './components/form/Form';
export type {
  FormProps,
  FormHandle,
  FormRule,
  FormContextValue,
} from './components/form/Form';
export { FormItem } from './components/form/FormItem';
export type { FormItemProps } from './components/form/FormItem';

// Feedback
export { Alert } from './components/alert/Alert';
export type { AlertProps, AlertType } from './components/alert/Alert';
export { message } from './components/message/message';
export type { MessageApi, MessageType } from './components/message/message';
export { notification } from './components/notification/notification';
export type {
  NotificationApi,
  NotificationType,
  NotificationItem,
} from './components/notification/notification';
export { Modal } from './components/modal/Modal';
export type { ModalProps } from './components/modal/Modal';
export { dialog } from './components/modal/dialog';
export type { DialogApi, DialogConfig, DialogHandle } from './components/modal/dialog';
export { Tooltip } from './components/tooltip/Tooltip';
export type {
  TooltipProps,
  TooltipPlacement,
  TooltipTrigger,
} from './components/tooltip/Tooltip';
export { Popconfirm } from './components/popconfirm/Popconfirm';
export type { PopconfirmProps, PopconfirmPlacement } from './components/popconfirm/Popconfirm';
export { Drawer } from './components/drawer/Drawer';
export type { DrawerProps, DrawerPlacement } from './components/drawer/Drawer';
export { Image } from './components/image/Image';
export type { ImageProps } from './components/image/Image';
export { Spinner } from './components/spinner/Spinner';
export type { SpinnerProps } from './components/spinner/Spinner';
export { Progress } from './components/progress/Progress';
export type { ProgressProps, ProgressStatus } from './components/progress/Progress';
export { Result } from './components/result/Result';
export type { ResultProps, ResultStatus } from './components/result/Result';

// Navigation & data display
export { Tabs } from './components/tabs/Tabs';
export type { TabsProps, TabItem } from './components/tabs/Tabs';
export { Pagination } from './components/pagination/Pagination';
export type { PaginationProps } from './components/pagination/Pagination';
export { Table } from './components/table/Table';
export type { TableProps, TableColumn } from './components/table/Table';
export { Collapse, CollapseItem } from './components/collapse/Collapse';
export type {
  CollapseProps,
  CollapseItemProps,
  CollapseContextValue,
} from './components/collapse/Collapse';
export { Dropdown } from './components/dropdown/Dropdown';
export type { DropdownProps, DropdownOption, DropdownPlacement } from './components/dropdown/Dropdown';
export { DatePicker } from './components/date-picker/DatePicker';
export type { DatePickerProps } from './components/date-picker/DatePicker';
export { Cascader } from './components/cascader/Cascader';
export type { CascaderProps, CascaderOption } from './components/cascader/Cascader';
export { Tree } from './components/tree/Tree';
export type { TreeProps, TreeNodeData } from './components/tree/Tree';
export { Upload } from './components/upload/Upload';
export type {
  UploadProps,
  UploadFile,
  UploadRequestOptions,
} from './components/upload/Upload';
export { Breadcrumb } from './components/breadcrumb/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/breadcrumb/Breadcrumb';
export { Steps } from './components/steps/Steps';
export type { StepsProps, StepItem } from './components/steps/Steps';
export { Timeline } from './components/timeline/Timeline';
export type { TimelineProps, TimelineItem } from './components/timeline/Timeline';

// Animation & time
export { Countdown } from './components/countdown/Countdown';
export type { CountdownProps } from './components/countdown/Countdown';
export { Carousel } from './components/carousel/Carousel';
export type { CarouselProps, CarouselItem } from './components/carousel/Carousel';
export { Danmaku } from './components/danmaku/Danmaku';
export type { DanmakuProps, DanmakuItem } from './components/danmaku/Danmaku';
export { Marquee } from './components/marquee/Marquee';
export type { MarqueeProps, MarqueeDirection } from './components/marquee/Marquee';

// Localization
export {
  LocaleProvider,
  useLocale,
  detectLocale,
  getLocaleMessages,
  enUS,
  zhCN,
} from './locale';
export type {
  Locale,
  LocaleMessages,
  LocaleOverrides,
  LocaleProviderProps,
} from './locale';

// Hooks
export {
  useClickOutside,
  useDebouncedValue,
  useEventListener,
  useLocalStorage,
  useMediaQuery,
  useMounted,
} from './hooks';
export type {
  UseClickOutsideOptions,
  UseEventListenerOptions,
  UseLocalStorageReturn,
} from './hooks';

// Framework-agnostic utilities
export * from '@sycee-ui/utils';

// Shared types
export type { ComponentSize, ColorType, BorderType, InputStatus } from './types';

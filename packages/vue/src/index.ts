export { default as Button } from './components/button/Button.vue';
export { default as Copy } from './components/copy/Copy.vue';
export type { CopyProps, CopyStatus } from './components/copy/types';
export { default as Watermark } from './components/watermark/Watermark.vue';
export type {
  WatermarkProps,
  WatermarkContent,
  WatermarkGap,
  WatermarkOffset,
} from './components/watermark/types';
export { default as Input } from './components/input/Input.vue';
export { default as Icon } from './components/icon/Icon.vue';
export { default as Textarea } from './components/textarea/Textarea.vue';
export { default as Select } from './components/select/Select.vue';
export { default as Checkbox } from './components/checkbox/Checkbox.vue';
export { default as CheckboxGroup } from './components/checkbox/CheckboxGroup.vue';
export { default as Radio } from './components/radio/Radio.vue';
export { default as RadioGroup } from './components/radio/RadioGroup.vue';
export { default as Switch } from './components/switch/Switch.vue';
export { default as Modal } from './components/modal/Modal.vue';
export { dialog } from './components/modal/dialog';
export type { DialogApi, DialogConfig, DialogHandle } from './components/modal/dialog';
export { default as Tooltip } from './components/tooltip/Tooltip.vue';
export { default as Tag } from './components/tag/Tag.vue';
export { default as Alert } from './components/alert/Alert.vue';
export { message } from './components/message/message';
export { default as MessageContainer } from './components/message/MessageContainer.vue';
export { notification } from './components/notification/notification';
export type {
  NotificationApi,
  NotificationType,
  NotificationItem,
} from './components/notification/notification';
export { default as Popconfirm } from './components/popconfirm/Popconfirm.vue';
export { default as Drawer } from './components/drawer/Drawer.vue';
export { default as Image } from './components/image/Image.vue';
export { default as InputNumber } from './components/input-number/InputNumber.vue';
export { default as Rate } from './components/rate/Rate.vue';
export { default as Slider } from './components/slider/Slider.vue';
export { default as Form } from './components/form/Form.vue';
export { default as FormItem } from './components/form/FormItem.vue';
export { default as Collapse } from './components/collapse/Collapse.vue';
export { default as CollapseItem } from './components/collapse/CollapseItem.vue';
export { default as Dropdown } from './components/dropdown/Dropdown.vue';
export { default as DatePicker } from './components/date-picker/DatePicker.vue';
export { default as Cascader } from './components/cascader/Cascader.vue';
export { default as Tree } from './components/tree/Tree.vue';
export { default as Upload } from './components/upload/Upload.vue';
export { default as Card } from './components/card/Card.vue';
export { default as Avatar } from './components/avatar/Avatar.vue';
export { default as AvatarGroup } from './components/avatar/AvatarGroup.vue';
export { default as Badge } from './components/badge/Badge.vue';
export { default as Spinner } from './components/spinner/Spinner.vue';
export { default as Progress } from './components/progress/Progress.vue';
export { default as Empty } from './components/empty/Empty.vue';
export { default as Space } from './components/space/Space.vue';
export { default as Divider } from './components/divider/Divider.vue';
export { default as NinePatch } from './components/nine-patch/NinePatch.vue';
export type { NinePatchProps, NinePatchCustomOptions, NinePatchBoxEdges } from './components/nine-patch/types';
export { default as Skeleton } from './components/skeleton/Skeleton.vue';
export { default as InfiniteScroll } from './components/infinite-scroll/InfiniteScroll.vue';
export { default as Breadcrumb } from './components/breadcrumb/Breadcrumb.vue';
// Navigation & data display
export { default as Tabs } from './components/tabs/Tabs.vue';
export { default as Pagination } from './components/pagination/Pagination.vue';
export { default as Table } from './components/table/Table.vue';
export { default as Result } from './components/result/Result.vue';
export { default as Steps } from './components/steps/Steps.vue';
export { default as Timeline } from './components/timeline/Timeline.vue';

// Animation & time
export { default as Countdown } from './components/countdown/Countdown.vue';
export { default as Carousel } from './components/carousel/Carousel.vue';
export type { CarouselItem } from './components/carousel/types';
export { default as Danmaku } from './components/danmaku/Danmaku.vue';
export type { DanmakuItem } from './components/danmaku/types';
export { default as Marquee } from './components/marquee/Marquee.vue';
export type { MarqueeDirection } from './components/marquee/types';

// Localization
export {
  LocaleProvider,
  useLocale,
  detectLocale,
  getLocaleMessages,
  enUS,
  zhCN,
} from './locale';
export type { Locale, LocaleMessages, LocaleOverrides } from './locale';

// Composables
export {
  useClickOutside,
  useDebouncedValue,
  useEventListener,
  useLocalStorage,
  useMediaQuery,
  useMounted,
} from './composables';
export type {
  SetLocalStorageValue,
  UseClickOutsideOptions,
  UseEventListenerOptions,
  UseLocalStorageReturn,
} from './composables';

// Framework-agnostic utilities
export * from '@sycee-ui/utils';

export type { ComponentSize, ColorType, BorderType, InputStatus, SelectOption, TableColumn } from './types';

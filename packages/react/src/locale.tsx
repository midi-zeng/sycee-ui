import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

export type Locale = 'en' | 'zh';

export interface LocaleMessages {
  ok: string;
  cancel: string;
  close: string;
  remove: string;
  clear: string;
  copy: string;
  copied: string;
  copyFailed: string;
  loading: string;
  loadingMore: string;
  noMore: string;
  loadError: string;
  retry: string;
  noData: string;
  select: string;
  selectDate: string;
  previousMonth: string;
  nextMonth: string;
  breadcrumb: string;
  pagination: string;
  previousPage: string;
  nextPage: string;
  decrease: string;
  increase: string;
  rate: (value: number, max: number) => string;
  expand: (label: string) => string;
  collapse: (label: string) => string;
  check: (label: string) => string;
  dropFiles: string;
  selectFiles: string;
  uploading: string;
  uploadSuccess: string;
  uploadError: string;
  removeFile: (name: string) => string;
  previewUnavailable: string;
  imagePreview: string;
  previousSlide: string;
  nextSlide: string;
  slide: (index: number) => string;
  pause: string;
  play: string;
}

export type LocaleOverrides = Partial<Omit<LocaleMessages, 'rate' | 'expand' | 'collapse' | 'check' | 'removeFile' | 'slide'>>;

export const enUS: LocaleMessages = {
  ok: 'OK',
  cancel: 'Cancel',
  close: 'Close',
  remove: 'Remove',
  clear: 'Clear',
  copy: 'Copy',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  loading: 'Loading',
  loadingMore: 'Loading more',
  noMore: 'No more content',
  loadError: 'Failed to load content',
  retry: 'Retry',
  noData: 'No data',
  select: 'Select',
  selectDate: 'Select date',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  breadcrumb: 'Breadcrumb',
  pagination: 'Pagination',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  decrease: 'Decrease',
  increase: 'Increase',
  rate: (value, max) => `Rate ${value} of ${max}`,
  expand: (label) => `Expand ${label}`,
  collapse: (label) => `Collapse ${label}`,
  check: (label) => `Check ${label}`,
  dropFiles: 'Drop files here or click to upload',
  selectFiles: 'Select files',
  uploading: 'Uploading',
  uploadSuccess: 'Uploaded',
  uploadError: 'Upload failed',
  removeFile: (name) => `Remove ${name}`,
  previewUnavailable: 'Preview unavailable',
  imagePreview: 'Image preview',
  previousSlide: 'Previous slide',
  nextSlide: 'Next slide',
  slide: (index) => `Go to slide ${index}`,
  pause: 'Pause',
  play: 'Play',
};

export const zhCN: LocaleMessages = {
  ok: '确定',
  cancel: '取消',
  close: '关闭',
  remove: '移除',
  clear: '清除',
  copy: '复制',
  copied: '已复制',
  copyFailed: '复制失败',
  loading: '加载中',
  loadingMore: '正在加载更多',
  noMore: '没有更多内容',
  loadError: '加载失败',
  retry: '重试',
  noData: '暂无数据',
  select: '请选择',
  selectDate: '选择日期',
  previousMonth: '上个月',
  nextMonth: '下个月',
  breadcrumb: '面包屑导航',
  pagination: '分页',
  previousPage: '上一页',
  nextPage: '下一页',
  decrease: '减少',
  increase: '增加',
  rate: (value, max) => `评分 ${value}，共 ${max} 星`,
  expand: (label) => `展开 ${label}`,
  collapse: (label) => `收起 ${label}`,
  check: (label) => `选择 ${label}`,
  dropFiles: '拖放文件到此处，或点击上传',
  selectFiles: '选择文件',
  uploading: '上传中',
  uploadSuccess: '上传成功',
  uploadError: '上传失败',
  removeFile: (name) => `移除 ${name}`,
  previewUnavailable: '无法预览',
  imagePreview: '图片预览',
  previousSlide: '上一张',
  nextSlide: '下一张',
  slide: (index) => `切换到第 ${index} 张`,
  pause: '暂停',
  play: '播放',
};

const LocaleContext = createContext<LocaleMessages>(enUS);

export interface LocaleProviderProps {
  /** Built-in language. @default 'en' */
  locale?: Locale;
  /** Optional copy overrides, useful for product-specific terminology. */
  messages?: LocaleOverrides;
  children?: ReactNode;
}

export function LocaleProvider({ locale = 'en', messages, children }: LocaleProviderProps) {
  const value = useMemo(
    () => ({ ...(locale === 'zh' ? zhCN : enUS), ...messages }),
    [locale, messages],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Returns the active Sycee copy dictionary. Defaults to English. */
export function useLocale(): LocaleMessages {
  return useContext(LocaleContext);
}

/** Resolves the page language for imperative APIs rendered outside context. */
export function detectLocale(): Locale {
  if (typeof document === 'undefined') return 'en';
  return document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function getLocaleMessages(locale: Locale): LocaleMessages {
  return locale === 'zh' ? zhCN : enUS;
}

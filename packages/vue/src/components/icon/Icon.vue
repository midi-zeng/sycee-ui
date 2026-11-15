<script setup lang="ts">
import { cx } from '../../utils/cx';

// Icon path data is derived from the Lucide icon set (https://lucide.dev,
// ISC License — see NOTICE.md at the repository root for the full notice).
defineOptions({ name: 'SyIcon' });

export type IconName =
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'search'
  | 'eye'
  | 'eye-off';

const ICON_PATHS: Record<IconName, string> = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-up': '<path d="m18 15-6-6-6 6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 5-5"/>',
  warning:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  danger: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  'eye-off':
    '<path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c4.9 0 8.9 3.2 10 7a10.2 10.2 0 0 1-3.16 4.93"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="M6.1 6.1A10.7 10.7 0 0 0 2 12c1.1 3.8 5.1 7 10 7a10.4 10.4 0 0 0 5.9-1.76"/><path d="m2 2 20 20"/>',
};

interface Props {
  /** Icon to render. */
  name: IconName;
  /** Size of the icon; defaults to 1em so it scales with surrounding text. */
  size?: number | string;
  /** Accessible label. When omitted the icon is hidden from screen readers. */
  title?: string;
}

const { name, size = '1em', title } = defineProps<Props>();
</script>

<template>
  <span
    :class="cx('sy-icon', $attrs.class as string)"
    :role="title ? 'img' : undefined"
    :aria-label="title"
    :aria-hidden="title ? undefined : true"
  >
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :aria-hidden="title ? undefined : true"
      focusable="false"
      v-html="ICON_PATHS[name]"
    />
  </span>
</template>

<script setup lang="ts">
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';

defineOptions({ name: 'SyBreadcrumb' });

export interface BreadcrumbItem {
  /** Text shown for the item. */
  label: string;
  /** Turns the item into a link. */
  href?: string;
  /** Grays out and disables the item. */
  disabled?: boolean;
}

interface Props {
  /** Trail of items; the last one is marked as the current page. */
  items?: BreadcrumbItem[];
}

const { items = [] } = defineProps<Props>();
const t = useLocale();

function isLast(index: number) {
  return index === items.length - 1;
}
</script>

<template>
  <nav :class="cx('sy-breadcrumb', $attrs.class as string)" :aria-label="t.breadcrumb">
    <ol class="sy-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="
          cx(
            'sy-breadcrumb__item',
            isLast(index) && 'is-current',
            item.disabled && 'is-disabled',
          )
        "
        :aria-current="isLast(index) ? 'page' : undefined"
      >
        <a
          v-if="item.href && !isLast(index) && !item.disabled"
          class="sy-breadcrumb__link"
          :href="item.href"
        >
          {{ item.label }}
        </a>
        <span v-else class="sy-breadcrumb__label">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

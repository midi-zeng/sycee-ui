<script setup lang="ts">
import { computed, ref } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';

defineOptions({ name: 'SyPagination' });

type PageItem = number | 'ellipsis';

interface Props {
  /** Total number of items. */
  total: number;
  /** Items per page. @default 10 */
  pageSize?: number;
  /** Pages rendered on each side of the current page. @default 1 */
  siblingCount?: number;
  /** Disables every pagination control. */
  disabled?: boolean;
}

const { total, pageSize = 10, siblingCount = 1, disabled = false } = defineProps<Props>();
const t = useLocale();

const emit = defineEmits<{ change: [page: number] }>();

const model = defineModel<number>('page');

const innerPage = ref(model.value ?? 1);

function createRange(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

/**
 * Builds the visible page list: first & last page always shown, `siblingCount`
 * pages around the current one, and `'ellipsis'` markers for collapsed gaps.
 */
function getPaginationRange(current: number, pageCount: number, siblingCount: number): PageItem[] {
  const totalSpots = siblingCount * 2 + 5;
  if (pageCount <= totalSpots) return createRange(1, pageCount);

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, pageCount);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...createRange(1, 3 + siblingCount * 2), 'ellipsis', pageCount];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', ...createRange(pageCount - (3 + siblingCount * 2) + 1, pageCount)];
  }
  return [1, 'ellipsis', ...createRange(leftSibling, rightSibling), 'ellipsis', pageCount];
}

const pageCount = computed(() => Math.max(1, Math.ceil(total / pageSize)));
const currentPage = computed(() =>
  Math.min(Math.max(model.value ?? innerPage.value, 1), pageCount.value),
);
const items = computed(() => getPaginationRange(currentPage.value, pageCount.value, siblingCount));

function goTo(next: number) {
  const target = Math.min(Math.max(next, 1), pageCount.value);
  if (disabled || target === currentPage.value) return;
  if (model.value === undefined) innerPage.value = target;
  model.value = target;
  emit('change', target);
}
</script>

<template>
  <div :class="cx('sy-pagination', disabled && 'is-disabled', $attrs.class as string)">
    <nav class="sy-pagination__nav" :aria-label="t.pagination">
      <button
        type="button"
        class="sy-pagination__item sy-pagination__item--arrow"
        :aria-label="t.previousPage"
        :disabled="disabled || currentPage <= 1"
        @click="goTo(currentPage - 1)"
      >
        <Icon name="chevron-left" />
      </button>
      <template
        v-for="(item, index) in items"
        :key="item === 'ellipsis' ? `ellipsis-${index}` : item"
      >
        <span v-if="item === 'ellipsis'" class="sy-pagination__ellipsis">…</span>
        <button
          v-else
          type="button"
          :class="cx('sy-pagination__item', item === currentPage && 'is-active')"
          :aria-current="item === currentPage ? 'page' : undefined"
          :disabled="disabled"
          @click="goTo(item)"
        >
          {{ item }}
        </button>
      </template>
      <button
        type="button"
        class="sy-pagination__item sy-pagination__item--arrow"
        :aria-label="t.nextPage"
        :disabled="disabled || currentPage >= pageCount"
        @click="goTo(currentPage + 1)"
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  </div>
</template>

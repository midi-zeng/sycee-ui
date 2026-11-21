<script setup lang="ts">
import type { FunctionalComponent, VNodeChild } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import type { TableColumn } from '../../types';
import Spinner from '../spinner/Spinner.vue';

defineOptions({ name: 'SyTable' });

export interface TableColumnType extends TableColumn {
  /** Custom renderer for the cell content. */
  render?: (row: Record<string, unknown>, index: number) => VNodeChild;
}

interface Props {
  /** Column definitions. */
  columns: TableColumnType[];
  /** Row data; each cell reads its field from the row object. */
  data: Array<Record<string, unknown>>;
  /** Renders alternating striped rows. */
  striped?: boolean;
  /** Renders borders around all cells. */
  bordered?: boolean;
  /** Shows a loading overlay over the table. */
  loading?: boolean;
  /** Returns the key of a row; defaults to the row index. */
  rowKey?: (row: Record<string, unknown>, index: number) => string | number;
}

const {
  columns,
  data,
  striped = false,
  bordered = false,
  loading = false,
  rowKey,
} = defineProps<Props>();
const t = useLocale();

function cellValue(
  row: Record<string, unknown>,
  column: TableColumnType,
  index: number,
): VNodeChild {
  return column.render ? column.render(row, index) : String(row[column.key] ?? '');
}

// Renders raw cell content (string or VNodeChild) without treating plain
// strings as tag names.
const CellContent: FunctionalComponent<{ value: VNodeChild }> = (props) => props.value;
CellContent.props = ['value'];

function widthStyle(column: TableColumnType): { width: string } | undefined {
  if (column.width === undefined) return undefined;
  return { width: typeof column.width === 'number' ? `${column.width}px` : column.width };
}
</script>

<template>
  <div
    :class="
      cx(
        'sy-table',
        striped && 'sy-table--striped',
        bordered && 'sy-table--bordered',
        loading && 'is-loading',
        $attrs.class as string,
      )
    "
    :aria-busy="loading || undefined"
  >
    <div class="sy-table__scroll">
      <table class="sy-table__table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              :class="
                cx(
                  'sy-table__th',
                  column.align === 'center' && 'sy-table__th--center',
                  column.align === 'right' && 'sy-table__th--right',
                )
              "
              :style="widthStyle(column)"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="data.length === 0">
            <tr>
              <td class="sy-table__td" :colspan="columns.length">
                <div class="sy-table__empty">
                  <slot name="empty">{{ t.noData }}</slot>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(row, index) in data"
              :key="rowKey ? rowKey(row, index) : index"
              class="sy-table__row"
            >
              <td
                v-for="column in columns"
                :key="column.key"
                :class="
                  cx(
                    'sy-table__td',
                    column.align === 'center' && 'sy-table__td--center',
                    column.align === 'right' && 'sy-table__td--right',
                  )
                "
              >
                <component :is="CellContent" :value="cellValue(row, column, index)" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="sy-table__loading">
      <Spinner />
    </div>
  </div>
</template>

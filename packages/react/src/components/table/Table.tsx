import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Spinner } from '../spinner/Spinner';

export interface TableColumn {
  /** Data field of the column. */
  key: string;
  /** Header text of the column. */
  title: string;
  /** Fixed column width; numbers are treated as pixels. */
  width?: number | string;
  /** Cell text alignment. @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** Custom renderer for the cell content. */
  render?: (row: Record<string, unknown>, index: number) => ReactNode;
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /** Column definitions. */
  columns: TableColumn[];
  /** Row data; each cell reads its field from the row object. */
  data: Array<Record<string, unknown>>;
  /** Renders alternating striped rows. */
  striped?: boolean;
  /** Renders borders around all cells. */
  bordered?: boolean;
  /** Shows a loading overlay over the table. */
  loading?: boolean;
  /** Returns the React key of a row; defaults to the row index. */
  rowKey?: (row: Record<string, unknown>, index: number) => string | number;
  /** Content rendered when the table has no rows. @default 'No data' */
  empty?: ReactNode;
}

export const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  {
    columns,
    data,
    striped = false,
    bordered = false,
    loading = false,
    rowKey,
    empty = 'No data',
    className,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'sy-table',
        striped && 'sy-table--striped',
        bordered && 'sy-table--bordered',
        loading && 'is-loading',
        className,
      )}
      aria-busy={loading || undefined}
      {...rest}
    >
      <div className="sy-table__scroll">
        <table className="sy-table__table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cx(
                    'sy-table__th',
                    column.align === 'center' && 'sy-table__th--center',
                    column.align === 'right' && 'sy-table__th--right',
                  )}
                  style={column.width !== undefined ? { width: column.width } : undefined}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="sy-table__td" colSpan={columns.length}>
                  <div className="sy-table__empty">{empty}</div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={rowKey ? rowKey(row, index) : index} className="sy-table__row">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cx(
                        'sy-table__td',
                        column.align === 'center' && 'sy-table__td--center',
                        column.align === 'right' && 'sy-table__td--right',
                      )}
                    >
                      {column.render ? column.render(row, index) : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {loading ? (
        <div className="sy-table__loading">
          <Spinner />
        </div>
      ) : null}
    </div>
  );
});

import { forwardRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon/Icon';

type PageItem = number | 'ellipsis';

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

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current page. Omit for uncontrolled usage. @default 1 */
  page?: number;
  /** Total number of items. */
  total: number;
  /** Items per page. @default 10 */
  pageSize?: number;
  /** Pages rendered on each side of the current page. @default 1 */
  siblingCount?: number;
  /** Disables every pagination control. */
  disabled?: boolean;
  /** Called with the new page when the selection changes. */
  onChange?: (page: number) => void;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  {
    page,
    total,
    pageSize = 10,
    siblingCount = 1,
    disabled = false,
    onChange,
    className,
    ...rest
  },
  ref,
) {
  const [innerPage, setInnerPage] = useState(page ?? 1);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page ?? innerPage, 1), pageCount);
  const items = getPaginationRange(currentPage, pageCount, siblingCount);

  const goTo = (next: number) => {
    const target = Math.min(Math.max(next, 1), pageCount);
    if (disabled || target === currentPage) return;
    if (page === undefined) setInnerPage(target);
    onChange?.(target);
  };

  return (
    <div
      ref={ref}
      className={cx('sy-pagination', disabled && 'is-disabled', className)}
      {...rest}
    >
      <nav className="sy-pagination__nav" aria-label="Pagination">
        <button
          type="button"
          className="sy-pagination__item sy-pagination__item--arrow"
          aria-label="Previous page"
          disabled={disabled || currentPage <= 1}
          onClick={() => goTo(currentPage - 1)}
        >
          <Icon name="chevron-left" />
        </button>
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="sy-pagination__ellipsis">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={cx('sy-pagination__item', item === currentPage && 'is-active')}
              aria-current={item === currentPage ? 'page' : undefined}
              disabled={disabled}
              onClick={() => goTo(item)}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          className="sy-pagination__item sy-pagination__item--arrow"
          aria-label="Next page"
          disabled={disabled || currentPage >= pageCount}
          onClick={() => goTo(currentPage + 1)}
        >
          <Icon name="chevron-right" />
        </button>
      </nav>
    </div>
  );
});

import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';

export interface BreadcrumbItem {
  /** Text shown for the item. */
  label: ReactNode;
  /** Turns the item into a link. */
  href?: string;
  /** Grays out and disables the item. */
  disabled?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Trail of items; the last one is marked as the current page. */
  items?: BreadcrumbItem[];
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items = [], className, ...rest },
  ref,
) {
  const t = useLocale();
  return (
    <nav ref={ref} className={cx('sy-breadcrumb', className)} aria-label={t.breadcrumb} {...rest}>
      <ol className="sy-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content =
            item.href && !isLast && !item.disabled ? (
              <a className="sy-breadcrumb__link" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span className="sy-breadcrumb__label">{item.label}</span>
            );
          return (
            <li
              key={index}
              className={cx(
                'sy-breadcrumb__item',
                isLast && 'is-current',
                item.disabled && 'is-disabled',
              )}
              aria-current={isLast ? 'page' : undefined}
            >
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

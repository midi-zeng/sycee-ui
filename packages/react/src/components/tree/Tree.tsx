import { forwardRef, useCallback, useMemo, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';

export interface TreeNodeData {
  /** Unique key of the node. */
  key: string | number;
  /** Label shown next to the chevron. */
  label: string;
  /** Child nodes; a leaf has none. */
  children?: TreeNodeData[];
  /** Prevents selecting/checking this node and its descendants. */
  disabled?: boolean;
}

export interface TreeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  /** Tree source data. */
  data: TreeNodeData[];
  /** Shows a checkbox on every node. @default false */
  checkable?: boolean;
  /** Allows selecting a single node (highlight + onSelect). @default true */
  selectable?: boolean;
  /** Uncontrolled initial expanded keys. @default [] */
  defaultExpandedKeys?: Array<string | number>;
  /** Controlled expanded keys. */
  expandedKeys?: Array<string | number>;
  /** Called when the expanded keys change. */
  onExpandedChange?: (keys: Array<string | number>) => void;
  /** Uncontrolled initial checked keys. @default [] */
  defaultCheckedKeys?: Array<string | number>;
  /** Controlled checked keys. */
  checkedKeys?: Array<string | number>;
  /** Called when the checked keys change (cascade: descendants included). */
  onCheckedChange?: (keys: Array<string | number>) => void;
  /** Uncontrolled initially selected key. */
  defaultSelectedKey?: string | number | null;
  /** Controlled selected key. */
  selectedKey?: string | number | null;
  /** Called when the selected node changes. */
  onSelect?: (key: string | number | null) => void;
}

interface NodeRenderProps {
  node: TreeNodeData;
  depth: number;
}

// Collect all descendant keys of a node (excluding the node itself).
function collectChildKeys(node: TreeNodeData): Array<string | number> {
  const keys: Array<string | number> = [];
  for (const child of node.children ?? []) {
    keys.push(child.key);
    keys.push(...collectChildKeys(child));
  }
  return keys;
}

export const Tree = forwardRef<HTMLDivElement, TreeProps>(function Tree(
  {
    data,
    checkable = false,
    selectable = true,
    defaultExpandedKeys = [],
    expandedKeys,
    onExpandedChange,
    defaultCheckedKeys = [],
    checkedKeys,
    onCheckedChange,
    defaultSelectedKey = null,
    selectedKey,
    onSelect,
    className,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const [innerExpanded, setInnerExpanded] = useState<Array<string | number>>(defaultExpandedKeys);
  const [innerChecked, setInnerChecked] = useState<Array<string | number>>(defaultCheckedKeys);
  const [innerSelected, setInnerSelected] = useState<string | number | null>(defaultSelectedKey);

  const expanded = expandedKeys ?? innerExpanded;
  const checked = checkedKeys ?? innerChecked;
  const selected = selectedKey ?? innerSelected;

  const expandedSet = useMemo(() => new Set(expanded), [expanded]);
  const checkedSet = useMemo(() => new Set(checked), [checked]);

  const toggleExpanded = useCallback(
    (key: string | number) => {
      const next = expandedSet.has(key)
        ? expanded.filter((entry) => entry !== key)
        : [...expanded, key];
      if (expandedKeys === undefined) setInnerExpanded(next);
      onExpandedChange?.(next);
    },
    [expanded, expandedKeys, expandedSet, onExpandedChange],
  );

  // Checking a node cascades down; a parent shows checked when all of its
  // enabled children are checked.
  const toggleChecked = useCallback(
    (node: TreeNodeData) => {
      const isOn = checkedSet.has(node.key);
      const affected = new Set<string | number>([node.key, ...collectChildKeys(node)]);
      const next = isOn
        ? checked.filter((entry) => !affected.has(entry))
        : [...checked, ...Array.from(affected).filter((entry) => !checkedSet.has(entry))];
      if (checkedKeys === undefined) setInnerChecked(next);
      onCheckedChange?.(next);
    },
    [checked, checkedKeys, checkedSet, onCheckedChange],
  );

  const isParentChecked = useCallback(
    (node: TreeNodeData): boolean => {
      const children = node.children ?? [];
      if (children.length === 0) return checkedSet.has(node.key);
      return children.every((child) => (child.disabled ? true : isParentChecked(child)));
    },
    [checkedSet],
  );

  const isParentIndeterminate = useCallback(
    (node: TreeNodeData): boolean => {
      const children = node.children ?? [];
      if (children.length === 0 || !checkable) return false;
      const some = children.some(
        (child) => !child.disabled && (isParentIndeterminate(child) || checkedSet.has(child.key)),
      );
      return some && !isParentChecked(node);
    },
    [checkable, checkedSet, isParentChecked],
  );

  const select = useCallback(
    (node: TreeNodeData) => {
      if (!selectable || node.disabled) return;
      const next = selected === node.key ? null : node.key;
      if (selectedKey === undefined) setInnerSelected(next);
      onSelect?.(next);
    },
    [selectable, selected, selectedKey, onSelect],
  );

  const renderNode = ({ node, depth }: NodeRenderProps) => {
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isExpanded = expandedSet.has(node.key);
    const nodeChecked = isParentChecked(node);
    const indeterminate = isParentIndeterminate(node);
    return (
      <div className="sy-tree__group" key={node.key}>
        <div
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={selectable && selected === node.key}
          aria-disabled={node.disabled || undefined}
          aria-checked={checkable ? (indeterminate ? 'mixed' : nodeChecked) : undefined}
          className={cx(
            'sy-tree__node',
            selectable && selected === node.key && 'is-selected',
            node.disabled && 'is-disabled',
          )}
          style={{ '--sy-tree-depth': depth } as React.CSSProperties}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              select(node);
            } else if (event.key === 'ArrowRight' && hasChildren && !isExpanded) {
              toggleExpanded(node.key);
            } else if (event.key === 'ArrowLeft' && isExpanded) {
              toggleExpanded(node.key);
            }
          }}
        >
          <span className="sy-tree__indent" />
          <button
            type="button"
            className={cx('sy-tree__arrow', isExpanded && 'is-expanded', !hasChildren && 'is-hidden')}
            aria-label={isExpanded ? t.collapse(node.label) : t.expand(node.label)}
            tabIndex={-1}
            disabled={node.disabled || !hasChildren}
            onClick={(event) => {
              event.stopPropagation();
              if (hasChildren && !node.disabled) toggleExpanded(node.key);
            }}
          >
            <Icon name="chevron-right" />
          </button>
          {checkable ? (
            <input
              type="checkbox"
              className="sy-tree__checkbox sy-checkbox__native"
              aria-label={t.check(node.label)}
              tabIndex={-1}
              disabled={node.disabled}
              checked={nodeChecked}
              ref={(element) => {
                if (element) element.indeterminate = indeterminate;
              }}
              onChange={() => {
                if (!node.disabled) toggleChecked(node);
              }}
              onClick={(event) => event.stopPropagation()}
            />
          ) : null}
          <span className="sy-tree__label">{node.label}</span>
        </div>
        {hasChildren && isExpanded ? (
          <div className="sy-tree__group" role="group">
            {node.children!.map((child) => renderNode({ node: child, depth: depth + 1 }))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div ref={ref} className={cx('sy-tree', className)} role="tree" {...rest}>
      {data.map((node) => renderNode({ node, depth: 0 }))}
    </div>
  );
});

<script setup lang="ts">
import { getCurrentInstance, provide, ref } from 'vue';
import { cx } from '../../utils/cx';
import TreeItem from './TreeItem.vue';
import { TREE_CONTEXT_KEY } from './context';
import type { TreeNodeData, TreeContextValue } from './context';

defineOptions({ name: 'SyTree' });

export type { TreeNodeData };

interface Props {
  /** Tree source data. */
  data: TreeNodeData[];
  /** Shows a checkbox on every node. @default false */
  checkable?: boolean;
  /** Allows selecting a single node (highlight + select event). @default true */
  selectable?: boolean;
}

const {
  data,
  checkable = false,
  selectable = true,
} = defineProps<Props>();

const model = defineModel<Array<string | number> | null>();

const emit = defineEmits<{
  expandedChange: [keys: Array<string | number>];
  checkedChange: [keys: Array<string | number>];
  select: [key: string | number | null];
}>();

const instance = getCurrentInstance();
const hasExpandedListener = instance?.vnode.props?.onExpandedChange !== undefined;
const hasCheckedListener = instance?.vnode.props?.onCheckedChange !== undefined;
const hasSelectListener = instance?.vnode.props?.onSelect !== undefined;

const expandedKeys = ref<Set<string | number>>(new Set());
const checkedKeys = ref<Set<string | number>>(new Set());
const selectedKey = ref<string | number | null>(null);

function toggleExpanded(node: TreeNodeData) {
  if (!node.children?.length || node.disabled) return;
  const next = new Set(expandedKeys.value);
  if (next.has(node.key)) next.delete(node.key);
  else next.add(node.key);
  expandedKeys.value = next;
  model.value = [...next];
  if (hasExpandedListener) emit('expandedChange', [...next]);
}

/** Collects all descendant keys of a node (excluding the node itself). */
function collectChildKeys(node: TreeNodeData): Array<string | number> {
  const keys: Array<string | number> = [];
  for (const child of node.children ?? []) {
    keys.push(child.key);
    keys.push(...collectChildKeys(child));
  }
  return keys;
}

function isChecked(node: TreeNodeData): boolean {
  const children = node.children ?? [];
  if (children.length === 0) return checkedKeys.value.has(node.key);
  // A parent shows checked when all of its enabled children are checked.
  return children.every((child) => child.disabled || isChecked(child));
}

function isIndeterminate(node: TreeNodeData): boolean {
  if (!checkable) return false;
  const children = node.children ?? [];
  if (children.length === 0) return false;
  const some = children.some(
    (child) => !child.disabled && (isIndeterminate(child) || checkedKeys.value.has(child.key)),
  );
  return some && !isChecked(node);
}

function toggleChecked(node: TreeNodeData) {
  if (node.disabled) return;
  const affected = new Set<string | number>([node.key, ...collectChildKeys(node)]);
  const next = new Set(checkedKeys.value);
  if (next.has(node.key)) {
    for (const key of affected) next.delete(key);
  } else {
    for (const key of affected) next.add(key);
  }
  checkedKeys.value = next;
  if (hasCheckedListener) emit('checkedChange', [...next]);
}

function select(node: TreeNodeData) {
  if (!selectable || node.disabled) return;
  selectedKey.value = selectedKey.value === node.key ? null : node.key;
  if (hasSelectListener) emit('select', selectedKey.value);
}

function onNodeKeydown(event: KeyboardEvent, node: TreeNodeData) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    select(node);
  } else if (event.key === 'ArrowRight' && node.children?.length && !expandedKeys.value.has(node.key)) {
    toggleExpanded(node);
  } else if (event.key === 'ArrowLeft' && expandedKeys.value.has(node.key)) {
    toggleExpanded(node);
  }
}

provide<TreeContextValue>(TREE_CONTEXT_KEY, {
  checkable,
  selectable,
  expandedKeys,
  selectedKey,
  isChecked,
  isIndeterminate,
  toggleExpanded,
  toggleChecked,
  select,
  onNodeKeydown,
});
</script>

<template>
  <div :class="cx('sy-tree', $attrs.class as string)" role="tree">
    <TreeItem v-for="node in data" :key="node.key" :node="node" :depth="0" />
  </div>
</template>

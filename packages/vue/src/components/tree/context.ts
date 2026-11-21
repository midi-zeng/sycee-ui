import type { InjectionKey, Ref } from 'vue';

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

export interface TreeContextValue {
  checkable: boolean;
  selectable: boolean;
  expandedKeys: Ref<Set<string | number>>;
  selectedKey: Ref<string | number | null>;
  /** A parent shows checked when all of its enabled children are checked. */
  isChecked: (node: TreeNodeData) => boolean;
  isIndeterminate: (node: TreeNodeData) => boolean;
  toggleExpanded: (node: TreeNodeData) => void;
  toggleChecked: (node: TreeNodeData) => void;
  select: (node: TreeNodeData) => void;
  onNodeKeydown: (event: KeyboardEvent, node: TreeNodeData) => void;
}

export const TREE_CONTEXT_KEY: InjectionKey<TreeContextValue> = Symbol('sy-tree-context');

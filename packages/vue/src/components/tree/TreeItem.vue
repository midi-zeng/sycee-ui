<script setup lang="ts">
import { computed, inject } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';
import { TREE_CONTEXT_KEY } from './context';
import type { TreeNodeData, TreeContextValue } from './context';

defineOptions({ name: 'SyTreeItem' });

interface Props {
  node: TreeNodeData;
  depth: number;
}

const props = defineProps<Props>();

const context = inject<TreeContextValue | null>(TREE_CONTEXT_KEY, null);
const t = useLocale();
if (!context) {
  throw new Error('SyTreeItem must be rendered inside a SyTree component.');
}

const hasChildren = computed(() => (props.node.children?.length ?? 0) > 0);
const isExpanded = computed(() => context.expandedKeys.value.has(props.node.key));
const nodeChecked = computed(() => context.isChecked(props.node));
const indeterminate = computed(() => context.isIndeterminate(props.node));
const isSelected = computed(
  () => context.selectable && context.selectedKey.value === props.node.key,
);
</script>

<template>
  <div
    :class="
      cx(
        'sy-tree__node',
        isSelected && 'is-selected',
        props.node.disabled && 'is-disabled',
      )
    "
    role="treeitem"
    :aria-expanded="hasChildren ? isExpanded : undefined"
    :aria-selected="isSelected"
    :aria-disabled="props.node.disabled || undefined"
    :aria-checked="context.checkable ? (indeterminate ? 'mixed' : nodeChecked) : undefined"
    :style="{ '--sy-tree-depth': depth }"
    tabindex="0"
    @keydown="context.onNodeKeydown($event, node)"
  >
    <span class="sy-tree__indent" />
    <button
      type="button"
      :class="cx('sy-tree__arrow', isExpanded && 'is-expanded', !hasChildren && 'is-hidden')"
      :aria-label="isExpanded ? t.collapse(node.label) : t.expand(node.label)"
      tabindex="-1"
      :disabled="props.node.disabled || !hasChildren"
      @click.stop="context.toggleExpanded(node)"
    >
      <Icon name="chevron-right" />
    </button>
    <input
      v-if="context.checkable"
      type="checkbox"
      class="sy-tree__checkbox sy-checkbox__native"
      :aria-label="t.check(node.label)"
      tabindex="-1"
      :disabled="props.node.disabled"
      :checked="nodeChecked"
      :indeterminate="indeterminate"
      @click.stop
      @change="context.toggleChecked(node)"
    />
    <span class="sy-tree__label">{{ node.label }}</span>
  </div>
  <div v-if="hasChildren && isExpanded" class="sy-tree__group" role="group">
    <TreeItem v-for="child in node.children" :key="child.key" :node="child" :depth="depth + 1" />
  </div>
</template>

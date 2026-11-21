<script setup lang="ts">
import { computed, inject } from 'vue';
import { cx } from '../../utils/cx';
import Icon from '../icon/Icon.vue';
import { COLLAPSE_CONTEXT_KEY } from './context';
import type { CollapseContextValue } from './context';

defineOptions({ name: 'SyCollapseItem' });

interface Props {
  /** Unique key of this item; referenced by the collapse open keys. */
  name: string | number;
  /** Title shown in the clickable header. */
  title?: string;
  /** Prevents the item from being toggled. */
  disabled?: boolean;
}

const { name, title, disabled = false } = defineProps<Props>();

const context = inject<CollapseContextValue | null>(COLLAPSE_CONTEXT_KEY, null);

// The context is guaranteed when rendered inside a Collapse; keep a non-null
// binding so closures and the template can use it without narrowing issues.
const ctx = context as CollapseContextValue;
if (!ctx) {
  throw new Error('SyCollapseItem must be rendered inside a SyCollapse component.');
}

const isOpen = computed(() => ctx.openKeys.has(name));
const headerId = `${ctx.headerBaseId}-header-${name}`;
const contentId = `${ctx.headerBaseId}-content-${name}`;

function toggle() {
  if (disabled) return;
  ctx.toggle(name);
}
</script>

<template>
  <div
    :class="
      cx(
        'sy-collapse__item',
        isOpen && 'is-open',
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
  >
    <button
      type="button"
      :id="headerId"
      class="sy-collapse__header"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      :aria-disabled="disabled || undefined"
      :disabled="disabled"
      @click="toggle"
    >
      <slot name="title">{{ title }}</slot>
      <Icon name="chevron-down" />
    </button>
    <div :id="contentId" class="sy-collapse__content" role="region" :aria-labelledby="headerId">
      <div v-if="isOpen && $slots.default" class="sy-collapse__body">
        <slot />
      </div>
    </div>
  </div>
</template>

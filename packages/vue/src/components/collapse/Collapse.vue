<script setup lang="ts">
import { computed, getCurrentInstance, provide, useId } from 'vue';
import { cx } from '../../utils/cx';
import { COLLAPSE_CONTEXT_KEY } from './context';
import type { CollapseContextValue } from './context';

defineOptions({ name: 'SyCollapse' });

interface Props {
  /** Uncontrolled initial open items. @default [] */
  defaultOpenKeys?: Array<string | number>;
  /** Only one item can be open at a time. @default false */
  accordion?: boolean;
}

const { defaultOpenKeys = [], accordion = false } = defineProps<Props>();

const emit = defineEmits<{ openChange: [openKeys: Array<string | number>] }>();

const instance = getCurrentInstance();
const hasOpenChangeListener = instance?.vnode.props?.onOpenChange !== undefined;

const model = defineModel<Array<string | number>>();

const keys = computed(() => model.value ?? defaultOpenKeys);

const headerBaseId = useId();

function toggle(name: string | number) {
  let next: Array<string | number>;
  if (accordion) {
    next = keys.value.includes(name) ? [] : [name];
  } else {
    next = keys.value.includes(name)
      ? keys.value.filter((key) => key !== name)
      : [...keys.value, name];
  }
  model.value = next;
  if (hasOpenChangeListener) emit('openChange', next);
}

provide<CollapseContextValue>(COLLAPSE_CONTEXT_KEY, {
  get openKeys() {
    return new Set(keys.value);
  },
  accordion,
  toggle,
  headerBaseId,
});
</script>

<template>
  <div :class="cx('sy-collapse', $attrs.class as string)">
    <slot />
  </div>
</template>

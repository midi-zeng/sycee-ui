<script setup lang="ts">
import { computed, ref } from 'vue';
import { Checkbox } from '@sycee-ui/vue';

const items = ['Apple', 'Banana', 'Cherry'];
const selected = ref<string[]>(['Apple']);

const allSelected = computed(() => selected.value.length === items.length);
const someSelected = computed(() => selected.value.length > 0 && !allSelected.value);

function toggleAll(checked: boolean) {
  selected.value = checked ? [...items] : [];
}

function toggleItem(item: string, checked: boolean) {
  selected.value = checked
    ? [...selected.value, item]
    : selected.value.filter((entry) => entry !== item);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Checkbox
      :model-value="allSelected"
      :indeterminate="someSelected"
      label="Select all"
      @change="toggleAll"
    />
    <Checkbox
      v-for="item in items"
      :key="item"
      :model-value="selected.includes(item)"
      :label="item"
      @change="(checked) => toggleItem(item, checked)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Tag } from '@sycee-ui/vue';

const skills = ref(['Vue', 'React', 'TypeScript']);

function remove(skill: string) {
  skills.value = skills.value.filter((item) => item !== skill);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
      <Tag v-for="skill in skills" :key="skill" color="primary" closable @close="remove(skill)">
        {{ skill }}
      </Tag>
      <span v-if="skills.length === 0" style="color: var(--sy-color-text-tertiary)">
        All tags removed — reload the page to reset
      </span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
      <Tag size="sm" closable>Small</Tag>
      <Tag closable>Medium</Tag>
      <Tag closable disabled>Disabled</Tag>
      <Tag color="success">
        <template #icon>
          <Icon name="check" />
        </template>
        With icon
      </Tag>
    </div>
  </div>
</template>

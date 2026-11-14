<script setup lang="ts">
import { h } from 'vue';
import type { VNodeChild } from 'vue';
import { Table, Tag } from '@sycee-ui/vue';
import type { TableColumn } from '@sycee-ui/vue';

type Person = {
  name: string;
  age: number;
  status: 'active' | 'inactive';
  salary: number;
  email: string;
};

// Same shape as TableColumnType from Table.vue: the base column plus render.
interface Column extends TableColumn {
  render?: (row: Record<string, unknown>, index: number) => VNodeChild;
}

const columns: Column[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age', align: 'center' },
  {
    key: 'status',
    title: 'Status',
    render: (row) =>
      h(Tag, { color: row.status === 'active' ? 'success' : 'danger' }, () => String(row.status)),
  },
  {
    key: 'salary',
    title: 'Salary',
    align: 'right',
    render: (row) => `$${Number(row.salary).toLocaleString('en-US')}`,
  },
  { key: 'email', title: 'Email' },
];

const people: Person[] = [
  { name: 'Ada Lovelace', age: 36, status: 'active', salary: 86000, email: 'ada@example.com' },
  { name: 'Grace Hopper', age: 45, status: 'active', salary: 94000, email: 'grace@example.com' },
  { name: 'Alan Turing', age: 41, status: 'inactive', salary: 78000, email: 'alan@example.com' },
  {
    name: 'Katherine Johnson',
    age: 38,
    status: 'active',
    salary: 89000,
    email: 'katherine@example.com',
  },
];
</script>

<template>
  <Table :columns="columns" :data="people" />
</template>

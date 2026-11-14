<script setup lang="ts">
import { Table } from '@sycee-ui/vue';
import type { TableColumn } from '@sycee-ui/vue';

type Person = {
  name: string;
  age: number;
  email: string;
};

const columns: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age', align: 'center' },
  { key: 'email', title: 'Email' },
];

const people: Person[] = [
  { name: 'Ada Lovelace', age: 36, email: 'ada@example.com' },
  { name: 'Grace Hopper', age: 45, email: 'grace@example.com' },
  { name: 'Alan Turing', age: 41, email: 'alan@example.com' },
  { name: 'Katherine Johnson', age: 38, email: 'katherine@example.com' },
];
</script>

<template>
  <Table :columns="columns" :data="people" />
</template>

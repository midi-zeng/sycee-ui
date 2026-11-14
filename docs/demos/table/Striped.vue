<script setup lang="ts">
import { Table } from '@sycee-ui/vue';
import type { TableColumn } from '@sycee-ui/vue';

const columns: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { key: 'team', title: 'Team' },
];

const people = [
  { name: 'Ada Lovelace', role: 'Maintainer', team: 'Core' },
  { name: 'Grace Hopper', role: 'Reviewer', team: 'Compiler' },
  { name: 'Alan Turing', role: 'Contributor', team: 'Runtime' },
  { name: 'Katherine Johnson', role: 'Contributor', team: 'Docs' },
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <Table :columns="columns" :data="people" striped />
    <Table :columns="columns" :data="people" bordered />
    <Table :columns="columns" :data="people" striped bordered />
  </div>
</template>

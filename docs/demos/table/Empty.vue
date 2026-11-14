<script setup lang="ts">
import { Table } from '@sycee-ui/vue';
import type { TableColumn } from '@sycee-ui/vue';

const columns: TableColumn[] = [
  { key: 'invoice', title: 'Invoice' },
  { key: 'amount', title: 'Amount', align: 'right' },
];

const data: Array<Record<string, unknown>> = [];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <Table :columns="columns" :data="data" />
    <Table :columns="columns" :data="data">
      <template #empty>
        <span>No invoices yet — create your first one.</span>
      </template>
    </Table>
  </div>
</template>

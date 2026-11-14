import { Table } from '@sycee-ui/react';
import type { TableColumn } from '@sycee-ui/react';

const COLUMNS: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age', align: 'center' },
  { key: 'email', title: 'Email' },
];

const PEOPLE = [
  { name: 'Ada Lovelace', age: 36, email: 'ada@example.com' },
  { name: 'Grace Hopper', age: 45, email: 'grace@example.com' },
  { name: 'Alan Turing', age: 41, email: 'alan@example.com' },
];

export default function Loading() {
  return <Table columns={COLUMNS} data={PEOPLE} loading />;
}

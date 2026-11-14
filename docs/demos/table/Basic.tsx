import { Table } from '@sycee-ui/react';
import type { TableColumn } from '@sycee-ui/react';

type Person = {
  name: string;
  age: number;
  email: string;
};

const COLUMNS: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age', align: 'center' },
  { key: 'email', title: 'Email' },
];

const PEOPLE: Person[] = [
  { name: 'Ada Lovelace', age: 36, email: 'ada@example.com' },
  { name: 'Grace Hopper', age: 45, email: 'grace@example.com' },
  { name: 'Alan Turing', age: 41, email: 'alan@example.com' },
  { name: 'Katherine Johnson', age: 38, email: 'katherine@example.com' },
];

export default function Basic() {
  return <Table columns={COLUMNS} data={PEOPLE} />;
}

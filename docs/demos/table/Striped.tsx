import { Table } from '@sycee-ui/react';
import type { TableColumn } from '@sycee-ui/react';

const COLUMNS: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { key: 'team', title: 'Team' },
];

const PEOPLE = [
  { name: 'Ada Lovelace', role: 'Maintainer', team: 'Core' },
  { name: 'Grace Hopper', role: 'Reviewer', team: 'Compiler' },
  { name: 'Alan Turing', role: 'Contributor', team: 'Runtime' },
  { name: 'Katherine Johnson', role: 'Contributor', team: 'Docs' },
];

export default function Striped() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Table columns={COLUMNS} data={PEOPLE} striped />
      <Table columns={COLUMNS} data={PEOPLE} bordered />
      <Table columns={COLUMNS} data={PEOPLE} striped bordered />
    </div>
  );
}

import { Table } from '@sycee-ui/react';
import type { TableColumn } from '@sycee-ui/react';

const COLUMNS: TableColumn[] = [
  { key: 'invoice', title: 'Invoice' },
  { key: 'amount', title: 'Amount', align: 'right' },
];

const DATA: Array<Record<string, unknown>> = [];

export default function Empty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Table columns={COLUMNS} data={DATA} />
      <Table
        columns={COLUMNS}
        data={DATA}
        empty={<span>No invoices yet — create your first one.</span>}
      />
    </div>
  );
}

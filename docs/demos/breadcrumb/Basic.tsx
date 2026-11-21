import { Breadcrumb } from '@sycee-ui/react';

const ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Library', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb' },
];

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Breadcrumb items={ITEMS} />
      <Breadcrumb
        items={[
          { label: 'Settings' },
          { label: 'Billing', disabled: true },
          { label: 'Invoices' },
        ]}
      />
    </div>
  );
}

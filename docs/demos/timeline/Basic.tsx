import { Timeline } from '@sycee-ui/react';

const ITEMS = [
  { title: 'Order placed', description: 'Today, 09:12', color: 'primary' as const },
  { title: 'Shipped', description: 'Today, 14:30' },
  { title: 'Delivered', description: 'Tomorrow, before 18:00', color: 'warning' as const },
  { title: 'Cancelled entry', description: 'Disabled state marker', color: 'danger' as const },
];

export default function Basic() {
  return <Timeline items={ITEMS} style={{ maxWidth: 360 }} />;
}

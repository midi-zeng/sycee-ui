import { Tabs } from '@sycee-ui/react';

const ITEMS = [
  { label: 'Coffee', value: 'coffee', content: 'Espresso, filter and cold brew.' },
  { label: 'Tea', value: 'tea', content: 'Green, black and oolong.' },
  { label: 'Pastry', value: 'pastry', content: 'Croissants and cinnamon buns.' },
];

export default function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs size="sm" items={ITEMS} />
      <Tabs items={ITEMS} />
      <Tabs size="lg" items={ITEMS} />
    </div>
  );
}

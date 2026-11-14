import { useState } from 'react';
import { Tabs } from '@sycee-ui/react';

const ITEMS = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

export default function Controlled() {
  const [active, setActive] = useState<string | number>('week');
  const [lastChange, setLastChange] = useState('Pick a range');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Tabs
        items={ITEMS}
        active={active}
        onChange={(value) => {
          setActive(value);
          setLastChange(`onChange fired with "${String(value)}"`);
        }}
      />
      <p style={{ margin: 0, color: 'var(--sy-color-text-tertiary)' }}>
        Active: <strong>{String(active)}</strong> — {lastChange}
      </p>
    </div>
  );
}

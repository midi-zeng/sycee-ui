import { useState } from 'react';
import { RadioGroup } from '@sycee-ui/react';

const OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large (out of stock)', value: 'lg', disabled: true },
];

export default function Group() {
  const [size, setSize] = useState<string | number | null>('md');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RadioGroup value={size} options={OPTIONS} onChange={setSize} />
      <RadioGroup value={size} options={OPTIONS} disabled />
      <p style={{ margin: 0, color: 'var(--sy-color-text-tertiary)' }}>Selected: {size}</p>
    </div>
  );
}

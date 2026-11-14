import { useState } from 'react';
import { Select } from '@sycee-ui/react';

const FRAMEWORKS = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
];

export default function Basic() {
  const [picked, setPicked] = useState<string | number | null>(null);

  return (
    <div style={{ maxWidth: 280 }}>
      <Select value={picked} onChange={setPicked} options={FRAMEWORKS} placeholder="Choose a framework" />
      <p style={{ margin: '8px 0 0', color: 'var(--sy-color-text-tertiary)' }}>
        Value: {picked ?? 'none'}
      </p>
    </div>
  );
}

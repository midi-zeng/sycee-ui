import { useState } from 'react';
import { Select } from '@sycee-ui/react';

const FRAMEWORKS = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
];

export default function Clearable() {
  const [picked, setPicked] = useState<string | number | null>('vue');

  return (
    <div style={{ maxWidth: 280 }}>
      <Select
        value={picked}
        onChange={setPicked}
        options={FRAMEWORKS}
        clearable
        placeholder="Clearable"
      />
      <p style={{ margin: '8px 0 0', color: 'var(--sy-color-text-tertiary)' }}>
        Value: {picked ?? 'none'}
      </p>
    </div>
  );
}

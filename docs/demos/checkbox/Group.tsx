import { useState } from 'react';
import { CheckboxGroup } from '@sycee-ui/react';

const OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
];

export default function Group() {
  const [picked, setPicked] = useState<string[]>(['react']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CheckboxGroup value={picked} options={OPTIONS} onChange={setPicked} />
      <CheckboxGroup value={picked} options={OPTIONS} disabled />
      <p style={{ margin: 0, color: 'var(--sy-color-text-tertiary)' }}>
        Selected: {picked.join(', ') || 'none'}
      </p>
    </div>
  );
}

import { useState } from 'react';
import { Cascader } from '@sycee-ui/react';
import type { CascaderOption } from '@sycee-ui/react';

const OPTIONS: CascaderOption[] = [
  {
    label: 'Engineering',
    value: 'eng',
    children: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      {
        label: 'Platform',
        value: 'platform',
        children: [
          { label: 'Infra', value: 'infra' },
          { label: 'Tooling', value: 'tooling' },
        ],
      },
    ],
  },
  {
    label: 'Design',
    value: 'design',
    children: [
      { label: 'Product', value: 'product' },
      { label: 'Brand', value: 'brand' },
    ],
  },
  { label: 'Disabled branch', value: 'off', disabled: true },
];

export default function Basic() {
  const [value, setValue] = useState<Array<string | number> | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
      <Cascader value={value} onChange={setValue} options={OPTIONS} placeholder="Pick a team" clearable />
      <p style={{ margin: 0, fontSize: 13 }}>Path: {value?.join(' / ') ?? '—'}</p>
    </div>
  );
}

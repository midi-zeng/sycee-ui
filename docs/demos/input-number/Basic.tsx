import { useState } from 'react';
import { InputNumber } from '@sycee-ui/react';

export default function Basic() {
  const [value, setValue] = useState<number | null>(2);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 220 }}>
      <InputNumber value={value} onChange={setValue} min={0} max={10} step={0.5} precision={1} />
      <InputNumber placeholder="Disabled" disabled />
    </div>
  );
}

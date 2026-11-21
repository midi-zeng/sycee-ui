import { useState } from 'react';
import { Rate } from '@sycee-ui/react';

export default function Basic() {
  const [value, setValue] = useState(3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Rate value={value} onChange={setValue} />
      <Rate value={4} readonly />
      <Rate value={2} disabled />
    </div>
  );
}

import { useState } from 'react';
import { Pagination } from '@sycee-ui/react';

export default function Basic() {
  const [lastChange, setLastChange] = useState('Click a page or use the arrows');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Pagination total={50} onChange={(page) => setLastChange(`onChange fired with page ${page}`)} />
      <p style={{ margin: 0, color: 'var(--sy-color-text-tertiary)' }}>{lastChange}</p>
    </div>
  );
}

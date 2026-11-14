import { useState } from 'react';
import { Input } from '@sycee-ui/react';

export default function Basic() {
  const [value, setValue] = useState('');

  return (
    <div style={{ maxWidth: 320 }}>
      <Input value={value} onChange={setValue} placeholder="Enter your name" />
      <p style={{ margin: '8px 0 0', color: 'var(--sy-color-text-tertiary)' }}>
        Value: {value || '(empty)'}
      </p>
    </div>
  );
}

import { useState } from 'react';
import { Textarea } from '@sycee-ui/react';

export default function Basic() {
  const [bio, setBio] = useState('');

  return (
    <div style={{ maxWidth: 360 }}>
      <Textarea value={bio} onChange={setBio} placeholder="Tell us about yourself" />
      <p style={{ margin: '8px 0 0', color: 'var(--sy-color-text-tertiary)' }}>
        Value: {bio || '(empty)'}
      </p>
    </div>
  );
}

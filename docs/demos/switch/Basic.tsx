import { useState } from 'react';
import { Switch } from '@sycee-ui/react';

export default function Basic() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Switch checked={enabled} onChange={setEnabled} />
      <span style={{ color: 'var(--sy-color-text-tertiary)' }}>{enabled ? 'On' : 'Off'}</span>
    </div>
  );
}

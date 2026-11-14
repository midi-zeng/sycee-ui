import { useState } from 'react';
import { Input } from '@sycee-ui/react';

export default function States() {
  const [small, setSmall] = useState('');
  const [medium, setMedium] = useState('');
  const [large, setLarge] = useState('');
  const [withError, setWithError] = useState('');
  const [withWarning, setWithWarning] = useState('');
  const [locked] = useState('Can be selected but not edited');
  const [off] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input size="sm" value={small} onChange={setSmall} placeholder="Small" />
      <Input value={medium} onChange={setMedium} placeholder="Medium (default)" />
      <Input size="lg" value={large} onChange={setLarge} placeholder="Large" />
      <Input status="error" value={withError} onChange={setWithError} placeholder="Error state" />
      <Input
        status="warning"
        value={withWarning}
        onChange={setWithWarning}
        placeholder="Warning state"
      />
      <Input value={locked} readOnly />
      <Input value={off} disabled placeholder="Disabled" />
    </div>
  );
}

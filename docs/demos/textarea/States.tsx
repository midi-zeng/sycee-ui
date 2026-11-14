import { useState } from 'react';
import { Textarea } from '@sycee-ui/react';

export default function States() {
  const [tall, setTall] = useState('');
  const [withError, setWithError] = useState('');
  const [withWarning, setWithWarning] = useState('');
  const [locked] = useState('Can be selected but not edited');
  const [off] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Textarea value={tall} onChange={setTall} rows={6} placeholder="Six rows tall" />
      <Textarea
        value={withError}
        onChange={setWithError}
        status="error"
        placeholder="Error state"
      />
      <Textarea
        value={withWarning}
        onChange={setWithWarning}
        status="warning"
        placeholder="Warning state"
      />
      <Textarea value={locked} readOnly />
      <Textarea value={off} disabled placeholder="Disabled" />
    </div>
  );
}

import { useState } from 'react';
import { Textarea } from '@sycee-ui/react';

export default function ShowCount() {
  const [free, setFree] = useState('Sycee UI works with Vue and React.');
  const [limited, setLimited] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Textarea
        value={free}
        onChange={setFree}
        showCount
        rows={2}
        placeholder="Count without a limit"
      />
      <Textarea
        value={limited}
        onChange={setLimited}
        showCount
        maxLength={100}
        rows={4}
        placeholder="Count with maxLength=100"
      />
    </div>
  );
}

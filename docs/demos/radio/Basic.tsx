import { useState } from 'react';
import { Radio } from '@sycee-ui/react';

export default function Basic() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio checked={first} onChange={setFirst} label="Standalone radio" />
      <Radio checked={second} onChange={setSecond}>Slot label</Radio>
      <Radio label="Locked by your administrator" disabled />
    </div>
  );
}

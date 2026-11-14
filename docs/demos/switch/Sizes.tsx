import { useState } from 'react';
import { Switch } from '@sycee-ui/react';

export default function Sizes() {
  const [smOn, setSmOn] = useState(false);
  const [mdOn, setMdOn] = useState(true);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Switch size="sm" checked={smOn} onChange={setSmOn} />
      <Switch checked={mdOn} onChange={setMdOn} />
    </div>
  );
}

import { useState } from 'react';
import { Slider } from '@sycee-ui/react';

export default function Basic() {
  const [value, setValue] = useState(40);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Slider value={value} onChange={setValue} min={0} max={100} step={1} />
      <p style={{ margin: 0, fontSize: 13 }}>Value: {value}</p>
      <Slider value={70} disabled />
    </div>
  );
}

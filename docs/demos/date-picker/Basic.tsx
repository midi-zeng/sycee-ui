import { useState } from 'react';
import { DatePicker } from '@sycee-ui/react';

export default function Basic() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <DatePicker value={value} onChange={setValue} placeholder="Pick a date" />
      <DatePicker placeholder="Week starts on Monday" weekStartsOn={1} />
      <DatePicker placeholder="Restricted range" min="2026-11-01" max="2026-11-30" disabled />
    </div>
  );
}

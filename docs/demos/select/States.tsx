import { useState } from 'react';
import { Select } from '@sycee-ui/react';

const PLANS = [
  { label: 'Hobby', value: 'hobby' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise (contact us)', value: 'enterprise', disabled: true },
];

export default function States() {
  const [small, setSmall] = useState<string | number | null>(null);
  const [medium, setMedium] = useState<string | number | null>(null);
  const [large, setLarge] = useState<string | number | null>(null);
  const [withError, setWithError] = useState<string | number | null>(null);
  const [withWarning, setWithWarning] = useState<string | number | null>(null);
  const [plan, setPlan] = useState<string | number | null>('pro');
  const [locked, setLocked] = useState<string | number | null>('hobby');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 280 }}>
      <Select size="sm" value={small} onChange={setSmall} options={PLANS} placeholder="Small" />
      <Select value={medium} onChange={setMedium} options={PLANS} placeholder="Medium (default)" />
      <Select size="lg" value={large} onChange={setLarge} options={PLANS} placeholder="Large" />
      <Select
        status="error"
        value={withError}
        onChange={setWithError}
        options={PLANS}
        placeholder="Error state"
      />
      <Select
        status="warning"
        value={withWarning}
        onChange={setWithWarning}
        options={PLANS}
        placeholder="Warning state"
      />
      <Select value={plan} onChange={setPlan} options={PLANS} placeholder="With a disabled option" />
      <Select value={locked} onChange={setLocked} options={PLANS} disabled />
    </div>
  );
}

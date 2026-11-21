import { Countdown } from '@sycee-ui/react';

const target = Date.now() + 1000 * 60 * 60 * 26 + 1000 * 42;

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <Countdown target={target} boxed size="lg" label="Product launch countdown" />
      <Countdown
        target={target}
        format="HH:mm:ss"
        size="sm"
        style={{ color: 'var(--sy-color-text-secondary)' }}
      />
    </div>
  );
}

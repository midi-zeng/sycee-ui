import { Divider } from '@sycee-ui/react';

export default function Vertical() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: 'var(--sy-color-text-secondary)',
      }}
    >
      <span>Overview</span>
      <Divider vertical />
      <span>Components</span>
      <Divider vertical dashed />
      <span>API</span>
    </div>
  );
}

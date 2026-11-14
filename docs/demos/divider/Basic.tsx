import { Divider } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <p style={{ margin: 0, color: 'var(--sy-color-text-secondary)' }}>
        Content above the divider.
      </p>
      <Divider>Sycee UI</Divider>
      <p style={{ margin: 0, color: 'var(--sy-color-text-secondary)' }}>
        The label sits centered on the line by default.
      </p>
    </div>
  );
}

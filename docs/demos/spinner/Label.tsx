import { Spinner } from '@sycee-ui/react';

export default function Label() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
      <Spinner label="Loading data" />
      <Spinner label="Uploading files" size="lg" />
    </div>
  );
}

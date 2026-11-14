import { Alert, Icon } from '@sycee-ui/react';

export default function Closable() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert type="warning" title="Closable" closable>
        Click the close button — the alert removes itself from the page and
        calls onClose.
      </Alert>
      <Alert type="info" title="Custom icon" icon={<Icon name="search" />}>
        Any icon can replace the default type icon via the icon prop.
      </Alert>
    </div>
  );
}

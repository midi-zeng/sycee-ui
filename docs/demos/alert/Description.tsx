import { Alert } from '@sycee-ui/react';

export default function Description() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert type="success" title="Deployment complete">
        Version 2.4.0 is live at app.example.com. The description renders below
        the title and can hold any content.
      </Alert>
      <Alert type="danger">
        Without a title the description stands alone — still with its type icon.
      </Alert>
    </div>
  );
}

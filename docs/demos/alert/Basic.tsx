import { Alert } from '@sycee-ui/react';
import type { AlertType } from '@sycee-ui/react';

const ALERTS: Array<{ type: AlertType; title: string }> = [
  { type: 'info', title: 'New version available' },
  { type: 'success', title: 'Your changes have been saved' },
  { type: 'warning', title: 'Your session expires in 5 minutes' },
  { type: 'danger', title: 'Payment failed — update your card' },
];

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {ALERTS.map((alert) => (
        <Alert key={alert.type} type={alert.type} title={alert.title} />
      ))}
    </div>
  );
}

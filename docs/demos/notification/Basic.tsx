import { Button, notification } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => notification.info('Heads up', 'Deployment started.')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => notification.success('Saved', 'Your changes are live.')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => notification.warning('Almost there', 'Storage is at 90%.')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => notification.danger('Failed', 'The build did not pass.')}>
        Danger
      </Button>
      <Button variant="ghost" onClick={() => notification.clear()}>
        Clear
      </Button>
    </div>
  );
}

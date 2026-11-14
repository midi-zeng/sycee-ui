import { Button, message } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button onClick={() => message.info('This is an info message')}>Info</Button>
      <Button color="success" onClick={() => message.success('Your changes have been saved')}>
        Success
      </Button>
      <Button color="warning" onClick={() => message.warning('Your session is about to expire')}>
        Warning
      </Button>
      <Button color="danger" onClick={() => message.danger('Something went wrong')}>Danger</Button>
      <Button variant="ghost" onClick={() => message.clear()}>
        Clear
      </Button>
    </div>
  );
}

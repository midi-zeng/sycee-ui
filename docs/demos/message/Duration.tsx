import { Button, message } from '@sycee-ui/react';

export default function Duration() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button onClick={() => message.info('Shown for one second', 1000)}>Duration 1s</Button>
      <Button onClick={() => message.success('Shown for five seconds', 5000)}>Duration 5s</Button>
      <Button onClick={() => message.info('Stays until cleared', 0)}>
        Sticky (duration 0)
      </Button>
      <Button variant="ghost" onClick={() => message.clear()}>
        Clear all
      </Button>
    </div>
  );
}

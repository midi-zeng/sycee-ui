import { Progress } from '@sycee-ui/react';

export default function Features() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Progress indeterminate />
      <Progress value={70} height={14} />
      <Progress value={40} showText={false} />
      <Progress value={80} height={4} status="success" />
    </div>
  );
}

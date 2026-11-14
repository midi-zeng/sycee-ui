import { Progress } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Progress value={30} />
      <Progress value={60} />
      <Progress value={100} />
    </div>
  );
}

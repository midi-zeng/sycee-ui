import { Progress } from '@sycee-ui/react';
import type { ProgressStatus } from '@sycee-ui/react';

const BARS: Array<{ status: ProgressStatus; value: number }> = [
  { status: 'primary', value: 70 },
  { status: 'success', value: 100 },
  { status: 'warning', value: 45 },
  { status: 'danger', value: 20 },
];

export default function Statuses() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      {BARS.map((bar) => (
        <Progress key={bar.status} value={bar.value} status={bar.status} />
      ))}
    </div>
  );
}

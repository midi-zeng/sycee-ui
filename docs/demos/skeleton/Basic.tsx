import { Skeleton } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton width="48px" height="48px" shape="circle" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton height="16px" width="60%" />
          <Skeleton height="12px" shape="text" />
        </div>
      </div>
      <Skeleton height="120px" />
    </div>
  );
}

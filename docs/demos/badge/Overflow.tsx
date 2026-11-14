import { Avatar, Badge } from '@sycee-ui/react';

export default function Overflow() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      <Badge count={200}>
        <Avatar alt="Capped" />
      </Badge>
      <Badge count={0}>
        <Avatar alt="Hidden" />
      </Badge>
      <Badge count={0} showZero>
        <Avatar alt="Zero" />
      </Badge>
      <Badge dot>
        <Avatar alt="Dot" />
      </Badge>
      <Badge dot count={9}>
        <Avatar alt="Dot count" />
      </Badge>
    </div>
  );
}

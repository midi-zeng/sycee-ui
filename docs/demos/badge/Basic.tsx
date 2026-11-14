import { Avatar, Badge } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      <Badge count={5}>
        <Avatar alt="Jane" />
      </Badge>
      <Badge count={12}>
        <Avatar alt="Sam" shape="square" />
      </Badge>
      <Badge count="new" color="primary">
        <Avatar alt="Ann" size="lg" />
      </Badge>
    </div>
  );
}

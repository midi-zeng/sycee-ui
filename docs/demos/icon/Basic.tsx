import { Icon } from '@sycee-ui/react';
import type { IconName } from '@sycee-ui/react';

const NAMES: IconName[] = [
  'check',
  'close',
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'info',
  'success',
  'warning',
  'danger',
  'search',
  'eye',
  'eye-off',
];

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 24px' }}>
      {NAMES.map((name) => (
        <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon name={name} />
          <code style={{ fontSize: 12 }}>{name}</code>
        </span>
      ))}
    </div>
  );
}

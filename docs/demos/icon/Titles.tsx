import { Icon } from '@sycee-ui/react';

export default function Titles() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Icon name="warning" title="Warning" />
        <span>
          With a <code>title</code> — exposed as <code>role=&quot;img&quot;</code>
        </span>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Icon name="warning" />
        <span>
          Without — decorative, <code>aria-hidden</code>
        </span>
      </span>
    </div>
  );
}

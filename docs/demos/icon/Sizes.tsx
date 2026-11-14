import { Icon } from '@sycee-ui/react';

export default function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Icon name="check" size={14} />
        <Icon name="check" size={20} />
        <Icon name="check" size={28} />
        <Icon name="check" size="2em" />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 24,
          color: 'var(--sy-color-text-secondary)',
        }}
      >
        <Icon name="info" />
        <span style={{ fontSize: 14 }}>Defaults to 1em — it follows the surrounding font size</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sy-color-primary)' }}
        >
          <Icon name="success" />
          primary
        </span>
        <span
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sy-color-success)' }}
        >
          <Icon name="success" />
          success
        </span>
        <span
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sy-color-warning)' }}
        >
          <Icon name="warning" />
          warning
        </span>
        <span
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sy-color-danger)' }}
        >
          <Icon name="danger" />
          danger
        </span>
      </div>
    </div>
  );
}

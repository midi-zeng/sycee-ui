import { Copy, Space } from '@sycee-ui/react';

export default function Basic() {
  const command = 'npm install @sycee-ui/react';

  return (
    <Space vertical size="md" align="start">
      <code
        style={{
          padding: '10px 14px',
          border: '1px solid var(--sy-color-border)',
          borderRadius: 8,
          background: 'var(--sy-color-bg-secondary)',
          fontFamily: 'var(--sy-font-family-mono)',
        }}
      >
        {command}
      </code>
      <Space wrap>
        <Copy text={command} />
        <Copy text={command} variant="outline" color="primary" />
      </Space>
    </Space>
  );
}

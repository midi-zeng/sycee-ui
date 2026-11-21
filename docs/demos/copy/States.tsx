import { Copy, Space } from '@sycee-ui/react';

export default function States() {
  return (
    <Space wrap align="center">
      <Copy text="api-key-7f4c" size="sm" iconOnly />
      <Copy text="api-key-7f4c" size="md" iconOnly />
      <Copy text="api-key-7f4c" size="lg" iconOnly />
      <Copy text="api-key-7f4c" variant="soft" color="primary" />
      <Copy text="api-key-7f4c" variant="outline" color="success" />
      <Copy text="api-key-7f4c" disabled />
    </Space>
  );
}

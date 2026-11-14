import { useState } from 'react';
import { Button, Icon, Space } from '@sycee-ui/react';

export default function States() {
  const [loading, setLoading] = useState(false);

  return (
    <Space vertical>
      <Space>
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
      </Space>
      <Space>
        <Button loading={loading} onClick={() => setLoading((v) => !v)}>
          Click to toggle loading
        </Button>
        <Button disabled>Disabled</Button>
      </Space>
      <Space>
        <Button>
          <Icon name="search" />
          With icon
        </Button>
        <Button block>Block button</Button>
      </Space>
    </Space>
  );
}

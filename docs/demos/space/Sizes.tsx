import { Button, Space } from '@sycee-ui/react';

export default function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Space size="sm">
        <Button variant="soft">sm</Button>
        <Button variant="soft">sm</Button>
        <Button variant="soft">sm</Button>
      </Space>
      <Space size="md">
        <Button variant="soft">md</Button>
        <Button variant="soft">md</Button>
        <Button variant="soft">md</Button>
      </Space>
      <Space size="lg">
        <Button variant="soft">lg</Button>
        <Button variant="soft">lg</Button>
        <Button variant="soft">lg</Button>
      </Space>
      <Space size={32}>
        <Button variant="soft">32px</Button>
        <Button variant="soft">32px</Button>
        <Button variant="soft">32px</Button>
      </Space>
    </div>
  );
}

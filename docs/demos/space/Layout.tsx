import { Button, Space, Tag } from '@sycee-ui/react';

const TOPICS = ['design', 'vue', 'react', 'accessibility', 'tokens', 'docs', 'a11y', 'css'];

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Space vertical>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Space>
      <Space wrap style={{ maxWidth: 360 }}>
        {TOPICS.map((topic) => (
          <Tag key={topic} color="primary">
            {topic}
          </Tag>
        ))}
      </Space>
    </div>
  );
}

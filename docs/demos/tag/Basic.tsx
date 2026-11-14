import { Tag } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Tag>Neutral</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success" variant="solid">
        Solid
      </Tag>
      <Tag color="danger" variant="outline">
        Outline
      </Tag>
      <Tag size="sm">Small</Tag>
    </div>
  );
}

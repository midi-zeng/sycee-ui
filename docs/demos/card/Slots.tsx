import { Button, Card } from '@sycee-ui/react';

export default function Slots() {
  return (
    <Card
      title="Team members"
      extra={<a href="#">Manage</a>}
      footer={
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button>Invite later</Button>
          <Button color="primary">Invite people</Button>
        </div>
      }
      style={{ maxWidth: 420 }}
    >
      <p style={{ margin: 0, color: 'var(--sy-color-text-secondary)' }}>
        12 people have access to this workspace.
      </p>
    </Card>
  );
}

import { Button, Popconfirm, message } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Popconfirm
        title="Delete this file?"
        content="This action cannot be undone."
        onConfirm={() => message.success('Deleted')}
        onCancel={() => message.info('Cancelled')}
      >
        <Button variant="danger">Delete</Button>
      </Popconfirm>
      <Popconfirm title="Publish changes?" okText="Publish">
        <Button>Publish</Button>
      </Popconfirm>
    </div>
  );
}

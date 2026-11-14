import { useState } from 'react';
import { Button, Modal } from '@sycee-ui/react';

export default function Basic() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        title="Delete account"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p style={{ margin: 0 }}>
          This permanently removes your account and all of its data. This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}

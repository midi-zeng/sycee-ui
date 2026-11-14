import { useState } from 'react';
import { Button, Modal } from '@sycee-ui/react';

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        title="Draft settings"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Save draft
            </Button>
            <Button variant="solid" onClick={() => setOpen(false)}>
              Publish
            </Button>
          </>
        }
      >
        <p style={{ margin: 0 }}>Choose what happens when you publish this draft.</p>
      </Modal>
    </div>
  );
}

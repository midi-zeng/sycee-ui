import { useState } from 'react';
import { Button, Modal } from '@sycee-ui/react';

export default function Width() {
  const [wide, setWide] = useState(false);
  const [strict, setStrict] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => setWide(true)}>
        640px modal
      </Button>
      <Button variant="outline" onClick={() => setStrict(true)}>
        Mask click disabled
      </Button>
      <Modal open={wide} width={640} title="Wide dialog" onOk={() => setWide(false)} onCancel={() => setWide(false)}>
        <p style={{ margin: 0 }}>
          The <code>width</code> prop accepts a number (px) or any CSS width, so long-form
          content can breathe.
        </p>
      </Modal>
      <Modal
        open={strict}
        width={360}
        maskClosable={false}
        title="Confirm payment"
        onOk={() => setStrict(false)}
        onCancel={() => setStrict(false)}
      >
        <p style={{ margin: 0 }}>
          Clicking the mask does nothing. Close with the buttons, the X or Escape.
        </p>
      </Modal>
    </div>
  );
}

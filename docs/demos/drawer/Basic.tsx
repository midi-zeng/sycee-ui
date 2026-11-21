import { useState } from 'react';
import { Drawer, Button } from '@sycee-ui/react';

export default function Basic() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Settings" placement="right" width={360}>
        <p>Drawer content slides in from the right edge of the viewport.</p>
      </Drawer>
    </>
  );
}

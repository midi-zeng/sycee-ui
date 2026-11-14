import { Button, Tooltip } from '@sycee-ui/react';

export default function Basic() {
  return (
    <Tooltip content="Hello from Sycee" placement="top">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  );
}

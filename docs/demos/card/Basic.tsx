import { Card } from '@sycee-ui/react';

export default function Basic() {
  return (
    <Card title="Project overview" style={{ maxWidth: 420 }}>
      Cards group related content and actions. Pass a title to render the
      header; everything you pass as children becomes the body.
    </Card>
  );
}

import { Image } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Image src="https://picsum.photos/id/237/300/200" alt="A dog" width="220px" />
      <Image src="https://broken.example/nope.png" alt="Broken" width="220px" height="120px" />
    </div>
  );
}

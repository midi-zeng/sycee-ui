import { Divider } from '@sycee-ui/react';

export default function Variants() {
  return (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Divider labelPlacement="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider labelPlacement="right">Right</Divider>
      <Divider dashed>Dashed</Divider>
      <Divider dashed labelPlacement="left">
        Dashed, left
      </Divider>
    </div>
  );
}

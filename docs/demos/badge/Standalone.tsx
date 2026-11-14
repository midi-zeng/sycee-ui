import { Badge } from '@sycee-ui/react';
import type { ColorType } from '@sycee-ui/react';

const COLORS: ColorType[] = ['danger', 'primary', 'success', 'warning', 'neutral'];

export default function Standalone() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <Badge key={color} color={color} count={8} />
      ))}
      <Badge count="new" color="warning" />
    </div>
  );
}

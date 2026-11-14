import { Spinner } from '@sycee-ui/react';
import type { ColorType } from '@sycee-ui/react';

const COLORS: ColorType[] = ['primary', 'success', 'warning', 'danger', 'neutral'];

export default function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size={44} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
        {COLORS.map((color) => (
          <Spinner key={color} color={color} />
        ))}
      </div>
    </div>
  );
}

import { Button } from '@sycee-ui/react';

const COLORS = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
const VARIANTS = ['solid', 'soft', 'outline', 'ghost', 'link'] as const;

export default function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {COLORS.map((color) => (
            <Button key={color} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

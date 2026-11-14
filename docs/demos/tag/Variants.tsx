import { Tag } from '@sycee-ui/react';
import type { ColorType, TagVariant } from '@sycee-ui/react';

const COLORS: ColorType[] = ['primary', 'neutral', 'success', 'warning', 'danger'];
const VARIANTS: TagVariant[] = ['soft', 'solid', 'outline'];

export default function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
        >
          {COLORS.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {variant}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}

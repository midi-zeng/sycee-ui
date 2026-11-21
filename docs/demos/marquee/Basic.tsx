import { Marquee, Tag } from '@sycee-ui/react';

const labels = ['Build faster', 'Theme everything', 'React & Vue', 'Accessible', 'Tree-shakable'];

export default function Basic() {
  return (
    <div style={{ display: 'grid', gap: 18, width: '100%', maxWidth: 680 }}>
      <Marquee>
        {labels.map((label, index) => (
          <Tag key={label} color={(['primary', 'success', 'warning'] as const)[index % 3]}>
            {label}
          </Tag>
        ))}
      </Marquee>
      <Marquee direction="right" duration={22} gap="24px">
        {labels.map((label) => (
          <span key={label} style={{ color: 'var(--sy-color-text-secondary)' }}>
            {label} <span style={{ opacity: 0.35 }}>·</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

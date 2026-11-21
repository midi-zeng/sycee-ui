import { Watermark } from '@sycee-ui/react';

export default function Basic() {
  return (
    <Watermark
      content={['SYCE E UI', 'INTERNAL USE']}
      width={200}
      height={140}
      gap={[16, 16]}
      color="#6e56cf"
      opacity={0.18}
      style={{
        minHeight: 260,
        overflow: 'hidden',
        border: '1px solid var(--sy-color-border)',
        borderRadius: 12,
        background: 'var(--sy-color-bg)',
      }}
    >
      <div style={{ display: 'grid', gap: 18, padding: 28 }}>
        <div>
          <div style={{ color: 'var(--sy-color-text-tertiary)', fontSize: 12, fontWeight: 600 }}>
            QUARTERLY REPORT
          </div>
          <h3 style={{ margin: '6px 0 0', color: 'var(--sy-color-text)' }}>
            Revenue overview
          </h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {[
            ['Revenue', '$128,400'],
            ['Growth', '+18.2%'],
            ['Accounts', '2,846'],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                minWidth: 130,
                padding: 14,
                border: '1px solid var(--sy-color-border)',
                borderRadius: 10,
                background: 'var(--sy-color-bg-secondary)',
              }}
            >
              <div style={{ color: 'var(--sy-color-text-tertiary)', fontSize: 12 }}>{label}</div>
              <strong style={{ color: 'var(--sy-color-text)', fontSize: 18 }}>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </Watermark>
  );
}

import { NinePatch } from '@sycee-ui/react';

// AAPT-compiled nine-patch (180x120, npTc chunk) served from docs/public.
const COMPILED_SRC = `${import.meta.env.BASE_URL}btn.compiled.9.png`;

function Bubble({ width, label }: { width: number; label: string }) {
  return (
    <div style={{ width, height: Math.round((width * 120) / 180) }}>
      <NinePatch src={COMPILED_SRC}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          {label}
        </div>
      </NinePatch>
    </div>
  );
}

export default function Compiled() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <Bubble width={240} label="240px" />
      <Bubble width={420} label="420px" />
    </div>
  );
}

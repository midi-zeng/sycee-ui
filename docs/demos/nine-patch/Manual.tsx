import { NinePatch } from '@sycee-ui/react';

// A plain image (no guide borders, no npTc chunk) as a data URI so the demo is
// self-contained. With customOptions, NinePatch skips parsing entirely and
// treats any image as a border-image source.
const PLAIN_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='48'%3E%3Crect x='1' y='1' width='118' height='46' rx='10' fill='%23eef1f6' stroke='%235b6472' stroke-width='2'/%3E%3C/svg%3E";

export default function Manual() {
  return (
    <div style={{ width: 360, height: 72 }}>
      <NinePatch
        src={PLAIN_SRC}
        customOptions={{
          borderImageSlice: { top: 12, right: 12, bottom: 12, left: 12 },
          padding: { top: 10, right: 18, bottom: 10, left: 18 },
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          Manual slice and padding
        </div>
      </NinePatch>
    </div>
  );
}

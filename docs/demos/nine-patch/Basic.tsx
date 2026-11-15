import { useState } from 'react';
import { NinePatch } from '@sycee-ui/react';

// Raw nine-patch source (182x122, with 1px guide borders) served from docs/public.
const RAW_SRC = `${import.meta.env.BASE_URL}btn.9.png`;

export default function Basic() {
  const [width, setWidth] = useState(360);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
        Width: {width}px
        <input
          type="range"
          min={182}
          max={720}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          style={{ width: 240 }}
        />
      </label>
      <div style={{ width, height: Math.round((width * 122) / 182) }}>
        <NinePatch src={RAW_SRC}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
            }}
          >
            Raw nine-patch
          </div>
        </NinePatch>
      </div>
    </div>
  );
}

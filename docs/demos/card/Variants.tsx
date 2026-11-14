import { Card } from '@sycee-ui/react';

export default function Variants() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Card title="Hoverable" hoverable style={{ flex: 1, minWidth: 200 }}>
        Adds a shadow on hover — use it for cards that are clickable or
        interactive.
      </Card>
      <Card title="Borderless" borderless style={{ flex: 1, minWidth: 200 }}>
        Removes the border; pair it with a tinted background or nest it inside
        another surface.
      </Card>
      <Card title="No padding" padding={false} style={{ flex: 1, minWidth: 200 }}>
        <div style={{ background: 'var(--sy-color-bg-tertiary)', padding: 16 }}>
          With <code>padding</code> set to false the body loses its padding —
          content reaches the card edges, ideal for images or tables.
        </div>
      </Card>
    </div>
  );
}

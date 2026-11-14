import { Button, Tooltip } from '@sycee-ui/react';

export default function Placements() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 110px)',
        gridAutoRows: 40,
        placeItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <span />
      <Tooltip content="Tooltip on top" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <span />
      <Tooltip content="Tooltip on the left" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <span style={{ color: 'var(--sy-color-text-tertiary)' }}>placement</span>
      <Tooltip content="Tooltip on the right" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <span />
      <Tooltip content="Tooltip on the bottom" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <span />
    </div>
  );
}

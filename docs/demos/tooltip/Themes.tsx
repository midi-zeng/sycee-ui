import { Button, Tooltip } from '@sycee-ui/react';

export default function Themes() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 16 }}>
      <Tooltip content="Dark theme (default)" placement="bottom">
        <Button variant="outline">Dark</Button>
      </Tooltip>
      <Tooltip theme="light" content="Light theme" placement="bottom">
        <Button variant="outline">Light</Button>
      </Tooltip>
      <Tooltip
        theme="light"
        placement="bottom"
        content={
          <div style={{ maxWidth: 220 }}>
            <strong>Sycee UI</strong>
            <p style={{ margin: '4px 0 0' }}>
              Rich content goes in the <code>content</code> prop.
            </p>
          </div>
        }
      >
        <Button variant="outline">Light + rich content</Button>
      </Tooltip>
    </div>
  );
}

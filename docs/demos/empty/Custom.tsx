import { Button, Empty, Icon } from '@sycee-ui/react';

export default function Custom() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Empty
        description="No search results"
        image={
          <span
            style={{
              display: 'inline-flex',
              width: 96,
              height: 96,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'var(--sy-color-bg-tertiary)',
              color: 'var(--sy-color-text-tertiary)',
            }}
          >
            <Icon name="search" size="44" />
          </span>
        }
        style={{ flex: 1, minWidth: 240 }}
      />
      <Empty style={{ flex: 1, minWidth: 240 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <span>Nothing shared with you yet</span>
          <Button size="sm">Create a document</Button>
        </div>
      </Empty>
    </div>
  );
}

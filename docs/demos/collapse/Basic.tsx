import { Collapse, CollapseItem } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Collapse defaultOpenKeys={['a']}>
        <CollapseItem name="a" title="What is Sycee UI?">
          A unified design system for React and Vue — one design language, one API.
        </CollapseItem>
        <CollapseItem name="b" title="How do I theme it?">
          All colors come from CSS variables; switch the theme with{' '}
          <code>data-theme=&quot;dark&quot;</code>.
        </CollapseItem>
        <CollapseItem name="c" title="Disabled item" disabled>
          This item cannot be expanded.
        </CollapseItem>
      </Collapse>
      <Collapse accordion>
        <CollapseItem name="1" title="Only one panel at a time">
          Accordion mode.
        </CollapseItem>
        <CollapseItem name="2" title="Second panel">
          Opening this closes the first.
        </CollapseItem>
      </Collapse>
    </div>
  );
}

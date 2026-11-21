import { Tree } from '@sycee-ui/react';
import type { TreeNodeData } from '@sycee-ui/react';

const DATA: TreeNodeData[] = [
  {
    key: 'src',
    label: 'src',
    children: [
      {
        key: 'components',
        label: 'components',
        children: [
          { key: 'button', label: 'Button' },
          { key: 'input', label: 'Input' },
        ],
      },
      { key: 'utils', label: 'utils' },
    ],
  },
  { key: 'tests', label: 'tests' },
  { key: 'docs', label: 'docs', disabled: true },
];

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <Tree data={DATA} defaultExpandedKeys={['src']} />
      <Tree data={DATA} checkable defaultExpandedKeys={['src']} />
    </div>
  );
}

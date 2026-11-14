import { useState } from 'react';
import { Checkbox } from '@sycee-ui/react';

const ITEMS = ['Apple', 'Banana', 'Cherry'];

export default function Indeterminate() {
  const [selected, setSelected] = useState<string[]>(['Apple']);
  const allSelected = selected.length === ITEMS.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = (checked: boolean) => setSelected(checked ? [...ITEMS] : []);
  const toggleItem = (item: string, checked: boolean) =>
    setSelected(checked ? [...selected, item] : selected.filter((entry) => entry !== item));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        label="Select all"
        onChange={toggleAll}
      />
      {ITEMS.map((item) => (
        <Checkbox
          key={item}
          checked={selected.includes(item)}
          label={item}
          onChange={(checked) => toggleItem(item, checked)}
        />
      ))}
    </div>
  );
}

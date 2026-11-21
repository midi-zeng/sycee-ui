import { Button, Dropdown, message } from '@sycee-ui/react';
import type { DropdownOption } from '@sycee-ui/react';

const OPTIONS: DropdownOption[] = [
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Rename', value: 'rename' },
  { divider: true, label: '' },
  { label: 'Archive', value: 'archive' },
  { label: 'Delete', value: 'delete', disabled: true },
];

export default function Basic() {
  return (
    <Dropdown options={OPTIONS} onSelect={(value) => message.info(String(value))}>
      <Button variant="outline">Actions ▾</Button>
    </Dropdown>
  );
}

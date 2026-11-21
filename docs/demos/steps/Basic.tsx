import { useState } from 'react';
import { Steps } from '@sycee-ui/react';

const ITEMS = [
  { label: 'Account', description: 'Sign up' },
  { label: 'Profile', description: 'Add your details' },
  { label: 'Confirm', description: 'Review and submit' },
];

export default function Basic() {
  const [active, setActive] = useState(1);
  return <Steps items={ITEMS} active={active} onChange={setActive} />;
}

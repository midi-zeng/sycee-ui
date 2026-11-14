import { useState } from 'react';
import { Checkbox } from '@sycee-ui/react';

export default function Basic() {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox checked={email} onChange={setEmail} label="Email notifications" />
      <Checkbox checked={sms} onChange={setSms}>SMS notifications</Checkbox>
      <Checkbox label="Locked by your administrator" disabled />
    </div>
  );
}

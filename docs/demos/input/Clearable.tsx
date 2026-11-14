import { useState } from 'react';
import { Icon, Input } from '@sycee-ui/react';

export default function Clearable() {
  const [keyword, setKeyword] = useState('sycee');
  const [amount, setAmount] = useState('0.00');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input value={keyword} onChange={setKeyword} clearable placeholder="Search anything" />
      <Input value={amount} onChange={setAmount} prefix="¥" suffix="CNY" />
      <Input
        placeholder="With icons"
        prefix={<Icon name="search" />}
        suffix={<Icon name="eye" />}
      />
    </div>
  );
}

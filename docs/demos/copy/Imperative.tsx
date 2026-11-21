import { useState } from 'react';
import { Button, Space, copy, useLocale } from '@sycee-ui/react';

export default function Imperative() {
  const t = useLocale();
  const [status, setStatus] = useState('');
  const command = 'npm install @sycee-ui/react';

  return (
    <Space align="center">
      <Button
        variant="soft"
        onClick={async () => {
          const copied = await copy(command);
          setStatus(copied ? t.copied : t.copyFailed);
        }}
      >
        {t.copy}
      </Button>
      <span role="status" aria-live="polite">
        {status}
      </span>
    </Space>
  );
}

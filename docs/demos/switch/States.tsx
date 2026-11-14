import { useState } from 'react';
import { Switch } from '@sycee-ui/react';

export default function States() {
  const [loadingOn, setLoadingOn] = useState(true);
  const [loadingOff, setLoadingOff] = useState(false);
  const [disabledOn] = useState(true);
  const [disabledOff] = useState(false);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      <Switch checked={loadingOn} onChange={setLoadingOn} loading />
      <Switch checked={loadingOff} onChange={setLoadingOff} loading />
      <Switch checked={disabledOn} disabled />
      <Switch checked={disabledOff} disabled />
    </div>
  );
}

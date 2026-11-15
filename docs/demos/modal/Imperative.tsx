import { Button, dialog, message } from '@sycee-ui/react';

export default function Imperative() {
  const confirmDelete = () => {
    dialog.confirm({
      title: 'Delete account',
      content: 'This permanently removes your account and all of its data.',
      okText: 'Delete',
      onOk: () => message.success('Account deleted'),
    });
  };

  const showAlert = () => {
    dialog.alert({
      title: 'Session expired',
      content: 'Please sign in again to continue.',
      okText: 'Sign in',
      onOk: () => message.info('Redirecting to sign in…'),
    });
  };

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button onClick={confirmDelete}>Confirm</Button>
      <Button onClick={showAlert}>Alert</Button>
    </div>
  );
}

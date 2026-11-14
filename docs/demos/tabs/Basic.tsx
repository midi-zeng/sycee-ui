import { Tabs } from '@sycee-ui/react';

const ITEMS = [
  {
    label: 'Account',
    value: 'account',
    content: 'Manage your email, password and sign-in method.',
  },
  {
    label: 'Notifications',
    value: 'notifications',
    content: 'Choose which events send you an email or a push notification.',
  },
  {
    label: 'Appearance',
    value: 'appearance',
    content: 'Pick a theme, density and accent color.',
  },
];

export default function Basic() {
  return <Tabs items={ITEMS} />;
}

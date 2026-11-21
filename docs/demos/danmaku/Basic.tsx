import { Danmaku } from '@sycee-ui/react';

const messages = [
  'Beautiful motion.',
  'Shipping this today 🚀',
  'Dark mode looks great',
  'The carousel is so smooth',
  'React + Vue = ❤️',
  'Accessible by default',
  'New component drop!',
  'Love the typography',
].map((content, index) => ({ id: index, content, track: index % 4 }));

export default function Basic() {
  return (
    <Danmaku
      items={messages}
      height={180}
      tracks={4}
      speed={14}
      showControls
      style={{ maxWidth: 720 }}
    />
  );
}

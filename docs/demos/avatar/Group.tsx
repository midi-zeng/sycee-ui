import { Avatar, AvatarGroup } from '@sycee-ui/react';

// Inline SVG data URI so the demo is self-contained.
function avatarUrl(letter: string, bg: string): string {
  const fill = bg.replace('#', '%23');
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='${fill}'/%3E%3Ctext x='48' y='61' font-family='sans-serif' font-size='38' fill='%23ffffff' text-anchor='middle'%3E${letter}%3C/text%3E%3C/svg%3E`;
}

export default function Group() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <AvatarGroup size={36}>
        <Avatar alt="Ada" />
        <Avatar alt="Ben" />
        <Avatar alt="Cy" />
        <Avatar alt="Dan" />
        <Avatar src={avatarUrl('E', '#8a8fa0')} alt="Eve" />
      </AvatarGroup>
      <AvatarGroup size={48}>
        <Avatar src={avatarUrl('A', '#6e56cf')} alt="Ada" />
        <Avatar src={avatarUrl('B', '#2fa46c')} alt="Ben" />
        <Avatar alt="Cy" />
      </AvatarGroup>
    </div>
  );
}

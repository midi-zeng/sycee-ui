import { Avatar } from '@sycee-ui/react';

// Inline SVG data URI so the demo is self-contained.
function avatarUrl(letter: string, bg: string): string {
  const fill = bg.replace('#', '%23');
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='${fill}'/%3E%3Ctext x='48' y='61' font-family='sans-serif' font-size='38' fill='%23ffffff' text-anchor='middle'%3E${letter}%3C/text%3E%3C/svg%3E`;
}

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Avatar src={avatarUrl('A', '#6e56cf')} alt="Amy Lee" />
      <Avatar src={avatarUrl('B', '#2fa46c')} alt="Ben Ortiz" />
      <Avatar alt="Carol" />
      <Avatar>
        <span style={{ fontWeight: 600 }}>SY</span>
      </Avatar>
    </div>
  );
}

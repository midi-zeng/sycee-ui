import { Carousel } from '@sycee-ui/react';

const slides = [
  {
    title: 'One component language',
    description: 'A calm, consistent foundation for every product surface.',
    background: 'linear-gradient(135deg, #6e56cf, #9f8cf4)',
  },
  {
    title: 'React. Vue. Together.',
    description: 'Parallel APIs and identical visual output across frameworks.',
    background: 'linear-gradient(135deg, #16856c, #4dc7a3)',
  },
  {
    title: 'Built for real products',
    description: 'Accessible interactions, thoughtful states, and themeable tokens.',
    background: 'linear-gradient(135deg, #b96817, #f0b35b)',
  },
].map((slide, index) => ({
  key: index,
  ariaLabel: slide.title,
  content: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: 260,
        padding: 32,
        color: '#fff',
        background: slide.background,
      }}
    >
      <strong style={{ fontSize: 28, letterSpacing: '-0.03em' }}>{slide.title}</strong>
      <span style={{ marginTop: 8, maxWidth: 480, opacity: 0.82 }}>{slide.description}</span>
    </div>
  ),
}));

export default function Basic() {
  return <Carousel items={slides} style={{ maxWidth: 720 }} />;
}

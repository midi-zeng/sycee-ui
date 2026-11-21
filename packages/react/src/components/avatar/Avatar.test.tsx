import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('keeps alt text accessible when the image fails', () => {
    const { container } = render(<Avatar src="/missing.png" alt="Ada Lovelace" />);
    fireEvent.error(container.querySelector('img')!);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('A')).toHaveAttribute('aria-hidden', 'true');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  it('replaces a failed image with the fallback', () => {
    const { container } = render(
      <Image src="/broken.png" alt="Broken" width={220} height={120} />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Broken' }));

    expect(container.firstElementChild).toHaveClass('sy-image', 'is-error');
    expect(container.querySelector('.sy-image__img')).not.toBeInTheDocument();
    expect(screen.getByText('Preview unavailable')).toBeInTheDocument();
  });

  it('retries when src changes after a load failure', () => {
    const { container, rerender } = render(<Image src="/broken.png" alt="Broken" />);

    fireEvent.error(screen.getByRole('img', { name: 'Broken' }));
    expect(container.querySelector('.sy-image__img')).not.toBeInTheDocument();

    rerender(<Image src="/dog.png" alt="A dog" />);

    expect(screen.getByRole('img', { name: 'A dog' })).toHaveAttribute('src', '/dog.png');
    expect(container.firstElementChild).not.toHaveClass('is-error');
  });
});

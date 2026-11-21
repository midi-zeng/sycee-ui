import { render, screen } from '@testing-library/react';
import { Watermark } from './Watermark';

describe('Watermark', () => {
  it('wraps content and renders a decorative repeating layer', () => {
    const { container } = render(
      <Watermark content="Confidential" opacity={0.2} zIndex={4} offset={[12, 8]}>
        <p>Account details</p>
      </Watermark>,
    );
    const overlay = container.querySelector<HTMLElement>('.sy-watermark__overlay');

    expect(screen.getByText('Account details')).toBeInTheDocument();
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
    expect(overlay?.style.backgroundImage).toContain('data:image/svg+xml');
    expect(overlay?.style.backgroundPosition).toBe('12px 8px');
    expect(overlay?.style.opacity).toBe('0.2');
    expect(overlay?.style.zIndex).toBe('4');
  });

  it('supports standalone and fullscreen presentation', () => {
    const { container } = render(<Watermark fullscreen content="Draft" />);
    const root = container.firstElementChild;
    const overlay = container.querySelector<HTMLElement>('.sy-watermark__overlay');

    expect(root).toHaveClass('sy-watermark--standalone');
    expect(root).toHaveClass('sy-watermark--fullscreen');
    expect(overlay).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('applies color and variant classes', () => {
    render(
      <Button color="danger" variant="soft">
        Delete
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('sy-button', 'sy-button--danger', 'sy-button--soft');
  });

  it('applies the size modifier for non-default sizes', () => {
    render(<Button size="lg">Big</Button>);
    expect(screen.getByRole('button')).toHaveClass('sy-button--lg');
  });

  it('shows a spinner and blocks clicks while loading', () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Upload
      </Button>,
    );
    expect(document.querySelector('.sy-button__spinner')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as disabled', () => {
    render(<Button disabled>Blocked</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

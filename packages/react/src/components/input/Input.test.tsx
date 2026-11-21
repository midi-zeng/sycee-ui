import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders a native input and passes through attributes', () => {
    render(<Input placeholder="Your name" maxLength={20} aria-label="Name" />);
    const input = screen.getByPlaceholderText('Your name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxlength', '20');
  });

  it('applies size and status modifiers', () => {
    render(<Input size="lg" status="error" placeholder="x" />);
    const root = screen.getByPlaceholderText('x').parentElement!;
    expect(root).toHaveClass('sy-input', 'sy-input--lg', 'sy-input--error');
  });

  it('reports value changes through onChange', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} aria-label="Name" />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
    expect(onChange).toHaveBeenCalledWith('Ada', expect.anything());
  });

  it('shows the clear button on hover and clears the value', () => {
    const onChange = vi.fn();
    render(<Input clearable defaultValue="Ada" onChange={onChange} aria-label="Name" />);
    const root = screen.getByLabelText('Name').parentElement!;
    fireEvent.mouseEnter(root);
    const clear = document.querySelector('.sy-input__clear')!;
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe('');
  });

  it('clears an uncontrolled value without a forwarded ref', () => {
    const onChange = vi.fn();
    render(<Input clearable defaultValue="Ada" onChange={onChange} aria-label="Name" />);
    const input = screen.getByLabelText('Name') as HTMLInputElement;
    fireEvent.focus(input);
    const clear = document.querySelector('.sy-input__clear')!;
    fireEvent.click(clear);
    expect(input.value).toBe('');
    expect(onChange).toHaveBeenCalledWith('', expect.anything());
  });

  it('marks the root as disabled', () => {
    render(<Input disabled placeholder="x" />);
    const root = screen.getByPlaceholderText('x').parentElement!;
    expect(root).toHaveClass('is-disabled');
  });
});

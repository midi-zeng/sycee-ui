import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Select } from './Select';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

describe('Select', () => {
  it('renders the placeholder and opens on click', async () => {
    render(<Select options={OPTIONS} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('combobox'));
    await waitFor(() => expect(screen.getAllByRole('option').length).toBe(3));
  });

  it('selects an option and reports change', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    await waitFor(() => expect(screen.getAllByRole('option').length).toBe(3));
    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith('banana');
    await waitFor(() =>
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    );
  });

  it('opens with ArrowDown and closes on Escape', async () => {
    render(<Select options={OPTIONS} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
    fireEvent.keyDown(trigger, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('shows the selected label', async () => {
    render(<Select options={OPTIONS} defaultValue="apple" />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('clears the value when clearable', async () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    render(<Select options={OPTIONS} defaultValue="apple" clearable onChange={onChange} onClear={onClear} />);
    fireEvent.click(screen.getByRole('combobox'));
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true'));
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onChange).toHaveBeenCalledWith(null);
    expect(onClear).toHaveBeenCalled();
  });
});

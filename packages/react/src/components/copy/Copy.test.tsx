import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LocaleProvider } from '../../locale';
import { Copy } from './Copy';

function mockClipboard(writeText: (...args: [string]) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
}

describe('Copy', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, 'clipboard');
    Reflect.deleteProperty(document, 'execCommand');
  });

  it('copies text and announces localized success feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const onCopied = vi.fn();
    mockClipboard(writeText);

    render(
      <LocaleProvider locale="zh">
        <Copy text="npm install @sycee-ui/react" onCopied={onCopied} />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: '复制' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('npm install @sycee-ui/react'));
    expect(screen.getByRole('status')).toHaveTextContent('已复制');
    expect(screen.getByRole('button')).toHaveClass('is-copied');
    expect(onCopied).toHaveBeenCalledWith('npm install @sycee-ui/react');
  });

  it('renders an icon-only button with an accessible state label', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    render(<Copy text="api-key" iconOnly />);
    const button = screen.getByRole('button', { name: 'Copy' });
    expect(button).toHaveClass('sy-copy--icon-only');

    fireEvent.click(button);

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('api-key'));
    expect(screen.getByRole('button', { name: 'Copied' })).toBe(button);
  });

  it('reports a failed copy without throwing from the click handler', async () => {
    const onCopyError = vi.fn();
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });

    render(<Copy text="secret" onCopyError={onCopyError} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copy failed'));
    expect(screen.getByRole('button')).toHaveClass('is-error');
    expect(onCopyError).toHaveBeenCalled();
  });

  it('does not copy while disabled', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    render(<Copy text="secret" disabled />);

    fireEvent.click(screen.getByRole('button'));

    expect(writeText).not.toHaveBeenCalled();
  });
});

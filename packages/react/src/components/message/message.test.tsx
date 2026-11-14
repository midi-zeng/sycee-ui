import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '../button/Button';
import { message } from './message';

describe('message', () => {
  afterEach(() => {
    // Do NOT remove the wrapper div: the message singleton keeps rendering
    // into the same container for the lifetime of the page.
    message.clear();
  });

  it('renders a message with the expected icon and content', async () => {
    render(<Button onClick={() => message.success('Saved!')}>Save</Button>);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(document.querySelector('.sy-message-wrapper')).toBeInTheDocument());
    const wrapper = document.querySelector('.sy-message-wrapper');
    expect(wrapper).toHaveAttribute('role', 'status');
    expect(wrapper).toHaveAttribute('aria-live', 'polite');
    expect(document.querySelector('.sy-message--success')).toBeInTheDocument();
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('maps types to modifier classes', async () => {
    message.info('A');
    message.warning('B');
    message.danger('C');
    await waitFor(() =>
      expect(document.querySelectorAll('.sy-message').length).toBe(3),
    );
    expect(document.querySelector('.sy-message--info')).toBeInTheDocument();
    expect(document.querySelector('.sy-message--warning')).toBeInTheDocument();
    expect(document.querySelector('.sy-message--danger')).toBeInTheDocument();
  });

  it('auto-removes after the duration', async () => {
    message.info('Temporary', 50);
    await waitFor(() => expect(document.querySelector('.sy-message')).toBeInTheDocument());
    await waitFor(
      () => expect(document.querySelector('.sy-message')).not.toBeInTheDocument(),
      { timeout: 3000 },
    );
  });

  it('caps the stack at 8 items', async () => {
    for (let i = 0; i < 10; i += 1) {
      message.info(`Message ${i}`);
    }
    await waitFor(() => expect(document.querySelectorAll('.sy-message').length).toBe(8));
  });

  it('clear removes all messages', async () => {
    message.info('A');
    message.info('B');
    await waitFor(() => expect(document.querySelectorAll('.sy-message').length).toBe(2));
    message.clear();
    await waitFor(() => expect(document.querySelector('.sy-message')).not.toBeInTheDocument());
  });
});

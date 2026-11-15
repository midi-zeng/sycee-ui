import { fireEvent, screen, waitFor } from '@testing-library/react';
import { dialog } from './dialog';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function pressEscape() {
  fireEvent.keyDown(document, { key: 'Escape' });
}

describe('dialog', () => {
  afterEach(async () => {
    dialog.clear();
    // Wait out the 220ms exit animation so no closing mask leaks into the
    // next test's DOM queries.
    await wait(300);
  });

  it('renders a confirm dialog into document.body', async () => {
    dialog.confirm({ title: 'Delete', content: 'Are you sure?' });
    await waitFor(() => expect(document.querySelector('.sy-modal-mask')).toBeInTheDocument());
    expect(document.querySelector('.sy-modal')).toBeInTheDocument();
    expect(document.querySelector('.sy-modal__title')?.textContent).toContain('Delete');
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(document.querySelectorAll('.sy-modal__footer button').length).toBe(2);
  });

  it('onOk fires and the dialog closes', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    dialog.confirm({ content: 'Confirm', onOk, onCancel });
    await waitFor(() => expect(document.querySelector('.sy-modal__footer')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
    // The close runs through the open prop, so the exit animation plays first.
    await waitFor(() =>
      expect(document.querySelector('.sy-modal-mask.is-closing')).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(document.querySelector('.sy-modal-mask')).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it('onCancel fires when dismissed with Escape and the dialog closes', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    dialog.confirm({ content: 'Confirm', onOk, onCancel });
    await waitFor(() => expect(document.querySelector('.sy-modal-mask')).toBeInTheDocument());
    pressEscape();
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOk).not.toHaveBeenCalled();
    await waitFor(
      () => expect(document.querySelector('.sy-modal-mask')).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it('onCancel fires when the mask is clicked', async () => {
    const onCancel = vi.fn();
    dialog.confirm({ content: 'Confirm', onCancel });
    await waitFor(() => expect(document.querySelector('.sy-modal-mask')).toBeInTheDocument());
    fireEvent.click(document.querySelector('.sy-modal-mask') as HTMLElement);
    expect(onCancel).toHaveBeenCalledTimes(1);
    await waitFor(
      () => expect(document.querySelector('.sy-modal-mask')).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it('destroy closes without calling any callback', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    const handle = dialog.confirm({ content: 'Confirm', onOk, onCancel });
    await waitFor(() => expect(document.querySelector('.sy-modal-mask')).toBeInTheDocument());
    handle.destroy();
    expect(onOk).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    await waitFor(
      () => expect(document.querySelector('.sy-modal-mask')).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it('alert renders a single OK button', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    dialog.alert({ title: 'Heads up', content: 'All done', okText: 'Got it', onOk, onCancel });
    await waitFor(() => expect(document.querySelector('.sy-modal__footer')).toBeInTheDocument());
    expect(document.querySelectorAll('.sy-modal__footer button').length).toBe(1);
    fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
    await waitFor(
      () => expect(document.querySelector('.sy-modal-mask')).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it('clear closes every open dialog', async () => {
    dialog.confirm({ content: 'A' });
    dialog.confirm({ content: 'B' });
    await waitFor(() => expect(document.querySelectorAll('.sy-modal-mask').length).toBe(2));
    dialog.clear();
    await waitFor(
      () => expect(document.querySelector('.sy-modal-mask')).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });
});

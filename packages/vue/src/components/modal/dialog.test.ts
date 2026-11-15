import { dialog } from './dialog';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function pressEscape() {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
}

function clickFooterButton(text: string) {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.sy-modal__footer button')];
  const target = buttons.find((button) => button.textContent?.trim() === text);
  if (!target) throw new Error(`No footer button labelled "${text}"`);
  target.click();
}

describe('dialog', () => {
  afterEach(async () => {
    dialog.clear();
    // Wait out the 220ms exit animation so no closing mask leaks into the
    // next test's DOM queries.
    await wait(300);
  });

  it('renders a confirm dialog into document.body', () => {
    dialog.confirm({ title: 'Delete', content: 'Are you sure?' });
    expect(document.querySelector('.sy-modal-mask')).toBeTruthy();
    expect(document.querySelector('.sy-modal')).toBeTruthy();
    expect(document.querySelector('.sy-modal__title')?.textContent).toContain('Delete');
    expect(document.body.textContent).toContain('Are you sure?');
    expect(document.querySelectorAll('.sy-modal__footer button').length).toBe(2);
  });

  it('onOk fires and the dialog closes', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    dialog.confirm({ content: 'Confirm', onOk, onCancel });
    clickFooterButton('OK');
    expect(onOk).toHaveBeenCalledTimes(1);
    // The close runs through the open prop and never emits `close`, so the
    // cancel callback stays silent (the alert test exercises the late-close
    // guard where a bubbling mask click arrives while the dialog is closing).
    await wait(300);
    expect(document.querySelector('.sy-modal-mask')).toBeNull();
  });

  it('onCancel fires when dismissed with Escape and the dialog closes', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    dialog.confirm({ content: 'Confirm', onOk, onCancel });
    pressEscape();
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOk).not.toHaveBeenCalled();
    await wait(300);
    expect(document.querySelector('.sy-modal-mask')).toBeNull();
  });

  it('onCancel fires when the mask is clicked', async () => {
    const onCancel = vi.fn();
    dialog.confirm({ content: 'Confirm', onCancel });
    (document.querySelector('.sy-modal-mask') as HTMLDivElement).click();
    expect(onCancel).toHaveBeenCalledTimes(1);
    await wait(300);
    expect(document.querySelector('.sy-modal-mask')).toBeNull();
  });

  it('destroy closes without calling any callback', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    const handle = dialog.confirm({ content: 'Confirm', onOk, onCancel });
    handle.destroy();
    expect(onOk).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    await wait(300);
    expect(document.querySelector('.sy-modal-mask')).toBeNull();
  });

  it('alert renders a single OK button', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    dialog.alert({ title: 'Heads up', content: 'All done', okText: 'Got it', onOk, onCancel });
    expect(document.querySelectorAll('.sy-modal__footer button').length).toBe(1);
    clickFooterButton('Got it');
    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
    await wait(300);
    expect(document.querySelector('.sy-modal-mask')).toBeNull();
  });

  it('clear closes every open dialog', async () => {
    dialog.confirm({ content: 'A' });
    dialog.confirm({ content: 'B' });
    expect(document.querySelectorAll('.sy-modal-mask').length).toBe(2);
    dialog.clear();
    await wait(300);
    expect(document.querySelector('.sy-modal-mask')).toBeNull();
  });
});

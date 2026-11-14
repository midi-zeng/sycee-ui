import { mount } from '@vue/test-utils';
import Button from '../button/Button.vue';
import { message } from './message';

describe('message', () => {
  afterEach(() => {
    // Do NOT remove the wrapper div: the message singleton keeps rendering
    // into the same container for the lifetime of the page.
    message.clear();
  });

  it('renders a message with modifier class and content', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Save' },
      attrs: { onClick: () => message.success('Saved!') },
    });
    await wrapper.trigger('click');

    const el = document.querySelector('.sy-message-wrapper');
    expect(el).toBeTruthy();
    expect(el?.getAttribute('role')).toBe('status');
    expect(el?.getAttribute('aria-live')).toBe('polite');
    expect(document.querySelector('.sy-message--success')).toBeTruthy();
    expect(document.body.textContent).toContain('Saved!');
  });

  it('maps types to modifier classes', () => {
    message.info('A');
    message.warning('B');
    message.danger('C');
    expect(document.querySelector('.sy-message--info')).toBeTruthy();
    expect(document.querySelector('.sy-message--warning')).toBeTruthy();
    expect(document.querySelector('.sy-message--danger')).toBeTruthy();
  });

  it('auto-removes after the duration', async () => {
    message.info('Temporary', 50);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    expect(document.querySelector('.sy-message')).toBeNull();
  });

  it('caps the stack at 8 items', () => {
    for (let i = 0; i < 10; i += 1) {
      message.info(`Message ${i}`);
    }
    expect(document.querySelectorAll('.sy-message').length).toBeLessThanOrEqual(8);
  });

  it('clear removes all messages', async () => {
    message.info('A');
    message.info('B');
    message.clear();
    // Items leave with an exit animation (.is-closing) then unmount after 200ms.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(document.querySelector('.sy-message')).toBeNull();
  });
});

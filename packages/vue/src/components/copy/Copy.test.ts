import { defineComponent, h } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { LocaleProvider } from '../../locale';
import Copy from './Copy.vue';

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

  it('copies text and emits localized success feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    const Host = defineComponent({
      setup() {
        return () => h(LocaleProvider, { locale: 'zh' }, () => h(Copy, { text: 'hello' }));
      },
    });
    const wrapper = mount(Host);
    const button = wrapper.find('button');

    await button.trigger('click');
    await flushPromises();

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(wrapper.find('[role="status"]').text()).toBe('已复制');
    expect(button.classes()).toContain('is-copied');
  });

  it('renders an icon-only button with an accessible state label', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    const wrapper = mount(Copy, { props: { text: 'api-key', iconOnly: true } });

    expect(wrapper.classes()).toContain('sy-copy--icon-only');
    expect(wrapper.attributes('aria-label')).toBe('Copy');
    await wrapper.trigger('click');
    await flushPromises();

    expect(wrapper.attributes('aria-label')).toBe('Copied');
    expect(wrapper.emitted('copied')?.[0]).toEqual(['api-key']);
  });

  it('reports a failed copy', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });
    const wrapper = mount(Copy, { props: { text: 'secret' } });

    await wrapper.trigger('click');
    await flushPromises();

    expect(wrapper.find('[role="status"]').text()).toBe('Copy failed');
    expect(wrapper.classes()).toContain('is-error');
    expect(wrapper.emitted('copyError')).toBeTruthy();
  });

  it('does not copy while disabled', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    const wrapper = mount(Copy, { props: { text: 'secret', disabled: true } });

    await wrapper.trigger('click');

    expect(writeText).not.toHaveBeenCalled();
  });
});

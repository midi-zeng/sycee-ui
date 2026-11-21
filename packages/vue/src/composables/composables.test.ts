import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { useClickOutside } from './useClickOutside';
import { useDebouncedValue } from './useDebouncedValue';
import { useEventListener } from './useEventListener';
import { useLocalStorage } from './useLocalStorage';
import { useMediaQuery } from './useMediaQuery';
import { useMounted } from './useMounted';

describe('composables', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it('reports mounted state', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const mounted = useMounted();
          return () => h('span', mounted.value ? 'mounted' : 'pending');
        },
      }),
    );

    await nextTick();
    expect(wrapper.text()).toBe('mounted');
    wrapper.unmount();
  });

  it('debounces value changes', async () => {
    vi.useFakeTimers();
    const value = ref('first');
    const wrapper = mount(
      defineComponent({
        setup() {
          const debouncedValue = useDebouncedValue(value, 200);
          return () => h('span', debouncedValue.value);
        },
      }),
    );

    value.value = 'second';
    await nextTick();
    expect(wrapper.text()).toBe('first');

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();
    expect(wrapper.text()).toBe('second');
    wrapper.unmount();
  });

  it('attaches and removes event listeners', () => {
    const target = new EventTarget();
    const listener = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup() {
          useEventListener('change', listener, target);
          return () => h('span');
        },
      }),
    );

    target.dispatchEvent(new Event('change'));
    expect(listener).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    target.dispatchEvent(new Event('change'));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('detects pointer interaction outside the target', async () => {
    const onOutside = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup() {
          const root = ref<HTMLElement>();
          useClickOutside(root, onOutside);
          return () =>
            h('div', [
              h('div', { ref: root, class: 'inside' }, 'Inside'),
              h('button', { class: 'outside' }, 'Outside'),
            ]);
        },
      }),
      { attachTo: document.body },
    );
    await nextTick();

    wrapper
      .find('.inside')
      .element.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    expect(onOutside).not.toHaveBeenCalled();

    wrapper
      .find('.outside')
      .element.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    expect(onOutside).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('tracks media query changes', async () => {
    let changeListener: (() => void) | undefined;
    const mediaState = { matches: false };
    const mediaQuery = {
      get matches() {
        return mediaState.matches;
      },
      addEventListener: vi.fn((_event: string, listener: () => void) => {
        changeListener = listener;
      }),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));

    const wrapper = mount(
      defineComponent({
        setup() {
          const matches = useMediaQuery('(min-width: 800px)');
          return () => h('span', matches.value ? 'wide' : 'narrow');
        },
      }),
    );
    expect(wrapper.text()).toBe('narrow');

    mediaState.matches = true;
    changeListener?.();
    await nextTick();
    expect(wrapper.text()).toBe('wide');
    wrapper.unmount();
  });

  it('reads, updates, resets, and restores local storage values', async () => {
    window.localStorage.setItem('sycee-vue-theme', JSON.stringify('dark'));
    let setValue: (value: string | ((previous: string) => string)) => void =
      () => {};
    let removeValue = () => {};

    const wrapper = mount(
      defineComponent({
        setup() {
          const [value, set, remove] = useLocalStorage(
            'sycee-vue-theme',
            'light',
          );
          setValue = set;
          removeValue = remove;
          return () => h('span', value.value);
        },
      }),
    );
    await nextTick();
    expect(wrapper.text()).toBe('dark');

    setValue((current) => `${current}-contrast`);
    await nextTick();
    expect(wrapper.text()).toBe('dark-contrast');
    expect(window.localStorage.getItem('sycee-vue-theme')).toBe(
      JSON.stringify('dark-contrast'),
    );

    removeValue();
    await nextTick();
    expect(wrapper.text()).toBe('light');
    expect(window.localStorage.getItem('sycee-vue-theme')).toBeNull();
    wrapper.unmount();
  });
});

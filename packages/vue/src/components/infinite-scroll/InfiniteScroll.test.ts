import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import InfiniteScroll from './InfiniteScroll.vue';

let observerCallback: IntersectionObserverCallback | undefined;
let observerOptions: IntersectionObserverInit | undefined;
const observe = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    observerCallback = callback;
    observerOptions = options;
  }

  observe = observe;
  disconnect = disconnect;
}

function intersect() {
  observerCallback?.(
    [{ isIntersecting: true } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );
}

describe('InfiniteScroll', () => {
  beforeEach(() => {
    observerCallback = undefined;
    observerOptions = undefined;
    observe.mockClear();
    disconnect.mockClear();
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes the sentinel and emits loadMore only once per intersection', async () => {
    const wrapper = mount(InfiniteScroll, {
      slots: { default: '<p>Row 1</p>' },
    });
    await nextTick();

    expect(wrapper.text()).toContain('Row 1');
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observerOptions?.rootMargin).toBe('0px 0px 120px 0px');

    intersect();
    intersect();
    await nextTick();
    expect(wrapper.emitted('loadMore')).toHaveLength(1);
  });

  it('uses the root as the observer boundary in contained mode', async () => {
    const wrapper = mount(InfiniteScroll, {
      props: { height: 320 },
      slots: { default: '<p>Row</p>' },
    });
    await nextTick();

    expect(wrapper.classes()).toContain('sy-infinite-scroll--contained');
    expect(wrapper.attributes('style')).toContain('height: 320px');
    expect(observerOptions?.root).toBe(wrapper.element);
  });

  it('suspends observation while loading or finished', async () => {
    const wrapper = mount(InfiniteScroll, {
      props: { loading: true },
    });
    await nextTick();

    expect(wrapper.get('[role="status"]').text()).toContain('Loading more');
    expect(observe).not.toHaveBeenCalled();

    await wrapper.setProps({ loading: false });
    expect(observe).toHaveBeenCalledTimes(1);

    await wrapper.setProps({ finished: true });
    expect(wrapper.get('[role="status"]').text()).toContain('No more content');
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('announces errors and retries through loadMore', async () => {
    const wrapper = mount(InfiniteScroll, {
      props: { error: true },
    });
    await nextTick();

    expect(wrapper.get('[role="alert"]').text()).toContain('Failed to load content');
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('loadMore')).toHaveLength(1);
  });

  it('accepts custom status slots', async () => {
    const wrapper = mount(InfiniteScroll, {
      props: { loading: true },
      slots: { loading: 'Fetching next page' },
    });
    await nextTick();
    expect(wrapper.get('[role="status"]').text()).toContain('Fetching next page');

    await wrapper.setProps({ loading: false, finished: true });
    expect(wrapper.get('[role="status"]').text()).toContain('No more content');
  });
});

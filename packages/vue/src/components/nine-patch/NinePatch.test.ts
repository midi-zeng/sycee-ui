import { mount, flushPromises } from '@vue/test-utils';
import NinePatch from './NinePatch.vue';

const { getRenderData } = vi.hoisted(() => ({
  // Never resolves by default so tests that parse must set an explicit result
  getRenderData: vi.fn(() => new Promise(() => {})),
}));

vi.mock('ninepatch-core', () => ({
  NinePatchCore: class {
    constructor(public src: string) {}
    getRenderData = getRenderData;
  },
}));

const GOLDEN_RENDER_DATA = {
  padding: { left: 10, right: 20, top: 10, bottom: 20 },
  xDivs: { start: 14, stop: 29 },
  yDivs: { start: 14, stop: 29 },
  xDivsList: [{ start: 14, stop: 29 }],
  yDivsList: [{ start: 14, stop: 29 }],
  width: 180,
  height: 120,
};

describe('NinePatch', () => {
  it('renders its default slot with the block class', () => {
    const wrapper = mount(NinePatch, { props: { src: '/btn.9.png' }, slots: { default: 'hello' } });
    expect(wrapper.text()).toBe('hello');
    expect(wrapper.classes()).toContain('sy-nine-patch');
  });

  it('applies parsed chunk data as border-image styles', async () => {
    getRenderData.mockResolvedValue(GOLDEN_RENDER_DATA);

    const wrapper = mount(NinePatch, { props: { src: '/btn.9.png' } });
    await flushPromises();
    const el = wrapper.element as HTMLElement;

    expect(el.style.borderImageSource).toContain('/btn.9.png');
    expect(el.style.borderImageSlice).toBe('14 151 91 14 fill');
    expect(el.style.borderImageWidth).toBe('14px 151px 91px 14px');
    expect(el.style.paddingTop).toBe('10px');
    expect(el.style.paddingRight).toBe('20px');
    expect(el.style.paddingBottom).toBe('20px');
    expect(el.style.paddingLeft).toBe('10px');
  });

  it('applies clip-path for raw sources with a border inset', async () => {
    getRenderData.mockResolvedValue({ ...GOLDEN_RENDER_DATA, borderInset: 1 });

    const wrapper = mount(NinePatch, { props: { src: '/btn.9.png' } });
    await flushPromises();

    expect((wrapper.element as HTMLElement).style.clipPath).toBe('inset(1px)');
  });

  it('custom options skip image parsing entirely', () => {
    const wrapper = mount(NinePatch, {
      props: {
        src: '/btn.9.png',
        customOptions: { padding: { top: 5 }, borderImageSlice: { left: 2, right: 3 }, borderInset: 1 },
      },
    });
    const el = wrapper.element as HTMLElement;

    expect(getRenderData).not.toHaveBeenCalled();
    expect(el.style.paddingTop).toBe('5px');
    expect(el.style.paddingRight).toBe('0px');
    expect(el.style.borderImageSlice).toBe('0 3 0 2 fill');
    expect(el.style.clipPath).toBe('inset(1px)');
  });

  it('custom options drop previously parsed chunk data', async () => {
    getRenderData.mockResolvedValue(GOLDEN_RENDER_DATA);

    const wrapper = mount(NinePatch, { props: { src: '/btn.9.png' } });
    await flushPromises();
    expect(getRenderData).toHaveBeenCalled();

    await wrapper.setProps({ customOptions: { padding: { left: 7 } } });
    const el = wrapper.element as HTMLElement;

    expect(el.style.paddingLeft).toBe('7px');
    expect(el.style.borderImageSlice).not.toContain('14');
  });

  it('ignores stale responses after src changes', async () => {
    let resolveA: (value: unknown) => void = () => {};
    getRenderData.mockImplementation(function mock(this: { src: string }) {
      if (this.src === '/a.png') {
        return new Promise((resolve) => {
          resolveA = resolve;
        });
      }
      return Promise.resolve({ ...GOLDEN_RENDER_DATA, borderInset: 9 });
    });

    const wrapper = mount(NinePatch, { props: { src: '/a.png' } });
    await flushPromises();
    await wrapper.setProps({ src: '/b.png' });
    await flushPromises();
    expect((wrapper.element as HTMLElement).style.clipPath).toBe('inset(9px)');

    resolveA({ ...GOLDEN_RENDER_DATA, borderInset: 1 });
    await flushPromises();

    // the late response for /a.png must not overwrite /b.png
    expect((wrapper.element as HTMLElement).style.clipPath).toBe('inset(9px)');
  });

  it('parse failures render without border-image data', async () => {
    getRenderData.mockRejectedValue(new Error('network down'));

    const wrapper = mount(NinePatch, { props: { src: '/broken.png' } });
    await flushPromises();
    const el = wrapper.element as HTMLElement;

    expect(el.style.paddingTop).toBe('0px');
    expect(el.style.borderImageSlice).not.toContain('14');
  });

  it('merges the block class with attrs class and style', () => {
    const wrapper = mount(NinePatch, {
      props: { src: '/btn.9.png' },
      attrs: { class: 'custom', style: { height: '50px' } },
    });

    expect(wrapper.classes()).toContain('sy-nine-patch');
    expect(wrapper.classes()).toContain('custom');
    expect((wrapper.element as HTMLElement).style.height).toBe('50px');
  });
});

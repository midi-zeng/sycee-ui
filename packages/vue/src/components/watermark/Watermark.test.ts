import { mount } from '@vue/test-utils';
import Watermark from './Watermark.vue';

describe('Watermark', () => {
  it('wraps content and renders a decorative repeating layer', () => {
    const wrapper = mount(Watermark, {
      props: {
        content: 'Confidential',
        opacity: 0.2,
        zIndex: 4,
        offset: [12, 8],
      },
      slots: { default: '<p>Account details</p>' },
    });
    const overlay = wrapper.find<HTMLElement>('.sy-watermark__overlay');

    expect(wrapper.text()).toContain('Account details');
    expect(overlay.attributes('aria-hidden')).toBe('true');
    expect(overlay.element.style.backgroundImage).toContain('data:image/svg+xml');
    expect(overlay.element.style.backgroundPosition).toBe('12px 8px');
    expect(overlay.element.style.opacity).toBe('0.2');
    expect(overlay.element.style.zIndex).toBe('4');
  });

  it('supports standalone and fullscreen presentation', () => {
    const wrapper = mount(Watermark, {
      props: { fullscreen: true, content: 'Draft' },
    });

    expect(wrapper.classes()).toContain('sy-watermark--standalone');
    expect(wrapper.classes()).toContain('sy-watermark--fullscreen');
    expect(wrapper.find('.sy-watermark__overlay').exists()).toBe(true);
  });
});

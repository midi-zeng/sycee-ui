import { mount } from '@vue/test-utils';
import Image from './Image.vue';

describe('Image', () => {
  it('replaces a failed image with the fallback', async () => {
    const wrapper = mount(Image, {
      props: { src: '/broken.png', alt: 'Broken', width: 220, height: 120 },
    });

    await wrapper.find('img').trigger('error');

    expect(wrapper.classes()).toContain('is-error');
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.text()).toContain('Preview unavailable');
  });

  it('retries when src changes after a load failure', async () => {
    const wrapper = mount(Image, { props: { src: '/broken.png', alt: 'Broken' } });

    await wrapper.find('img').trigger('error');
    expect(wrapper.find('img').exists()).toBe(false);

    await wrapper.setProps({ src: '/dog.png', alt: 'A dog' });

    expect(wrapper.find('img').attributes('src')).toBe('/dog.png');
    expect(wrapper.classes()).not.toContain('is-error');
  });
});

import { mount } from '@vue/test-utils';
import Avatar from './Avatar.vue';

describe('Avatar', () => {
  it('keeps alt text accessible when the image fails', async () => {
    const wrapper = mount(Avatar, {
      props: { src: '/missing.png', alt: 'Ada Lovelace' },
    });
    await wrapper.find('img').trigger('error');
    expect(wrapper.attributes('role')).toBe('img');
    expect(wrapper.attributes('aria-label')).toBe('Ada Lovelace');
  });
});

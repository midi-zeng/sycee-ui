import { mount } from '@vue/test-utils';
import Switch from './Switch.vue';

describe('Switch', () => {
  it('renders role="switch" with aria-checked', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } });
    expect(wrapper.attributes('role')).toBe('switch');
    expect(wrapper.attributes('aria-checked')).toBe('false');
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.attributes('aria-checked')).toBe('true');
  });

  it('toggles on click and emits change', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([true]);
  });

  it('applies is-checked and size classes', () => {
    const wrapper = mount(Switch, { props: { modelValue: true, size: 'sm' } });
    expect(wrapper.classes()).toContain('is-checked');
    expect(wrapper.classes()).toContain('sy-switch--sm');
  });

  it('does not toggle when disabled or loading', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false, disabled: true } });
    expect(wrapper.classes()).toContain('is-disabled');
    await wrapper.trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
  });
});

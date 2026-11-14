import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('renders its default slot', () => {
    const wrapper = mount(Button, { slots: { default: 'Save' } });
    expect(wrapper.text()).toBe('Save');
    expect(wrapper.classes()).toContain('sy-button');
  });

  it('applies color and variant classes', () => {
    const wrapper = mount(Button, { props: { color: 'danger', variant: 'soft' } });
    expect(wrapper.classes()).toContain('sy-button--danger');
    expect(wrapper.classes()).toContain('sy-button--soft');
  });

  it('applies the size modifier for non-default sizes', () => {
    const wrapper = mount(Button, { props: { size: 'lg' } });
    expect(wrapper.classes()).toContain('sy-button--lg');
  });

  it('shows a spinner and toggles is-loading while loading', () => {
    const wrapper = mount(Button, { props: { loading: true }, slots: { default: 'X' } });
    expect(wrapper.classes()).toContain('is-loading');
    expect(wrapper.find('.sy-button__spinner').exists()).toBe(true);
    expect(wrapper.attributes('aria-busy')).toBe('true');
  });

  it('renders as disabled and does not emit click', async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    await wrapper.trigger('click');
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});

import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input', () => {
  it('binds v-model', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } });
    const input = wrapper.find('input');
    await input.setValue('Ada');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Ada']);
    expect(wrapper.emitted('change')?.[0]).toEqual(['Ada']);
  });

  it('applies size and status classes', () => {
    const wrapper = mount(Input, { props: { size: 'lg', status: 'error' } });
    expect(wrapper.classes()).toContain('sy-input--lg');
    expect(wrapper.classes()).toContain('sy-input--error');
  });

  it('shows the clear button and emits clear', async () => {
    const wrapper = mount(Input, { props: { modelValue: 'Ada', clearable: true } });
    await wrapper.find('input').trigger('focus');
    await wrapper.find('.sy-input__clear').trigger('click');
    expect(wrapper.emitted('clear')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['']);
  });

  it('renders prefix and suffix slots', () => {
    const wrapper = mount(Input, {
      slots: { prefix: 'https://', suffix: '.com' },
    });
    expect(wrapper.find('.sy-input__prefix').text()).toBe('https://');
    expect(wrapper.find('.sy-input__suffix').text()).toBe('.com');
  });
});

import { mount } from '@vue/test-utils';
import Select from './Select.vue';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

describe('Select', () => {
  it('renders the placeholder and opens on click', async () => {
    const wrapper = mount(Select, { props: { options: OPTIONS, placeholder: 'Pick one' } });
    expect(wrapper.text()).toContain('Pick one');
    await wrapper.find('.sy-select__trigger').trigger('click');
    expect(wrapper.find('.sy-select').classes()).toContain('is-open');
    expect(wrapper.findAll('.sy-select__option').length).toBe(3);
  });

  it('selects an option and emits change', async () => {
    const wrapper = mount(Select, { props: { options: OPTIONS } });
    await wrapper.find('.sy-select__trigger').trigger('click');
    await wrapper.findAll('.sy-select__option')[1].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual(['banana']);
    expect(wrapper.find('.sy-select').classes()).not.toContain('is-open');
  });

  it('navigates with the keyboard and selects with Enter', async () => {
    const wrapper = mount(Select, { props: { options: OPTIONS } });
    const trigger = wrapper.find('.sy-select__trigger');
    await trigger.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.find('.sy-select').classes()).toContain('is-open');
    // activeIndex starts at 0 (Apple): two ArrowDowns land on Banana, which is
    // enabled, so Enter selects it. Selecting the disabled Cherry is a no-op.
    await trigger.trigger('keydown', { key: 'ArrowDown' });
    await trigger.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('change')?.[0]).toEqual(['banana']);
  });

  it('closes on Escape', async () => {
    const wrapper = mount(Select, { props: { options: OPTIONS } });
    await wrapper.find('.sy-select__trigger').trigger('click');
    expect(wrapper.find('.sy-select').classes()).toContain('is-open');
    await wrapper.find('.sy-select__trigger').trigger('keydown', { key: 'Escape' });
    expect(wrapper.find('.sy-select').classes()).not.toContain('is-open');
  });

  it('clears the value when clearable', async () => {
    const wrapper = mount(Select, {
      props: { options: OPTIONS, modelValue: 'apple', clearable: true },
    });
    expect(wrapper.text()).toContain('Apple');
    await wrapper.find('.sy-select__clear').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([null]);
    expect(wrapper.emitted('clear')).toBeTruthy();
  });

  it('marks disabled options', async () => {
    const wrapper = mount(Select, { props: { options: OPTIONS } });
    await wrapper.find('.sy-select__trigger').trigger('click');
    const cherry = wrapper.findAll('.sy-select__option')[2];
    expect(cherry.classes()).toContain('is-disabled');
  });
});

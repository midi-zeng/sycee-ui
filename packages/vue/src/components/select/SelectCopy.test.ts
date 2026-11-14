import { mount } from '@vue/test-utils';
import Select from './Select.vue';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

describe('Select', () => {
  it('navigates with the keyboard and selects with Enter', async () => {
    const wrapper = mount(Select, { props: { options: OPTIONS } });
    const trigger = wrapper.find('.sy-select__trigger');
    await trigger.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.find('.sy-select').classes()).toContain('is-open');
    await trigger.trigger('keydown', { key: 'ArrowDown' });
    await trigger.trigger('keydown', { key: 'ArrowDown' });
    await trigger.trigger('keydown', { key: 'ArrowDown' });
    await trigger.trigger('keydown', { key: 'Enter' });
    console.log('KEYS:', JSON.stringify(Object.keys(wrapper.emitted() ?? {})));
    expect(wrapper.emitted('change')).toBeTruthy();
    wrapper.unmount();
  });
});

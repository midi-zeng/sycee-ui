import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { LocaleProvider } from '../locale';
import Carousel from './carousel/Carousel.vue';
import Countdown from './countdown/Countdown.vue';
import Danmaku from './danmaku/Danmaku.vue';
import Empty from './empty/Empty.vue';
import InputNumber from './input-number/InputNumber.vue';
import Marquee from './marquee/Marquee.vue';
import Select from './select/Select.vue';
import Spinner from './spinner/Spinner.vue';

describe('localization', () => {
  it('defaults to English', () => {
    const wrapper = mount({
      components: { Empty, Spinner },
      template: '<div><Empty /><Spinner /></div>',
    });
    expect(wrapper.text()).toContain('No data');
    expect(wrapper.find('.sy-spinner').attributes('aria-label')).toBe('Loading');
  });

  it('uses Chinese copy inside LocaleProvider', () => {
    const wrapper = mount(LocaleProvider, {
      props: { locale: 'zh' },
      slots: {
        default: () => h('div', [h(Empty), h(Spinner)]),
      },
    });
    expect(wrapper.text()).toContain('暂无数据');
    expect(wrapper.find('.sy-spinner').attributes('aria-label')).toBe('加载中');
  });

  it('localizes an empty select placeholder', () => {
    const wrapper = mount(LocaleProvider, {
      props: { locale: 'zh' },
      slots: {
        default: () => h(Select, { options: [{ label: 'One', value: 1 }] }),
      },
    });
    expect(wrapper.find('.sy-select__placeholder').text()).toBe('请选择');
  });

  it('keeps an explicitly cleared input number empty', () => {
    const wrapper = mount(InputNumber, {
      props: { modelValue: null, defaultValue: 5 },
    });
    expect(wrapper.find('input').element.value).toBe('');
  });
});

describe('motion components', () => {
  it('renders a formatted countdown', () => {
    const wrapper = mount(Countdown, {
      props: {
        target: Date.now() + 65_000,
        format: 'HH:mm:ss',
        label: 'Time left',
      },
    });
    expect(wrapper.attributes('role')).toBe('timer');
    expect(wrapper.attributes('aria-label')).toBe('Time left');
    expect(wrapper.text()).toContain('00:01:0');
    wrapper.unmount();
  });

  it('emits finish for an already-expired target', async () => {
    const wrapper = mount(Countdown, {
      props: { target: Date.now() - 1_000 },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('finish')).toHaveLength(1);
    wrapper.unmount();
  });

  it('emits finish again when target changes to an expired time', async () => {
    const wrapper = mount(Countdown, {
      props: { target: Date.now() + 60_000 },
    });
    expect(wrapper.emitted('finish')).toBeUndefined();
    await wrapper.setProps({ target: Date.now() - 1_000 });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('finish')).toHaveLength(1);
    wrapper.unmount();
  });

  it('navigates carousel slides with the keyboard', async () => {
    const wrapper = mount(Carousel, {
      props: {
        autoplay: false,
        items: [{ content: 'First' }, { content: 'Second' }],
      },
    });
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    const slides = wrapper.findAll('.sy-carousel__slide');
    expect(slides[1].attributes('aria-hidden')).toBe('false');
    expect(slides[0].attributes('inert')).toBeDefined();
    expect(slides[1].attributes('inert')).toBeUndefined();
  });

  it('renders danmaku and marquee content', () => {
    const danmaku = mount(Danmaku, {
      props: { items: [{ content: 'Hello' }], loop: false },
    });
    expect(danmaku.attributes('role')).toBe('log');
    expect(danmaku.text()).toContain('Hello');

    const marquee = mount(Marquee, { slots: { default: 'News' } });
    expect(marquee.findAll('.sy-marquee__group')).toHaveLength(2);
    expect(marquee.find('.sy-marquee__group[aria-hidden="true"]').text()).toBe('News');
  });
});

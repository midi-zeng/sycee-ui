import { fireEvent, render, screen } from '@testing-library/react';
import { LocaleProvider } from '../locale';
import { Carousel } from './carousel/Carousel';
import { Countdown } from './countdown/Countdown';
import { Danmaku } from './danmaku/Danmaku';
import { Empty } from './empty/Empty';
import { Marquee } from './marquee/Marquee';
import { Spinner } from './spinner/Spinner';

describe('localization', () => {
  it('defaults to English', () => {
    render(
      <>
        <Empty />
        <Spinner />
      </>,
    );
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('uses Chinese copy inside LocaleProvider', () => {
    render(
      <LocaleProvider locale="zh">
        <Empty />
        <Spinner />
      </LocaleProvider>,
    );
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: '加载中' })).toBeInTheDocument();
  });
});

describe('motion components', () => {
  it('renders a formatted countdown', () => {
    render(
      <Countdown
        target={Date.now() + 65_000}
        format="HH:mm:ss"
        label="Time left"
      />,
    );
    expect(screen.getByRole('timer', { name: 'Time left' })).toHaveTextContent('00:01:0');
  });

  it('fires finish again for a new expired target', () => {
    const onFinish = vi.fn();
    const { rerender } = render(
      <Countdown target={Date.now() + 60_000} onFinish={onFinish} />,
    );
    rerender(<Countdown target={Date.now() - 1_000} onFinish={onFinish} />);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('moves the carousel to the next slide', () => {
    const { container } = render(
      <Carousel
        autoplay={false}
        items={[{ content: 'First' }, { content: 'Second' }]}
      />,
    );
    const region = screen.getByRole('region');
    expect(region).toHaveClass('sy-carousel');
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    const slides = container.querySelectorAll('.sy-carousel__slide');
    expect(slides[0]).toHaveAttribute('inert');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'false');
    expect(slides[1]).not.toHaveAttribute('inert');
  });

  it('renders danmaku and marquee content', () => {
    const { container } = render(
      <>
        <Danmaku items={[{ content: 'Hello' }]} loop={false} />
        <Marquee>News</Marquee>
      </>,
    );
    expect(screen.getByRole('log')).toHaveTextContent('Hello');
    expect(container.querySelectorAll('.sy-marquee__group')).toHaveLength(2);
    expect(container.querySelector('.sy-marquee__group[aria-hidden="true"]')).toHaveTextContent('News');
  });
});

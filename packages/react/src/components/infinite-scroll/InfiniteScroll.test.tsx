import { act, fireEvent, render, screen } from '@testing-library/react';
import { InfiniteScroll } from './InfiniteScroll';

let observerCallback: IntersectionObserverCallback | undefined;
let observerOptions: IntersectionObserverInit | undefined;
const observe = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    observerCallback = callback;
    observerOptions = options;
  }

  observe = observe;
  disconnect = disconnect;
}

function intersect() {
  act(() => {
    observerCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe('InfiniteScroll', () => {
  beforeEach(() => {
    observerCallback = undefined;
    observerOptions = undefined;
    observe.mockClear();
    disconnect.mockClear();
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes the sentinel and loads only once per intersection', () => {
    const onLoadMore = vi.fn();
    render(
      <InfiniteScroll onLoadMore={onLoadMore}>
        <p>Row 1</p>
      </InfiniteScroll>,
    );

    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observerOptions?.rootMargin).toBe('0px 0px 120px 0px');

    intersect();
    intersect();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('uses the root as the observer boundary in contained mode', () => {
    const { container } = render(
      <InfiniteScroll height={320}>
        <p>Row</p>
      </InfiniteScroll>,
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('sy-infinite-scroll--contained');
    expect(root).toHaveStyle({ height: '320px' });
    expect(observerOptions?.root).toBe(root);
  });

  it('suspends observation while loading or finished', () => {
    const { rerender } = render(<InfiniteScroll loading />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading more');
    expect(observe).not.toHaveBeenCalled();

    rerender(<InfiniteScroll />);
    expect(observe).toHaveBeenCalledTimes(1);

    rerender(<InfiniteScroll finished />);
    expect(screen.getByRole('status')).toHaveTextContent('No more content');
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('announces errors and retries through loadMore', () => {
    const onLoadMore = vi.fn();
    render(
      <InfiniteScroll error onLoadMore={onLoadMore}>
        <p>Row</p>
      </InfiniteScroll>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load content');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('accepts custom status copy', () => {
    const { rerender } = render(
      <InfiniteScroll loading loadingContent="Fetching next page" />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Fetching next page');

    rerender(<InfiniteScroll finished finishedContent="That is all" />);
    expect(screen.getByRole('status')).toHaveTextContent('That is all');
  });
});

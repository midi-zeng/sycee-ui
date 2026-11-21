import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { useClickOutside } from './useClickOutside';
import { useDebouncedValue } from './useDebouncedValue';
import { useEventListener } from './useEventListener';
import { useLocalStorage } from './useLocalStorage';
import { useMediaQuery } from './useMediaQuery';
import { useMounted } from './useMounted';

describe('hooks', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it('reports mounted state after effects run', async () => {
    const { result } = renderHook(() => useMounted());

    await waitFor(() => expect(result.current).toBe(true));
  });

  it('debounces value changes', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 200),
      { initialProps: { value: 'first' } },
    );

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    act(() => vi.advanceTimersByTime(199));
    expect(result.current).toBe('first');

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('second');
  });

  it('uses the latest listener and removes it on unmount', () => {
    const target = new EventTarget();
    const first = vi.fn();
    const second = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ listener }) => useEventListener('change', listener, target),
      { initialProps: { listener: first } },
    );

    act(() => target.dispatchEvent(new Event('change')));
    expect(first).toHaveBeenCalledTimes(1);

    rerender({ listener: second });
    act(() => target.dispatchEvent(new Event('change')));
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    unmount();
    target.dispatchEvent(new Event('change'));
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('detects pointer interaction outside the returned ref', () => {
    const onOutside = vi.fn();

    function Demo() {
      const ref = useClickOutside<HTMLDivElement>(onOutside);
      return (
        <div>
          <div ref={ref}>Inside</div>
          <button type="button">Outside</button>
        </div>
      );
    }

    render(<Demo />);
    fireEvent.pointerDown(screen.getByText('Inside'));
    expect(onOutside).not.toHaveBeenCalled();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it('tracks media query changes', () => {
    let changeListener: (() => void) | undefined;
    const mediaState = { matches: false };
    const mediaQuery = {
      get matches() {
        return mediaState.matches;
      },
      addEventListener: vi.fn((_event: string, listener: () => void) => {
        changeListener = listener;
      }),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));

    const { result } = renderHook(() => useMediaQuery('(min-width: 800px)'));
    expect(result.current).toBe(false);

    mediaState.matches = true;
    act(() => changeListener?.());
    expect(result.current).toBe(true);
  });

  it('reads, updates, resets, and restores local storage values', () => {
    window.localStorage.setItem('sycee-hook-theme', JSON.stringify('dark'));
    const { result } = renderHook(() =>
      useLocalStorage('sycee-hook-theme', 'light'),
    );
    expect(result.current[0]).toBe('dark');

    act(() => result.current[1]((current) => `${current}-contrast`));
    expect(result.current[0]).toBe('dark-contrast');
    expect(window.localStorage.getItem('sycee-hook-theme')).toBe(
      JSON.stringify('dark-contrast'),
    );

    act(() => result.current[2]());
    expect(result.current[0]).toBe('light');
    expect(window.localStorage.getItem('sycee-hook-theme')).toBeNull();
  });

  it('keeps local storage state in memory when persistence fails', () => {
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementationOnce(() => {
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      });
    const { result } = renderHook(() =>
      useLocalStorage('sycee-hook-quota', 'light'),
    );

    act(() => result.current[1]('dark'));
    expect(result.current[0]).toBe('dark');
    expect(setItem).toHaveBeenCalled();
    setItem.mockRestore();
  });
});

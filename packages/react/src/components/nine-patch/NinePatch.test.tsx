import { createRef } from 'react';
import { render, waitFor } from '@testing-library/react';
import { NinePatch } from './NinePatch';

const { getRenderData } = vi.hoisted(() => ({
  // Never resolves by default so tests that parse must set an explicit result
  getRenderData: vi.fn(() => new Promise(() => {})),
}));

vi.mock('ninepatch-core', () => ({
  NinePatchCore: class {
    constructor(public src: string) {}
    getRenderData = getRenderData;
  },
}));

const GOLDEN_RENDER_DATA = {
  padding: { left: 10, right: 20, top: 10, bottom: 20 },
  xDivs: { start: 14, stop: 29 },
  yDivs: { start: 14, stop: 29 },
  xDivsList: [{ start: 14, stop: 29 }],
  yDivsList: [{ start: 14, stop: 29 }],
  width: 180,
  height: 120,
};

describe('NinePatch', () => {
  it('renders its children with the block class', () => {
    const { getByText, container } = render(<NinePatch src="/btn.9.png">hello</NinePatch>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass('sy-nine-patch');
  });

  it('applies parsed chunk data as border-image styles', async () => {
    getRenderData.mockResolvedValue(GOLDEN_RENDER_DATA);

    const { container } = render(<NinePatch src="/btn.9.png">x</NinePatch>);
    const el = container.firstElementChild as HTMLElement;

    await waitFor(() => expect(el.style.borderImageSource).toContain('/btn.9.png'));
    expect(el.style.borderImageSlice).toBe('14 151 91 14 fill');
    expect(el.style.borderImageWidth).toBe('14px 151px 91px 14px');
    expect(el.style.paddingTop).toBe('10px');
    expect(el.style.paddingRight).toBe('20px');
    expect(el.style.paddingBottom).toBe('20px');
    expect(el.style.paddingLeft).toBe('10px');
  });

  it('applies clip-path for raw sources with a border inset', async () => {
    getRenderData.mockResolvedValue({ ...GOLDEN_RENDER_DATA, borderInset: 1 });

    const { container } = render(<NinePatch src="/btn.9.png">x</NinePatch>);
    const el = container.firstElementChild as HTMLElement;

    await waitFor(() => expect(el.style.clipPath).toBe('inset(1px)'));
  });

  it('custom options skip image parsing entirely', () => {
    const { container } = render(
      <NinePatch
        src="/btn.9.png"
        customOptions={{ padding: { top: 5 }, borderImageSlice: { left: 2, right: 3 }, borderInset: 1 }}
      >
        x
      </NinePatch>,
    );
    const el = container.firstElementChild as HTMLElement;

    expect(getRenderData).not.toHaveBeenCalled();
    expect(el.style.paddingTop).toBe('5px');
    expect(el.style.paddingRight).toBe('0px');
    expect(el.style.borderImageSlice).toBe('0 3 0 2 fill');
    expect(el.style.clipPath).toBe('inset(1px)');
  });

  it('custom options drop previously parsed chunk data', async () => {
    getRenderData.mockResolvedValue(GOLDEN_RENDER_DATA);

    const { container, rerender } = render(<NinePatch src="/btn.9.png">x</NinePatch>);
    await waitFor(() => expect(getRenderData).toHaveBeenCalled());

    rerender(
      <NinePatch src="/btn.9.png" customOptions={{ padding: { left: 7 } }}>
        x
      </NinePatch>,
    );
    const el = container.firstElementChild as HTMLElement;

    expect(el.style.paddingLeft).toBe('7px');
    expect(el.style.borderImageSlice).not.toContain('14');
  });

  it('ignores stale responses after src changes', async () => {
    let resolveA: (value: unknown) => void = () => {};
    getRenderData.mockImplementation(function mock(this: { src: string }) {
      if (this.src === '/a.png') {
        return new Promise((resolve) => {
          resolveA = resolve;
        });
      }
      return Promise.resolve({ ...GOLDEN_RENDER_DATA, borderInset: 9 });
    });

    const { container, rerender } = render(<NinePatch src="/a.png">x</NinePatch>);
    rerender(<NinePatch src="/b.png">x</NinePatch>);
    await waitFor(() => expect((container.firstElementChild as HTMLElement).style.clipPath).toBe('inset(9px)'));

    resolveA({ ...GOLDEN_RENDER_DATA, borderInset: 1 });
    await new Promise((resolve) => setTimeout(resolve, 0));

    // the late response for /a.png must not overwrite /b.png
    expect((container.firstElementChild as HTMLElement).style.clipPath).toBe('inset(9px)');
  });

  it('parse failures render without border-image data', async () => {
    getRenderData.mockRejectedValue(new Error('network down'));

    const { container } = render(<NinePatch src="/broken.png">x</NinePatch>);
    const el = container.firstElementChild as HTMLElement;
    await waitFor(() => expect(el.style.paddingTop).toBe('0px'));
    expect(el.style.borderImageSlice).not.toContain('14');
  });

  it('merges the block class with className and style', () => {
    const { container } = render(
      <NinePatch src="/btn.9.png" className="custom" style={{ height: '50px' }}>
        x
      </NinePatch>,
    );
    const el = container.firstElementChild as HTMLElement;

    expect(el).toHaveClass('sy-nine-patch', 'custom');
    expect(el.style.height).toBe('50px');
  });

  it('forwards the ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <NinePatch ref={ref} src="/btn.9.png">
        x
      </NinePatch>,
    );
    expect(ref.current).toBe(container.firstElementChild);
  });
});

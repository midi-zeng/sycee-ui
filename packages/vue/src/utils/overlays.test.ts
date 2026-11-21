import { registerOverlay } from './overlays';

describe('overlay coordination', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('keeps the scroll lock until every overlay releases', () => {
    const first = registerOverlay();
    const second = registerOverlay();
    expect(document.body.style.overflow).toBe('hidden');
    first.release();
    expect(document.body.style.overflow).toBe('hidden');
    second.release();
    expect(document.body.style.overflow).toBe('');
  });
});

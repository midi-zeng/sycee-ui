import { fireEvent, render } from '@testing-library/react';
import { Drawer } from '../components/drawer/Drawer';
import { Modal } from '../components/modal/Modal';
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

  it('closes only the topmost Modal or Drawer on Escape', () => {
    const closeModal = vi.fn();
    const closeDrawer = vi.fn();
    const { unmount } = render(
      <>
        <Modal open title="Modal" onClose={closeModal}>
          Modal content
        </Modal>
        <Drawer open title="Drawer" onClose={closeDrawer}>
          Drawer content
        </Drawer>
      </>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(closeDrawer).toHaveBeenCalledTimes(1);
    expect(closeModal).not.toHaveBeenCalled();
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});

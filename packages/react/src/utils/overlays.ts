let lockCount = 0;
let previousOverflow = '';
let overlaySeed = 0;
let overlayStack: number[] = [];

export interface OverlayRegistration {
  id: number;
  release: () => void;
}

/** Registers a modal-like overlay with the shared scroll lock and Escape stack. */
export function registerOverlay(): OverlayRegistration {
  const id = (overlaySeed += 1);
  overlayStack.push(id);

  if (typeof document !== 'undefined') {
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;
  }

  return {
    id,
    release: () => {
      overlayStack = overlayStack.filter((entry) => entry !== id);
      if (typeof document === 'undefined') return;
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) document.body.style.overflow = previousOverflow;
    },
  };
}

/** Whether this registration is currently the topmost overlay. */
export function isTopOverlay(id: number): boolean {
  return overlayStack[overlayStack.length - 1] === id;
}

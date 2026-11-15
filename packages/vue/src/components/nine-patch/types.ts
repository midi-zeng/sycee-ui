/** Box edges (px) shared by padding and border-image-slice values. */
export interface NinePatchBoxEdges {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * Manual overrides. When set, the image is not parsed at all — the given
 * values are applied as-is.
 */
export interface NinePatchCustomOptions {
  padding?: NinePatchBoxEdges;
  borderImageSlice?: NinePatchBoxEdges;
  /** Border pixels to clip before rendering (1 for raw .9.png sources). */
  borderInset?: number;
}

export interface NinePatchProps {
  /** Nine-patch image URL — a raw `.9.png` source or an AAPT-compiled PNG. */
  src?: string;
  /** Manual overrides; skips image parsing entirely. */
  customOptions?: NinePatchCustomOptions;
}

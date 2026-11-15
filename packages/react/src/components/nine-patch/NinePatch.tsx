import { forwardRef, useEffect, useState } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { NinePatchCore } from 'ninepatch-core';
import type { NinePatchData } from 'ninepatch-core';
import { cx } from '../../utils/cx';

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

export interface NinePatchProps extends HTMLAttributes<HTMLDivElement> {
  /** Nine-patch image URL — a raw `.9.png` source or an AAPT-compiled PNG. */
  src?: string;
  /** Manual overrides; skips image parsing entirely. */
  customOptions?: NinePatchCustomOptions;
}

const DEFAULT_EDGES: Required<NinePatchBoxEdges> = { top: 0, right: 0, bottom: 0, left: 0 };

function resolveEdges(edges: NinePatchBoxEdges | undefined): Required<NinePatchBoxEdges> {
  return { ...DEFAULT_EDGES, ...edges };
}

function edgesToCss(edges: Required<NinePatchBoxEdges>, unit: 'px' | ''): string {
  const suffix = unit === 'px' ? 'px' : '';
  return `${edges.top}${suffix} ${edges.right}${suffix} ${edges.bottom}${suffix} ${edges.left}${suffix}`;
}

/**
 * Derive border-image-slice values from parsed render data.
 *
 * Horizontal insets come from xDivs and vertical ones from yDivs, matching
 * the CSS border-image-slice (top right bottom left) order.
 */
function renderDataToSlice(data: NinePatchData): Required<NinePatchBoxEdges> {
  const width = data.width ?? 0;
  const height = data.height ?? 0;
  return {
    top: data.yDivs.start,
    right: width - data.xDivs.stop,
    bottom: height - data.yDivs.stop,
    left: data.xDivs.start,
  };
}

/**
 * Render an Android nine-patch image as the stretchable background of its
 * content, using CSS `border-image`.
 *
 * - With `src`, the image is parsed with ninepatch-core (raw source or
 *   AAPT-compiled PNG).
 * - With `customOptions`, the values are applied manually and the image is
 *   not parsed.
 */
export const NinePatch = forwardRef<HTMLDivElement, NinePatchProps>(function NinePatch(
  { src, customOptions, className, style, children, ...rest },
  ref,
) {
  const [renderData, setRenderData] = useState<NinePatchData | null>(null);

  useEffect(() => {
    // Manual options win; drop any previously parsed data
    if (!src || customOptions) {
      setRenderData(null);
      return;
    }

    // Guard against races: only the latest src may update the state
    let cancelled = false;
    new NinePatchCore(src)
      .getRenderData()
      .then((data) => {
        if (!cancelled) setRenderData(data);
      })
      .catch(() => {
        if (!cancelled) setRenderData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src, customOptions]);

  const padding = resolveEdges(customOptions?.padding ?? renderData?.padding);
  const slice = resolveEdges(
    customOptions?.borderImageSlice ?? (renderData ? renderDataToSlice(renderData) : undefined),
  );
  const borderInset = customOptions?.borderInset ?? renderData?.borderInset ?? 0;

  const css: CSSProperties = {
    height: '100%',
    borderImageSource: src ? `url(${src})` : undefined,
    borderImageSlice: `${edgesToCss(slice, '')} fill`,
    // Longhands avoid lossy shorthand normalization for partial values
    borderImageWidth: edgesToCss(slice, 'px'),
    paddingTop: padding.top,
    paddingRight: padding.right,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    clipPath: borderInset ? `inset(${borderInset}px)` : undefined,
    ...style,
  };

  return (
    <div ref={ref} className={cx('sy-nine-patch', className)} style={css} {...rest}>
      {children}
    </div>
  );
});

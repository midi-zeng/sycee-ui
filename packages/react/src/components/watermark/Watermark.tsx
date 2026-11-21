import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { createWatermarkPattern } from '@sycee-ui/utils';
import { cx } from '../../utils/cx';

export type WatermarkContent = string | readonly string[];
export type WatermarkGap = number | readonly [number, number];
export type WatermarkOffset = readonly [number, number];

export interface WatermarkProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'content'> {
  /** Content wrapped by the watermark. */
  children?: ReactNode;
  /** Text or multiple lines rendered in each watermark tile. @default 'Sycee UI' */
  content?: WatermarkContent;
  /** Image URL or data URI. Takes precedence over `content`. */
  image?: string;
  /** Width of each watermark tile in pixels. @default 180 */
  width?: number;
  /** Height of each watermark tile in pixels. @default 120 */
  height?: number;
  /** Extra horizontal and vertical space between tiles. @default 24 */
  gap?: WatermarkGap;
  /** Shifts the repeating pattern horizontally and vertically. @default [0, 0] */
  offset?: WatermarkOffset;
  /** Rotation in degrees. @default -22 */
  rotate?: number;
  /** Text size in pixels. @default 14 */
  fontSize?: number;
  /** Font family used for text watermarks. */
  fontFamily?: string;
  /** Font weight used for text watermarks. @default 500 */
  fontWeight?: string | number;
  /** Fill color for text watermarks. @default '#1a1c25' */
  color?: string;
  /** Opacity of the watermark layer, clamped to 0–1. @default 0.12 */
  opacity?: number;
  /** Stacking order within the wrapper. @default 9 */
  zIndex?: number;
  /** Positions the watermark layer over the browser viewport. */
  fullscreen?: boolean;
}

export const Watermark = forwardRef<HTMLDivElement, WatermarkProps>(function Watermark(
  {
    children,
    content,
    image,
    width = 180,
    height = 120,
    gap = 24,
    offset = [0, 0],
    rotate = -22,
    fontSize = 14,
    fontFamily,
    fontWeight = 500,
    color = '#1a1c25',
    opacity = 0.12,
    zIndex = 9,
    fullscreen = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  const pattern = createWatermarkPattern({
    content,
    image,
    width,
    height,
    gap,
    rotate,
    fontSize,
    fontFamily,
    fontWeight,
    color,
  });
  const overlayStyle: CSSProperties = {
    backgroundImage: `url("${pattern.dataUrl}")`,
    backgroundPosition: `${offset[0] ?? 0}px ${offset[1] ?? 0}px`,
    backgroundSize: pattern.size,
    opacity: Number.isFinite(opacity) ? Math.min(1, Math.max(0, opacity)) : 0.12,
    zIndex,
  };

  return (
    <div
      ref={ref}
      className={cx(
        'sy-watermark',
        children == null && 'sy-watermark--standalone',
        fullscreen && 'sy-watermark--fullscreen',
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
      <div className="sy-watermark__overlay" style={overlayStyle} aria-hidden="true" />
    </div>
  );
});

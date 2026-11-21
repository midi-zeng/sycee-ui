export type WatermarkContent = string | readonly string[];
export type WatermarkGap = number | readonly [number, number];
export type WatermarkOffset = readonly [number, number];

export interface WatermarkProps {
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

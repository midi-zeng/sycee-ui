export type DateInput = Date | number | string;
export type NumberInput = number | string;
export type DateLocale = string | string[];
export type NumberNotation = 'standard' | 'compact' | 'kmb';

export interface FormatDateOptions {
  /** IANA time zone, such as `Asia/Shanghai`. */
  timeZone?: string;
  /** A token pattern. Supported tokens: YYYY, YY, MM, M, DD, D, HH, H, mm, m, ss, s, SSS. */
  pattern?: string;
}

export interface FormatNumberOptions {
  locale?: DateLocale;
  /**
   * Number notation. `kmb` always uses `K`, `M`, and `B` abbreviations,
   * regardless of locale. @default 'standard'
   */
  notation?: NumberNotation;
  /** Minimum fraction digits. */
  minimumFractionDigits?: number;
  /** Maximum fraction digits. */
  maximumFractionDigits?: number;
  /** Compact notation such as `1.2K`. @deprecated Use `notation` instead. */
  compact?: boolean;
  /** Prefix or suffix, useful for compact numbers. */
  unit?: string;
  /** Digits used when rounding. @default `Math.round` */
  roundingMode?: 'round' | 'floor' | 'ceil';
}

export interface RelativeTimeOptions {
  locale?: DateLocale;
  /** Reference point. Defaults to now. */
  now?: DateInput;
  /** Numeric wording: `always` or `auto`. @default 'auto' */
  numeric?: Intl.RelativeTimeFormatNumeric;
  /** Long, short, or narrow wording. @default 'long' */
  style?: Intl.RelativeTimeFormatStyle;
}

export type WatermarkContent = string | readonly string[];
export type WatermarkGap = number | readonly [number, number];
export type WatermarkOffset = readonly [number, number];

export interface WatermarkPatternOptions {
  content?: WatermarkContent;
  image?: string;
  width?: number;
  height?: number;
  gap?: WatermarkGap;
  rotate?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  color?: string;
}

export interface WatermarkPattern {
  dataUrl: string;
  size: string;
  svg: string;
}

const KMB_UNITS = [
  { threshold: 1e9, divisor: 1e9, suffix: 'B' },
  { threshold: 1e6, divisor: 1e6, suffix: 'M' },
  { threshold: 1e3, divisor: 1e3, suffix: 'K' },
] as const;

const WATERMARK_DEFAULTS = {
  width: 180,
  height: 120,
  gap: 24,
  rotation: -22,
  fontSize: 14,
  fontFamily: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  color: '#1a1c25',
} as const;

function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[character] ?? character,
  );
}

function positive(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

function finite(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function resolveWatermarkGap(gap: WatermarkGap | undefined): [number, number] {
  if (typeof gap !== 'number') {
    const [gapX, gapY] = gap ?? [WATERMARK_DEFAULTS.gap, WATERMARK_DEFAULTS.gap];
    return [
      Math.max(0, finite(gapX, WATERMARK_DEFAULTS.gap)),
      Math.max(0, finite(gapY, WATERMARK_DEFAULTS.gap)),
    ];
  }
  const value = Math.max(0, finite(gap, WATERMARK_DEFAULTS.gap));
  return [value, value];
}

/**
 * Builds a framework-agnostic SVG tile used as a repeating watermark
 * background. SVG keeps text crisp at any density and avoids canvas access.
 */
export function createWatermarkPattern(
  options: WatermarkPatternOptions = {},
): WatermarkPattern {
  const width = positive(options.width, WATERMARK_DEFAULTS.width);
  const height = positive(options.height, WATERMARK_DEFAULTS.height);
  const [gapX, gapY] = resolveWatermarkGap(options.gap);
  const tileWidth = width + gapX;
  const tileHeight = height + gapY;
  const rotation = finite(options.rotate, WATERMARK_DEFAULTS.rotation);
  const fontSize = positive(options.fontSize, WATERMARK_DEFAULTS.fontSize);
  const fontFamily = escapeXml(
    options.fontFamily?.trim() || WATERMARK_DEFAULTS.fontFamily,
  );
  const color = escapeXml(options.color?.trim() || WATERMARK_DEFAULTS.color);
  const fontWeight = escapeXml(String(options.fontWeight ?? 500));
  const image = options.image?.trim();

  let mark: string;
  if (image) {
    const padding = Math.max(4, Math.min(width, height) * 0.08);
    mark = `<image href="${escapeXml(image)}" x="${padding}" y="${padding}" width="${
      width - padding * 2
    }" height="${height - padding * 2}" preserveAspectRatio="xMidYMid meet" transform="rotate(${rotation} ${
      width / 2
    } ${height / 2})"/>`;
  } else {
    const content = options.content === undefined ? 'Sycee UI' : options.content;
    const lines = Array.isArray(content) ? content : [content];
    const lineHeight = fontSize * 1.35;
    const text = lines
      .map((line, index) => {
        const y = (index - (lines.length - 1) / 2) * lineHeight;
        return `<text x="0" y="${y}" text-anchor="middle" dominant-baseline="middle">${escapeXml(
          String(line),
        )}</text>`;
      })
      .join('');

    mark = `<g transform="translate(${width / 2} ${height / 2}) rotate(${rotation})" fill="${color}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}">${text}</g>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${tileHeight}" viewBox="0 0 ${tileWidth} ${tileHeight}"><g opacity="1">${mark}</g></svg>`;
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return {
    dataUrl,
    size: `${tileWidth}px ${tileHeight}px`,
    svg,
  };
}

function roundNumber(
  value: number,
  maximumFractionDigits: number,
  roundingMode: NonNullable<FormatNumberOptions['roundingMode']>,
): number {
  const factor = 10 ** maximumFractionDigits;
  if (roundingMode === 'floor') return Math.floor(value * factor) / factor;
  if (roundingMode === 'ceil') return Math.ceil(value * factor) / factor;
  return (Math.sign(value) * Math.round(Math.abs(value) * factor)) / factor;
}

function formatKmb(
  value: number,
  options: FormatNumberOptions,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
): string {
  const { locale = 'en-US', roundingMode = 'round' } = options;
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  });
  const absolute = Math.abs(value);
  let unitIndex = KMB_UNITS.findIndex(({ threshold }) => absolute >= threshold);
  let rounded = roundNumber(
    value / (unitIndex === -1 ? 1 : KMB_UNITS[unitIndex].divisor),
    maximumFractionDigits,
    roundingMode,
  );

  // A value just below a unit boundary can round up to 1000 of the smaller
  // unit, so promote it in the same pass (for example, 999,950 -> 1M).
  if (Math.abs(rounded) >= 1e3 && unitIndex !== 0) {
    unitIndex = unitIndex === -1 ? KMB_UNITS.length - 1 : unitIndex - 1;
    rounded = roundNumber(
      value / KMB_UNITS[unitIndex].divisor,
      maximumFractionDigits,
      roundingMode,
    );
  }

  if (unitIndex === -1) return formatter.format(rounded);
  return `${formatter.format(rounded)}${KMB_UNITS[unitIndex].suffix}`;
}

function toDate(value: DateInput): Date {
  let date: Date;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(5, 7));
    const day = Number(value.slice(8, 10));
    const local = new Date(year, month - 1, day);
    date =
      local.getFullYear() === year &&
      local.getMonth() === month - 1 &&
      local.getDate() === day
        ? local
        : new Date(Number.NaN);
  } else {
    date = value instanceof Date ? value : new Date(value);
  }
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid date input: ${String(value)}`);
  }
  return date;
}

function normalizeNumber(value: NumberInput): number {
  if (typeof value !== 'string') return value;
  const normalized = value.replace(/,/g, '').trim();
  return normalized === '' ? Number.NaN : Number(normalized);
}

function zonedParts(date: Date, timeZone?: string): Record<string, string> {
  if (!timeZone) {
    return {
      YYYY: String(date.getFullYear()),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      DD: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
      SSS: String(date.getMilliseconds()).padStart(3, '0'),
    };
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';
  return {
    YYYY: get('year'),
    MM: get('month'),
    DD: get('day'),
    HH: get('hour'),
    mm: get('minute'),
    ss: get('second'),
    SSS: String(date.getMilliseconds()).padStart(3, '0'),
  };
}

function applyPattern(parts: Record<string, string>, pattern: string): string {
  return pattern.replace(
    /YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS/g,
    (token) => {
      if (token === 'YY') return parts.YYYY.slice(-2);
      if (token === 'M') return String(Number(parts.MM));
      if (token === 'D') return String(Number(parts.DD));
      if (token === 'H') return String(Number(parts.HH));
      if (token === 'm') return String(Number(parts.mm));
      if (token === 's') return String(Number(parts.ss));
      return parts[token] ?? token;
    },
  );
}

/**
 * Formats a date with a predictable token pattern. Invalid input throws a
 * `RangeError` so callers do not silently render ambiguous dates.
 */
export function formatDate(value: DateInput, options: FormatDateOptions = {}): string {
  const { pattern = 'YYYY-MM-DD', timeZone } = options;
  return applyPattern(zonedParts(toDate(value), timeZone), pattern);
}

/**
 * Formats a date and time with the locale's native date/time order. Use
 * `formatDate` when a fixed token pattern is required.
 */
export function formatDateTime(
  value: DateInput,
  options: Omit<Intl.DateTimeFormatOptions, 'timeZone'> & {
    locale?: DateLocale;
    timeZone?: string;
  } = {},
): string {
  const { locale = 'en-US', ...rest } = options;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...rest,
  }).format(toDate(value));
}

/** Formats a finite number. Invalid or non-finite values return an em dash. */
export function formatNumber(value: NumberInput, options: FormatNumberOptions = {}): string {
  const numeric = normalizeNumber(value);
  if (!Number.isFinite(numeric)) return '—';
  const {
    locale = 'en-US',
    compact = false,
    unit = '',
    roundingMode = 'round',
  } = options;
  const notation = options.notation ?? (compact ? 'compact' : 'standard');
  const maximumFractionDigits =
    options.maximumFractionDigits ?? (notation === 'standard' ? undefined : 1);
  const minimumFractionDigits = options.minimumFractionDigits ?? 0;

  if (notation === 'kmb') {
    return `${formatKmb(
      numeric,
      options,
      minimumFractionDigits,
      maximumFractionDigits ?? 1,
    )}${unit}`;
  }

  const factor = 10 ** (maximumFractionDigits ?? 0);
  const rounded =
    roundingMode === 'floor'
      ? Math.floor(numeric * factor) / factor
      : roundingMode === 'ceil'
        ? Math.ceil(numeric * factor) / factor
        : numeric;
  return `${new Intl.NumberFormat(locale, {
    notation,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(rounded)}${unit}`;
}

/** Formats a number as currency using the platform's `Intl` implementation. */
export function formatCurrency(
  value: NumberInput,
  currency = 'USD',
  locale: DateLocale = 'en-US',
): string {
  const numeric = normalizeNumber(value);
  if (!Number.isFinite(numeric)) return '—';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(numeric);
}

/** Formats a percentage from a ratio (`0.42` becomes `42%`). */
export function formatPercent(
  value: NumberInput,
  locale: DateLocale = 'en-US',
  maximumFractionDigits = 0,
): string {
  const numeric = normalizeNumber(value);
  if (!Number.isFinite(numeric)) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits,
  }).format(numeric);
}

/** Formats a future/past timestamp in a human-readable relative style. */
export function formatRelativeTime(value: DateInput, options: RelativeTimeOptions = {}): string {
  const now = toDate(options.now ?? Date.now());
  const seconds = Math.round((toDate(value).getTime() - now.getTime()) / 1000);
  const absolute = Math.abs(seconds);
  const formatter = new Intl.RelativeTimeFormat(options.locale, {
    numeric: options.numeric ?? 'auto',
    style: options.style ?? 'long',
  });
  if (absolute < 60) return formatter.format(seconds, 'second');
  if (absolute < 3600) return formatter.format(Math.round(seconds / 60), 'minute');
  if (absolute < 86400) return formatter.format(Math.round(seconds / 3600), 'hour');
  if (absolute < 2592000) return formatter.format(Math.round(seconds / 86400), 'day');
  if (absolute < 31536000) return formatter.format(Math.round(seconds / 2592000), 'month');
  return formatter.format(Math.round(seconds / 31536000), 'year');
}

/** Clamps a number between `min` and `max`. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Creates a cancellable trailing-edge debounce function. */
export function debounce<T extends (...args: never[]) => unknown>(fn: T, delay = 300): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T & { cancel: () => void };
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };
  return debounced;
}

/**
 * Copies text with the async Clipboard API and falls back to the legacy
 * `execCommand` path when the browser denies permission or lacks support.
 * Must run in a browser environment.
 */
export async function copyText(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission can be denied in embedded or non-secure contexts. The
      // command fallback still works while the user gesture is active.
    }
  }

  if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
    throw new Error('Clipboard API is unavailable');
  }

  const activeElement = document.activeElement;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.setAttribute('aria-hidden', 'true');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);

  let copied = false;
  try {
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    copied = document.execCommand('copy');
  } finally {
    textarea.remove();
    if (
      typeof HTMLElement !== 'undefined' &&
      activeElement instanceof HTMLElement &&
      activeElement.isConnected
    ) {
      activeElement.focus();
    }
  }

  if (!copied) {
    throw new Error('Unable to copy text to the clipboard');
  }
}

export interface CopyOptions {
  /** Called after the text is copied successfully. */
  onSuccess?: (text: string) => void;
  /** Called when both clipboard strategies fail. */
  onError?: (error: unknown) => void;
}

/**
 * Imperative clipboard helper. Resolves to `true` on success and `false` when
 * clipboard access fails, making it safe to call from event handlers without
 * wrapping every call in `try/catch`.
 */
export async function copy(text: string, options: CopyOptions = {}): Promise<boolean> {
  try {
    await copyText(text);
  } catch (error) {
    options.onError?.(error);
    return false;
  }
  options.onSuccess?.(text);
  return true;
}

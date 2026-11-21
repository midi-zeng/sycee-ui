import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clamp,
  copy,
  copyText,
  createWatermarkPattern,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from './index';

describe('createWatermarkPattern', () => {
  it('creates a repeating SVG tile with custom spacing and safe text', () => {
    const pattern = createWatermarkPattern({
      content: ['Internal', '<script>alert(1)</script>'],
      width: 120,
      height: 80,
      gap: [12, 20],
      rotate: -30,
      color: '#123456',
    });

    expect(pattern.size).toBe('132px 100px');
    expect(pattern.svg).toContain('rotate(-30)');
    expect(pattern.svg).toContain('fill="#123456"');
    expect(pattern.svg).toContain('&lt;script&gt;');
    expect(pattern.svg).not.toContain('<script>');
    expect(pattern.svg.match(/<text /g)).toHaveLength(2);
    expect(decodeURIComponent(pattern.dataUrl.split(',')[1])).toBe(pattern.svg);
  });

  it('prefers an image and escapes its URL attributes', () => {
    const pattern = createWatermarkPattern({
      content: 'Fallback',
      image: 'https://example.com/mark.svg?a=1&b="two"',
    });

    expect(pattern.svg).toContain('<image ');
    expect(pattern.svg).toContain('a=1&amp;b=&quot;two&quot;');
    expect(pattern.svg).not.toContain('<text ');
  });
});

describe('formatDate', () => {
  it('formats tokens in local time', () => {
    expect(formatDate(new Date(2026, 0, 2, 3, 4, 5), { pattern: 'YYYY/MM/DD HH:mm:ss' })).toBe(
      '2026/01/02 03:04:05',
    );
  });

  it('rejects invalid dates', () => {
    expect(() => formatDate('not-a-date')).toThrow(RangeError);
  });

  it('treats date-only strings as local calendar dates', () => {
    expect(formatDate('2026-01-02')).toBe('2026-01-02');
  });

  it('rejects impossible calendar dates instead of normalizing them', () => {
    expect(() => formatDate('2026-02-30')).toThrow(RangeError);
  });
});

describe('number helpers', () => {
  it('formats numbers and non-finite values', () => {
    expect(formatNumber(12345.67, { maximumFractionDigits: 2 })).toBe('12,345.67');
    expect(formatNumber(Number.NaN)).toBe('—');
    expect(formatNumber('   ')).toBe('—');
  });

  it('formats numbers with KMB abbreviations', () => {
    expect(formatNumber(999, { notation: 'kmb' })).toBe('999');
    expect(formatNumber(12_840, { notation: 'kmb' })).toBe('12.8K');
    expect(formatNumber(1_284_000, { notation: 'kmb' })).toBe('1.3M');
    expect(formatNumber(1_284_000_000, { notation: 'kmb' })).toBe('1.3B');
    expect(formatNumber(-12_840, { notation: 'kmb' })).toBe('-12.8K');
  });

  it('keeps KMB abbreviations stable across locales', () => {
    expect(formatNumber(1_284_000, { notation: 'kmb', locale: 'zh-CN' })).toBe('1.3M');
    expect(formatNumber(1_284_000, { notation: 'kmb', locale: 'de-DE' })).toBe('1,3M');
  });

  it('applies precision and rounding when formatting KMB numbers', () => {
    expect(
      formatNumber(12_840, {
        notation: 'kmb',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    ).toBe('12.84K');
    expect(formatNumber(999_950, { notation: 'kmb' })).toBe('1M');
    expect(formatNumber(999.99, { notation: 'kmb' })).toBe('1K');
    expect(formatNumber(15_900, { notation: 'kmb', roundingMode: 'floor' })).toBe('15.9K');
  });

  it('formats currency and percentages', () => {
    expect(formatCurrency(12.5, 'USD', 'en-US')).toBe('$12.50');
    expect(formatCurrency('1,234.5', 'USD', 'en-US')).toBe('$1,234.50');
    expect(formatPercent(0.42)).toBe('42%');
  });
});

describe('misc helpers', () => {
  it('clamps values', () => {
    expect(clamp(12, 0, 10)).toBe(10);
  });

  it('formats relative time', () => {
    expect(formatRelativeTime(0, { now: 120_000, numeric: 'always' })).toBe('2 minutes ago');
  });
});

describe('copyText', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('uses the async clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await copyText('npm install @sycee-ui/react');

    expect(writeText).toHaveBeenCalledWith('npm install @sycee-ui/react');
  });

  it('falls back to execCommand when the async API is unavailable', async () => {
    vi.stubGlobal('navigator', {});
    const textarea = {
      value: '',
      readOnly: false,
      style: {},
      setAttribute: vi.fn(),
      focus: vi.fn(),
      select: vi.fn(),
      setSelectionRange: vi.fn(),
      remove: vi.fn(),
    };
    const execCommand = vi.fn().mockReturnValue(true);
    const appendChild = vi.fn();
    vi.stubGlobal('document', {
      activeElement: null,
      createElement: vi.fn().mockReturnValue(textarea),
      body: { appendChild },
      execCommand,
    });

    await copyText('hello');

    expect(appendChild).toHaveBeenCalledWith(textarea);
    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(textarea.remove).toHaveBeenCalled();
  });

  it('reports when neither copy strategy succeeds', async () => {
    vi.stubGlobal('navigator', {});
    vi.stubGlobal('document', {
      activeElement: null,
      createElement: vi.fn().mockReturnValue({
        value: '',
        readOnly: false,
        style: {},
        setAttribute: vi.fn(),
        focus: vi.fn(),
        select: vi.fn(),
        setSelectionRange: vi.fn(),
        remove: vi.fn(),
      }),
      body: { appendChild: vi.fn() },
      execCommand: vi.fn().mockReturnValue(false),
    });

    await expect(copyText('hello')).rejects.toThrow('Unable to copy');
  });
});

describe('copy', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('resolves true and invokes success callbacks', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const onSuccess = vi.fn();
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await expect(copy('hello', { onSuccess })).resolves.toBe(true);

    expect(onSuccess).toHaveBeenCalledWith('hello');
  });

  it('resolves false and invokes the error callback instead of throwing', async () => {
    const onError = vi.fn();
    vi.stubGlobal('navigator', {});
    vi.stubGlobal('document', {
      activeElement: null,
      createElement: vi.fn().mockReturnValue({
        value: '',
        readOnly: false,
        style: {},
        setAttribute: vi.fn(),
        focus: vi.fn(),
        select: vi.fn(),
        setSelectionRange: vi.fn(),
        remove: vi.fn(),
      }),
      body: { appendChild: vi.fn() },
      execCommand: vi.fn().mockReturnValue(false),
    });

    await expect(copy('hello', { onError })).resolves.toBe(false);

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });
});

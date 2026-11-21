---
title: Utilities
---

# Utilities

`@sycee-ui/utils` contains small, framework-agnostic helpers. They have no
React or Vue dependency and can be used on the server. The same helpers are
re-exported from both component packages for convenience.

```ts
import { formatDate, formatNumber } from '@sycee-ui/utils';
```

## Date & time

| Utility | Description |
| --- | --- |
| `formatDate(value, options)` | Token-based date formatting with time-zone support |
| `formatDateTime(value, options)` | Locale-aware date and time using `Intl` |
| `formatRelativeTime(value, options)` | "2 hours ago" style relative time |

```ts
formatDate(new Date(), { pattern: 'YYYY/MM/DD HH:mm' });
formatRelativeTime('2026-11-22T12:00:00+08:00', { locale: 'en-US' });
```

Date tokens: `YYYY`, `YY`, `MM`, `M`, `DD`, `D`, `HH`, `H`, `mm`, `m`, `ss`,
`s`, and `SSS`.

## Numbers

| Utility | Description |
| --- | --- |
| `formatNumber(value, options)` | Locale grouping, precision, compact or KMB notation, and units |
| `formatCurrency(value, currency, locale)` | Currency formatting |
| `formatPercent(value, locale, precision)` | Ratio to percentage |

```ts
formatNumber(1234567.89, { maximumFractionDigits: 2 }); // 1,234,567.89
formatNumber(12840, { notation: 'compact' }); // 12.8K
formatNumber(1_284_000, { notation: 'kmb', locale: 'zh-CN' }); // 1.3M
formatCurrency(99, 'CNY', 'zh-CN'); // ¥99.00
formatPercent(0.426, 'en-US', 1); // 42.6%
```

`kmb` notation always uses `K`, `M`, and `B`; `compact` follows the locale and
may use local units such as `万` or `亿`.

Invalid or non-finite numbers return `—`, which makes table output predictable
without throwing.

## General helpers

| Utility | Description |
| --- | --- |
| `clamp(value, min, max)` | Constrain a value to a range |
| `debounce(fn, delay)` | Trailing-edge debounce with `cancel()` |
| `copy(text, options?)` | Safe imperative copy; resolves to `true` or `false` |
| `copyText(text)` | Copy text with Clipboard API and `execCommand` fallback |

`copy` is the concise imperative API. It returns a boolean instead of throwing:

```ts
import { copy } from '@sycee-ui/utils';

const copied = await copy('npm install @sycee-ui/browser-client');
if (!copied) {
  // Show a fallback or let the user select the text manually.
}
```

`copyText` is the low-level browser-only primitive and rejects when clipboard
access is unavailable. Call either helper from a user gesture.

## Design principles

- Pure formatting helpers also run on the server; `copy` and `copyText` require a browser.
- Native `Intl` under the hood, so locale behavior follows the runtime.
- Explicit token patterns when output must be stable across locales.
- Invalid dates throw `RangeError`; invalid numbers return an em dash.

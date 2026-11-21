# @sycee-ui/utils

Framework-agnostic formatting and utility helpers for Sycee UI.

```bash
pnpm add @sycee-ui/utils
```

```ts
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatRelativeTime,
} from '@sycee-ui/utils';

formatDate(new Date(), { pattern: 'YYYY/MM/DD HH:mm' });
formatNumber(12345.6, { maximumFractionDigits: 1 });
formatNumber(1_284_000, { notation: 'kmb' }); // 1.3M
formatCurrency(99, 'CNY', 'zh-CN');
formatRelativeTime('2026-11-22T12:00:00+08:00', { locale: 'en-US' });
```

KMB notation always uses `K`, `M`, and `B` abbreviations, even when the locale
would otherwise use local units such as `万` or `亿`.

Also included: `formatDateTime`, `formatPercent`, `clamp`, and `debounce`.
The same helpers are re-exported from `@sycee-ui/react` and `@sycee-ui/vue`.

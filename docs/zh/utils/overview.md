---
title: 工具
---

# 工具

`@sycee-ui/utils` 提供无框架依赖的小型工具函数，可在浏览器、Node.js 和服务端
渲染中直接使用，同时从 React、Vue 包重新导出。

```ts
import { formatDate, formatNumber } from '@sycee-ui/utils';
```

## 日期与时间

| 工具 | 说明 |
| --- | --- |
| `formatDate(value, options)` | 使用固定令牌格式化日期，支持时区 |
| `formatDateTime(value, options)` | 使用原生 `Intl` 生成本地化日期时间 |
| `formatRelativeTime(value, options)` | 输出“2 小时前”等相对时间 |

```ts
formatDate(new Date(), { pattern: 'YYYY/MM/DD HH:mm' });
formatRelativeTime('2026-11-22T12:00:00+08:00', { locale: 'zh-CN' });
```

支持令牌：`YYYY`、`YY`、`MM`、`M`、`DD`、`D`、`HH`、`H`、`mm`、`m`、`ss`、
`s` 和 `SSS`。

## 数字

| 工具 | 说明 |
| --- | --- |
| `formatNumber(value, options)` | 千分位、精度、紧凑数字、KMB 数字和单位 |
| `formatCurrency(value, currency, locale)` | 货币格式化 |
| `formatPercent(value, locale, precision)` | 比例转百分比 |

```ts
formatNumber(1234567.89, { maximumFractionDigits: 2 }); // 1,234,567.89
formatNumber(12840, { notation: 'compact' }); // 12.8K
formatNumber(1_284_000, { notation: 'kmb', locale: 'zh-CN' }); // 1.3M
formatCurrency(99, 'CNY', 'zh-CN'); // ¥99.00
formatPercent(0.426, 'zh-CN', 1); // 42.6%
```

`kmb` 固定使用 `K`、`M`、`B` 缩写；`compact` 跟随语言环境，可能显示
`万`、`亿`等本地单位。

无效或非有限数字返回 `—`，表格与仪表盘无需额外兜底。

## 通用工具

| 工具 | 说明 |
| --- | --- |
| `clamp(value, min, max)` | 将数值约束到区间 |
| `debounce(fn, delay)` | 尾沿防抖，并提供 `cancel()` |
| `copy(text, options?)` | 安全的指令式复制，返回成功或失败布尔值 |
| `copyText(text)` | 使用 Clipboard API 和 `execCommand` 回退复制文本 |

`copy` 是简洁的指令式 API，不会因剪贴板不可用而抛出异常：

```ts
import { copy } from '@sycee-ui/utils';

const copied = await copy('npm install @sycee-ui/vue');
if (!copied) {
  // 展示备用复制方式，或提示用户手动选择文本。
}
```

`copyText` 是底层浏览器工具，权限被拒绝时会抛出异常。请在用户手势中调用。

所有日期令牌都使用确定输出；需要跟随用户语言时可使用 `formatDateTime`。

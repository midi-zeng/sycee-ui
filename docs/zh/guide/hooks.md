---
title: Hook 与组合式函数
---

# Hook 与组合式函数

Sycee UI 提供一组面向浏览器 UI 场景的轻量 Hook。React 以 Hook 形式导出，
Vue 以组合式函数形式提供相同能力。除组件包本身要求的框架 peer 依赖外，
没有额外运行时依赖。

## API 一览

| 能力 | React | Vue |
| --- | --- | --- |
| 水合安全的挂载状态 | `useMounted()` | `useMounted()` |
| 防抖值 | `useDebouncedValue(value, delay?)` | `useDebouncedValue(refOrGetter, delay?)` |
| 事件监听生命周期 | `useEventListener(name, handler, target?, options?)` | `useEventListener(name, handler, target?, options?)` |
| 点击元素外部 | `useClickOutside(handler, options?)` | `useClickOutside(target, handler, options?)` |
| CSS 媒体查询 | `useMediaQuery(query, default?)` | `useMediaQuery(query, default?)` |
| JSON 本地持久化 | `useLocalStorage(key, initialValue)` | `useLocalStorage(key, initialValue)` |

所有浏览器 API 只会在客户端可用后访问。组件卸载时会移除监听器并清理定时器。

## 防抖值

输入框可以保持即时响应，同时用较稳定的值执行筛选或发起请求：

```tsx
import { useDebouncedValue } from '@sycee-ui/react';

const [query, setQuery] = useState('');
const debouncedQuery = useDebouncedValue(query, 300);

useEffect(() => {
  void search(debouncedQuery);
}, [debouncedQuery]);
```

Vue 支持传入 ref 或 getter：

```ts
import { ref } from 'vue';
import { useDebouncedValue } from '@sycee-ui/vue';

const query = ref('');
const debouncedQuery = useDebouncedValue(query, 300);
```

## 点击外部

React 返回需要绑定到受保护元素的 ref：

```tsx
const panelRef = useClickOutside<HTMLDivElement>(() => setOpen(false));
return <div ref={panelRef}>...</div>;
```

Vue 接收模板 ref，并返回手动停止监听的函数：

```ts
const panelRef = ref<HTMLElement>();
const stop = useClickOutside(panelRef, () => {
  open.value = false;
});
```

默认监听 `pointerdown`。如交互模型需要，可传入
`eventName: 'mousedown'` 或 `eventName: 'click'`。

## 媒体查询与水合

```tsx
const isWide = useMediaQuery('(min-width: 1024px)');
const mounted = useMounted();

return <div>{mounted && isWide ? <DesktopNav /> : <MobileNav />}</div>;
```

`useMounted()` 在首次渲染和服务端渲染时为 `false`，客户端挂载后变为
`true`，适合延迟渲染仅浏览器可用的内容，避免水合不一致。

## 本地持久化

两个包都返回 `[value, setValue, removeValue]`。值通过 JSON 序列化，
其他标签页修改存储时也会自动同步：

```ts
const [theme, setTheme, resetTheme] = useLocalStorage('app-theme', 'light');
```

React 的 setter 与 `useState` 一致，支持直接传值或 updater 函数。Vue 返回
只读 ref，setter 同样支持这两种形式。存储不可用或空间已满时，当前页面会
继续使用内存状态。

## 事件监听

需要在组件生命周期内监听原生事件时，可以直接使用：

```tsx
useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape') setOpen(false);
});
```

省略 target 时监听 `window`，也可以传入 `document`、DOM 元素或其他
`EventTarget`。设置 `enabled: false` 可暂时停用监听。Vue 的 target 和
`enabled` 还支持 ref 或 getter。

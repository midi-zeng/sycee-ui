---
title: Hooks & composables
---

# Hooks & composables

Sycee UI ships a small set of browser-oriented hooks for common UI state.
React exports them as hooks; Vue exports the same capabilities as composables.
They have no runtime dependency beyond the framework peer already required by
the component package.

## API overview

| Capability | React | Vue |
| --- | --- | --- |
| Hydration-safe mount state | `useMounted()` | `useMounted()` |
| Debounced value | `useDebouncedValue(value, delay?)` | `useDebouncedValue(refOrGetter, delay?)` |
| Event listener lifecycle | `useEventListener(name, handler, target?, options?)` | `useEventListener(name, handler, target?, options?)` |
| Outside pointer interaction | `useClickOutside(handler, options?)` | `useClickOutside(target, handler, options?)` |
| CSS media query | `useMediaQuery(query, default?)` | `useMediaQuery(query, default?)` |
| Persisted JSON state | `useLocalStorage(key, initialValue)` | `useLocalStorage(key, initialValue)` |

All browser APIs are accessed only after the client is available. Listeners are
removed and timers are cleared when the owning component unmounts.

## Debounced values

Keep an input responsive while using a calmer value for filtering or requests:

```tsx
import { useDebouncedValue } from '@sycee-ui/react';

const [query, setQuery] = useState('');
const debouncedQuery = useDebouncedValue(query, 300);

useEffect(() => {
  void search(debouncedQuery);
}, [debouncedQuery]);
```

Vue accepts either a ref or a getter:

```ts
import { ref } from 'vue';
import { useDebouncedValue } from '@sycee-ui/vue';

const query = ref('');
const debouncedQuery = useDebouncedValue(query, 300);
```

## Click outside

React returns the ref to attach to the protected element:

```tsx
const panelRef = useClickOutside<HTMLDivElement>(() => setOpen(false));
return <div ref={panelRef}>...</div>;
```

Vue accepts a template ref and returns a manual stop function:

```ts
const panelRef = ref<HTMLElement>();
const stop = useClickOutside(panelRef, () => {
  open.value = false;
});
```

The default event is `pointerdown`. Pass `eventName: 'mousedown'` or
`eventName: 'click'` when the interaction model requires it.

## Media queries and hydration

```tsx
const isWide = useMediaQuery('(min-width: 1024px)');
const mounted = useMounted();

return <div>{mounted && isWide ? <DesktopNav /> : <MobileNav />}</div>;
```

`useMounted()` is `false` during the first render and server render, then
becomes `true` on the client. This makes it useful for browser-only output that
would otherwise cause a hydration mismatch.

## Persisted state

Both packages return `[value, setValue, removeValue]`. Values are serialized as
JSON, and storage changes from other tabs are synchronized automatically:

```ts
const [theme, setTheme, resetTheme] = useLocalStorage('app-theme', 'light');
```

React's setter follows `useState` semantics and accepts either a value or an
updater function. Vue returns the value as a read-only ref and its setter
accepts the same forms. If storage is unavailable or full, state continues to
work in memory for the current page.

## Event listeners

Use the listener hook when a native event should follow component lifecycle:

```tsx
useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape') setOpen(false);
});
```

Omit the target to listen on `window`, or pass `document`, an element, or any
other `EventTarget`. Set `enabled: false` to temporarily suspend the listener.
Vue additionally accepts a ref or getter for the target and `enabled` option.

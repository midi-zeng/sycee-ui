---
title: React
---

# Getting started with React

## Installation

```bash
npm install @sycee-ui/react
# or
pnpm add @sycee-ui/react
```

Peer requirements: React 18+ (React 19 supported).

## Usage

Import the stylesheet once at your app entry, then use components:

```tsx
import '@sycee-ui/react/styles.css';
import { Button, Input } from '@sycee-ui/react';

export function Profile() {
  return (
    <div>
      <Input placeholder="Your name" clearable />
      <Button onClick={() => console.log('clicked')}>Save</Button>
    </div>
  );
}
```

Every component is a named export — bundlers tree-shake what you don't use:

```tsx
import { Button } from '@sycee-ui/react'; // only Button code ends up in your bundle
```

## Try it live

Open the [Playground](/playground/), switch to the React tab, and edit the demo —
it compiles in your browser, no build step needed.

## Conventions

- Props follow familiar patterns: `size` (`'sm' | 'md' | 'lg'`), `color`
  (`'primary' | 'neutral' | 'success' | 'warning' | 'danger'`), `disabled`,
  `loading`.
- DOM refs are forwarded: `const ref = useRef<HTMLButtonElement>(null)` works on
  `Button`, `Input`, and friends.
- Native attributes pass through: `<Input maxLength={20} autoFocus />`.
- Styling hooks: every component renders stable `sy-*` class names (e.g.
  `sy-button--primary`) plus `is-*` state classes, so you can restyle with plain
  CSS without fighting a styling API.

## Dark mode

Add `data-theme="dark"` to your `<html>` element (or toggle it dynamically):

```html
<html data-theme="dark">
```

See [Theming & dark mode](./theming) for the full token reference.

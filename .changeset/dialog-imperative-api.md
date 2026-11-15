---
'@sycee-ui/react': minor
'@sycee-ui/vue': minor
---

Add an imperative `dialog` API to both packages (`dialog.confirm`, `dialog.alert`, `dialog.clear`) so dialogs can be opened from event handlers, effects or stores without local template/JSX state. React's `Modal` now also plays its exit animation when closed through the `open` prop, matching the Vue behavior.

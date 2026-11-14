# Contributing to Sycee UI

Thanks for considering a contribution! This guide covers the workflow,
the component contract, and the release process.

## Project structure

```
packages/
  react/   @sycee-ui/react      — React components (Vite 8 + Rolldown/Oxc)
  vue/     @sycee-ui/vue        — Vue 3 SFC components
  styles/  @sycee-ui/styles    — SCSS tokens + component styles (shared)
docs/      VitePress documentation (VitePress 1.6 + live demos + playground)
```

## Getting started

```bash
pnpm install
pnpm dev      # docs site at http://localhost:5173
pnpm build    # build all packages
pnpm test     # vitest
pnpm lint     # oxlint
```

**Packages must be built before the docs run** (`docs` imports their `dist`).

## The component contract

`SPEC.md` at the repo root is the single source of truth for components:

- class names (`sy-*` BEM, `is-*` states),
- DOM structure, props, events, slots,
- accessibility requirements.

React and Vue implementations must render **identical markup** — the shared
SCSS styles both. When adding or changing a component, update SPEC.md first,
then both implementations, then the styles.

## Writing a component

1. **SCSS** — add `packages/styles/scss/components/_<name>..scss` using only
   design tokens (`var(--sy-*)`); register it in `scss/index.scss`.
2. **React** — `packages/react/src/components/<name>/<Name>.tsx`; follow the
   exemplar in `components/button/Button.tsx`.
3. **Vue** — `packages/vue/src/components/<name>/<Name>.vue`; follow
   `components/button/Button.vue`.
4. **Exports** — add named exports to both `src/index.ts` files.
5. **Tests** — add a colocated `*.test.ts(x)` next to the component.
6. **Docs** — create `docs/components/<name>.md` with live demos (see
   `docs/components/button.md`) and demo files under `docs/demos/<name>/`.

## Submitting changes

1. Branch from `main`.
2. Make your change; keep `pnpm lint && pnpm build && pnpm test` green.
3. **Add a changeset** describing the impact:

   ```bash
   pnpm changeset
   ```

4. Open a pull request. CI runs lint, build, and tests.

## Releases

Releases are managed by [Changesets](https://github.com/changesets/changesets):

1. PRs with changesets trigger the *Version Packages* PR.
2. Merging that PR bumps versions, updates changelogs, creates GitHub releases,
   and publishes `@sycee-ui/*` to npm.

All three packages are version-locked (`fixed` group) so React, Vue and styles
always share a version.

## Code style

- oxlint for linting (`pnpm lint`) — no ESLint/Prettier.
- 2-space indent, single quotes, semicolons; keep new code consistent with the
  exemplars.
- English only in code, comments, docs, and commit messages.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](./LICENSE).

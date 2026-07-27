# Repository Guide

## Toolchain

- Use Vite+'s `vp` CLI for installs, dependencies, and local binaries. Do not
  call `pnpm`, `npm`, `yarn`, or `npx` directly; the README's `pnpm` examples
  are stale.
- Node.js 24.x is required. Install dependencies with `vp install`.
- Astro package scripts collide with Vite+ built-ins. Use `vp run dev`,
  `vp run build`, and `vp run preview`; `vp dev` and `vp build` run Vite instead
  of Astro.
- Vite, Vitest, Oxlint, and Oxfmt are supplied by `vite-plus`; do not install or
  invoke them separately.

## Verification

Match CI in this order:

```console
vp check
vp run check
vp run build
```

`vp check` runs Vite+ formatting, linting, and TypeScript checks. `vp run check`
runs Astro diagnostics. No test suite or test script is configured.

The pre-commit hook runs `vp staged`; staged files map to
`vp check --fix && vp run check` in `vite.config.ts`.

## Structure

- `src/pages/index.astro` is the only route. It composes
  `src/layouts/Layout.astro` with `src/components/Home.astro`.
- `Home.astro` owns the page content, browser keyboard/scroll behavior, and
  component-scoped CSS; there is no client framework or island boundary.

## Vite+ And Astro

- `vite.config.ts` enforces tabs, an 80-column width, wrapped prose, and
  type-aware lint/type checking.
- Keep the custom logger and `remove-esbuild-options` plugin in
  `astro.config.ts`: Astro injects esbuild options that Vite+'s Rolldown build
  cannot translate.
- `pnpm-workspace.yaml` intentionally aliases `vite` to Vite+ core and carries
  esbuild compatibility overrides; do not replace these with stock Vite.

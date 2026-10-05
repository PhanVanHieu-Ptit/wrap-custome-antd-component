# @phanvanhieu/ui

Thin wrapper library over Ant Design 6. Read `docs/WRAPPING_GUIDE.md` before adding or changing a component.

- Layout: `src/components/<category>/<Component>/` with categories `general | layout | navigation | data-entry | data-display | feedback | other`; `_shared` is internal.
- Default is a direct `export { X } from 'antd'` re-export. Wrap only to add library logic.
- No `any` (it lives only in `src/components/_shared/antd-generics.ts`), no hardcoded colours: use `src/theme` tokens or `createStyles` with `token`.
- Adding or removing a wrapper folder → run `pnpm exports:sync` (rewrites `package.json#exports`).
- Before finishing: `pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm check:exports`.
- A pending changeset (`pnpm changeset`) is needed for user-facing changes.

# Wrapping an Ant Design component

## Wrap or re-export?

Default to a **direct re-export**. A component is wrapped only when it carries library logic
(today: Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Switch, Table,
Upload). A wrapper that only forwards props adds a layer, a bundle cost and type drift for nothing.

Re-export = one file, `src/components/<category>/Foo/index.ts`:

```ts
export { Foo } from 'antd';
export type { FooProps } from 'antd';
```

Copy the type names from `node_modules/antd/es/index.d.ts` (use the name after `as`). Only folders
that hold more than `index.ts` get a package subpath (see `scripts/entries.ts`).

Categories (follow antd's docs): `general`, `layout`, `navigation`, `data-entry`, `data-display`,
`feedback`, `other`. Each has an `index.ts` that `export *`s its components.

Templates: [`Button`](../src/components/general/Button) (simple),
[`Input`](../src/components/data-entry/Input) (wrapper element + compound parts),
[`Select`](../src/components/data-entry/Select) and [`Table`](../src/components/data-display/Table)
(generic), [`Modal`](../src/components/feedback/Modal) (function component + statics),
[`Upload`](../src/components/data-entry/Upload) (composing a user callback).

Form controls that show a label / helper / error share `useField` from
[`src/components/_shared`](../src/components/_shared) — `_`-prefixed folders are internal and are
not built as public entries. `any` lives only in `_shared/antd-generics.ts` (antd's own defaults).

## Checklist for a new wrapper `Foo`

1. Create `src/components/<category>/Foo/` with `Foo.tsx`, `Foo.types.ts`, `Foo.test.tsx`,
   `Foo.stories.tsx`, `index.ts` (+ `Foo.styles.ts` only if tokens can't express the style).
2. Add `export * from './Foo'` to `src/components/<category>/index.ts`.
3. Run `pnpm exports:sync` — it regenerates the `exports` map in `package.json`
   (`pnpm exports:check` fails CI if you forget). `tsup.config.ts` picks the folder up itself.
4. Add the name to `WRAPPERS` in `src/index.test.ts`; that test also proves every antd export is
   still reachable and that re-exports are antd itself.
5. Add a `Foo` entry to `componentTokens` in `src/theme/components.ts` if antd has a token for it.

## Rules

| Concern                                 | Rule                                                                                                                                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Props                                   | `Omit<AntFooProps, keyof CustomProps> & CustomProps`. Only omit keys you redefine, so antd autocomplete and JSDoc survive.                                                                |
| Ref                                     | `forwardRef<GetRef<typeof AntFoo>, FooProps>`, set `displayName`.                                                                                                                         |
| Custom props                            | Optional, named by intent, JSDoc'd, **destructured before spreading** to antd. Do not duplicate what antd already offers (e.g. use `block`, not a new `fullWidth`).                       |
| Styling                                 | Prefer theme/component tokens. Use `createStyles` (antd-style) only for what tokens can't express, always reading `token`. Merge consumer `className` last: `cx(styles.root, className)`. |
| Wrapper DOM                             | Add extra elements only when a custom prop needs them, so default DOM/ref match antd.                                                                                                     |
| Compound parts                          | `Object.assign(Base, { Password: AntInput.Password, ... })` keeps the antd typing. Re-wrap a part only when it needs custom props.                                                        |
| Exports                                 | Named exports only, no top-level side effects (`"sideEffects": false`). Re-export prop/ref types from `index.ts`.                                                                         |
| Compound parts (declarations)           | When `Object.assign` adds parts and tsup fails with TS2742, annotate the export: `typeof Base & { Option: typeof AntSelect.Option }`.                                                     |
| Declarations                            | If `tsup` fails with TS2742 ("cannot be named without a reference to…"), give the export an explicit type annotation (see `useThemeToken`).                                               |
| Generic antd components (Select, Table) | Cast the `forwardRef` result: `as <T>(p: FooProps<T> & { ref?: Ref<FooRef> }) => ReactElement`.                                                                                           |

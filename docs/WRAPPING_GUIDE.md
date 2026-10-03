# Wrapping an Ant Design component

Templates: [`Button`](../src/components/Button) (simple), [`Input`](../src/components/Input)
(wrapper element + compound parts), [`Select`](../src/components/Select) (generic),
[`Checkbox`](../src/components/Checkbox) (thin wrapper + compound parts).

Form controls that show a label / helper / error share `useField` from
[`src/components/_shared`](../src/components/_shared) — `_`-prefixed folders are internal and are
not built as public entries.

## Checklist for a new component `Foo`

1. Create `src/components/Foo/` with `Foo.tsx`, `Foo.types.ts`, `Foo.styles.ts`, `Foo.test.tsx`,
   `Foo.stories.tsx`, `index.ts`.
2. Add `export * from './Foo'` to `src/components/index.ts`.
3. Add a `./foo` subpath to `exports` in `package.json` (copy the `./button` block).
   `tsup.config.ts` picks the folder up automatically.
4. Add a `Foo` entry to `componentTokens` in `src/theme/components.ts` if antd has a token for it.

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

# @phanvanhieu/ui

Internal wrapper around [Ant Design](https://ant.design) (v6) that standardises theme, props and refs
across teams. Rename the package in `package.json` to your scope.

## Usage

```tsx
import { Button, Input, ThemeProvider } from '@phanvanhieu/ui';

export function App() {
  return (
    <ThemeProvider mode="light" overrides={{ token: { colorPrimary: '#722ed1' } }}>
      <Input label="Email" errorMessage="Invalid" />
      <Button type="primary" autoLoading onClick={save}>
        Save
      </Button>
    </ThemeProvider>
  );
}
```

Per-component subpaths are also available (e.g. `@phanvanhieu/ui/select`, `@phanvanhieu/ui/theme`),
and the root import is tree-shakable too.

## Components

| Component     | Subpath                       | Extras on top of antd                                                    |
| ------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `Button`      | `@phanvanhieu/ui/button`      | `loadingText`, `autoLoading`, Promise-aware `onClick`                    |
| `Input`       | `@phanvanhieu/ui/input`       | `label`, `helperText`, `errorMessage` (+ `Password`, `Search`, …)        |
| `Select`      | `@phanvanhieu/ui/select`      | `label`, `helperText`, `errorMessage` (+ `Option`, `OptGroup`)           |
| `InputNumber` | `@phanvanhieu/ui/inputnumber` | `label`, `helperText`, `errorMessage`                                    |
| `DatePicker`  | `@phanvanhieu/ui/datepicker`  | `label`, `helperText`, `errorMessage` (+ `RangePicker`, `TimePicker`, …) |
| `Checkbox`    | `@phanvanhieu/ui/checkbox`    | thin wrapper (+ `Group`)                                                 |
| `Radio`       | `@phanvanhieu/ui/radio`       | thin wrapper (+ `Group`, `Button`)                                       |
| `Switch`      | `@phanvanhieu/ui/switch`      | thin wrapper                                                             |
| `Form`        | `@phanvanhieu/ui/form`        | thin wrapper (+ `Item`, `List`, `useForm`, `useWatch`, …)                |

## Theme layers (lowest → highest priority)

1. Global design tokens — `src/theme/tokens.ts`
2. Component tokens — `src/theme/components.ts`
3. `createStyles` in `Component.styles.ts` (token-aware CSS for what tokens can't express)
4. App-level `ThemeProvider overrides` and consumer `className` / `style`

## Scripts

`pnpm dev` (Storybook) · `pnpm test` · `pnpm typecheck` · `pnpm lint` · `pnpm build` · `pnpm check:exports`

Adding a component: see [docs/WRAPPING_GUIDE.md](docs/WRAPPING_GUIDE.md).

Requires `antd >= 6`, `antd-style >= 4.1`, `react >= 18`.

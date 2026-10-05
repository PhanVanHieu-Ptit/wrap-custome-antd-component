# @phanvanhieu/ui

Internal wrapper around [Ant Design](https://ant.design) (v6) that standardises theme, props and refs
across teams. Every antd component is exported from the root; most are antd itself, a few add
library standards.

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

The root import is tree-shakable (`import { Divider } from '@phanvanhieu/ui'` bundles exactly what
`import { Divider } from 'antd'` does). Wrapped components also have subpaths, e.g.
`@phanvanhieu/ui/select`, plus `@phanvanhieu/ui/theme`.

## Components

Components are grouped by category in `src/components/<category>/`. **Bold** = wrapper with library
logic, everything else is a direct re-export of antd (same value, types and statics).

| Category       | Components                                                                                                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `general`      | **Button** (`loadingText`, `autoLoading`, Promise-aware `onClick`), FloatButton, Typography                                                                                                                      |
| `layout`       | Col, Divider, Flex, Grid, Layout, Masonry, Row, Space, Splitter                                                                                                                                                  |
| `navigation`   | Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs                                                                                                                                                      |
| `data-entry`   | AutoComplete, Cascader, **Checkbox**, ColorPicker, **DatePicker**, **Form**, **Input**, **InputNumber**, Mentions, **Radio**, Rate, **Select**, Slider, **Switch**, TimePicker, Transfer, TreeSelect, **Upload** |
| `data-display` | Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Listy, Popover, QRCode, Segmented, Statistic, **Table**, Tag, Timeline, Tooltip, Tree                                       |
| `feedback`     | Alert, Drawer, **Modal**, Popconfirm, Progress, Result, Skeleton, Spin, Tour, `message`, `notification`                                                                                                          |
| `other`        | Affix, App, BackTop, BorderBeam, ConfigProvider, Watermark, `theme` (antd's), `version`, utility types (`GetProps`, `GetRef`, …)                                                                                 |

What the wrappers add (all optional, antd's API is otherwise unchanged):

| Component                                      | Extras                                                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Input`, `InputNumber`, `Select`, `DatePicker` | `label`, `helperText`, `errorMessage` (`required` shows `*` on Select / DatePicker)       |
| `Form`                                         | defaults `layout="vertical"`, `scrollToFirstError`                                        |
| `Table`                                        | default pagination with page-size selector and total; `pagination={false}` still disables |
| `Modal`                                        | defaults `centered`, `destroyOnHidden`                                                    |
| `Upload`                                       | `maxSize` (bytes) + `onReject`; composes with your own `beforeUpload`                     |
| `Checkbox`, `Radio`, `Switch`                  | thin wrappers (typed refs, antd statics kept)                                             |

Notes: `Modal.confirm` & co. and `message` / `notification` are antd's statics and ignore the
defaults above; use `App.useApp()` / `Modal.useModal()` to get theme context.

## Theme layers (lowest → highest priority)

1. Global design tokens — `src/theme/tokens.ts`
2. Component tokens — `src/theme/components.ts`
3. `createStyles` in `Component.styles.ts` (token-aware CSS for what tokens can't express)
4. App-level `ThemeProvider overrides` and consumer `className` / `style`

## Scripts

`pnpm dev` (Storybook) · `pnpm test` · `pnpm typecheck` · `pnpm lint` · `pnpm build` · `pnpm check:exports` · `pnpm exports:sync`

Adding a component: see [docs/WRAPPING_GUIDE.md](docs/WRAPPING_GUIDE.md).

Requires `antd >= 6`, `antd-style >= 4.1`, `react >= 18`.

import type { ThemeConfig } from 'antd';

/** Per-component tokens. Prefer these over CSS overrides whenever antd exposes a token. */
export const componentTokens = {
  Button: {
    fontWeight: 500,
    primaryShadow: 'none',
    defaultShadow: 'none',
    dangerShadow: 'none',
  },
} satisfies NonNullable<ThemeConfig['components']>;

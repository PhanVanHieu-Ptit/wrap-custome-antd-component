import type { ThemeConfig } from 'antd';

const focusRing = '0 0 0 3px rgba(22, 104, 220, 0.12)';

/** Per-component tokens. Prefer these over CSS overrides whenever antd exposes a token. */
export const componentTokens = {
  Button: {
    fontWeight: 500,
    primaryShadow: 'none',
    defaultShadow: 'none',
    dangerShadow: 'none',
  },
  Input: {
    activeShadow: focusRing,
  },
  InputNumber: {
    activeShadow: focusRing,
  },
  DatePicker: {
    activeShadow: focusRing,
  },
} satisfies NonNullable<ThemeConfig['components']>;

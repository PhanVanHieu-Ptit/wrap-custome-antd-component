import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';
import { componentTokens } from './components';
import { designTokens } from './tokens';

export type ThemeMode = 'light' | 'dark';

const base: ThemeConfig = {
  token: designTokens,
  components: componentTokens,
};

export const lightTheme: ThemeConfig = { ...base, algorithm: antdTheme.defaultAlgorithm };

export const darkTheme: ThemeConfig = { ...base, algorithm: antdTheme.darkAlgorithm };

export const themes: Record<ThemeMode, ThemeConfig> = { light: lightTheme, dark: darkTheme };

/**
 * Merge an app-level override onto a base theme: `token` is shallow-merged,
 * `components` is merged per component, everything else (e.g. `algorithm`) is replaced.
 */
export function mergeTheme(baseTheme: ThemeConfig, overrides?: ThemeConfig): ThemeConfig {
  if (!overrides) return baseTheme;

  const components: Record<string, object | undefined> = { ...baseTheme.components };
  for (const [name, value] of Object.entries(overrides.components ?? {})) {
    components[name] = { ...components[name], ...value };
  }

  return {
    ...baseTheme,
    ...overrides,
    token: { ...baseTheme.token, ...overrides.token },
    components: components as ThemeConfig['components'],
  };
}

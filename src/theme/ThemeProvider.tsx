import { ConfigProvider, theme as antdTheme } from 'antd';
import type { ConfigProviderProps, GlobalToken, ThemeConfig } from 'antd';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { mergeTheme, themes } from './theme';
import type { ThemeMode } from './theme';

export interface ThemeProviderProps extends Omit<ConfigProviderProps, 'theme'> {
  /** Built-in palette. @default 'light' */
  mode?: ThemeMode;
  /** App-level overrides merged on top of the library theme (see `mergeTheme`). */
  overrides?: ThemeConfig;
  children?: ReactNode;
}

/** Mount once at the app root. Wraps antd `ConfigProvider` with the library theme. */
export function ThemeProvider({
  mode = 'light',
  overrides,
  children,
  ...rest
}: ThemeProviderProps) {
  const theme = useMemo(() => mergeTheme(themes[mode], overrides), [mode, overrides]);

  return (
    <ConfigProvider {...rest} theme={theme}>
      {children}
    </ConfigProvider>
  );
}

/**
 * Read the resolved design tokens inside any component.
 * The return type is explicit so the emitted .d.ts doesn't reference antd's internal packages.
 */
export function useThemeToken(): { token: GlobalToken; hashId: string } {
  const { token, hashId } = antdTheme.useToken();
  return { token, hashId };
}

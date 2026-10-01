import { render, screen } from '@testing-library/react';
import { Button as AntButton } from 'antd';
import { designTokens } from './tokens';
import { mergeTheme, lightTheme } from './theme';
import { ThemeProvider, useThemeToken } from './ThemeProvider';

function Probe() {
  const { token } = useThemeToken();
  return <span data-testid="primary">{token.colorPrimary}</span>;
}

describe('theme', () => {
  it('mergeTheme merges token and components without mutating the base', () => {
    const merged = mergeTheme(lightTheme, {
      token: { colorPrimary: '#ff0000' },
      components: { Button: { fontWeight: 700 } },
    });
    expect(merged.token?.colorPrimary).toBe('#ff0000');
    expect(merged.token?.borderRadius).toBe(designTokens.borderRadius);
    expect(merged.components?.Button).toMatchObject({ fontWeight: 700, primaryShadow: 'none' });
    expect(lightTheme.token?.colorPrimary).toBe(designTokens.colorPrimary);
  });

  it('ThemeProvider exposes brand tokens and accepts overrides', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Probe />
        <AntButton>x</AntButton>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('primary')).toHaveTextContent(designTokens.colorPrimary);

    rerender(
      <ThemeProvider overrides={{ token: { colorPrimary: '#ff0000' } }}>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('primary')).toHaveTextContent('#ff0000');
  });
});

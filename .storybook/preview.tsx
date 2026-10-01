import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/theme';
import type { ThemeMode } from '../src/theme';

const preview: Preview = {
  globalTypes: {
    mode: {
      description: 'Theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { mode: 'light' },
  decorators: [
    (Story, { globals }) => {
      const mode = (globals['mode'] as ThemeMode) ?? 'light';
      return (
        <ThemeProvider mode={mode}>
          <div
            style={{
              padding: 24,
              minHeight: '100vh',
              background: mode === 'dark' ? '#141414' : '#fff',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

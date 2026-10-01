import type { ThemeConfig } from 'antd';

/**
 * Global design tokens — the single source of truth for brand look & feel.
 * Only seed/alias tokens belong here; per-component tweaks go to `components.ts`.
 */
export const designTokens = {
  colorPrimary: '#1668dc',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1668dc',
  borderRadius: 8,
  controlHeight: 36,
  fontSize: 14,
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
} satisfies NonNullable<ThemeConfig['token']>;

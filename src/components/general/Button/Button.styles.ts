import { createStyles } from 'antd-style';

/**
 * Only styling that tokens can't express lives here. Always read values from `token`
 * so the styles follow light/dark mode and brand overrides.
 */
export const useStyles = createStyles(({ css, token }) => ({
  root: css`
    letter-spacing: 0.01em;
    transition:
      transform ${token.motionDurationFast} ${token.motionEaseOut},
      box-shadow ${token.motionDurationFast} ${token.motionEaseOut};

    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `,
}));

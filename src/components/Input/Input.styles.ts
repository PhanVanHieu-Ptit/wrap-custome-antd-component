import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  field: css`
    display: flex;
    flex-direction: column;
    gap: ${token.marginXXS}px;
    width: 100%;
  `,
  label: css`
    color: ${token.colorText};
    font-weight: ${token.fontWeightStrong};
  `,
  required: css`
    margin-inline-start: ${token.marginXXS}px;
    color: ${token.colorError};
  `,
  helper: css`
    color: ${token.colorTextSecondary};
    font-size: ${token.fontSizeSM}px;
  `,
  error: css`
    color: ${token.colorError};
    font-size: ${token.fontSizeSM}px;
  `,
}));

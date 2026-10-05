import type { Button as AntButton, ButtonProps as AntButtonProps, GetRef } from 'antd';
import type { MouseEvent, ReactNode } from 'react';

/** Ref target of the underlying antd Button (`<button>` or `<a>` when `href` is set). */
export type ButtonRef = GetRef<typeof AntButton>;

/** Props added on top of antd's Button. Everything here is optional. */
export interface ButtonCustomProps {
  /** Text shown instead of `children` while the button is loading. */
  loadingText?: ReactNode;
  /**
   * When `onClick` returns a Promise, show the loading state until it settles.
   * @default false
   */
  autoLoading?: boolean;
  /** Same as antd, but may return a Promise (see `autoLoading`). */
  onClick?: (event: MouseEvent<HTMLElement>) => void | Promise<unknown>;
}

/**
 * antd `ButtonProps` (all autocomplete/JSDoc preserved) + custom props.
 * Only `onClick` is omitted because we widen its return type.
 */
export type ButtonProps = Omit<AntButtonProps, keyof ButtonCustomProps> & ButtonCustomProps;

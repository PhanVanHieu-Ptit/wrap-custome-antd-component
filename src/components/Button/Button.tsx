import { Button as AntButton } from 'antd';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { useStyles } from './Button.styles';
import type { ButtonProps, ButtonRef } from './Button.types';

export const Button = forwardRef<ButtonRef, ButtonProps>(function Button(
  { loadingText, autoLoading = false, loading, onClick, className, children, ...rest },
  ref,
) {
  const { styles, cx } = useStyles();
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const result = onClick?.(event);
      if (!autoLoading || !(result instanceof Promise)) return;

      setPending(true);
      const done = () => mounted.current && setPending(false);
      result.then(done, done);
    },
    [autoLoading, onClick],
  );

  const mergedLoading = loading || pending;

  return (
    <AntButton
      {...rest}
      ref={ref}
      className={cx(styles.root, className)}
      loading={mergedLoading}
      onClick={handleClick}
    >
      {mergedLoading && loadingText ? loadingText : children}
    </AntButton>
  );
});

Button.displayName = 'Button';

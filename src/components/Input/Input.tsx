import { Input as AntInput } from 'antd';
import { forwardRef, useId } from 'react';
import { useStyles } from './Input.styles';
import type { InputProps, InputRef } from './Input.types';

const InputBase = forwardRef<InputRef, InputProps>(function Input(
  { label, helperText, errorMessage, id, status, required, className, ...rest },
  ref,
) {
  const { styles } = useStyles();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedById = `${inputId}-description`;

  const hasError = Boolean(errorMessage);
  const description = hasError ? errorMessage : helperText;

  const input = (
    <AntInput
      {...rest}
      ref={ref}
      id={inputId}
      required={required}
      status={hasError ? 'error' : status}
      aria-invalid={hasError || undefined}
      aria-describedby={description ? describedById : rest['aria-describedby']}
      className={className}
    />
  );

  // No extra DOM unless a custom prop needs it: layout/ref behave exactly like antd's Input.
  if (!label && !description) return input;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {input}
      {description && (
        <div id={describedById} className={hasError ? styles.error : styles.helper}>
          {description}
        </div>
      )}
    </div>
  );
});

InputBase.displayName = 'Input';

/** Compound parts are antd's own, so `Input.Password` & co. keep their full typing. */
export const Input = Object.assign(InputBase, {
  Password: AntInput.Password,
  Search: AntInput.Search,
  TextArea: AntInput.TextArea,
  OTP: AntInput.OTP,
});

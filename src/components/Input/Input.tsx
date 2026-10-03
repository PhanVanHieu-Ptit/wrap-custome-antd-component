import { Input as AntInput } from 'antd';
import { forwardRef } from 'react';
import { useField } from '../_shared/useField';
import type { InputProps, InputRef } from './Input.types';

const InputBase = forwardRef<InputRef, InputProps>(function Input(
  { label, helperText, errorMessage, id, status, required, className, ...rest },
  ref,
) {
  const { controlProps, renderField } = useField({
    id,
    label,
    helperText,
    errorMessage,
    required,
    status,
    'aria-describedby': rest['aria-describedby'],
  });

  return renderField(
    <AntInput {...rest} {...controlProps} ref={ref} required={required} className={className} />,
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

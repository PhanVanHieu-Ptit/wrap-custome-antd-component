import { InputNumber as AntInputNumber } from 'antd';
import type { ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import { useField } from '../_shared/useField';
import type { InputNumberProps, InputNumberRef } from './InputNumber.types';

const InputNumberBase = forwardRef<InputNumberRef, InputNumberProps>(function InputNumber(
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
    'aria-describedby': (rest as Record<string, unknown>)['aria-describedby'] as string | undefined,
  });

  return renderField(
    <AntInputNumber
      {...rest}
      {...controlProps}
      ref={ref}
      required={required}
      className={className}
    />,
  );
});

InputNumberBase.displayName = 'InputNumber';

/** Re-typed so `InputNumber<T>` stays generic through `forwardRef`. */
export const InputNumber = InputNumberBase as unknown as (<
  T extends number | string = number | string,
>(
  props: InputNumberProps<T> & { ref?: Ref<InputNumberRef> },
) => ReactElement) & { displayName?: string };

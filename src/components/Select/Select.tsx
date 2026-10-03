/* eslint-disable @typescript-eslint/no-explicit-any -- mirrors antd's own generic defaults */
import { Select as AntSelect } from 'antd';
import type { ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import { useField } from '../_shared/useField';
import type { SelectOption, SelectProps, SelectRef } from './Select.types';

const SelectBase = forwardRef<SelectRef, SelectProps>(function Select(
  { label, helperText, errorMessage, id, status, className, ...rest },
  ref,
) {
  const { controlProps, renderField } = useField({
    id,
    label,
    helperText,
    errorMessage,
    status,
    'aria-describedby': (rest as Record<string, unknown>)['aria-describedby'] as string | undefined,
  });

  return renderField(<AntSelect {...rest} {...controlProps} ref={ref} className={className} />);
});

SelectBase.displayName = 'Select';

/** Re-typed so `Select<Value, Option>` stays generic through `forwardRef`. */
const GenericSelect = SelectBase as unknown as (<
  ValueType = any,
  OptionType extends Record<string, any> = SelectOption,
>(
  props: SelectProps<ValueType, OptionType> & { ref?: Ref<SelectRef> },
) => ReactElement) & { displayName?: string };

/** Compound parts are antd's own, so `Select.Option` & co. keep their full typing. */
export const Select: typeof GenericSelect & {
  Option: typeof AntSelect.Option;
  OptGroup: typeof AntSelect.OptGroup;
} = Object.assign(GenericSelect, {
  Option: AntSelect.Option,
  OptGroup: AntSelect.OptGroup,
});

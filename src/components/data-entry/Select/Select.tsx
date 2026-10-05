import { Select as AntSelect } from 'antd';
import type { ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import type { AnyRecord, AnyValue } from '../../_shared/antd-generics';
import { getAriaDescribedBy } from '../../_shared/aria';
import { useField } from '../../_shared/useField';
import type { SelectOption, SelectProps, SelectRef } from './Select.types';

const SelectBase = forwardRef<SelectRef, SelectProps>(function Select(
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
    'aria-describedby': getAriaDescribedBy(rest),
  });

  return renderField(<AntSelect {...rest} {...controlProps} ref={ref} className={className} />);
});

SelectBase.displayName = 'Select';

/** Re-typed so `Select<Value, Option>` stays generic through `forwardRef`. */
const GenericSelect = SelectBase as unknown as (<
  ValueType = AnyValue,
  OptionType extends AnyRecord = SelectOption,
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

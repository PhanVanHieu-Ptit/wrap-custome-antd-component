import { DatePicker as AntDatePicker } from 'antd';
import type { ReactElement } from 'react';
import { useField } from '../_shared/useField';
import type { DatePickerDate, DatePickerProps } from './DatePicker.types';

function DatePickerBase<ValueType = DatePickerDate, IsMultiple extends boolean = false>({
  label,
  helperText,
  errorMessage,
  id,
  status,
  className,
  ...rest
}: DatePickerProps<ValueType, IsMultiple>): ReactElement {
  const { controlProps, renderField } = useField({
    id,
    label,
    helperText,
    errorMessage,
    status,
    'aria-describedby': (rest as Record<string, unknown>)['aria-describedby'] as string | undefined,
  });

  return renderField(
    <AntDatePicker {...(rest as object)} {...controlProps} className={className} />,
  ) as ReactElement;
}

DatePickerBase.displayName = 'DatePicker';

/**
 * `ref` is a regular prop (antd's own typing: `RefAttributes<PickerRef>`), so a plain function
 * component forwards it on React 18 + 19 alike. Compound parts are antd's own.
 */
export const DatePicker: typeof DatePickerBase & {
  RangePicker: typeof AntDatePicker.RangePicker;
  WeekPicker: typeof AntDatePicker.WeekPicker;
  MonthPicker: typeof AntDatePicker.MonthPicker;
  QuarterPicker: typeof AntDatePicker.QuarterPicker;
  YearPicker: typeof AntDatePicker.YearPicker;
  TimePicker: typeof AntDatePicker.TimePicker;
} = Object.assign(DatePickerBase, {
  RangePicker: AntDatePicker.RangePicker,
  WeekPicker: AntDatePicker.WeekPicker,
  MonthPicker: AntDatePicker.MonthPicker,
  QuarterPicker: AntDatePicker.QuarterPicker,
  YearPicker: AntDatePicker.YearPicker,
  TimePicker: AntDatePicker.TimePicker,
});

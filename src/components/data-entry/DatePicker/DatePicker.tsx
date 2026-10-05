import { DatePicker as AntDatePicker } from 'antd';
import type { ReactElement } from 'react';
import { getAriaDescribedBy } from '../../_shared/aria';
import { useField } from '../../_shared/useField';
import type { DatePickerDate, DatePickerProps } from './DatePicker.types';

function DatePickerBase<ValueType = DatePickerDate, IsMultiple extends boolean = false>({
  label,
  helperText,
  errorMessage,
  id,
  status,
  required,
  className,
  ...rest
}: DatePickerProps<ValueType, IsMultiple>): ReactElement {
  const { controlProps, renderField } = useField({
    id,
    label,
    helperText,
    errorMessage,
    required,
    status,
    'aria-describedby': getAriaDescribedBy(rest),
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
  generatePicker: typeof AntDatePicker.generatePicker;
} = Object.assign(DatePickerBase, {
  RangePicker: AntDatePicker.RangePicker,
  WeekPicker: AntDatePicker.WeekPicker,
  MonthPicker: AntDatePicker.MonthPicker,
  QuarterPicker: AntDatePicker.QuarterPicker,
  YearPicker: AntDatePicker.YearPicker,
  TimePicker: AntDatePicker.TimePicker,
  generatePicker: AntDatePicker.generatePicker,
});

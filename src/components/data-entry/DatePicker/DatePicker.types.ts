import type { DatePickerProps as AntDatePickerProps } from 'antd';
import type { Ref } from 'react';
import type { FieldCustomProps, FieldRequiredProps } from '../../_shared/Field.types';

/** Date object antd uses by default (dayjs), derived so we don't depend on `dayjs` directly. */
export type DatePickerDate = Exclude<AntDatePickerProps['value'], null | undefined>;

/** Ref target of antd DatePicker — keeps `focus()`, `blur()`, `nativeElement`. */
export type DatePickerRef = AntDatePickerProps extends { ref?: Ref<infer R> } ? R : never;

/** Props added on top of antd's DatePicker. Everything here is optional. */
export type DatePickerCustomProps = FieldCustomProps & FieldRequiredProps;

/** antd `DatePickerProps` (all autocomplete/JSDoc preserved) + custom props. */
export type DatePickerProps<
  ValueType = DatePickerDate,
  IsMultiple extends boolean = false,
> = AntDatePickerProps<ValueType, IsMultiple> & DatePickerCustomProps;

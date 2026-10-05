import type { SelectProps as AntSelectProps, RefSelectProps } from 'antd';
import type { AnyRecord, AnyValue } from '../../_shared/antd-generics';
import type { FieldCustomProps, FieldRequiredProps } from '../../_shared/Field.types';

/** Ref target of antd Select — keeps `focus()`, `blur()`, `scrollTo()`, `nativeElement`. */
export type SelectRef = RefSelectProps;

/** antd's default option shape (`{ label, value, … }`). */
export type SelectOption = NonNullable<AntSelectProps['options']>[number];

/** Props added on top of antd's Select. Everything here is optional. */
export type SelectCustomProps = FieldCustomProps & FieldRequiredProps;

/** antd `SelectProps` (all autocomplete/JSDoc preserved) + custom props. */
export type SelectProps<
  ValueType = AnyValue,
  OptionType extends AnyRecord = SelectOption,
> = AntSelectProps<ValueType, OptionType> & SelectCustomProps;

/* eslint-disable @typescript-eslint/no-explicit-any -- mirrors antd's own generic defaults */
import type { SelectProps as AntSelectProps, RefSelectProps } from 'antd';
import type { FieldCustomProps } from '../_shared/Field.types';

/** Ref target of antd Select — keeps `focus()`, `blur()`, `scrollTo()`, `nativeElement`. */
export type SelectRef = RefSelectProps;

/** antd's default option shape (`{ label, value, … }`). */
export type SelectOption = NonNullable<AntSelectProps['options']>[number];

/** Props added on top of antd's Select. Everything here is optional. */
export type SelectCustomProps = FieldCustomProps;

/** antd `SelectProps` (all autocomplete/JSDoc preserved) + custom props. */
export type SelectProps<
  ValueType = any,
  OptionType extends Record<string, any> = SelectOption,
> = AntSelectProps<ValueType, OptionType> & SelectCustomProps;

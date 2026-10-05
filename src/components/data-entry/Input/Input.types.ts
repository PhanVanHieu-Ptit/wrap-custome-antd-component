import type { Input as AntInput, InputProps as AntInputProps, GetRef } from 'antd';
import type { FieldCustomProps } from '../../_shared/Field.types';

/** Ref target of antd Input — keeps `focus()`, `blur()`, `select()`, `input`, `nativeElement`. */
export type InputRef = GetRef<typeof AntInput>;

/** Props added on top of antd's Input. Everything here is optional. */
export type InputCustomProps = FieldCustomProps;

/** antd `InputProps` (all autocomplete/JSDoc preserved) + custom props. */
export type InputProps = AntInputProps & InputCustomProps;

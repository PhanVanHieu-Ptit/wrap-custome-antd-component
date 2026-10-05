import type { InputNumberProps as AntInputNumberProps } from 'antd';
import type { InputNumber as AntInputNumber, GetRef } from 'antd';
import type { FieldCustomProps } from '../../_shared/Field.types';

/** Ref target of antd InputNumber — keeps `focus()`, `blur()`, `nativeElement`. */
export type InputNumberRef = GetRef<typeof AntInputNumber>;

/** Props added on top of antd's InputNumber. Everything here is optional. */
export type InputNumberCustomProps = FieldCustomProps;

/** antd `InputNumberProps` (all autocomplete/JSDoc preserved) + custom props. */
export type InputNumberProps<T extends number | string = number | string> = AntInputNumberProps<T> &
  InputNumberCustomProps;

import type { Input as AntInput, InputProps as AntInputProps, GetRef } from 'antd';
import type { ReactNode } from 'react';

/** Ref target of antd Input — keeps `focus()`, `blur()`, `select()`, `input`, `nativeElement`. */
export type InputRef = GetRef<typeof AntInput>;

/** Props added on top of antd's Input. Everything here is optional. */
export interface InputCustomProps {
  /** Label rendered above the field and associated with it (`htmlFor`). */
  label?: ReactNode;
  /** Hint rendered below the field. Hidden while `errorMessage` is shown. */
  helperText?: ReactNode;
  /** Error text below the field; also sets `status="error"` and `aria-invalid`. */
  errorMessage?: ReactNode;
}

/** antd `InputProps` (all autocomplete/JSDoc preserved) + custom props. */
export type InputProps = AntInputProps & InputCustomProps;

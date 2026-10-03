import type { InputProps as AntInputProps } from 'antd';
import type { ReactNode } from 'react';

/** Form-field props shared by every control that renders a label / helper / error around itself. */
export interface FieldCustomProps {
  /** Label rendered above the field and associated with it (`htmlFor`). */
  label?: ReactNode;
  /** Hint rendered below the field. Hidden while `errorMessage` is shown. */
  helperText?: ReactNode;
  /** Error text below the field; also sets `status="error"` and `aria-invalid`. */
  errorMessage?: ReactNode;
}

/** antd's validation status (`'' | 'error' | 'warning'`). */
export type FieldStatus = AntInputProps['status'];

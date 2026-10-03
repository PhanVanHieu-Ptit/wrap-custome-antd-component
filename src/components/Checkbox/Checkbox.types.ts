import type { CheckboxProps as AntCheckboxProps, GetRef } from 'antd';
import type { Checkbox as AntCheckbox } from 'antd';

/** Ref target of antd Checkbox — keeps `focus()`, `blur()`, `nativeElement`. */
export type CheckboxRef = GetRef<typeof AntCheckbox>;

/** Thin wrapper: same props as antd's Checkbox. */
export type CheckboxProps = AntCheckboxProps;

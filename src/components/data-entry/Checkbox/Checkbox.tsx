import { Checkbox as AntCheckbox } from 'antd';
import { forwardRef } from 'react';
import type { CheckboxProps, CheckboxRef } from './Checkbox.types';

const CheckboxBase = forwardRef<CheckboxRef, CheckboxProps>(function Checkbox(props, ref) {
  return <AntCheckbox {...props} ref={ref} />;
});

CheckboxBase.displayName = 'Checkbox';

/** Compound parts are antd's own, so `Checkbox.Group` keeps its full typing. */
export const Checkbox = Object.assign(CheckboxBase, {
  Group: AntCheckbox.Group,
});

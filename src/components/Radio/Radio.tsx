import { Radio as AntRadio } from 'antd';
import { forwardRef } from 'react';
import type { RadioProps, RadioRef } from './Radio.types';

const RadioBase = forwardRef<RadioRef, RadioProps>(function Radio(props, ref) {
  return <AntRadio {...props} ref={ref} />;
});

RadioBase.displayName = 'Radio';

/** Compound parts are antd's own, so `Radio.Group` & `Radio.Button` keep their full typing. */
export const Radio = Object.assign(RadioBase, {
  Group: AntRadio.Group,
  Button: AntRadio.Button,
});

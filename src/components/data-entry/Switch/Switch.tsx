import { Switch as AntSwitch } from 'antd';
import { forwardRef } from 'react';
import type { SwitchProps, SwitchRef } from './Switch.types';

export const Switch = forwardRef<SwitchRef, SwitchProps>(function Switch(props, ref) {
  return <AntSwitch {...props} ref={ref} />;
});

Switch.displayName = 'Switch';

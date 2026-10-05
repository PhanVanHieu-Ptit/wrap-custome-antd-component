import type { SwitchProps as AntSwitchProps, GetRef } from 'antd';
import type { Switch as AntSwitch } from 'antd';

/** Ref target of antd Switch (the underlying `<button>`). */
export type SwitchRef = GetRef<typeof AntSwitch>;

/** Thin wrapper: same props as antd's Switch. */
export type SwitchProps = AntSwitchProps;

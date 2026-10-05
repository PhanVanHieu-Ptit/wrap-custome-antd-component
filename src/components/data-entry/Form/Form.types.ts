import type { FormProps as AntFormProps, FormInstance } from 'antd';
import type { AnyValue } from '../../_shared/antd-generics';

/** Ref target of antd Form. */
export type FormRef<Values = AnyValue> = FormInstance<Values>;

/** Thin wrapper: same props as antd's Form. */
export type FormProps<Values = AnyValue> = AntFormProps<Values>;

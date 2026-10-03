/* eslint-disable @typescript-eslint/no-explicit-any -- mirrors antd's own generic defaults */
import type { FormProps as AntFormProps, FormInstance } from 'antd';

/** Ref target of antd Form. */
export type FormRef<Values = any> = FormInstance<Values>;

/** Thin wrapper: same props as antd's Form. */
export type FormProps<Values = any> = AntFormProps<Values>;

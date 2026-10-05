/* eslint-disable @typescript-eslint/no-explicit-any -- antd's own generic defaults are `any`; mirroring them keeps wrappers assignable to / from antd's types. This is the only place `any` is allowed. */

/** antd's default for value-type generics (`Select<ValueType = any>`, `Form<Values = any>`, …). */
export type AnyValue = any;

/** antd's `AnyObject` (not publicly exported): default constraint for option / record generics. */
export type AnyRecord = Record<PropertyKey, any>;

import type { TableProps as AntTableProps, TableRef as AntTableRef } from 'antd';

/** Ref target of antd Table (`scrollTo`, `nativeElement`). */
export type TableRef = AntTableRef;

/** Thin wrapper: same props as antd's Table. */
export type TableProps<RecordType = unknown> = AntTableProps<RecordType>;

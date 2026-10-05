import { Table as AntTable } from 'antd';
import type { ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import type { AnyRecord } from '../../_shared/antd-generics';
import type { TableProps, TableRef } from './Table.types';

// Library defaults; a `pagination` object from the caller is merged over them, `false` disables it.
const defaultPagination: NonNullable<Exclude<TableProps['pagination'], false>> = {
  showSizeChanger: true,
  showTotal: (total, [from, to]) => `${from}–${to} / ${total}`,
};

const TableBase = forwardRef<TableRef, TableProps<AnyRecord>>(function Table(
  { pagination, ...rest },
  ref,
) {
  return (
    <AntTable
      {...rest}
      pagination={pagination === false ? false : { ...defaultPagination, ...pagination }}
      ref={ref}
    />
  );
});

TableBase.displayName = 'Table';

/** Re-typed so `Table<RecordType>` stays generic through `forwardRef`. */
const GenericTable = TableBase as unknown as (<RecordType = AnyRecord>(
  props: TableProps<RecordType> & { ref?: Ref<TableRef> },
) => ReactElement) & { displayName?: string };

/** Compound parts & selection constants are antd's own, so `Table.Column` & co. keep their typing. */
export const Table: typeof GenericTable & {
  Column: typeof AntTable.Column;
  ColumnGroup: typeof AntTable.ColumnGroup;
  Summary: typeof AntTable.Summary;
  EXPAND_COLUMN: typeof AntTable.EXPAND_COLUMN;
  SELECTION_COLUMN: typeof AntTable.SELECTION_COLUMN;
  SELECTION_ALL: typeof AntTable.SELECTION_ALL;
  SELECTION_INVERT: typeof AntTable.SELECTION_INVERT;
  SELECTION_NONE: typeof AntTable.SELECTION_NONE;
} = Object.assign(GenericTable, {
  Column: AntTable.Column,
  ColumnGroup: AntTable.ColumnGroup,
  Summary: AntTable.Summary,
  EXPAND_COLUMN: AntTable.EXPAND_COLUMN,
  SELECTION_COLUMN: AntTable.SELECTION_COLUMN,
  SELECTION_ALL: AntTable.SELECTION_ALL,
  SELECTION_INVERT: AntTable.SELECTION_INVERT,
  SELECTION_NONE: AntTable.SELECTION_NONE,
});

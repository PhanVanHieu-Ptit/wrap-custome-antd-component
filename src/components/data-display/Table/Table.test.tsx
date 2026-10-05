import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Table } from './Table';
import type { TableColumnsType, TableRef } from './index';

interface Row {
  key: string;
  name: string;
}

const columns: TableColumnsType<Row> = [{ title: 'Name', dataIndex: 'name' }];
const data: Row[] = [{ key: '1', name: 'Ada' }];

describe('Table', () => {
  it('renders rows and keeps generic typing', () => {
    render(<Table<Row> columns={columns} dataSource={data} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('enables the page-size selector by default', () => {
    render(<Table<Row> columns={columns} dataSource={data} />);
    expect(document.querySelector('.ant-pagination-options-size-changer')).not.toBeNull();
    expect(screen.getByText('1–1 / 1')).toBeInTheDocument();
  });

  it('lets callers override or disable pagination', () => {
    const { rerender } = render(
      <Table<Row> columns={columns} dataSource={data} pagination={{ showSizeChanger: false }} />,
    );
    expect(document.querySelector('.ant-pagination-options-size-changer')).toBeNull();
    rerender(<Table<Row> columns={columns} dataSource={data} pagination={false} />);
    expect(document.querySelector('.ant-pagination')).toBeNull();
  });

  it('forwards the ref and keeps compound parts', () => {
    const ref = createRef<TableRef>();
    render(<Table<Row> ref={ref} columns={columns} dataSource={data} />);
    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLElement);
    expect(Table.Column).toBeDefined();
    expect(Table.SELECTION_COLUMN).toBeDefined();
  });
});

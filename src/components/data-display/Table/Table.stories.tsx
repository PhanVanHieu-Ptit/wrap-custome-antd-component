import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import type { TableColumnsType } from './index';

interface Row {
  key: string;
  name: string;
  age: number;
}

const columns: TableColumnsType<Row> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
];

const dataSource: Row[] = Array.from({ length: 25 }, (_, i) => ({
  key: String(i),
  name: `Person ${i + 1}`,
  age: 20 + (i % 30),
}));

const meta = {
  title: 'Components/Table',
  component: Table<Row>,
  args: { columns, dataSource },
} satisfies Meta<typeof Table<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const NoPagination: Story = { args: { pagination: false } };

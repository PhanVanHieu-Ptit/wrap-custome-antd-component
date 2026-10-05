import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithLabel: Story = { args: { label: 'Birthday', helperText: 'Day / month / year' } };
export const WithError: Story = { args: { label: 'Birthday', errorMessage: 'Invalid date' } };
export const Range: Story = { render: () => <DatePicker.RangePicker /> };

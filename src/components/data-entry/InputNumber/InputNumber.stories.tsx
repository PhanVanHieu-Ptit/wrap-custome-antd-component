import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputNumber } from './InputNumber';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  args: { min: 0, max: 100 },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithLabel: Story = { args: { label: 'Age', helperText: 'In years', required: true } };
export const WithError: Story = { args: { label: 'Age', errorMessage: 'Must be at least 18' } };

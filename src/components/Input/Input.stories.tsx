import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { placeholder: 'Type here…' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithLabel: Story = {
  args: { label: 'Email', required: true, helperText: 'We never share it' },
};
export const WithError: Story = { args: { label: 'Email', errorMessage: 'Invalid email address' } };
export const Password: Story = { render: (args) => <Input.Password {...args} /> };

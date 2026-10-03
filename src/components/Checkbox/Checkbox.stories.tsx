import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { children: 'Accept terms' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Group: Story = {
  render: () => <Checkbox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} />,
};

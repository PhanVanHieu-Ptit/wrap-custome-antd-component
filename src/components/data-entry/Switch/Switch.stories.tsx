import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithText: Story = { args: { checkedChildren: 'On', unCheckedChildren: 'Off' } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

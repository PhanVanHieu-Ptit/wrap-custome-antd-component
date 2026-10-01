import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { type: 'primary' } };
export const Danger: Story = { args: { type: 'primary', danger: true } };
export const Loading: Story = { args: { type: 'primary', loading: true, loadingText: 'Saving…' } };

export const AutoLoading: Story = {
  args: {
    type: 'primary',
    autoLoading: true,
    loadingText: 'Saving…',
    children: 'Click: async onClick',
    onClick: () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
};

export const Block: Story = { args: { type: 'primary', block: true } };

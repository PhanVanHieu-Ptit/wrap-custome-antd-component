import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: { open: true, title: 'Title', children: 'Content' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const NotCentered: Story = { args: { centered: false } };

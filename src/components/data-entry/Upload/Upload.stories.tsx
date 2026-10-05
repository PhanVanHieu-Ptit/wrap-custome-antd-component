import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../general/Button';
import { Upload } from './Upload';

const meta = {
  title: 'Components/Upload',
  component: Upload,
  args: { beforeUpload: () => false, children: <Button>Select file</Button> },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const MaxSize1MB: Story = {
  args: { maxSize: 1024 * 1024, onReject: (file) => console.warn(`${file.name} is too large`) },
};
